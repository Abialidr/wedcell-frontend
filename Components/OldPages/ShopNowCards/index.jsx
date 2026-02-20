import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./index.module.scss";
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
import { Icon } from "@iconify/react";
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

const ShopNowCards = ({ data }) => {
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
    <>
      <ToastContainer></ToastContainer>
      <div
        onClick={(e) => {
          e.preventDefault();
          router.push(
            `/products/${data?.productName
              .toLowerCase()
              .replaceAll(" ", "-")}/${data?.productId}?variantId=${
              data?._id
            }&size=${size}`
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

          <img
            // onClick={() => {
            //   router.push(
            //     `/products/${data?.productId}?variantId=${data?._id}&size=${size}`
            //   );
            // }}
            src={`${S3PROXY}${data?.mainImages}`}
            alt=""
          />
        </div>
        <article>
          <span>{data?.name}</span>
          <Rating rating={data?.avgRating}></Rating>
        </article>
        <section>
          <span>
            {Object.entries(data?.psizes).map((key, value) => {
              return key[1].qauntity !== 0 ? (
                key[0] != "XXL" && key[0] != "XXXL" && (
                  <span
                    style={
                      key[0] === size
                        ? {
                            border: "0.81px solid rgb(182, 37, 90)",
                            backgroundColor: "#B6255A",
                            color: "white",
                          }
                        : {}
                    }
                    onClick={(e) => {
                      e.stopPropagation();
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
                      : ""}
                  </span>
                )
              ) : (
                <></>
              );
            })}
          </span>
          <hgroup>
            {data?.category}
            <span>{data?.subCategory}</span>
          </hgroup>
        </section>
        <div className={styles.foot}>
          <hgroup>
            ₹{" "}
            {data?.psizes[size]?.priceExclusive -
              Math.floor(
                (data?.psizes[size]?.priceExclusive *
                  data?.psizes[size]?.discount) /
                  100
              )}{" "}
            {/* <span>/ Event</span> */}
          </hgroup>
          <span
            onClick={async (e) => {
              e.stopPropagation();
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
                  loginRoute({
                    pathname: router.pathname,
                    query: router.query,
                  })
                );
              }
            }}
          >
            <img src={`${S3PROXY}/public/Card/bag.png`} alt="" />
          </span>
        </div>
      </div>
    </>
  );
};

export default ShopNowCards;
