import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./card.module.css";
import { useRouter } from "next/router";
import Heart from "react-animated-heart";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginRoute, selectUser } from "../../../redux/reducer/appEssentials";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CircularProgress, MenuItem, Select } from "@mui/material";
import { useAddCartMutation, useAddContactMutation } from "redux/Api/chw.api";
import Image from "next/image";
import {
  useAddWishListMutation,
  useDeleteWishListMutation,
} from "redux/Api/common.api";
import { S3PROXY } from "../../../config";

const WishlistCard = ({ item, setDeleteCart, deleteCart, shopNow }) => {
  const [deleteWishlist] = useDeleteWishListMutation();
  const [addContact] = useAddContactMutation();
  const [addCart] = useAddCartMutation();
  const globleuser = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isWishlist, setIsWishList] = useState();
  const [data, setdata] = useState();
  useEffect(() => {
    setdata(item?.product);
  }, [item]);
  const [psizes, setPsizes] = useState({
    Medium: {
      qauntity: 10,
      priceInclusive: 4100,
      priceExclusive: 4100,
      discount: 0,
      weight: 1000,
    },
    "Extra Large": {
      qauntity: 10,
      priceInclusive: 4100,
      priceExclusive: 4100,
      discount: 0,
      weight: 1000,
    },
    XXL: {
      qauntity: 6,
      priceInclusive: 4100,
      priceExclusive: 4100,
      discount: 0,
      weight: 1000,
    },
    XXXL: {
      qauntity: 10,
      priceInclusive: 4100,
      priceExclusive: 4209,
      discount: 0,
      weight: 1000,
    },
  });
  const [size, setSize] = useState("Small");
  useEffect(() => {
    if (psizes?.Small?.qauntity > 0) {
      setSize("Small");
    } else if (psizes?.Medium?.qauntity > 0) {
      setSize("Medium");
    } else if (psizes?.Large?.qauntity > 0) {
      setSize("Large");
    } else if (psizes["Extra Large"]?.qauntity > 0) {
      setSize("Extra Large");
    } else if (psizes?.XXL?.qauntity > 0) {
      setSize("XXL");
    } else if (psizes?.XXXL?.qauntity > 0) {
      setSize("XXXL");
    }
  }, [data]);
  return (
    <div className={styles.Card}>
      <div className={styles["cardcontainerex"]}>
        <div
          className={styles.exclusivecontainer}
          style={{
            position: "absolute",
            gridTemplateColumns: "1fr 1fr 1fr",
            width: "100%",
          }}
        ></div>
        <div className={styles["img-container"]}>
          {/* <div className={styles.info}>
            <Tooltip title={data?.description}>
              <IconButton style={{ color: `white` }}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div> */}
          <div className={styles.heart}>
            <Heart
              className={styles.WishHeart}
              isClick={true}
              onClick={async () => {
                const config = {
                  headers: {
                    authorization: JSON.parse(localStorage.getItem("wedfield"))
                      .data.token,
                  },
                };
                const result = await deleteWishlist(item?._id);
                setDeleteCart(!deleteCart);
              }}
            />
          </div>
          {data?.bannerImage ? (
            <Image
              height={0}
              width={0}
              src={`${S3PROXY}${data?.bannerImage}`}
              alt="Hello"
              onClick={() => {
                router.push(
                  data?.type === "Vendor"
                    ? `/vendors/${data.productId}`
                    : data?.type === "Venue"
                    ? `/venue/${data.productId}`
                    : ""
                );
              }}
            />
          ) : (
            <>Loading...</>
          )}
        </div>
        <div className={styles["details-container"]}>
          <div className={styles["name-det"]}>
            <h2>{data?.name}</h2>
          </div>
          <div className={styles["review-det"]}>
            {shopNow ? (
              <div className={styles.location}>
                <span className={styles.mainfeat}>
                  {data?.category} {data?.subCategory}
                </span>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        <hr />
        <div className={styles.footer}>
          <div className={styles.totalprice}>
            <span className={styles.rupeessym}>₹</span>
            <div
              className={styles.totprice}
              style={{
                backgroundColor: `#ffdcd3`,
              }}
            >
              <span className={styles.tprice}>
                {shopNow
                  ? psizes[size]?.priceExclusive -
                    Math.floor(
                      (psizes[size]?.priceExclusive * psizes[size]?.discount) /
                        100
                    )
                  : data?.price}
              </span>
              {shopNow ? (
                <></>
              ) : (
                <span className={styles.pernight}>
                  {" "}
                  per {data?.type === "Vendor" ? "event" : "night"}
                </span>
              )}
            </div>
          </div>
          {shopNow ? (
            <div className={styles.addtocartholediv}>
              <Select
                name=""
                id=""
                value={size}
                onChange={(e) => setSize(e.target.value)}
                size="small"
              >
                {Object.entries(psizes).map((key, value) => {
                  return key[1].qauntity !== 0 ? (
                    <MenuItem value={key[0]}>{key[0]}</MenuItem>
                  ) : (
                    <></>
                  );
                })}
              </Select>

              <div
                className={styles.addtoCarticon}
                onClick={async () => {
                  const config = {
                    headers: {
                      authorization: JSON.parse(
                        localStorage.getItem("wedfield")
                      ).data.token,
                    },
                  };
                  const body = {
                    variantId: item?.product?.productId,
                    quantity: 1,
                    name: item?.product?.name,
                    price:
                      psizes[size]?.priceExclusive -
                      Math.floor(
                        (psizes[size]?.priceExclusive *
                          psizes[size]?.discount) /
                          100
                      ),
                    bannerImage: item?.product?.bannerImage,
                    size: size,
                  };
                  const res = addCart(body);
                  toast.promise(res, {
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
                            {item?.product?.name} to Cart
                          </h5>
                        );
                      },
                      icon: () => <CheckCircleIcon />,
                    },
                    error: {
                      render({ data }) {
                        return <h5 style={{ marginTop: "5px" }}>Error</h5>;
                      },
                      icon: () => <CircularProgress color="primary" />,
                    },
                  });
                  const res1 = await res;
                  const result = await deleteWishlist(item?._id);
                  setDeleteCart(!deleteCart);
                  setTimeout(() => {
                    router.push("/user-dashboard/cart");
                  }, 1999);
                }}
              >
                <ShoppingCartIcon sx={{ color: "lightgreen" }} />
              </div>
            </div>
          ) : (
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
                  prospectName: userdata?.name,
                  prospectId: userdata?._id,
                  prospectContact: userdata?.mobile,
                  vendorName: data?.name,
                  vendorId: data?.productId,
                  vendorContact: data?.mobile,
                  allowAccess: [],
                };

                if (globleuser) {
                  const result = await addContact(body);
                  window.open(`tel://+${data?.mobile}`);
                } else {
                  router.push("/customer-login");
                  dispatch(
                    loginRoute({
                      pathname: router.pathname,
                      query: router.query,
                    })
                  );
                }
              }}
            >
              <img src={`${S3PROXY}/public/images/webp/caller.webp`} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
