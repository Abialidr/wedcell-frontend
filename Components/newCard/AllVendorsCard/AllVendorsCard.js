import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./card.module.css";
import { useRouter } from "next/router";
import Heart from "react-animated-heart";

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

const AllVendorsCard = ({ data, page, from }) => {
  const globleuser = useSelector(selectUser);
  const [addWishlist] = useAddWishListMutation();
  const [deleteWishlist] = useDeleteWishListMutation();
  const [addContact] = useAddContactMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const exclusive = data?.exclusive;
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
        className={styles.Card}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/vendors/${data._id}`);
        }}
        style={{
          height: from && "92%",
        }}
      >
        <div
          className={
            exclusive ? styles["cardcontainerex"] : styles["cardcontainer"]
          }
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
              <div className={styles.exclusive2}>
                <img
                  src={`${S3PROXY}/public/img/webp/5-4stars.webp`}
                  className={styles.rectangle}
                  alt=""
                />
                <img
                  className={styles.star2}
                  src={`${S3PROXY}/public/img/webp/Star 2.webp`}
                  alt=""
                />
                <span className={styles.excluivespan}>Exclusive</span>
              </div>
            )}
            {data?.awarded && (
              <div className={styles.exclusive1}>
                <img
                  src={`${S3PROXY}/public/img/webp/awarded.png.webp`}
                  // className={styles.rectangle1}
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
          </div>
          <div className={styles["img-container"]}>
            {/* <div className={styles.info}>
            <Tooltip title={data?.description}>
              <IconButton style={{ color: `white` }}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div> */}
            {data?.mainImage ? (
              <Image
                style={{ cursor: "pointer" }}
                height={0}
                width={0}
                src={`${S3PROXY}${data?.mainImage}`}
                alt="Hello"
                onClick={() => {
                  router.push(`/vendors/${data._id}`);
                }}
              />
            ) : (
              <Image
                height={0}
                width={0}
                src={`${S3PROXY}/public/`}
                alt="Photo"
              ></Image>
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
              {/* <div className={styles.location}>
              < src=`${S3PROXY}/public/img/webp/Vector.webp` alt="" />
              <span>{data.city}</span>
            </div> */}
              {/* <div className={styles.perplateprice}>
              <div className={styles.vegimg}>
                <
                  className={styles.rectangle}
                  src=`${S3PROXY}/public/img/webp/icons8-event-accepted-50.webp`
                  alt=""
                />
              </div>
              <span className={styles.price}>{data.vegPerPlate || "NaN"}</span>
              <span className={styles.perplate}>per event</span>
            </div> */}
            </div>
            <div className={styles["review-det"]}>
              <div className={styles.location}>
                <img src={`${S3PROXY}/public/img/webp/Vector.webp`} alt="" />
                <span>{data?.city}</span>
              </div>
              <div className={styles["mainfeat-container"]}>
                <span className={styles.mainfeat}>
                  {data?.category} <br />
                  {data?.subCategory}
                </span>
              </div>
              {/* <div className={styles.nonvegperplate}>
              <div className={styles.nonvegimg}>
                <
                  className={styles.rectangle}
                  src={`${S3PROXY}/public/img/webp/icons8-wedding-50.webp`}
                  alt=""
                />
              </div>
              <span className={styles.price}>
                {data.nonVegPerPlate || "NaN"}
              </span>
              <span className={styles.perplate}>full wedding</span>
            </div>*/}
            </div>
          </div>
          {/* <button className={styles.ShopNow}>
          <Heart
            isClick={isWishlist}
            onClick={async () => {
              if (globleuser) {
                const body = {
                  product: {
                    productId: data?._id,
                    name: data.productName,
                    price: data.productPrice,
                    type: "Product",
                    bannerImage: data.images[0],
                    size: data?.size,
                    exclusive: data?.popular,
                  },
                };
                let result;
                if (!isWishlist) {
                  const config = {
                    headers: {
                      authorization: globleuser
                        ?.data?.token,
                    },
                  };
                  const res = await result;
                  
                  setIsWishList(true);
                  setWishList(res.data.data);
                } else {
                  const config = {
                    headers: {
                      authorization: globleuser
                        ?.data?.token,
                    },

                  setIsWishList(false);
                  setWishList("");
                }

                toast.promise(result, {
                  pending: {
                    render() {
                      return <h5 style={{ marginTop: "5px" }}>loading</h5>;
                    },
                    icon: () => <CircularProgress disableShrink />,
                  },
                  success: {
                    render({ data }) {
                      return (
                        <h5 style={{ marginTop: "5px" }}>
                          items Added to Wishlist
                        </h5>
                      );
                    },
                    // other options
                    icon: () => <CheckCircleIcon />,
                  },
                  error: {
                    render({ data }) {
                      // When the promise reject, data will contains the error
                      return <h5 style={{ marginTop: "5px" }}>Error</h5>;
                    },
                    icon: () => <CircularProgress color="primary" />,
                  },
                });
              } else {
                // `${origin}/student/${currentId}`;

                window.open(`/customer-login`, "_blank");
              }
            }}
          />
        </button> */}

          {/* {data.plans.length && (
          <div className={styles.facility}>
            {data.plans
              .filter((items, i) => {
                
                return i <= 2;
              })
              .map((items, i) => {
                return <span key={i}>{items.name}</span>;
              })}
            {data.plans.lenght > 3 && (
              <span className={styles.more}>+{data.plans.lenght - 3}more</span>
            )}
          </div>
        )} */}
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
                <span className={styles.pernight}> per event</span>
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
              <img
                src={`${S3PROXY}/public/img/webp/icons8-call-50.webp`}
                alt=""
                // height={0}
                // width={0}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllVendorsCard;
