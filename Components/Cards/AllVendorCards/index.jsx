import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginRoute, selectUser } from "../../../redux/reducer/appEssentials";
import Image from "next/image";
import { useAddContactMutation } from "redux/Api/chw.api";
import {
  useAddWishListMutation,
  useDeleteWishListMutation,
} from "redux/Api/common.api";
import LoginModal from "Components/CustomerLogin/LoginModal";
import { S3PROXY } from "../../../config";

const Rating = ({ rating }) => {
  const integerRating = Math.floor(rating);
  const notfinal = rating - integerRating;
  const final = notfinal >= 0.5 ? Math.ceil(rating) : integerRating;
  return (
    <div>
      <span>{rating}</span>

      <img src={`${S3PROXY}/public/Card/star.png`} alt="" key={integerRating} />
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

const AllVendorCards = ({ data, page, from }) => {
  const globleuser = useSelector(selectUser);
  const [addWishlist] = useAddWishListMutation();
  const [deleteWishlist] = useDeleteWishListMutation();
  const [addContact] = useAddContactMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isWishlist, setIsWishList] = useState();
  const [wishList, setWishList] = useState();

  useEffect(() => {
    setIsWishList(data?.wishlist ? data?.wishlist : false);
    setWishList({
      _id: data?.wishlist ? data?.wishlistID : "",
    });
  }, [data?.wishlist]);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);

  return (
    <>
      <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
      <div
        onClick={(e) => {
          e.preventDefault();
          router.push(
            `/vendors/${data.name.toLowerCase().replaceAll(" ", "-")}/${
              data._id
            }`
          );
          // router.push(`/vendors/${data._id}`);
        }}
        className={styles.AllVendorCards}
      >
        {data?.exclusive && (
          <div className={styles.exclusive2}>
            <img
              src={`${S3PROXY}/public/Card/exclusive.png`}
              className={styles.rectangle}
              alt=""
            />
            <span className={styles.excluivespan}>Exclusive</span>
          </div>
        )}
        {data?.awarded && (
          <div className={styles.exclusive1}>
            <img
              src={`${S3PROXY}/public/Card/awarded.png`}
              // className={styles.rectangle1}
              alt=""
            />
            <span className={styles.excluivespan}>Awarded</span>
          </div>
        )}

        <div className={styles.cardCap}>
          <img src={`${S3PROXY}/public/Card/cap.png`} alt="" />
          <span>10% Off</span>
        </div>
        <div className={styles.imgContainer}>
          <HeartIcon
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
                    size: [],
                    exclusive: data?.popular,
                    category: data?.category,
                    subCategory: data?.subCategory,
                    city: data?.city,
                    mobile: data?.contactPhone,
                    link: `/vendors/${data?.name
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
                // `${origin}/student/${currentId}`;

                router.push(`/customer-login`);
                dispatch(
                  loginRoute({
                    pathname: router.pathname,
                    query: router.query,
                  })
                );
              }
            }}
            Iswishlist={isWishlist}
          />

          <img src={`${S3PROXY}${data?.mainImage}`} alt="" />
        </div>
        <article>
          <span>{data?.name}</span>
          <Rating rating={data?.avgRating}></Rating>
        </article>
        <section>
          <span>
            <img src={`${S3PROXY}/public/Card/loc.png`} alt="" />
            {data?.city}
          </span>
          <hgroup>
            {data?.category}
            <span>{data?.subCategory}</span>
          </hgroup>
        </section>
        <div className={styles.foot}>
          <hgroup>
            ₹ {data?.price}{" "}
            <span>
              {data?.subCategory == "Chaat Counter" ||
              data?.subCategory == "Fruit Counter"
                ? "/ Per Head"
                : data?.subCategory == "Cake"
                ? "/ Per KG"
                : "/ Per Event"}
            </span>
          </hgroup>
          <span
            onClick={async (e) => {
              e.stopPropagation();
              const userdata = JSON.parse(
                localStorage.getItem("wedfield")
              )?.data;
              const config = {
                headers: {
                  authorization: globleuser?.data?.token,
                },
              };
              const body = {
                initiatorId: userdata?._id,
                prospectName: userdata?.name,
                prospectId: userdata?._id,
                prospectImage: userdata?.profile_pic,
                prospectContact: userdata?.mobile,
                vendorName: data?.name,
                vendorId: data?._id,
                vendorContact: data.contactPhone,
                vendorType: "vendor",
                vendorImage: data.mainImage,
                allowAccess: [],
              };
              if (userdata) {
                const result = await addContact(body);
                window.open(`tel://+${data.contactPhone}`);
              } else {
                setOpenLoginModal(true);
              }
            }}
          >
            <img src={`${S3PROXY}/public/Card/call.png`} alt="" />
          </span>
        </div>
      </div>
    </>
  );
};

export default AllVendorCards;
