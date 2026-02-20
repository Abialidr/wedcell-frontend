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
const HeartIcon = ({ Iswishlist, onClick }) => {
  const [filled, setFilled] = useState(Iswishlist);

  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setFilled(true)}
      onMouseLeave={() => {
        if (!Iswishlist) setFilled(false);
      }}
    >
      <Icon
        // width={'30px'}
        icon={`ant-design:heart-${filled ? "filled" : "outline"}`}
      ></Icon>
    </span>
  );
};

const DecoreCard = ({ data }) => {
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
            `/planning-and-decor/${data?.name
              .toLowerCase()
              .replaceAll(" ", "-")}/${data?._id}`
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
                    type: "Vendor",
                    bannerImage: data?.mainImage,
                    exclusive: data?.popular,
                    category: data?.category,
                    link: `/planning-and-decor/${data?.name
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

          <img src={`${S3PROXY}${data?.mainImage}`} alt="" />
        </div>
        <article>
          <span className={styles.span1}>{data?.name}</span>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Rating rating={data?.avgRating}></Rating>
          </div>
          <span
            style={{
              letterSpacing: "2px",
              paddingTop: "10px",
            }}
            className={styles.span}
          >
            ₹{data?.price}/Event
          </span>
          <span
            style={{
              letterSpacing: "2px",
              color: "#666666",
              paddingTop: "5px",
              fontWeight: "400",
              fontSize: "15px",
              textAlign: "end",
            }}
          >
            {data?.city}
          </span>
        </article>
        <div className={styles.foot}></div>
      </div>
    </>
  );
};

export default DecoreCard;
