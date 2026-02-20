import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRoute, selectUser } from "../../../redux/reducer/appEssentials";
import {
  useAddWishListMutation,
  useDeleteWishListMutation,
} from "redux/Api/common.api";
import { Icon } from "@iconify/react";
import StarRatings from "react-star-ratings";
import { S3PROXY } from "../../../config";
import { HeartIcon } from "Components/common/DetailPageCommonComp";
const Rating = ({ rating }) => {
  const integerRating = Math.floor(rating);
  const notfinal = rating - integerRating;
  const final = notfinal >= 0.5 ? Math.ceil(rating) : integerRating;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "15px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "15px",
        }}
      >
        {final}
      </span>
      <StarRatings
        rating={final}
        numberOfStars={5}
        starRatedColor="#F9DE50"
        starDimension="15px"
        starSpacing="0px"
      />
    </div>
  );
};


const OtherProductCards = ({ data, link }) => {
  const [addWishlist] = useAddWishListMutation();
  const [deleteWishlist] = useDeleteWishListMutation();
  const globleuser = useSelector(selectUser);

  const [isWishlist, setIsWishList] = useState(
    data?.wishlist ? data?.wishlist : false
  );
  const [wishList, setWishList] = useState({
    _id: data?.wishlist ? data?.wishlistID : "",
  });
  useEffect(() => {
    setIsWishList(data?.wishlist ? data?.wishlist : false);
    setWishList({
      _id: data?.wishlist ? data?.wishlistID : "",
    });
  }, [data?.wishlist]);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <ToastContainer></ToastContainer>
      <div
        onClick={(e) => {
          e.preventDefault();
          router.push(
            `/${link}/${data?.name.toLowerCase().replaceAll(" ", "-")}/${
              data?._id
            }`
          );
        }}
        className={styles.ShopNowCard}
      >
        <div className={styles.cardCap}>
          <img src={`${S3PROXY}/public/Card/cap.png`} alt="" />
          <span>10% Off</span>
        </div>
        <div className={styles.imgContainer}>
          <HeartIcon
            Iswishlist={isWishlist}
            onClick={async (e) => {
              e.stopPropagation();
              if (globleuser) {
                const body = {
                  product: {
                    productId: data?._id,
                    name: data?.name,
                    price: data?.price,
                    type: "Product",
                    bannerImage: data?.mainImages,
                    exclusive: data?.popular,
                    category: data?.category,
                    link: `/other-products/${data?.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}/${data?._id}`,
                  },
                };
                let result;
                if (!isWishlist) {
                  const config = {
                    headers: {
                      authorization: JSON.parse(
                        localStorage.getItem("wedfield")
                      )?.data?.token,
                    },
                  };
                  const res = await addWishlist(body);

                  setIsWishList(true);
                  setWishList(res?.data?.data);
                } else {
                  const config = {
                    headers: {
                      authorization: JSON.parse(
                        localStorage.getItem("wedfield")
                      )?.data?.token,
                    },
                  };
                  result = await deleteWishlist(wishList._id);
                  setIsWishList(false);
                  setWishList("");
                }
              } else {
                router.push(`/customer-login`);
                dispatch(
                  loginRoute({
                    pathname: router.pathname,
                    query: router.query,
                  })
                );
              }
            }}
          />

          <img src={`${S3PROXY}${data?.mainImages}`} alt="" />
        </div>
        <article>
          <div className={styles.div1}>
            <span
              className={styles.span}
              style={{
                letterSpacing: "2px",
              }}
            >
              ₹{data?.price}/Pic
            </span>
            <span
              style={{
                letterSpacing: "2px",
                color: "#666666",
                paddingTop: "5px",
                fontWeight: "400",
                fontSize: "15px",
              }}
            >
              {data?.city}
            </span>
          </div>

          <span className={styles.span1}>{data?.name}</span>
          <Rating rating={data?.avgRating}></Rating>
        </article>
        <div className={styles.foot}></div>
      </div>
    </>
  );
};

export default OtherProductCards;
