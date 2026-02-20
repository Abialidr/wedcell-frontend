import React, { useState, useContext, useEffect } from "react";
import styles from "./products.module.css";
import StarRatings from "react-star-ratings";
import { AiFillStar } from "react-icons/ai";
import useWindowSize from "@rooks/use-window-size";
import Styles from "../../../styles/Vendors.module.scss";
import Slider from "react-slick";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

import { Button, CircularProgress, Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Reviews from "../../writeReviewCard/Reviews";
import ReviewCard from "../../writeReviewCard/ReviewCard";
import ShopNowCard from "../../newCard/ShopNowCard/ShopNowCard";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import ProgressBar from "@ramonak/react-progress-bar";

import {
  loginRoute,
  selectLocation,
  selectUser,
} from "../../../redux/reducer/appEssentials";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import {
  useAddCartMutation,
  useCheckCartQuery,
  useCheckWishListQuery,
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
import { S3PROXY } from "../../../config";
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
  const videos = [
    "https://www.youtube.com/watch?v=L93D0hBtY6A",
    "https://www.youtube.com/watch?v=zUnRdu4mIzo",
  ];
  const Video = ({ data }) => {
    return (
      <div
        className={`${styles.imgListContainerforAlbum} VENUEdETAILS1234567890`}
      >
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {data?.map((items) => {
            return (
              <div className={styles.imgListCardforAlbum} onClick={() => {}}>
                {/* <
                src={`${S3PROXY}${items.value[0]}`}
                onClick={(e) => {
                  setCurrentImage(e.target.src);
                }}
                alt=""
              /> */}
                <ReactPlayer
                  url={items}
                  controls={true}
                  style={{ objectFit: "cover" }}
                  width={"100%"}
                  height={"100%"}
                />
                <span>{items.name}</span>
              </div>
            );
          })}
        </ScrollMenu>
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
  const [page, setPage] = useState(1);

  const { data: onlyoneReview } = useGetOneReviewQuery({
    userid: globleuser?.data?._id,
    productid: id,
  });
  useEffect(() => {
    const getOneReview = async () => {
      const res = onlyoneReview;
      setOneReview(res?.data[0]);
    };
    getOneReview();
  }, [subRev]);

  const { data: allReview, refetch: reviewRefetch } = useGetallReviewsQuery({
    productid: id,
    userid: globleuser?.data?._id,
    page: page + 1,
  });

  useEffect(() => {
    reviewRefetch();
    const getData = async () => {
      const result = allReview;
      if (result?.data) setReviewData([...reviewData, ...result?.data]);
      setTotalReview(result);
    };
    getData();
  }, [page]);
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
  // const [location, setLocation] = useState(null);
  const location = useSelector(selectLocation);
  const { data: venueData, refetch: venueRefetch } = useGetAllProductQuery({
    // city: location,
    category: data?.category,
    subCategory: data?.subCategory,
    page: page1 + 1,
    // isUser: globleuser ? globleuser?.data?._id : undefined,
  });
  useEffect(() => {
    if (venueData) {
      let newData = allSimilarProd.concat(venueData?.data);
      setAllSimilarProd(newData);
    }
  }, [data?._id, location, venueData]);
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

  return (
    <div className={styles.mainbody}>
      <Modal
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
      <span className={styles.prdctpath}>
        <a href={`/products?category=${data?.category}`}>
          All Products / {data?.category} / {data?.productName}
        </a>
      </span>
      <div className={styles.topdiv}>
        <div>
          <div className={styles.leftdiv}>
            <div
              className={`${styles.imgcontainer} VenueImageContainer1234567890`}
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
                      />
                    </div>
                  );
                })}
                {selectedVariant?.videos?.map((item, index) => {
                  return (
                    <div
                      key={index}
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
                        url={item}
                        width={"100%"}
                        height={"auto"}
                      ></ReactPlayer>
                    </div>
                  );
                })}
              </div>
              <Slider {...settings} ref={slider}>
                {selectedVariant?.images?.map((item, index) => {
                  return (
                    <div>
                      <img
                        src={`${S3PROXY}${item}`}
                        alt=""
                        onClick={() => {
                          setInitialSlide(index);
                          setSelectedImage([...selectedVariant?.images]);
                          setOpenImage(true);
                        }}
                      />
                    </div>
                  );
                })}
                {selectedVariant?.videos?.map((item, index) => {
                  return (
                    <div key={index}>
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
            <div className="gallery-container pb-3 bg-white box-shadow w-100">
              <div className="tabs-container d-flex align-items-center">
                <div
                  className={Styles.tab}
                  style={{
                    backgroundColor:
                      activeTab === "videos" ? "#fff" : "#f8f8f8",
                    color:
                      activeTab === "videos" ? "hsla(0, 70%, 24%, 1)" : "#000",
                  }}
                  onClick={() => setActiveTab("videos")}
                >
                  <h5 className="fw-bold">Videos</h5>
                </div>
              </div>
              <div className="active-comp px-4 mt-4">
                {activeTab == "videos" && (
                  <>
                    <Video data={selectedVariant?.vidLinks} />
                  </>
                )}
              </div>
            </div>
            {innerWidth > 1050 && (
              <>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  {totalReview1 ? (
                    <div className="box-shadow bg-white py-3">
                      <h4 className="fw-bold text-center">
                        {totalReview1} Reviews
                      </h4>
                      <div className="review-container d-flex flex-wrap justify-content-evenly">
                        <div className="rating-container d-flex flex-column  justify-content-center">
                          <span className={Styles.overall_rating}>
                            <span className="me-2 fw-bold">
                              {data?.avgRating === 0
                                ? "0"
                                : Number(data?.avgRating).toFixed(1)}
                            </span>
                            <span className={Styles.overall_rating_icon}>
                              <AiFillStar />
                            </span>
                          </span>
                        </div>

                        <div className="ratings-stats  d-flex flex-column align-items-center ">
                          <div className="rating-wrapper d-flex align-items-center mb-1">
                            <span
                              className={`text-gray ${Styles.rating_service}`}
                            >
                              Value For Money
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.valueForMoney / totalReview1) * 100
                              }
                              maxCompleted={100}
                              width="150px"
                              baseBgColor="#e1e1e1"
                              bgColor="#b6255a"
                              height="16px"
                              labelSize="12px"
                              borderRadius="5px"
                            />
                          </div>

                          <div className="rating-wrapper d-flex align-items-center mb-1">
                            <span
                              className={`text-gray ${Styles.rating_service}`}
                            >
                              Fabric Quality
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.fabricQuality / totalReview1) * 100
                              }
                              maxCompleted={100}
                              width="150px"
                              baseBgColor="#e1e1e1"
                              bgColor="#b6255a"
                              height="16px"
                              labelSize="12px"
                              borderRadius="5px"
                            />
                          </div>

                          <div className="rating-wrapper d-flex align-items-center mb-1">
                            <span
                              className={`text-gray ${Styles.rating_service}`}
                            >
                              Comfort
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.comfort / totalReview1) * 100
                              }
                              maxCompleted={100}
                              width="150px"
                              baseBgColor="#e1e1e1"
                              bgColor="#b6255a"
                              height="16px"
                              labelSize="12px"
                              borderRadius="5px"
                            />
                          </div>

                          <div className="rating-wrapper d-flex align-items-center mb-1">
                            <span
                              className={`text-gray ${Styles.rating_service}`}
                            >
                              Cloth Style
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.clothStyle / totalReview1) * 100
                              }
                              maxCompleted={100}
                              width="150px"
                              baseBgColor="#e1e1e1"
                              bgColor="#b6255a"
                              height="16px"
                              labelSize="12px"
                              borderRadius="5px"
                            />
                          </div>

                          <div className="rating-wrapper d-flex align-items-center mb-1">
                            <span
                              className={`text-gray ${Styles.rating_service}`}
                            >
                              Colors
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.colors / totalReview1) * 100
                              }
                              maxCompleted={100}
                              width="150px"
                              baseBgColor="#e1e1e1"
                              bgColor="#b6255a"
                              height="16px"
                              labelSize="12px"
                              borderRadius="5px"
                            />
                          </div>
                        </div>
                      </div>
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
                    <></>
                  )}
                </div>

                <ReviewCard
                  pid={data?._id}
                  type={"product"}
                  oneReview={oneReview}
                  subRev={subRev}
                  setSubRev={setSubRev}
                ></ReviewCard>
              </>
            )}
          </div>
        </div>
        <div>
          <div className={styles.rightdiv}>
            <div className={styles.prdctdesc}>
              <span className={styles.prdctname}>{data?.productName}</span>
              <span className={styles.prdctname} style={{ fontSize: "16px" }}>
                {selectedVariant?.name}
              </span>
              <div className={styles.rating}>
                <div className={styles.starate}>
                  <span>
                    {data?.avgRating === 0
                      ? "0"
                      : Number(data?.avgRating).toFixed(1)}
                  </span>
                  <img
                    src={`${S3PROXY}/public/productDetailsAssets/webp/star_filled.webp`}
                    alt=""
                  />
                </div>
                <div className={styles.peoplerated}>
                  <span>{data?.avgRatingTotalRates} Ratings</span>
                </div>
              </div>
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

              <div className={styles.btndiv}>
                <button
                  // disabled={addedCart}
                  className={styles.addTocart}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    if (globleuser) {
                      setCountCart(1);
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
                  {countcart > 0 ? (
                    <div style={{ display: "flex", width: "100%" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCountCart(countcart - 1);
                        }}
                        style={{
                          border: "none",
                          background: "none",
                          color: "#b6255a",
                          width: "100%",
                        }}
                      >
                        -
                      </button>
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          color: "#b6255a",
                          width: "100%",
                        }}
                        onClick={async (e) => {
                          e.stopPropagation();
                          const config = {
                            headers: {
                              authorization: JSON.parse(
                                localStorage.getItem("wedfield")
                              )?.data?.token,
                            },
                          };

                          try {
                            let result;
                            if (addedCart) {
                              const body = {
                                _id: cartID,
                                quantity: countcart,
                              };
                              result = await updateCart(body);
                            } else {
                              const body = {
                                variantId: selectedVariant?._id,
                                quantity: countcart,
                                name: selectedVariant?.name,
                                price:
                                  selectedVariant?.psizes[size]
                                    ?.priceExclusive -
                                  Math.floor(
                                    (selectedVariant?.psizes[size]
                                      ?.priceExclusive *
                                      selectedVariant?.psizes[size]?.discount) /
                                      100
                                  ),
                                bannerImage: selectedVariant?.mainImages,
                                size: size,
                              };
                              result = addCart(body);
                            }
                            toast.promise(result, {
                              pending: {
                                render() {
                                  return (
                                    <h5 style={{ marginTop: "5px" }}>
                                      loading
                                    </h5>
                                  );
                                },
                                icon: () => <CircularProgress disableShrink />,
                              },
                              success: {
                                render({ data }) {
                                  return (
                                    <h5 style={{ marginTop: "5px" }}>
                                      {countcart} items{" "}
                                      {addedCart ? "Update" : "Added"} to Cart
                                    </h5>
                                  );
                                },
                                // other options
                                icon: () => <CheckCircleIcon />,
                              },
                              error: {
                                render({ data }) {
                                  // When the promise reject, data will contains the error
                                  return (
                                    <h5 style={{ marginTop: "5px" }}>Error</h5>
                                  );
                                },
                                icon: () => (
                                  <CircularProgress color="primary" />
                                ),
                              },
                            });
                            const res = await result;
                          } catch (e) {
                            console.error(
                              "🚀 ~ file: ProductDetail1.js:466 ~ onClick={ ~ e:",
                              e
                            );
                          }
                          setTimeout(() => {
                            router.push("/user-dashboard/cart");
                          }, 1999);
                        }}
                      >
                        {countcart}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCountCart(countcart + 1);
                        }}
                        disabled={countcart >= data?.quantity}
                        style={{
                          border: "none",
                          background: "none",
                          width: "100%",
                          color:
                            countcart >= data?.quantity ? "#ffffff" : "#b6255a",
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    "Add To Cart"
                  )}
                </button>

                <button
                  className={styles.buyNow}
                  onClick={() => {
                    router.push(
                      `/Order?itemId=${selectedVariant?._id}&size=${size}`
                    );
                  }}
                >
                  Buy Now
                </button>
                <button
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

                        result = addWishList(body);
                        const res = await result;

                        setIsWishList(true);
                        setWishList(res.data?.data);
                      } else {
                        deleteWishList(wishList._id);
                        setIsWishList(false);
                        setWishList("");
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
                  className={styles.addTocart}
                  style={{ fontSize: "14px" }}
                >
                  {!isWishlist ? "Add to" : "Delete From"} Wishlist
                </button>
              </div>
            </div>
            <div className={styles.prdctdetail}>
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
                          style={{
                            border:
                              key[0] === size
                                ? "2px solid rgb(182, 37, 90)"
                                : "",
                            width: "fit-content",
                          }}
                          onClick={() => {
                            setSize(key[0]);
                          }}
                        >
                          {key[0] === "Extra Large" ? "XL" : key[0]}
                        </button>
                      ) : (
                        <></>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.prdctdetail}>
              <span className={styles.detailspan}>Details</span>

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
                <div className={`${styles.rightsec} productRightsec1234567890`}>
                  <article>
                    <span className={styles.cats}>Sleeve Lenght</span>
                    <span className={styles.value}>
                      {selectedVariant?.sleeveLength}
                    </span>
                  </article>{" "}
                  <article>
                    <span className={styles.cats}>Garment type</span>
                    <span className={styles.value}>{data?.garmentType}</span>
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
            {innerWidth <= 1050 && (
              <>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <div className="bg-white py-3">
                    <h4 className="fw-bold text-center">Reviews</h4>
                    <div className="review-container d-flex flex-wrap justify-content-evenly">
                      <div className="rating-container d-flex flex-column  justify-content-center">
                        <span className={Styles.overall_rating}>
                          <span className="me-2 fw-bold">
                            {data?.avgRating === 0
                              ? "0"
                              : Number(data?.avgRating).toFixed(1)}
                          </span>
                          <span className={Styles.overall_rating_icon}>
                            <AiFillStar />
                          </span>
                        </span>
                      </div>

                      <div className="ratings-stats  d-flex flex-column align-items-center ">
                        <div className="rating-wrapper d-flex align-items-center mb-1">
                          <span
                            className={`text-gray ${Styles.rating_service}`}
                          >
                            Quality Service
                          </span>
                          <div className="stars-container d-flex align-items-center  justify-content-center ms-3">
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                          </div>
                          <span className="ms-2 fw-bold"> 3.0</span>
                        </div>

                        <div className="rating-wrapper d-flex align-items-center mb-1">
                          <span
                            className={`text-gray ${Styles.rating_service}`}
                          >
                            Facilities
                          </span>
                          <div className="stars-container d-flex align-items-center  justify-content-center ms-3">
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                          </div>
                          <span className="ms-2 fw-bold"> 3.0</span>
                        </div>

                        <div className="rating-wrapper d-flex align-items-center mb-1">
                          <span
                            className={`text-gray ${Styles.rating_service}`}
                          >
                            Staff Service
                          </span>
                          <div className="stars-container d-flex align-items-center  justify-content-center ms-3">
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                          </div>
                          <span className="ms-2 fw-bold"> 3.0</span>
                        </div>

                        <div className="rating-wrapper d-flex align-items-center mb-1">
                          <span
                            className={`text-gray ${Styles.rating_service}`}
                          >
                            Flexibility
                          </span>
                          <div className="stars-container d-flex align-items-center  justify-content-center ms-3">
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                          </div>
                          <span className="ms-2 fw-bold"> 3.0</span>
                        </div>

                        <div className="rating-wrapper d-flex align-items-center mb-1">
                          <span
                            className={`text-gray ${Styles.rating_service}`}
                          >
                            Value Of Money
                          </span>
                          <div className="stars-container d-flex align-items-center  justify-content-center ms-3">
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                            <span className={`text-gray fs-5 me-2`}>
                              <AiFillStar />
                            </span>
                          </div>
                          <span className="ms-2 fw-bold"> 3.0</span>
                        </div>
                      </div>
                    </div>
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
                </div>

                <ReviewCard
                  pid={data?._id}
                  type={"product"}
                  oneReview={oneReview}
                  subRev={subRev}
                  setSubRev={setSubRev}
                ></ReviewCard>
              </>
            )}
          </div>
        </div>
      </div>
      <p className={styles.vendortitle}>Similar Products</p>
      <div style={{ width: "100%", marginBottom: "50px" }}>
        <ScrollMenu
          LeftArrow={LeftArrow1}
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
                  width: "310px",
                  height: "92%",
                }}
              >
                <ShopNowCard data={datas} />
              </div>
            );
          })}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default ProductDetail1;
