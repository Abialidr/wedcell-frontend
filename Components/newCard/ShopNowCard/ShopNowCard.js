import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./card.module.css";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import Heart from "react-animated-heart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { loginRoute, selectUser } from "../../../redux/reducer/appEssentials";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import {
  useAddCartMutation,
  useCheckCartQuery,
  useDeletCartMutation,
} from "redux/Api/chw.api";
import {
  useAddWishListMutation,
  useDeleteWishListMutation,
} from "redux/Api/common.api";
import { S3PROXY } from "../../../config";
const ShopNowCard = ({ data }) => {
  const [addWishlist] = useAddWishListMutation();
  const [deleteWishlist] = useDeleteWishListMutation();
  const [addCart] = useAddCartMutation();
  const [deletCart] = useDeletCartMutation();
  const globleuser = useSelector(selectUser);

  const [size, setSize] = useState("Small");
  useEffect(() => {
    if (data?.psizes?.Small?.qauntity > 0) {
      setSize("Small");
    } else if (data?.psizes?.Medium?.qauntity > 0) {
      setSize("Medium");
    } else if (data?.psizes?.Large?.qauntity > 0) {
      setSize("Large");
    } else if (data?.psizes["Extra Large"]?.qauntity > 0) {
      setSize("Extra Large");
    } else if (data?.psizes?.XXL?.qauntity > 0) {
      setSize("XXL");
    } else if (data?.psizes?.XXXL?.qauntity > 0) {
      setSize("XXXL");
    }
  }, [data]);

  const exclusive = data?.exclusive;
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
  const [countcart, setCountCart] = useState(0);
  const [addedCart, setAddedCart] = useState(false);
  const [dirty, setDirty] = useState(false);
  const router = useRouter();
  // const { data: checkCart } = useCheckCartQuery({ _id: data?._id, size: size });
  // useEffect(() => {
  //   const getcartdet = async () => {
  //     if (!dirty) {
  //       setAddedCart(data?.psizes[size]?.cart);

  //       setCountCart({
  //         _id: data?.psizes[size]?.cart ? data?.psizes[size].cartId : "",
  //       });
  //     } else {
  //       const config = {
  //         headers: {
  //           authorization: globleuser?.data?.token,
  //         },
  //       };
  //       const res1 = { data: checkCart };
  //       if (res1?.data?.success) {
  //         setAddedCart(true);
  //       } else {
  //         setAddedCart(false);
  //       }
  //       res1.data?.success ? setCountCart(res1?.data?.data) : setCountCart("");
  //     }
  //   };
  //   getcartdet();
  // }, [size, data?.psizes[size]?.cart, checkCart]);
  return (
    <div className={styles.Card} style={{ height: "100%" }}>
      <div
        className={
          exclusive ? styles["cardcontainerex"] : styles["cardcontainer"]
        }
      >
        {exclusive && (
          <div className={styles.exclusive}>
            <Image
              height={0}
              width={0}
              src={`${S3PROXY}/public/img/webp/Rectangle 13.webp`}
              alt=""
            />
            <Image
              height={0}
              width={0}
              className={styles.star2}
              src={`${S3PROXY}/public/img/webp/Star 2.webp`}
              alt=""
            />
            <span className={styles.excluivespan}>Exclusive</span>
          </div>
        )}
        <div className={styles["img-container"]}>
          <Image
            style={{ cursor: "pointer" }}
            height={0}
            width={0}
            onClick={() => {
              router.push(
                `/products/${data.productName
                  .toLowerCase()
                  .replaceAll(" ", "-")}/${data?.productId}?variantId=${
                  data?._id
                }&size=${size}`
              );
            }}
            src={`${S3PROXY}${data?.mainImages}`}
            alt="Hello"
          />
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
                      price:
                        data?.psizes[size]?.priceExclusive -
                        Math.floor(
                          (data?.psizes[size]?.priceExclusive *
                            data?.psizes[size]?.discount) /
                            100
                        ),
                      type: "Product",
                      bannerImage: data?.mainImages,
                      size: "",
                      exclusive: data?.popular,
                      category: data?.category,
                      subCategory: data?.subCategory,
                      link: `/products/${data?.name
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

          <div
            className={styles.addtoCarticon}
            onClick={async () => {
              if (globleuser) {
                const body = {
                  variantId: data?._id,
                  quantity: 1,
                  name: data?.name,
                  price:
                    data?.psizes[size]?.priceExclusive -
                    Math.floor(
                      (data?.psizes[size]?.priceExclusive *
                        data?.psizes[size]?.discount) /
                        100
                    ),
                  bannerImage: data?.mainImages,
                  size: size,
                };
                const config = {
                  headers: {
                    authorization: globleuser?.data?.token,
                  },
                };
                if (!addedCart) {
                  const result = addCart(body);
                  setDirty(true);
                  toast.promise(result, {
                    pending: {
                      render() {
                        return <h5 style={{ marginTop: "5px" }}>loading</h5>;
                      },
                      icon: () => <CircularProgress disableShrink />,
                    },
                    success: {
                      render({ datas }) {
                        return (
                          <h5 style={{ marginTop: "5px" }}>
                            {data?.productName} to Cart
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
                  const res = await result;
                  setAddedCart(true);
                } else {
                  const config = {
                    headers: {
                      authorization: globleuser?.data?.token,
                    },
                  };
                  const result = await deletCart(countcart?._id);
                  setDirty(true);
                  setAddedCart(false);
                }
              } else {
                router.push(`/customer-login`);
                dispatch(
                  loginRoute({ pathname: router.pathname, query: router.query })
                );
              }
            }}
          >
            <ShoppingCartIcon
              sx={{ color: addedCart ? "lightgreen" : "white" }}
            />
          </div>
        </div>
        <div className={styles["details-container"]}>
          <div className={styles["name-det"]}>
            <div className={styles.nameLoc}>
              {/* <h2>adhs asdjhasjd dhfgsdh</h2> */}
              <div style={{ width: "60%" }}>
                <h2 style={{ width: "100%" }}>
                  {data?.name.substring(0, 32)}
                  {data?.name?.length > 32 && "..."}
                </h2>
              </div>

              <div className={styles.review}>
                <Image
                  src={`${S3PROXY}/public/img/webp/Star 1.webp`}
                  alt=""
                  height={0}
                  width={0}
                />
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
          </div>
          <div className={styles["review-det"]}>
            <div className={styles.location}>
              {Object.entries(data?.psizes).map((key, value) => {
                return key[1].qauntity !== 0 ? (
                  <span
                    style={{
                      border:
                        key[0] === size ? "2px solid rgb(182, 37, 90)" : "",
                    }}
                    onClick={() => {
                      setSize(key[0]);
                    }}
                  >
                    {key[0] === "Small"
                      ? "S"
                      : key[0] === "Medium"
                      ? "M"
                      : key[0] === "Large"
                      ? "L"
                      : key[0] === "Extra Large"
                      ? "XL"
                      : key[0]}
                  </span>
                ) : (
                  <></>
                );
              })}
            </div>
            <div className={styles["mainfeat-container"]}>
              <span className={styles.mainfeat}>
                {data?.category} <br /> {data?.subCategory}
              </span>
            </div>
          </div>
        </div>

        {/* <div className={styles.facility}>
          {Object.entries(data?.psizes).map((key, value) => {
            return key[1].qauntity !== 0 ? (
              <span
                style={{
                  border: key[0] === size ? "2px solid rgb(182, 37, 90)" : "",
                }}
                onClick={() => {
                  setSize(key[0]);
                }}
              >
                {key[0] === "Small"
                  ? "S"
                  : key[0] === "Medium"
                  ? "M"
                  : key[0] === "Large"
                  ? "L"
                  : key[0] === "Extra Large"
                  ? "XL"
                  : key[0]}
              </span>
            ) : (
              <></>
            );
          })}
        </div> */}
        <div
          className={styles.footer}
          style={{
            padding: "10px 10PX 0PX",
            // marginTop: "5px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            marginTop: "0px",
          }}
        >
          {/* {data?.psizes[size]?.qauntity < 5 ? (
            <span
              style={{ fontSize: "14px", color: "red", marginTop: "-10px" }}
            >
              Hurry! Only {data?.psizes[size]?.qauntity} left
            </span>
          ) : (
            <></>
          )} */}
          <div className={styles.totalprice} style={{ width: "50%" }}>
            {data?.psizes[size]?.discount !== 0 ? (
              <span
                className={styles.tprice}
                style={{
                  fontWeight: "300",
                  marginRight: "10px",
                  fontSize: "16px",
                  color: "#b6255a",
                }}
              >
                {data?.psizes[size]?.discount}% Off
              </span>
            ) : (
              <></>
            )}
            <span className={styles.rupeessym}>₹</span>
            <div
              className={styles.totprice}
              style={{
                backgroundColor: exclusive ? `#ffffff` : `#ffdcd3`,
              }}
            >
              <span className={styles.tprice}>
                {data?.psizes[size]?.priceExclusive -
                  Math.floor(
                    (data?.psizes[size]?.priceExclusive *
                      data?.psizes[size]?.discount) /
                      100
                  )}
              </span>
              {/* {data?.psizes[size]?.discount !== 0 ? (
                <span
                  style={{
                    marginTop: "-6px",
                    marginLeft: "5px",
                    textDecoration: "line-through",
                    fontSize: "14px",
                  }}
                >
                  MRP : ₹{data?.psizes[size]?.priceExclusive}
                </span>
              ) : (
                <></>
              )} */}
            </div>
            {/* {data?.psizes[size]?.discount !== 0 ? (
              <span
                className={styles.tprice}
                style={{
                  fontWeight: "300",
                  marginRight: "10px",
                  fontSize: "16px",
                  color: "#b6255a",
                }}
              >
                {data?.psizes[size]?.discount}% Off
              </span>
            ) : (
              <></>
            )} */}
          </div>
          <div className={styles.buttons} style={{ width: "50%" }}>
            <button
              className={styles.ShopNow}
              onClick={() => {
                if (globleuser) {
                  router.push(`/Order?itemId=${data?._id}&size=${size}`);
                } else {
                  router.push(`/customer-login`);
                }
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
        {/* <div className={styles.footer1}>
          <div className={styles.totalprice}>
            <span className={styles.rupeessym}>₹</span>
            <div
              className={styles.totprice}
              style={{
                backgroundColor: exclusive ? `#ffffff` : `#ffdcd3`,
              }}
            >
              <span className={styles.tprice}>{data?.productPrice}</span>
              <span className={styles.pernight}></span>
            </div>
          </div>
        </div> */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ShopNowCard;
