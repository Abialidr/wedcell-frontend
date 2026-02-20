import React, { useEffect, useState } from "react";
import styles from "../../styles/planning.module.scss";
import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import { PROXY, S3PROXY } from "../../config";
import { Spinner } from "react-bootstrap";
import { Box, Modal } from "@mui/material";
import {
  useGetHiredVendorDataQuery,
  useGetWishlistDataQuery,
} from "redux/Api/chw.api";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Head from "next/head";
const VendorCat = ({
  vendorCatname,
  router,
  wishlist,
  setOpenLoadingModal,
}) => {
  const globleuser = useSelector(selectUser);

  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    let filteredCat;
    if (vendorCatname?.is === "category") {
      filteredCat = wishlist?.filter(
        (item) => item.product.category === vendorCatname.category
      );
    } else if (vendorCatname?.is === "type") {
      filteredCat = wishlist?.filter(
        (item) => item.product.type === vendorCatname.type
      );
    } else if (vendorCatname?.is === "subCategory") {
      filteredCat = wishlist?.filter(
        (item) => item.product.subCategory === vendorCatname.subCategory
      );
    }

    setFilteredData(filteredCat);
  }, [wishlist, vendorCatname]);

  return (
    <div>
      <span className={styles.PageHeadersvendor}>{vendorCatname?.name}</span>

      <div className={styles.VendorManagerBody}>
        {filteredData?.map((values, key) => {
          return (
            <div key={key} className={styles.VendorManagerCard}>
              <span className={styles.VendorManagerCardspan}>
                {values.product.name}
              </span>
              <div className={styles.backgrdDiv}>
                <Image
                  height={0}
                  width={0}
                  src={`${S3PROXY}${values.product.bannerImage}`}
                  onClick={() => {
                    setOpenLoadingModal(true);
                    if (vendorCatname.type === "Venue") {
                      router.push(`/venue/${values.product.productId}`);
                    } else if (vendorCatname.type === "Vendor") {
                      router.push(`/vendors/${values.product.productId}`);
                    }
                  }}
                  alt=""
                />
              </div>
              <article className={styles.VendorManagerCardFooter}>
                <span>Price :</span>₹{values.product.price}
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const VendorWishlist = () => {
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const loadingStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "100px",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const router = useRouter();
  const globleuser = useSelector(selectUser);

  const [wishlist, setWishlist] = useState();
  const [hiredVendor, setHiredVendor] = useState();
  const [hiredVendordata, setHiredVendordata] = useState();
  const { data: wishlistData } = useGetWishlistDataQuery();
  const { data: HiredVendorData } = useGetHiredVendorDataQuery();
  const getData = async () => {
    const config = {
      headers: {
        authorization: globleuser?.data?.token,
      },
    };
    const res = { data: wishlistData };
    setWishlist(res?.data?.data);
    const res1 = { data: HiredVendorData };
    setHiredVendordata(res1?.data?.data);
  };
  useEffect(() => {
    getData();
  }, [wishlistData, HiredVendorData]);
  const [isClick, setClick] = useState(false);
  const [vendorCatname, setVendorCatname] = useState();
  const [vendorCatPage, setVendorCatPage] = useState(false);
  const vendorArray = [
    {
      name: "Venue",
      img: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      link: "venue",
      type: "Venue",
      category: "",
      is: "type",
      subCategory: "",
    },
    {
      name: "Jwellery",
      img: "https://images.unsplash.com/photo-1651160670627-2896ddf7822f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=468&q=80",
      link: "vendors?category=Jwellery+And+Accessories",
      type: "Vendor",
      category: "Jwellery And Accessories",
      is: "category",
      subCategory: "",
    },
    {
      name: "Invitation",
      img: "https://plus.unsplash.com/premium_photo-1674581208166-e29c52bf61c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      link: "vendors?category=Invites+%26+Gifts",
      type: "Vendor",
      category: "Invites & Gifts",
      is: "category",
      subCategory: "",
    },
    {
      name: "Music & Dance",
      img: "https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      link: "vendors?category=Music+%26+Dance",
      type: "Vendor",
      category: "Music & Dance",
      is: "category",
      subCategory: "",
    },
    {
      name: "PhotoGrapher",
      img: "https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      link: "vendors?category=Photographers",
      type: "Vendor",
      category: "Photographers",
      is: "category",
      subCategory: "",
    },
    {
      name: "Catering",
      img: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      link: "vendors?category=Food",
      type: "Vendor",
      category: "Food",
      is: "category",
      subCategory: "",
    },
    {
      name: "Decore",
      img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
      link: "vendors?category=Planning+%26+Decor",
      type: "Vendor",
      category: "Planning & Decor",
      is: "category",
      subCategory: "",
    },
    {
      name: "Makeup",
      img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
      link: "vendors?category=Makeup",
      type: "Vendor",
      category: "Makeup",
      is: "category",
      subCategory: "",
    },
    {
      name: "Mehendi",
      img: "https://plus.unsplash.com/premium_photo-1682092635235-d775b3103eb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      link: "vendors?category=Mehndi",
      type: "Vendor",
      category: "Mehndi",
      is: "category",
      subCategory: "",
    },
    {
      name: "PanditJi",
      img: "https://images.unsplash.com/photo-1680491023101-80e9c91ee6cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      link: "vendors?category=Pandit+Jee",
      type: "Vendor",
      category: "Pandit Jee",
      is: "category",
      subCategory: "",
    },
  ];
  return (
    <div className={styles.VendorManagerDiv}>
      <Head>
        <title>Manage Your Vendor – WedField</title>
        <meta
          name="description"
          content="Manage venue, Décor, Music and Dance, Invitation List, Jewellery, Catering, Photographer, Mehendi and Many More on your one Click on WedField."
        />
        <link
          name="canonical"
          href={`https://wedfield.com/user-dashboard?direction=VendorManager`}
        />
      </Head>
      <Modal
        open={openLoadingModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={loadingStyles}>
          <Spinner></Spinner>
        </Box>
      </Modal>
      <div className={styles.VendorWishlistHead}>
        {/* <button className={styles.VendorManagerseeAll}>See All</button> */}
        <div className={styles.tab}>
          <span
            style={
              hiredVendor
                ? {
                    cursor: "pointer",
                    color: "#b6255a",
                    background: "white",
                  }
                : {}
            }
            onClick={() => {
              setHiredVendor(false);
              setVendorCatPage(false);
            }}
          >
            Wishlist
          </span>
          <span
            style={
              !hiredVendor
                ? {
                    cursor: "pointer",
                    color: "#b6255a",
                    background: "white",
                  }
                : {}
            }
            onClick={() => {
              setHiredVendor(true);
              setVendorCatPage(false);
            }}
          >
            Hired Vendor
          </span>
        </div>
      </div>
      {hiredVendor && !vendorCatPage ? (
        <>
          {/* <span className={styles.PageHeadersvendor}>Hired Vendors</span> */}
          <div className={styles.VendorManagerBody}>
            {vendorArray?.map((values, key) => {
              let array123;
              if (values.type === "Venue") {
                array123 = hiredVendordata?.filter(
                  (item) => item.product.type === values.type
                );
              } else {
                array123 = hiredVendordata?.filter(
                  (item) => item.product.category === values.category
                );
              }
              return (
                <div
                  key={key}
                  className={styles.VendorManagerCard}
                  onClick={() => {
                    if (array123.length) {
                      setVendorCatname(values);
                      setVendorCatPage(true);
                    } else {
                      router.push(values.link);
                    }
                  }}
                >
                  <div className={styles.backgrdDiv}>
                    <Image
                      height={0}
                      width={0}
                      src={
                        array123?.length
                          ? array123[0]?.product?.bannerImage
                          : values.img
                      }
                      alt=""
                    />
                    <div className={styles.backBkgrd}>
                      {array123?.length ? array123.length : "+ Add"}
                    </div>
                  </div>
                  <article className={styles.VendorManagerCardFooter}>
                    <span>{values.name}</span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setOpenLoadingModal(true);
                        e.stopPropagation();
                        router.push(values.link);
                      }}
                    >
                      Explore all
                      <span>
                        <Icon width={"16px"} icon={"iconamoon:arrow-right-2"} />
                      </span>
                    </span>
                  </article>
                </div>
              );
            })}
          </div>
        </>
      ) : vendorCatPage ? (
        <VendorCat
          vendorCatname={vendorCatname}
          router={router}
          wishlist={hiredVendor ? hiredVendordata : wishlist}
          setOpenLoadingModal={setOpenLoadingModal}
        ></VendorCat>
      ) : (
        <>
          {/* <span className={styles.PageHeadersvendor}>Vendor Wishlist</span> */}
          <div className={styles.VendorManagerBody}>
            {vendorArray?.map((values, key) => {
              let array123;
              if (values.type === "Venue") {
                array123 = wishlist?.filter(
                  (item) => item.product.type === values.type
                );
              } else {
                array123 = wishlist?.filter(
                  (item) => item.product.category === values.category
                );
              }
              return (
                <div
                  key={key}
                  className={styles.VendorManagerCard}
                  onClick={() => {
                    if (array123.length) {
                      setVendorCatname(values);
                      setVendorCatPage(true);
                    } else {
                      router.push(values.link);
                    }
                  }}
                >
                  <div className={styles.backgrdDiv}>
                    <img
                      src={
                        array123?.length
                          ? array123[0]?.product?.bannerImage
                          : values.img
                      }
                      alt=""
                    />
                    <div className={styles.backBkgrd}>
                      {array123?.length ? array123.length : "+ Add"}
                    </div>
                  </div>
                  <article className={styles.VendorManagerCardFooter}>
                    <span>{values.name}</span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setOpenLoadingModal(true);

                        e.stopPropagation();
                        router.push(values.link);
                      }}
                    >
                      Explore all
                      <span>
                        <Icon width={"16px"} icon={"iconamoon:arrow-right-2"} />
                      </span>
                    </span>
                  </article>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default VendorWishlist;
