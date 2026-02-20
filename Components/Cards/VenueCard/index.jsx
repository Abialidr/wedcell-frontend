import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginRoute, selectUser } from "../../../redux/reducer/appEssentials";
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
      {Array(final)?.fill(
        <img
          src={`${S3PROXY}/public/Card/star.png`}
          alt=""
          key={integerRating}
        />
      )}
      {rating == 0 ? (
        <img
          src={`${S3PROXY}/public/Card/star.png`}
          alt=""
          key={integerRating}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
import { HeartIcon } from "Components/common/DetailPageCommonComp";

const VenueCard = ({ data, from }) => {
  const [addWishlist] = useAddWishListMutation();
  const [deleteWishlist] = useDeleteWishListMutation();
  const [addContact] = useAddContactMutation();
  const globleuser = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const exclusive = false;
  const [isWishlist, setIsWishList] = useState();
  // data?.wishlist ? data?.wishlist : false
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
            `/venue/${data.name.toLowerCase().replaceAll(" ", "-")}/${data._id}`
          );
        }}
        className={styles.VenueCard}
      >
        {data?.exclusive && (
          <div className={styles.exclusive}>
            <img
              src={`${S3PROXY}/public/Card/exclusive.png`}
              className={styles.rectangle}
              alt=""
            />
            <span className={styles.excluivespan}>On Panel</span>
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
        {data?.fourStar || data?.fiveStar ? (
          <div className={styles.exclusive2}>
            <img
              src={`${S3PROXY}/public/Card/5star.png`}
              // className={styles.rectangle1}
              alt=""
            />
            <span className={styles.excluivespan}>
              {data?.fourStar ? "4" : data?.fiveStar ? "5" : ""} Star
            </span>
          </div>
        ) : (
          <></>
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
                    type: "Venue",
                    bannerImage: data?.mainImage,
                    size: [],
                    exclusive: data?.popular,
                    category: data?.category,
                    subCategory: data?.subCategory,
                    city: data?.city,
                    mobile: data?.contactPhone,
                    link: `/venue/${data?.name
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
                  setWishList(res.data?.data);
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
                // toast.promise(result, {
                //   pending: {
                //     render() {
                //       return <h5 style={{ marginTop: "5px" }}>loading</h5>;
                //     },
                //     icon: () => <CircularProgress disableShrink />,
                //   },
                //   success: {
                //     render({ data }) {
                //       return (
                //         <h5 style={{ marginTop: "5px" }}>
                //           items Added to Wishlist
                //         </h5>
                //       );
                //     },
                //     // other options
                //     icon: () => <CheckCircleIcon />,
                //   },
                //   error: {
                //     render({ data }) {
                //       // When the promise reject, data will contains the error
                //       return <h5 style={{ marginTop: "5px" }}>Error</h5>;
                //     },
                //     icon: () => <CircularProgress color="primary" />,
                //   },
                // });
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
          <article>
            <span>
              <img src={`${S3PROXY}/public/Card/loc.png`} alt="" />
              {data?.city}
            </span>
            <hgroup>
              <span>
                <img src={`${S3PROXY}/public/Card/bed.png`} alt="" />{" "}
                {data?.totalRooms ? data?.totalRooms : "0"}
              </span>
              <span>
                <img src={`${S3PROXY}/public/Card/banq.png`} alt="" />{" "}
                {data?.totalBanquet ? data?.totalBanquet : "0"}
              </span>
              <span>
                <img src={`${S3PROXY}/public/Card/lawn.png`} alt="" />{" "}
                {data?.totalLawns ? data?.totalLawns : "0"}
              </span>
            </hgroup>
          </article>
          <hgroup>
            <span>
              <img src={`${S3PROXY}/public/Card/veg.png`} alt="" />{" "}
              {data?.vegPerPlate}/ Plate
            </span>
            <span>
              <img src={`${S3PROXY}/public/Card/nonveg.png`} alt="" />{" "}
              {data?.nonVegPerPlate}/ Plate
            </span>
          </hgroup>
        </section>
        <div className={styles.foot}>
          <hgroup>
            ₹ {data?.price} <span>/ Night</span>
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
                vendorContact: data?.contactPhone,
                vendorType: "venue",
                vendorImage: data?.mainImage,
                allowAccess: [],
              };
              if (userdata) {
                const result = await addContact(body);
                window.open(`tel://+${data?.contactPhone}`);
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
export default VenueCard;
