import React, { useState, useContext, useEffect } from "react";
import styles from "./products.module.scss";
import StarRatings from "react-star-ratings";
import useWindowSize from "@rooks/use-window-size";
import Slider from "react-slick";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import LoginModal from "Components/CustomerLogin/LoginModal";
import { Box, Button, Modal, Slide } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Reviews from "../../writeReviewCard/Reviews.jsx";
import ReviewCard from "../../writeReviewCard/ReviewCard.jsx";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { extractYouTubeId } from "../../../helper/index";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  loginRoute,
  selectLocation,
  selectUser,
} from "../../../redux/reducer/appEssentials.js";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player/lazy";
import {
  useAddCartMutation,
  useAddContactMutation,
  useCheckCartQuery,
  useCheckWishListQuery,
  useGetOneContactQuery,
  useGetOneMesbyTwoIdsMutation,
  useUpdateCartMutation,
} from "redux/Api/chw.api";
import {
  useAddWishListMutation,
  useDeleteWishListMutation,
  useGetAllDecoreQuery,
} from "redux/Api/common.api";
import {
  useGetAllQualityQuery,
  useGetOneReviewQuery,
  useGetallReviewsQuery,
} from "redux/Api/reviews.api";
import { useGetAllProductQuery } from "redux/Api/common.api";
import Image from "next/image";
import Carousal from "Components/Landing Page/Carousel/Index";
import DecoreCard from "Components/Cards/DecoreCard";
import { Icon } from "@iconify/react";
import { io } from "socket.io-client";
import moment from "moment";
import { PROXY, S3PROXY } from "../../../config/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function LeftArrow1() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Button
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      sx={{ display: { md: "flex", xs: "none" } }}
    >
      <ArrowBackIosIcon />
    </Button>
  );
}

function RightArrow1({ pushData, limit }) {
  const { isLastItemVisible, scrollNext, items, visibleElements } =
    React.useContext(VisibilityContext);
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  );
  useEffect(() => {
    if (items.toItemsWithoutSeparators().length >= limit) {
      setDisabled(isLastItemVisible);
    }
    if (isLastItemVisible) {
      pushData();
    }
  }, [items, limit, isLastItemVisible]);
  return (
    <Button
      disabled={disabled}
      onClick={() => scrollNext()}
      sx={{ display: { md: "flex", xs: "none" } }}
    >
      <ArrowForwardIosIcon />
    </Button>
  );
}
function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Button
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      sx={{ display: { md: "flex", xs: "none" } }}
    >
      <ArrowBackIosIcon />
    </Button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <Button
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      sx={{ display: { md: "flex", xs: "none" } }}
    >
      <ArrowForwardIosIcon />
    </Button>
  );
}

const Albums = ({
  data,
  setCurrentImage,
  setOpen,
  setSelectedAlbums,
  setInitialSlide,
}) => {
  const { innerWidth: innerWidth } = useWindowSize();
  return (
    <div
      style={{ display: data?.length ? "" : "none" }}
      className={`${styles.imgListContainerforAlbum} VENUEdETAILS1234567890`}
    >
      <Carousal slides={data} pushData={() => {}}>
        <div style={{ width: innerWidth > 900 ? "30px" : "0px" }}></div>
        {data?.map((items) => {
          return (
            <div
              className={styles.imgListCardforAlbum}
              onClick={() => {
                setSelectedAlbums(items.value);
                // setOpen(true);
                // setInitialSlide(0);
              }}
            >
              {items.value.length ? (
                <img
                  src={`${S3PROXY}${items.value[0]}`}
                  // onClick={(e) => {
                  //   setCurrentImage(e.target.src);
                  // }}
                  alt=""
                />
              ) : (
                <img
                  src={`${S3PROXY}${items.value[0]}`}
                  // onClick={(e) => {
                  //   setCurrentImage(e.target.src);
                  // }}
                ></img>
              )}
              <span>{items.name}</span>
            </div>
          );
        })}
        <div style={{ width: innerWidth > 900 ? "30px" : "0px" }}></div>
      </Carousal>
    </div>
  );
};
const DecoreDetail = ({ alldata, givenSize, rv }) => {
  console.log(
    "🚀 ~ file: DecoreDetail.jsx:120 ~ ProductDetail1 ~ alldata:",
    alldata
  );
  const [venueHeaderToggle, setvenueHeaderToggle] = useState("Elements ");

  const Rating = ({ rating }) => {
    const integerRating = Math.floor(rating);
    const notfinal = rating - integerRating;
    const final = notfinal >= 0.5 ? Math.ceil(rating) : integerRating;
    return (
      <div>
        {Array(final).fill(
          <img
            src={`${S3PROXY}/public/Card/star.png`}
            alt=""
            key={integerRating}
          />
        )}
        {rating == 0 ? (
          <img src={`${S3PROXY}/public/Card/star.png`} alt="" />
        ) : (
          <></>
        )}
      </div>
    );
  };
  const [deleteWishList] = useDeleteWishListMutation();
  const [addWishList] = useAddWishListMutation();
  const [addCart] = useAddCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const [randommath, setRandommath] = useState();
  const globleuser = useSelector(selectUser);
  const [data, setData] = useState();
  const [selectedAlbum, setSelectedAlbum] = useState();

  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  useEffect(() => {
    setData(alldata);
    setSelectedAlbum(alldata?.albums[0]?.value);
    // if (variantId && alldata?.product.variants.includes(variantId)) {
    //   setSelectedVariant(
    //     alldata.variants.find((item) => item._id === variantId)
    //   );
    // }
  }, [alldata]);
  const [size, setSize] = useState("Small");

  useEffect(() => {
    if (givenSize) {
      setSize(givenSize);
    }
  }, []);
  const [activeTab, setActiveTab] = useState("albums");

  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [countcart, setCountCart] = useState(0);
  const [addedCart, setAddedCart] = useState(false);
  const router = useRouter();
  const [isWishlist, setIsWishList] = useState(false);
  const [wishList, setWishList] = useState(false);
  const [viewmoretac, setViewMoretac] = useState(false);
  const [viewmoreav, setViewMoreav] = useState(false);
  const settings = {
    infinite: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    width: "100%",
  };
  const [getOneMesbyTwoIds] = useGetOneMesbyTwoIdsMutation();

  const videos = [
    "https://www.youtube.com/watch?v=L93D0hBtY6A",
    "https://www.youtube.com/watch?v=zUnRdu4mIzo",
  ];
  const Video = ({ data }) => {
    const { innerWidth: windowWidth } = useWindowSize();
    return (
      <div
        className={`${styles.imgListContainerforAlbum} VENUEdETAILS1234567890`}
      >
        <div style={{ width: windowWidth > 900 ? "30px" : "0px" }}></div>
        <Carousal
          slides={data}
          pushData={() => {}}
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
        >
          <div style={{ width: windowWidth > 900 ? "30px" : "0px" }}></div>

          {data?.map((items) => {
            let url;
            const id = extractYouTubeId(items);
            if (id) {
              url = `http://img.youtube.com/vi/${id}/default.jpg`;
            } else {
              url = `${S3PROXY}/public/Layout/logo.svg`;
            }
            return (
              <a href={items} target="_blank">
                <div
                  className={styles.imgListCardforAlbum}
                  onClick={() => {
                    // setSelectedAlbums(items.value);
                    // setOpen(true);
                  }}
                >
                  {/* <
                src={`${S3PROXY}${items.value[0]}`}
                onClick={(e) => {
                  setCurrentImage(e.target.src);
                }}
                alt=""
              /> */}
                  <img
                    src={`${url}`}
                    style={{ objectFit: "cover" }}
                    width={"100%"}
                    height={"100%"}
                  ></img>
                  <YouTubeIcon
                    color="red"
                    style={{
                      position: "absolute",
                      color: "red",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      height: "75px",
                      width: "75px",
                    }}
                  />
                  {/* <ReactPlayer
                  url={items}
                  controls={true}
                  style={{ objectFit: "cover" }}
                  width={"100%"}
                  height={"100%"}
                  disabled
                /> */}
                  {/* <span>{items.name}</span> */}
                </div>
              </a>
            );
          })}
          <div style={{ width: windowWidth > 900 ? "30px" : "0px" }}></div>
        </Carousal>
      </div>
    );
  };
  const [allSimilarProd, setAllSimilarProd] = useState([]);
  const { id } = router.query;
  const [reviewValues, setreviewValues] = useState({
    reviewbody: "",
    reviewtitle: "",
    reviewstars: "",
  });
  const { innerWidth } = useWindowSize();
  const slider = useRef();
  const [initialSlide, setInitialSlide] = useState();
  const [cartID, setCartID] = useState();
  const [updated, setUpdate] = useState(false);
  // const { data: checkCart, refetch: checkCartrefetch } = useCheckCartQuery({
  //   _id: selectedVariant?._id,
  //   size,
  // });
  // useEffect(() => {
  //   const getcartdet = async () => {
  //     checkCartrefetch();
  //     const res1 = {
  //       data: checkCart,
  //     };
  //     setAddedCart(res1.data?.success);
  //     res1.data?.success
  //       ? setCountCart(res1?.data?.data?.quantity)
  //       : setCountCart(0);
  //     res1.data?.success ? setCartID(res1?.data?.data?._id) : setCartID("");
  //   };
  //   if (selectedVariant) getcartdet();
  // }, [size, randommath, selectedVariant]);
  const [oneReview, setOneReview] = useState();
  const [reviewData, setReviewData] = useState([]);
  const [totalReview, setTotalReview] = useState();
  const [subRev, setSubRev] = useState();
  const [page, setPage] = useState(0);

  const { data: onlyoneReview, refetch: reviewRefetvh } = useGetOneReviewQuery({
    userid: globleuser?.data?._id,
    productid: id,
  });
  useEffect(() => {
    const getOneReview = async () => {
      reviewRefetvh();
      const res = onlyoneReview;
      setOneReview(res?.data[0]);
    };
    getOneReview();
  }, [subRev, updated, onlyoneReview]);

  const { data: allReview, refetch: reviewRefetch } = useGetallReviewsQuery({
    productid: id,
    // userid: globleuser?.data?._id,
    page: page + 1,
  });

  useEffect(() => {
    reviewRefetch();
    const getData = async () => {
      const result = allReview;
      if (result?.data) setReviewData([...result?.data]);
      setTotalReview(result);
    };
    getData();
  }, [page, updated, allReview]);
  const { data: checkWihlist } = useCheckWishListQuery(data?._id);
  useEffect(() => {
    const get = async () => {
      const res = {
        data: checkWihlist,
      };
      setIsWishList(res?.data?.success);
      res?.data?.success && setWishList(res?.data?.data[0]);
    };
    if (globleuser) get();
  }, [data?.name, updated, randommath]);

  const [page1, setPage1] = useState(1);
  const [limit, setLimit] = useState();
  const { data: venueData, refetch: venueRefetch } = useGetAllDecoreQuery({
    category: data?.category,
    page: page1,
    // isUser: globleuser ? globleuser?.data?._id : undefined,
  });
  useEffect(() => {
    if (venueData) {
      let newData = allSimilarProd.concat(venueData?.data);
      newData = newData.filter((val) => val._id !== data?.id);
      setAllSimilarProd(newData);
    }
  }, [data?._id, venueData]);
  useEffect(() => {
    if (page1 > 0) {
      venueRefetch();
    }
  }, [page1]);
  const [quaility, setquality] = useState();
  const [totalReview1, setTotalReview1] = useState();
  const { data: qualityData } = useGetAllQualityQuery({
    category: [
      "valueForMoney",
      "fabricQuality",
      "colors",
      "clothStyle",
      "comfort",
      "food",
      "banquet",
      "hospitality",
      "staff",
      "qualitywork",
      "professionalism",
      "onTime",
    ],
    id: id,
  });
  useEffect(() => {
    const getQuality = async () => {
      const res = qualityData;
      setquality(res?.data);
      setTotalReview1(res?.totalReviews);
    };
    getQuality();
  }, []);

  const [drop, setDrop] = useState({
    Facility: false,
    "Plans & Packages": false,
    "Vendor Allow Policy": false,
    Features: false,
    Halls: false,
    "T&C": false,
    About: false,
  });
  const [openReview, setOpenReview] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "fit-content",
    overflow: "scroll",

    // paddingTop: "270px",
    zIndex: "-1",
  };
  const [showContact, setShowContact] = useState(false);
  const [existingContact, setExistingContact] = useState([]);
  const { data: getoneContact, refetch: contactRefetch } =
    useGetOneContactQuery({
      prospectId: globleuser?.data?._id,
      vendorId: alldata?.vendorId?._id,
    });
  const getContact = async () => {
    const result = getoneContact;
    console.log(
      "🚀 ~ file: DecoreDetail.jsx:495 ~ getContact ~ result:",
      result
    );
    setExistingContact(result ? result : []);
  };
  useEffect(() => {
    globleuser && getContact();
  }, [globleuser, getoneContact]);

  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = io.connect(PROXY);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  const [addContact] = useAddContactMutation();
  return (
    <div className={styles.mainbody}>
      <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />

      <Modal
        style={{
          zIndex: "1402",
        }}
        open={openImage}
        onClose={() => {
          setOpenImage(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <>
        hello world
      </> */}
        <>
          <Button
            type="button"
            onClick={() => {
              setOpenImage(false);
            }}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "black",
              fontSize: "20px",
            }}
          >
            <CancelIcon fontSize="large" />
          </Button>
          <div
            style={{
              maxHeight: "80vh",
              maxWidth: "100vw",
              overflow: "hidden",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="RealwedImageContainer1234567890 albumBigSlider12345678902 albumBigSlider1234567890 albumBigSlider12345678910 albumBigSlider12345678902"
          >
            <Slider {...settings} initialSlide={initialSlide}>
              {selectedImage?.map((data) => {
                return (
                  <img
                    src={`${S3PROXY}${data}`}
                    alt=""
                    className={styles.bigSliderImage}
                  />
                );
              })}
            </Slider>
          </div>
        </>
      </Modal>
      <button
        onClick={() => setOpenReview(true)}
        className={styles.Writereview}
      >
        <img src={`${S3PROXY}/public/images/pen.png`} alt="" />
        Write a review
      </button>
      <Modal
        open={openReview}
        onClose={() => {
          setOpenReview(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span
            onClick={() => setOpenReview(false)}
            style={{
              position: "absolute",
              right: "30px",
              fontSize: "20px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            x
          </span>
          <ReviewCard
            pid={data?._id}
            type={"product"}
            oneReview={oneReview}
            subRev={subRev}
            // subType={'product'}
            setUpdate={setUpdate}
            mobile={true}
            setSubRev={setSubRev}
          ></ReviewCard>
        </Box>
      </Modal>
      <div className={styles.header}>
        <article>
          <Icon onClick={() => router.back()} icon={"icon-park-outline:back"} />
          Product
        </article>
        <div className={styles.wishlistandHiredvendor}>
          {isWishlist ? (
            <button
              className={styles.HiredVendorbtns}
              onClick={async () => {
                if (globleuser) {
                  deleteWishList(wishList._id);
                  setIsWishList(false);
                  setWishList("");
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
              <img
                src={`${S3PROXY}/public/images/webp/heart (1).webp`}
                alt=""
              />
            </button>
          ) : (
            <button
              className={styles.HiredVendorbtns}
              onClick={async () => {
                if (globleuser) {
                  const body = {
                    product: {
                      productId: data?._id,
                      name: data?.name,
                      price: data?.price,
                      type: "Vendor",
                      bannerImage: data?.mainImages,
                      size: size,
                      exclusive: data?.popular,
                      category: data?.category,
                      subCategory: data?.subCategory,
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

                    result = addWishList(body);
                    const res = await result;

                    setIsWishList(true);
                    setWishList(res.data?.data);
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
              <img src={`${S3PROXY}/public/images/webp/heart.png`} alt="" />
            </button>
          )}
        </div>
      </div>
      <div className={styles.topdiv}>
        <div>
          <div className={styles.leftdiv}>
            <div
              className={`${styles.imgcontainer} VenueImageContainer1234567892`}
            >
              <div className={`${styles.firstDiv}`}>
                {selectedAlbum?.map((data, key) => {
                  return (
                    <div className={styles.cardInnimg}>
                      <Image
                        height={0}
                        width={0}
                        src={`${S3PROXY}${data}`}
                        alt=""
                        onClick={() => {
                          slider.current.slickGoTo(key);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <Slider {...settings} ref={slider}>
                {selectedAlbum?.map((item, index) => {
                  return (
                    <div>
                      <img
                        src={`${S3PROXY}${item}`}
                        alt=""
                        onClick={() => {
                          setInitialSlide(index);
                          setSelectedImage([...selectedAlbum]);
                          setOpenImage(true);
                        }}
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.rightdiv}>
            <div className={styles.prdctdesc}>
              <div className={styles.prdctname124}>
                <span className={styles.prdctname}>{data?.productName}</span>
                <div
                  style={{ display: innerWidth <= 900 ? "none" : "" }}
                  className={styles.wishlistandHiredvendor}
                >
                  {isWishlist ? (
                    <button
                      className={styles.HiredVendorbtns}
                      onClick={async () => {
                        if (globleuser) {
                          deleteWishList(wishList._id);
                          setIsWishList(false);
                          setWishList("");
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
                      <img
                        src={`${S3PROXY}/public/images/webp/heart (1).webp`}
                        alt=""
                      />
                    </button>
                  ) : (
                    <button
                      className={styles.HiredVendorbtns}
                      onClick={async () => {
                        if (globleuser) {
                          const body = {
                            product: {
                              productId: data?._id,
                              name: data?.name,
                              price: data.price,
                              type: "Product",
                              bannerImage: data?.mainImage,
                              size: size,
                              exclusive: data?.popular,
                              category: data?.category,
                              subCategory: data?.subCategory,
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

                            result = addWishList(body);
                            const res = await result;

                            setIsWishList(true);
                            setWishList(res.data?.data);
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
                      <img
                        src={`${S3PROXY}/public/images/webp/heart.png`}
                        alt=""
                      />
                    </button>
                  )}
                </div>
              </div>
              <span className={styles.prdctname}>{data?.name}</span>
              <article className={styles.rate}>
                <Rating
                  rating={
                    data?.avgRating ? Number(data?.avgRating).toFixed(1) : 0
                  }
                ></Rating>
                <span style={{ fontSize: "14px" }}>
                  ({data?.avgRatingTotalRates} Reviews)
                </span>
              </article>
              <div className={styles.loc}>
                <img src={`${S3PROXY}/public/Detail/loc.png`} alt="" />
                <span>{data?.city}</span>
              </div>

              <div className={styles.prdctMain}>
                <span className={styles.prdctprice}>₹{data?.price}</span>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    height: "52px",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "end",
                  }}
                >
                  <a
                    href={"https://www.instagram.com/wedfield_decor/"}
                    target="_blank"
                  >
                    <img
                      src={`${S3PROXY}/public/icons/instagram.png`}
                      height={25}
                      width={25}
                    ></img>
                  </a>

                  <a
                    href={
                      "https://www.facebook.com/profile.php?id=61562708915544"
                    }
                    target="_blank"
                  >
                    <img
                      src={`${S3PROXY}/public/icons/facebook.png`}
                      height={25}
                      width={25}
                    ></img>
                  </a>
                  <a
                    href={
                      "https://www.youtube.com/playlist?list=PLoH-5JAhl1QJsVfUvUn_U95AXYHSxxbUp"
                    }
                    target="_blank"
                  >
                    <img
                      src={`${S3PROXY}/public/icons/youtube.png`}
                      height={25}
                      width={25}
                    ></img>
                  </a>
                  <a
                    href={"https://in.pinterest.com/wedfielddecor/"}
                    target="_blank"
                  >
                    <img
                      src={`${S3PROXY}/public/icons/pinterest.png`}
                      height={25}
                      width={25}
                    ></img>
                  </a>
                  <a href={`https://wa.me/919910960713`} target="_blank">
                    {/* <FaWhatsapp height={"25px"} width={"25px"} /> */}
                    <FontAwesomeIcon
                      color="green"
                      icon="fa-brands fa-whatsapp"
                      style={{
                        height: "25px",
                        width: "25px",
                      }}
                    />
                  </a>
                  <a href={`tel:919910960713`} target="_blank">
                    <FontAwesomeIcon
                      color="#b6255a"
                      icon="fa-solid fa-phone"
                      style={{
                        height: "25px",
                        width: "25px",
                      }}
                    ></FontAwesomeIcon>
                  </a>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  margin: "20px 0px",
                  alignItems: "center",
                  gap: "10px",
                  flexDirection: innerWidth > 400 ? "row" : "column",
                }}
              >
                <button
                  style={{
                    fontSize: "12px",
                    alignSelf: innerWidth > 900 ? "end" : "center",
                  }}
                  className={styles.buyNow}
                  onClick={async () => {
                    const userdata = JSON.parse(
                      localStorage.getItem("wedfield")
                    )?.data;

                    const config = {
                      headers: {
                        authorization: JSON.parse(
                          localStorage.getItem("wedfield")
                        )?.data?.token,
                      },
                    };

                    const body = {
                      initiatorId: userdata?._id,
                      prospectName: userdata?.name,
                      prospectEmail: userdata?.email,
                      prospectId: userdata?._id,
                      prospectImage: userdata?.profile_pic,
                      prospectContact: userdata?.mobile,
                      vendorName: data?.vendorId?.name,
                      vendorId: alldata?.vendorId?._id,
                      vendorContact: alldata?.vendorId?.contactPhone,
                      vendorType: "product",
                      vendorImage: alldata?.vendorId?.mainImage,
                      allowAccess: [],
                      State: "",
                      City: "",
                      IsWedcell: true,
                      Source: "Wedfield",
                      LastInteraction: moment().format("YYYY-MM-DD"),
                      NextInteraction: "",
                      Handler: "",
                      Status: "Active",
                      Executive: "",
                      Products: "",
                      Requirements: "",
                      Notes: "",
                    };
                    if (userdata) {
                      if (existingContact.length) {
                        const result = await getOneMesbyTwoIds(body);
                        router.push(
                          `/user-dashboard/Message?id=${result?.data[0]?._id}`
                        );
                      } else {
                        setShowContact(!showContact);
                        const result = await addContact(body);
                        if (result.status == 200) {
                          contactRefetch();
                          getContact();
                          socketRef.current.emit("initiateChat", {
                            id: alldata?.vendorId?._id,
                          });
                          const result = await getOneMesbyTwoIds(body);
                          router.push(
                            `/user-dashboard/Message?id=${result?.data[0]?._id}`
                          );
                        }
                      }
                    } else {
                      setOpenLoginModal(true);
                    }
                  }}
                >
                  <span>
                    <img
                      src={`${S3PROXY}/public/productDetailsAssets/call.png`}
                    ></img>
                  </span>
                  {"Book now"}
                </button>
                <button
                  style={{
                    fontSize: "12px",
                    alignSelf: innerWidth > 900 ? "end" : "center",
                  }}
                  className={styles.buyNow}
                  onClick={async () => {
                    const userdata = JSON.parse(
                      localStorage.getItem("wedfield")
                    )?.data;

                    const config = {
                      headers: {
                        authorization: JSON.parse(
                          localStorage.getItem("wedfield")
                        )?.data?.token,
                      },
                    };

                    const body = {
                      initiatorId: userdata?._id,
                      prospectName: userdata?.name,
                      prospectEmail: userdata?.email,
                      prospectId: userdata?._id,
                      prospectImage: userdata?.profile_pic,
                      prospectContact: userdata?.mobile,
                      vendorName: data?.vendorId?.name,
                      vendorId: alldata?.vendorId?._id,
                      vendorContact: alldata?.vendorId?.contactPhone,
                      vendorType: "product",
                      vendorImage: alldata?.vendorId?.mainImage,
                      allowAccess: [],
                      State: "",
                      City: "",
                      IsWedcell: true,
                      Source: "Wedfield",
                      LastInteraction: moment().format("YYYY-MM-DD"),
                      NextInteraction: "",
                      Handler: "",
                      Status: "Active",
                      Executive: "",
                      Products: "",
                      Requirements: "",
                      Notes: "",
                    };
                    if (userdata) {
                      if (existingContact.length) {
                        const result = await getOneMesbyTwoIds(body);
                        router.push(
                          `/user-dashboard/Message?id=${result?.data[0]?._id}`
                        );
                      } else {
                        setShowContact(!showContact);
                        const result = await addContact(body);
                        if (result.status == 200) {
                          contactRefetch();
                          getContact();
                          socketRef.current.emit("initiateChat", {
                            id: alldata?.vendorId?._id,
                          });
                          const result = await getOneMesbyTwoIds(body);
                          router.push(
                            `/user-dashboard/Message?id=${result?.data[0]?._id}`
                          );
                        }
                      }
                    } else {
                      setOpenLoginModal(true);
                    }
                  }}
                >
                  <span>
                    <img
                      src={`${S3PROXY}/public/productDetailsAssets/call.png`}
                    ></img>
                  </span>
                  {"Talk To Experts"}
                </button>
              </div>

              <div className={styles.varandsize}>
                <div className={styles.variant}>
                  <h5>Theme</h5>
                  <div className={styles.varcoro}>
                    {rv?.map((variant, key) => {
                      return (
                        <div
                          className={styles.varimgdiv}
                          onClick={() => {
                            router.push(
                              `/${variant?.name
                                .toLowerCase()
                                .replaceAll(" ", "-")}/${variant?._id}`
                            );
                          }}
                        >
                          <Image
                            height={0}
                            width={0}
                            src={`${S3PROXY}${variant?.mainImage}`}
                            alt=""
                          />
                          <span className={styles.varspan}>
                            {variant?.name.slice(0, 10)}
                            {variant?.name.length >= 10 && "..."}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={
          innerWidth > 900
            ? { display: "flex", marginBottom: "15px" }
            : { display: "none" }
        }
        className={styles.albumAndVid}
      >
        <article>
          <span
            style={
              activeTab === "albums"
                ? { borderBottom: "3px solid #b6255a", color: "#b6255a" }
                : {}
            }
            onClick={() => setActiveTab("albums")}
          >
            Albums
          </span>
          <span
            style={
              activeTab === "videos"
                ? { borderBottom: "3px solid #b6255a", color: "#b6255a" }
                : {}
            }
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </span>
        </article>
        <section>
          {activeTab == "albums" && data?.albums && (
            <Albums
              data={data?.albums}
              setSelectedAlbums={setSelectedAlbum}
              // setCurrentImage={setSelectedAlbum}
              // setOpen={setOpen}
              // setInitialSlide={setInitialSlide}
            />
            // <></>
          )}

          {activeTab == "videos" && data?.vidLinks && (
            <>
              <Video data={data?.vidLinks} />
            </>
          )}
        </section>
      </div>
      {innerWidth > 900 ? (
        <>
          <div className={styles.alldetails}>
            <div className={styles.fulldetails1}>
              <article className={styles.venueToglle}>
                {[
                  "Elements ",
                  "Terms & Conditions",
                  "About Decor",
                  "Reviews",
                ].map((val, key) => {
                  return (
                    <span
                      key={key}
                      style={{
                        height: "35px",
                        borderBottom:
                          venueHeaderToggle === val ? "3px solid #B6255A" : "",
                        color: venueHeaderToggle === val ? "#B6255A" : "",
                      }}
                      onClick={() => setvenueHeaderToggle(val)}
                    >
                      {val}
                    </span>
                  );
                })}
              </article>
              {venueHeaderToggle === "Elements " ? (
                <Slide
                  direction="right"
                  in={venueHeaderToggle === "Elements "}
                  mountOnEnter
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  unmountOnExit
                >
                  <div>
                    <div className={styles.prdctdetail}>
                      <div className={styles.fulldetails}>
                        <div
                          className={styles.leftsec}
                          style={{ width: "100%", border: "none" }}
                        >
                          <span
                            className={` ${styles.detailspan1}`}
                            style={{ width: "100%" }}
                          ></span>

                          {data?.plans && data?.plans?.length ? (
                            data?.plans?.map((items) => {
                              return (
                                <article>
                                  <span className={styles.cats}>
                                    {items.name}
                                  </span>
                                  <span
                                    className={styles.value}
                                    style={{ textAlign: "start" }}
                                  >
                                    {items.value}
                                  </span>
                                </article>
                              );
                            })
                          ) : (
                            <p
                              style={{
                                textAlign: "center",
                              }}
                            >
                              No Plans found
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Slide>
              ) : (
                <></>
              )}
              {venueHeaderToggle === "Terms & Conditions" ? (
                <Slide
                  direction="right"
                  in={venueHeaderToggle === "Terms & Conditions"}
                  mountOnEnter
                  unmountOnExit
                >
                  <div className={styles.fulldetails1}>
                    <div className={styles.leftsec1}>
                      <span className={` ${styles.detailspan1}`}>
                        Terms And Conditions
                      </span>
                      <span className={styles.manufacturername}>
                        {data?.termsandconditions}
                      </span>
                    </div>
                  </div>
                </Slide>
              ) : (
                <></>
              )}
              {venueHeaderToggle === "About Decor" ? (
                <Slide
                  direction="right"
                  in={venueHeaderToggle === "About Decor"}
                  mountOnEnter
                  unmountOnExit
                >
                  <div className={styles.fulldetails1}>
                    <div className={`${styles.leftsec1} `}>
                      <span className={` ${styles.detailspan1}`}></span>
                      <span className={styles.manufacturername}>
                        {data?.description}
                      </span>
                    </div>
                  </div>
                </Slide>
              ) : (
                <></>
              )}
              {venueHeaderToggle === "Reviews" ? (
                <Slide
                  direction="right"
                  in={venueHeaderToggle === "Reviews"}
                  mountOnEnter
                  unmountOnExit
                >
                  <div className={styles.review}>
                    <div style={{ width: "60%" }}>
                      {totalReview1 ? (
                        <div className="">
                          <div className={styles.mainReviewBox}>
                            {reviewData?.map((items) => {
                              return (
                                <Reviews
                                  item={items}
                                  totalReview={totalReview}
                                  setSubRev={setSubRev}
                                ></Reviews>
                              );
                            })}
                            <span
                              onClick={(e) => {
                                handleViewMore();
                              }}
                              className={styles.Viewbtn}
                              style={{
                                display: "flex",
                                paddingLeft: "0px",
                              }}
                            >
                              {totalReview?.remainingReviews
                                ? `${totalReview?.remainingReviews} Remaning `
                                : ""}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "grid",
                            placeItems: "center",
                            background: "white",
                            fontSize: "20px",
                          }}
                        >
                          Be The First One to Review!!
                        </span>
                      )}
                    </div>

                    <ReviewCard
                      pid={data?._id}
                      type={"item"}
                      oneReview={oneReview}
                      subRev={subRev}
                      subType={"Vendor"}
                      setUpdate={setUpdate}
                      setSubRev={setSubRev}
                    ></ReviewCard>
                  </div>
                </Slide>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {innerWidth <= 900 ? (
        <div className={styles.drops}>
          {[
            {
              name: "Plans And Packages",
              content: (
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div
                      className={styles.leftsec}
                      style={{ width: "100%", border: "none" }}
                    >
                      {data?.plans && data?.plans?.length ? (
                        data?.plans?.map((items) => {
                          return (
                            <article>
                              <span className={styles.cats}>{items.name}</span>
                              <span
                                className={styles.value}
                                style={{ textAlign: "start" }}
                              >
                                {items.value}
                              </span>
                            </article>
                          );
                        })
                      ) : (
                        <p
                          style={{
                            textAlign: "center",
                          }}
                        >
                          No Plans found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ),
            },

            {
              name: "T&C",
              content: (
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails1}>
                    <div className={styles.leftsec1}>
                      <span className={styles.manufacturername}>
                        {viewmoretac
                          ? data?.termsandconditions
                          : data?.termsandconditions?.substring(0, 55)}
                      </span>
                      {data?.termsandconditions?.length > 50 ? (
                        <span
                          style={{
                            textDecoration: "underline",
                            fontSize: "14px",
                            color: "#B6255A",
                            cursor: "pointer",
                            width: "95%",
                            display: "flex",
                            justifyContent: "end",
                          }}
                          onClick={() => setViewMoretac(!viewmoretac)}
                        >
                          {viewmoretac ? "Show Less" : "View More"}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              name: "About",
              content: (
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails1}>
                    <div className={`${styles.leftsec1} `}>
                      <span className={styles.manufacturername}>
                        {viewmoreav
                          ? data?.description
                          : data?.description?.substring(0, 50)}
                      </span>
                      {data?.description?.length > 50 ? (
                        <span
                          style={{
                            textDecoration: "underline",
                            fontSize: "14px",
                            color: "#B6255A",
                            cursor: "pointer",
                            width: "95%",
                            display: "flex",
                            justifyContent: "end",
                          }}
                          onClick={() => setViewMoreav(!viewmoreav)}
                        >
                          {viewmoreav ? "Show Less" : "View More"}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              ),
            },
          ].map((val, key) => {
            const name = val.name;
            return (
              <article>
                <span onClick={() => setDrop({ ...drop, [name]: !drop[name] })}>
                  {val.name}
                  <img
                    style={{ transform: drop[name] ? "rotate(90deg)" : "" }}
                    src={`${S3PROXY}/public/Detail/arr.png`}
                    alt=""
                  />
                </span>
                <hgroup style={{ height: drop[name] ? "auto" : "" }}>
                  {val.content}
                </hgroup>
              </article>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      {innerWidth <= 900 ? (
        <>
          {totalReview1 ? (
            <div className="">
              <div className={styles.mainReviewBox}>
                {reviewData?.map((items) => {
                  return (
                    <Reviews
                      item={items}
                      totalReview={totalReview}
                      setSubRev={setSubRev}
                    ></Reviews>
                  );
                })}
                <span
                  onClick={(e) => {
                    handleViewMore();
                  }}
                  className={styles.Viewbtn}
                  style={{
                    display: "flex",
                    paddingLeft: "0px",
                  }}
                >
                  {totalReview?.remainingReviews
                    ? `${totalReview?.remainingReviews} Remaning `
                    : ""}
                </span>
              </div>
            </div>
          ) : (
            <span
              style={{
                padding: "5px 20px",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              Be The First One to Review!!{" "}
              <span
                onClick={() => setOpenReview(true)}
                style={{ color: "#b6255a" }}
              >
                Write a Review
              </span>
            </span>
          )}
        </>
      ) : (
        <></>
      )}
      <p className={styles.vendortitle}>Similar Decors</p>
      <div
        style={{
          padding: "0px 20px",
          width: "100%",
          height: "100%",
          marginBottom: "20px",
          alignSelf: "center",
        }}
      >
        <Carousal
          slides={allSimilarProd}
          pushData={() => {
            setPage1(page1 + 1);
          }}
          RightArrow={
            <RightArrow1
              setPage={setPage}
              limit={limit}
              pushData={() => {
                setPage1(page1 + 1);
              }}
              page1={page1}
            />
          }
        >
          {allSimilarProd?.map((datas, key) => {
            return (
              <div
                className=""
                key={key}
                style={{
                  margin: "15px",
                  width: innerWidth > 900 ? "330px" : "250px",
                  height: "92%",
                }}
              >
                <DecoreCard data={datas} />
              </div>
            );
          })}
        </Carousal>
      </div>
    </div>
  );
};

export default DecoreDetail;
