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
} from "../../../redux/reducer/appEssentials";
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
} from "redux/Api/common.api";
import {
  useGetAllQualityQuery,
  useGetOneReviewQuery,
  useGetallReviewsQuery,
} from "redux/Api/reviews.api";
import { useGetAllProductQuery } from "redux/Api/common.api";
import Image from "next/image";
import Carousal from "Components/Landing Page/Carousel/Index";
import ShopNowCards from "Components/Cards/ShopNowCards";
import { Icon } from "@iconify/react";
import { io } from "socket.io-client";
import moment from "moment";
import { PROXY, S3PROXY } from "../../../config/index.js";
import ImageBackground from "Components/common/ImageBackground";
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
const ProductDetail1 = ({ alldata, givenSize, variantId }) => {
  const [venueHeaderToggle, setvenueHeaderToggle] = useState("Descriptions");

  const Rating = ({ rating }) => {
    const integerRating = Math.floor(rating);
    const notfinal = rating - integerRating;
    const final = notfinal >= 0.5 ? Math.ceil(rating) : integerRating;
    return (
      <div>
        {Array(final).fill(
          <img src={`${S3PROXY}/public/Card/star.png`} alt="" />
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
  const [selectedVariant, setSelectedVariant] = useState();
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  useEffect(() => {
    setData(alldata?.product);
    if (variantId && alldata?.product.variants.includes(variantId)) {
      setSelectedVariant(
        alldata.variants.find((item) => item._id === variantId)
      );
    }
  }, [alldata]);
  const [size, setSize] = useState("Small");
  useEffect(() => {
    if (selectedVariant?.psizes?.Small?.qauntity > 0) {
      setSize("Small");
    } else if (selectedVariant?.psizes?.Medium?.qauntity > 0) {
      setSize("Medium");
    } else if (selectedVariant?.psizes?.Large?.qauntity > 0) {
      setSize("Large");
    } else if (selectedVariant?.psizes["Extra Large"]?.qauntity > 0) {
      setSize("Extra Large");
    } else if (selectedVariant?.psizes?.XXL?.qauntity > 0) {
      setSize("XXL");
    } else if (selectedVariant?.psizes?.XXXL?.qauntity > 0) {
      setSize("XXXL");
    }
  }, [data, randommath]);
  useEffect(() => {
    if (givenSize) {
      setSize(givenSize);
    }
  }, []);
  const [activeTab, setActiveTab] = useState("videos");

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
              url = `https://img.youtube.com/vi/${id}/default.jpg`;
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
  // const { data: checkCart, refetch: checkCartrefetch } =
  //   useCheckCartQuery(skipToken);
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
  const { data: checkWihlist } = useCheckWishListQuery(selectedVariant?._id);
  useEffect(() => {
    const get = async () => {
      const res = {
        data: checkWihlist,
      };
      setIsWishList(res?.data?.success);
      res?.data?.success && setWishList(res?.data?.data[0]);
    };
    if (selectedVariant && globleuser) get();
  }, [data?.name, updated, randommath, selectedVariant]);

  const [page1, setPage1] = useState(1);
  const [limit, setLimit] = useState();
  const { data: venueData, refetch: venueRefetch } = useGetAllProductQuery({
    category: data?.category,
    subCategory: data?.subCategory,
    page: page1 + 1,
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
      vendorId: alldata?.product?.vendorId?._id,
    });
  const getContact = async () => {
    const result = getoneContact;
    setExistingContact(result ? result : []);
  };
  useEffect(() => {
    globleuser && getContact();
  }, [globleuser, getoneContact]);

  useEffect(() => {
    if (existingContact?.length) {
      setShowContact(true);
    }
  }, [existingContact]);
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
            className="RealwedImageContainer1234567890 albumBigSlider1234567890 albumBigSlider12345678910 albumBigSlider12345678902"
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
                      productId: selectedVariant?._id,
                      name: selectedVariant?.name,
                      price: selectedVariant?.psizes[size].priceExclusive
                        ? selectedVariant?.psizes[size].priceExclusive -
                          Math.floor(
                            (selectedVariant?.psizes[size].priceExclusive *
                              selectedVariant?.psizes[size].discount) /
                              100
                          )
                        : 0,
                      type: "Product",
                      bannerImage: selectedVariant?.mainImages,
                      size: size,
                      exclusive: selectedVariant?.popular,
                      category: selectedVariant?.category,
                      subCategory: selectedVariant?.subCategory,
                      link: `/products/${selectedVariant?.name
                        .toLowerCase()
                        .replaceAll(" ", "-")}/${selectedVariant?._id}`,
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
        <div
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <div className={styles.leftdiv}>
            <div
              className={`${styles.imgcontainer} VenueImageContainer1234567892`}
            >
              <div className={`${styles.firstDiv}`}>
                {selectedVariant?.images?.map((data, key) => {
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
                        objectFit="contain"
                      />
                    </div>
                  );
                })}
                {selectedVariant?.videos?.map((item, index) => {
                  return (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        // height: "600px",
                        position: "relative",
                      }}
                      onClick={() => {
                        slider.current.slickGoTo(
                          selectedVariant?.images.length + index
                        );
                      }}
                    >
                      <PlayCircleFilledIcon
                        fontSize="large"
                        style={{
                          position: "absolute",
                          top: "35%",
                          left: "35%",
                        }}
                      ></PlayCircleFilledIcon>
                      <ReactPlayer
                        className={styles.cardInnimg}
                        url={`${S3PROXY}${item}`}
                        width={"100%"}
                        height={"auto"}
                      ></ReactPlayer>
                    </div>
                  );
                })}
                {selectedVariant?.vidlink?.map((items) => {
                  let url;
                  const id = extractYouTubeId(items);
                  if (id) {
                    url = `https://img.youtube.com/vi/${id}/default.jpg`;
                  } else {
                    url = `${S3PROXY}/public/Layout/logo.svg`;
                  }
                  return (
                    <a href={items} target="_blank">
                      <div
                        className={styles.imgListCardforAlbum}
                        onClick={() => {
                          slider.current.slickGoTo(
                            selectedVariant?.images.length +
                              selectedVariant?.videos.length +
                              index
                          );
                        }}
                      >
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
                      </div>
                    </a>
                  );
                })}
              </div>
              <Slider {...settings} ref={slider}>
                {selectedVariant?.images?.map((item, index) => {
                  return (
                    <ImageBackground
                      image={`${item}`}
                      className={styles.imageBackground}
                    >
                      <img
                        src={`${S3PROXY}${item}`}
                        alt=""
                        onClick={() => {
                          setInitialSlide(index);
                          setSelectedImage([...selectedVariant?.images]);
                          setOpenImage(true);
                        }}
                      />
                    </ImageBackground>
                  );
                })}
                {selectedVariant?.videos?.map((item, index) => {
                  return (
                    <div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          height: "500px",
                        }}
                      >
                        <ReactPlayer
                          className={styles.reactPlayer}
                          url={`${S3PROXY}${item}`}
                          controls
                          width={"100%"}
                          height={"auto"}
                        ></ReactPlayer>
                      </div>
                    </div>
                  );
                })}{" "}
                {selectedVariant?.vidlink?.map((item, index) => {
                  return (
                    <div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          height: "500px",
                        }}
                      >
                        <ReactPlayer
                          className={styles.reactPlayer}
                          url={item}
                          controls
                          width={"100%"}
                          height={"auto"}
                        ></ReactPlayer>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
            {/* <div className={styles.albumAndVid}>
              <article>
                <span
                  style={
                    activeTab === "videos"
                      ? { borderBottom: "3px solid #b6255a" }
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
                    setCurrentImage={setCurrentImage}
                    setOpen={setOpen}
                    setSelectedAlbums={setSelectedAlbums}
                    setInitialSlide={setInitialSlide}
                  />
                  // <></>
                )}

                {activeTab == "videos" && (
                  <>
                    <Video data={selectedVariant?.vidLinks} />
                  </>
                )}
              </section>
            </div> */}
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
                              productId: selectedVariant?._id,
                              name: selectedVariant?.name,
                              price: selectedVariant?.psizes[size]
                                .priceExclusive
                                ? selectedVariant?.psizes[size].priceExclusive -
                                  Math.floor(
                                    (selectedVariant?.psizes[size]
                                      .priceExclusive *
                                      selectedVariant?.psizes[size].discount) /
                                      100
                                  )
                                : 0,
                              type: "Product",
                              bannerImage: selectedVariant?.mainImages,
                              size: size,
                              exclusive: selectedVariant?.popular,
                              category: selectedVariant?.category,
                              subCategory: selectedVariant?.subCategory,
                              link: `/products/${selectedVariant?.name
                                .toLowerCase()
                                .replaceAll(" ", "-")}/${selectedVariant?._id}`,
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
              <span className={styles.prdctname} style={{ fontSize: "16px" }}>
                {selectedVariant?.name}
              </span>
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
              {/* <div className={styles.loc}>
                <img src={`${S3PROXY}/public/Detail/loc.png`} alt="" />
                <span>{data?.address}</span>
              </div> */}
              {selectedVariant?.psizes[size]?.qauntity < 5 ? (
                <span
                  style={{
                    fontSize: "14px",
                    color: "red",
                    marginTop: "10px",
                    marginBottom: "-20px",
                    fontWeight: "500",
                  }}
                >
                  Hurry! Only {selectedVariant?.psizes[size]?.qauntity} left
                </span>
              ) : (
                <></>
              )}
              <div style={{ display: "flex", gap: "2%" }}>
                {selectedVariant?.psizes[size]?.discount !== 0 ? (
                  <span
                    className={styles.prdctprice}
                    style={{ fontWeight: "300" }}
                  >
                    -{selectedVariant?.psizes[size]?.discount}%
                  </span>
                ) : (
                  <></>
                )}
                <span className={styles.prdctprice}>
                  ₹
                  {selectedVariant?.psizes[size]?.priceExclusive -
                    Math.floor(
                      (selectedVariant?.psizes[size]?.priceExclusive *
                        selectedVariant?.psizes[size]?.discount) /
                        100
                    )}
                </span>
              </div>
              {selectedVariant?.psizes[size]?.discount !== 0 ? (
                <span
                  className={styles.prdctprice}
                  style={{
                    fontSize: "14px",
                    fontWeight: "200",
                    marginTop: "-10px",
                  }}
                >
                  MRP:{" "}
                  <span style={{ textDecoration: "line-through" }}>
                    ₹{selectedVariant?.psizes[size]?.priceExclusive}
                  </span>
                </span>
              ) : (
                <></>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: innerWidth > 900 ? "space-between" : "start",
                  margin: "10px 0px",
                  alignItems: "center",
                  gap: "10px",
                  flexDirection: innerWidth > 900 ? "row" : "column",
                }}
              >
                {showContact ? (
                  <div
                    className={styles.showingcontact}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "15px",
                      width: innerWidth > 900 ? "" : "100%",
                      // marginBottom: '-10px',
                      fontWeight: "500",
                      wordSpacing: "3px",
                    }}
                  >
                    <span>
                      Primary Mo :{" "}
                      <span
                        onClick={() =>
                          window.open(
                            `tel://+${alldata?.product?.vendorId?.mobile}`
                          )
                        }
                      >
                        {alldata?.product?.vendorId?.mobile}
                      </span>
                    </span>
                    {data?.secondNumbers?.length ? (
                      <div style={{ display: "flex" }}>
                        <span style={{ marginRight: "6px" }}>Second Mo : </span>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {data?.secondNumbers?.map((number) => {
                            return <span> {number}</span>;
                          })}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <span>
                      Email :{" "}
                      <span
                        onClick={() =>
                          window.open(
                            `mailto:${alldata?.product?.vendorId?.email}`
                          )
                        }
                      >
                        {alldata?.product?.vendorId?.email}
                      </span>{" "}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
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
                    // [
                    //   {
                    //     name: 'Priyanshu',
                    //     company_name: 'Sonia Khatri',
                    //     mobile: '919354791029',
                    //     email: 'contact@soniakhatri.com',
                    //     company_address:
                    //       '415, designer street, Shahpur Jat, New Delhi 110049',
                    //     password: '',
                    //     cover_pic: [
                    //       `${S3PROXY}/1713002398338_Untitled%20Session22794.jpg`,
                    //     ],
                    //     profile_pic:
                    //       `${S3PROXY}/1713002398347_03%20%281%29.jpg`,
                    //     is_approved: true,
                    //     is_delete: false,
                    //     is_email_verified: false,
                    //     is_mobile_verified: true,
                    //     _id: '66165901235e68415a74accf',
                    //     warehouse_address: [
                    //       {
                    //         pincode: '110049',
                    //         city: 'shahpurjat',
                    //         state: 'New Delhi',
                    //         country: 'India',
                    //         address1: '415, designer street',
                    //         address2: '',
                    //         landmark: '',
                    //         _id: '661a579e591381647cd195cc',
                    //       },
                    //     ],
                    //     createdAt: '2024-04-10T09:16:49.222Z',
                    //     updatedAt: '2024-04-13T09:59:58.491Z',
                    //     __v: 0,
                    //     id: '66165901235e68415a74accf',
                    //   },
                    // ];
                    const body = {
                      initiatorId: userdata?._id,
                      prospectName: userdata?.name,
                      prospectEmail: userdata?.email,
                      prospectId: userdata?._id,
                      prospectImage: userdata?.profile_pic,
                      prospectContact: userdata?.mobile,
                      vendorName: alldata?.product?.vendorId?.name,
                      vendorId: alldata?.product?.vendorId?._id,
                      vendorContact: alldata?.product?.vendorId?.mobile,
                      vendorType: "product",
                      vendorImage: alldata?.product?.vendorId?.profile_pic,
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
                            id: alldata?.product?.vendorId?._id,
                          });
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
                  {existingContact.length ? "Chat" : "View Number"}
                </button>
              </div>

              <div className={styles.varandsize}>
                <div className={styles.variant}>
                  <h5>Variants</h5>
                  <div className={styles.varcoro}>
                    {alldata?.variants?.map((variant, key) => {
                      return (
                        <div
                          className={styles.varimgdiv}
                          style={{
                            border:
                              variant?._id === selectedVariant?._id
                                ? "3px solid rgb(182, 37, 90)"
                                : "none",
                            // boxShadow:
                            //   variant?._id === selectedVariant?._id
                            //     ? '1px 1px 5px 5px rgba(182, 37, 90, 0.308)'
                            //     : 'none',
                          }}
                          onClick={() => {
                            setSelectedVariant(alldata.variants[key]);
                            setRandommath(Math.random());
                          }}
                        >
                          <Image
                            height={0}
                            width={0}
                            src={`${S3PROXY}${variant?.mainImages}`}
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

                <div className={styles.size}>
                  <h5>Size</h5>
                  <div className={styles.sizeBtn}>
                    {Object.entries(
                      selectedVariant?.psizes ? selectedVariant?.psizes : {}
                    ).map((key, value) => {
                      return key[1].qauntity !== 0 ? (
                        <button
                          style={
                            key[0] === size
                              ? {
                                  border: "0.81px solid rgb(182, 37, 90)",
                                  backgroundColor: "#B6255A",
                                  color: "white",
                                }
                              : {}
                          }
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
                        </button>
                      ) : (
                        <></>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {innerWidth <= 900 ? (
        <div className={styles.drops}>
          {[
            {
              name: "Details",
              content: (
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div className={styles.leftsec}>
                      <article>
                        <span className={styles.cats}>Category</span>
                        <span className={styles.value}>{data?.category}</span>
                      </article>

                      <article>
                        <span className={styles.cats}>Quantity</span>
                        <span className={styles.value}>
                          {selectedVariant?.psizes[size].qauntity}
                        </span>
                      </article>
                      <article>
                        <span className={styles.cats}>Fabric</span>
                        <span className={styles.value}>
                          {selectedVariant?.fabric}
                        </span>
                      </article>
                    </div>
                    <div
                      className={`${styles.rightsec} productRightsec1234567890`}
                    >
                      <article>
                        <span className={styles.cats}>Sleeve Lenght</span>
                        <span className={styles.value}>
                          {selectedVariant?.sleeveLength}
                        </span>
                      </article>{" "}
                      <article>
                        <span className={styles.cats}>Garment type</span>
                        <span className={styles.value}>
                          {data?.garmentType}
                        </span>
                      </article>
                      <article>
                        <span className={styles.cats}>Rating</span>
                        <span className={styles.value}>
                          <StarRatings
                            rating={data?.avgRating}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name="rating"
                            starDimension="17px"
                            starSpacing="2px"
                          />
                        </span>
                      </article>
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
                    <div className={styles.leftsec1}>
                      <span className={styles.manufacturerDetailspan}>
                        Manufacturing Details
                      </span>
                      <span className={styles.manufacturername}>
                        {/* Manufacture by {data?.manufacturingDetails} */}
                        {viewmoretac
                          ? data?.manufacturingDetails
                          : data?.manufacturingDetails?.substring(0, 200)}
                        {data?.manufacturingDetails?.length > 200 ? (
                          <span
                            style={{
                              marginLeft: "10px",
                              textDecoration: "underline",
                              fontSize: "14px",
                              color: "#B6255A",
                              cursor: "pointer",
                            }}
                            onClick={() => setViewMoretac(!viewmoretac)}
                          >
                            {viewmoretac ? "Show Less" : "View More"}
                          </span>
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>

                    <div
                      className={`${styles.rightsec1} productRightsec1234567890`}
                    >
                      <span className={styles.manufacturerDetailspan}>
                        About Product
                      </span>
                      <span className={styles.manufacturername}>
                        {viewmoreav
                          ? data?.descrition
                          : data?.descrition?.substring(0, 200)}
                        {data?.descrition?.length > 200 ? (
                          <span
                            style={{
                              marginLeft: "10px",
                              textDecoration: "underline",
                              fontSize: "14px",
                              color: "#B6255A",
                              cursor: "pointer",
                            }}
                            onClick={() => setViewMoreav(!viewmoreav)}
                          >
                            {viewmoreav ? "Show Less" : "View More"}
                          </span>
                        ) : (
                          <></>
                        )}
                      </span>
                      <ToastContainer
                        position="top-right"
                        autoClose={2000}
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
      {innerWidth > 900 ? (
        <>
          <div className={styles.alldetails}>
            <div className={styles.fulldetails1}>
              <article className={styles.venueToglle}>
                {["Descriptions", "About", "Reviews"].map((val, key) => {
                  return (
                    <span
                      style={{
                        height: "35px",
                        borderBottom:
                          venueHeaderToggle === val ? "3px solid #B6255A" : "",
                        color: venueHeaderToggle === val ? " #B6255A" : "",
                      }}
                      onClick={() => setvenueHeaderToggle(val)}
                    >
                      {val}
                    </span>
                  );
                })}
              </article>
              {venueHeaderToggle === "Descriptions" ? (
                <Slide
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  direction="right"
                  in={venueHeaderToggle === "Descriptions"}
                  mountOnEnter
                  unmountOnExit
                >
                  <div>
                    <div className={styles.prdctdetail}>
                      <div className={styles.fulldetails}>
                        <div className={styles.leftsec}>
                          <article>
                            <span className={styles.cats}>Category</span>
                            <span className={styles.value}>
                              {data?.category}
                            </span>
                          </article>

                          <article>
                            <span className={styles.cats}>Quantity</span>
                            <span className={styles.value}>
                              {selectedVariant?.psizes[size].qauntity}
                            </span>
                          </article>
                          <article>
                            <span className={styles.cats}>Fabric</span>
                            <span className={styles.value}>
                              {selectedVariant?.fabric}
                            </span>
                          </article>
                        </div>
                        <div
                          className={`${styles.rightsec} productRightsec1234567890`}
                        >
                          <article>
                            <span className={styles.cats}>Sleeve Lenght</span>
                            <span className={styles.value}>
                              {selectedVariant?.sleeveLength}
                            </span>
                          </article>{" "}
                          <article>
                            <span className={styles.cats}>Garment type</span>
                            <span className={styles.value}>
                              {data?.garmentType}
                            </span>
                          </article>
                          <article>
                            <span className={styles.cats}>Rating</span>
                            <span className={styles.value}>
                              <StarRatings
                                rating={data?.avgRating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name="rating"
                                starDimension="17px"
                                starSpacing="2px"
                              />
                            </span>
                          </article>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slide>
              ) : (
                <></>
              )}
              {venueHeaderToggle === "About" ? (
                <Slide
                  direction="right"
                  in={venueHeaderToggle === "About"}
                  mountOnEnter
                  unmountOnExit
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ alignSelf: "center" }}
                    className={styles.prdctdetail}
                  >
                    <div className={styles.fulldetails1}>
                      <div className={styles.leftsec1}>
                        <span className={styles.manufacturerDetailspan}>
                          Manufacturing Details
                        </span>
                        <span className={styles.manufacturername}>
                          {/* Manufacture by {data?.manufacturingDetails} */}
                          {data?.manufacturingDetails}
                        </span>
                      </div>

                      <div
                        className={`${styles.rightsec1} productRightsec1234567890`}
                      >
                        <span className={styles.manufacturerDetailspan}>
                          About Product
                        </span>
                        <span className={styles.manufacturername}>
                          {data?.descrition}
                        </span>
                        <ToastContainer
                          position="top-right"
                          autoClose={2000}
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
                      type={"product"}
                      oneReview={oneReview}
                      subRev={subRev}
                      setUpdate={setUpdate}
                      // subType={'product'}
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
      <p className={styles.vendortitle}>Similar Products</p>
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
                style={{
                  margin: "15px",
                  width: innerWidth > 900 ? "330px" : "250px",
                  height: "92%",
                }}
              >
                <ShopNowCards data={datas} />
              </div>
            );
          })}
        </Carousal>
      </div>
    </div>
  );
};

export default ProductDetail1;
