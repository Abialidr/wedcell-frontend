import React, { useEffect } from "react";
import { useState } from "react";

// import "/img/webp/Rectangle 13.webp" from "./img/webp/Rectangle 13.webp";
import Tooltip from "@mui/material/Tooltip";
import "react-toastify/dist/ReactToastify.css";
// import exclusive from "./img/webp/Rectangle 13.webp";
// import star from "./img/webp/Rectangle 12 (1).webp";
import styles from "./card.module.css";
import { useRouter } from "next/router";
import Heart from "react-animated-heart";
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

const VenuesCard = ({ data, from }) => {
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
  console.log("🚀 ~ file: VenuesCard.js:34 ~ VenuesCard ~ wishList:", wishList)
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
        className={styles.Card}
        style={{ height: from === "vendet" ? "94%" : "100%" }}
      >
        <div
          className={
            data?.exclusive
              ? styles["cardcontainerex"]
              : styles["cardcontainer"]
          }
          style={{ height: "100%" }}
        >
          <div
            className={styles.exclusivecontainer}
            style={{
              position: "absolute",
              gridTemplateColumns: "1fr 1fr 1fr",
              width: "100%",
            }}
          >
            {data?.exclusive && (
              <div className={styles.exclusive}>
                <img
                  src={`${S3PROXY}/public/img/onPanel.png`}
                  className={styles.rectangle}
                  alt=""
                />
                <img
                  src={`${S3PROXY}/public/img/webp/icons8-smile-48.webp`}
                  className={styles.star2}
                  alt=""
                />
                <span className={styles.excluivespan}>On Panel</span>
              </div>
            )}
            {data?.awarded && (
              <div className={styles.exclusive1}>
                <img
                  src={`${S3PROXY}/public/img/webp/awarded.png.webp`}
                  className={styles.rectangle1}
                  alt=""
                />
                <img
                  className={styles.star2}
                  src={`${S3PROXY}/public/img/webp/icons8-award-48.webp`}
                  alt=""
                />
                <span className={styles.excluivespan}>Awarded</span>
              </div>
            )}
            {data?.fourStar || data?.fiveStar ? (
              <div className={styles.exclusive2}>
                <img
                  src={`${S3PROXY}/public/img/webp/5-4stars.webp`}
                  className={styles.rectangle3}
                  alt=""
                />
                <img
                  className={styles.star2}
                  src={`${S3PROXY}/public/img/webp/Star 2.webp`}
                  alt=""
                />
                <span className={styles.excluivespan}>
                  {data?.fourStar ? "4" : data?.fiveStar ? "5" : ""} Star
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={styles["img-container"]}>
            {/* <div className={styles.info}>
            <Tooltip title={data?.description}>
              <IconButton style={{ color: `white` }}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div> */}
            {data?.mainImage && (
              <Image
                height={0}
                width={0}
                src={`${S3PROXY}${data?.mainImage}`}
                alt="Hello"
                onClick={() => {
                  router.push(`/venue/${data?._id}`);
                }}
              />
            )}

            <div className={styles.heart}>
              <Heart
                className={styles.WishHeart}
                isClick={isWishlist}
                onClick={async () => {
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
              />
            </div>
          </div>
          <div className={styles["details-container"]}>
            <div className={styles["name-det"]}>
              <h2>{data?.name}</h2>
              <div className={styles.review}>
                <img src={`${S3PROXY}/public/img/webp/Star 1.webp`} alt="" />
                <span className={styles.rateNo}>
                  {data?.avgRating === 0
                    ? "0"
                    : Number(data?.avgRating).toFixed(1)}
                </span>
                <span className={styles.outof}>
                  ({data?.avgRatingTotalRates} review)
                </span>
              </div>
            </div>
            <div className={styles["review-det"]}>
              <div className={styles.location}>
                <img src={`${S3PROXY}/public/img/webp/Vector.webp`} alt="" />
                <span>{data?.city}</span>
              </div>
              <div className={styles["mainfeat-container"]}>
                <span className={styles.mainfeat}>{data?.category}</span>
              </div>
            </div>
            <div className={styles.subcats}>
              <div className={styles.perplateprice}>
                <div className={styles.vegimg}>
                  <img
                    className={styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/icons8-veg-48.webp`}
                    alt=""
                  />
                </div>
                <span className={styles.price}>{data?.vegPerPlate}</span>

                <span className={styles.perplate}>per plate</span>
              </div>
              <div className={styles.nonvegperplate}>
                <div className={styles.vegimg}>
                  <img
                    className={styles.rectangle}
                    src={`${S3PROXY}/public/img/webp/icons8-non-vegetarian-food-symbol-48.webp`}
                    alt=""
                  />
                </div>
                <span className={styles.price}>{data?.nonVegPerPlate}</span>
                <span className={styles.perplate}>per plate</span>
              </div>
            </div>
          </div>
          {/* {data?.allowedVendors?.length ? (
          <div className={styles.facility}>
            {data?.allowedVendors
              .filter((data) => {
                return data?.value;
              })
              .map((data) => {
                return <span>{data?.name}</span>;
              })}
          </div>
        ) : (
          <></>
        )} */}
          <div className={styles.callandfaci}>
            <div className={styles.facilitydiv}>
              <article>
                <Tooltip title="Rooms">
                  <img src={`${S3PROXY}/public/images/webp/bed.webp`} />
                </Tooltip>
                {data?.totalRooms ? data?.totalRooms : "0"}
              </article>
              <article>
                <Tooltip title="Banquets">
                  <img src={`${S3PROXY}/public/images/webp/ceremony.webp`} />
                </Tooltip>

                {data?.totalBanquet ? data?.totalBanquet : "0"}
              </article>
              <article>
                <Tooltip title="Lawn">
                  <img src={`${S3PROXY}/public/images/webp/grass.webp`} />
                </Tooltip>
                {data?.totalLawns ? data?.totalLawns : "0"}
              </article>
            </div>
          </div>

          <hr />
          <div className={styles.footer}>
            <div className={styles.totalprice}>
              <span className={styles.rupeessym}>₹</span>
              <div
                className={styles.totprice}
                style={{
                  backgroundColor: exclusive ? `#ffffff` : `#ffdcd3`,
                }}
              >
                <span className={styles.tprice}>{data?.price}</span>
                <span className={styles.pernight}> per night</span>
              </div>
            </div>
            <div
              className={styles.call}
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
              <img
                // height={0}
                // width={0}
                src={`${S3PROXY}/public/img/webp/icons8-call-50.webp`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenuesCard;
