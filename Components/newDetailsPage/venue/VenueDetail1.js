import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./venuedetails.module.css";
import { MdLocationPin } from "react-icons/md";
import Styles from "../../../styles/Vendors.module.scss";
import { useRouter } from "next/router";
import Slider from "react-slick";
import useWindowSize from "@rooks/use-window-size";
import ProgressBar from "@ramonak/react-progress-bar";
import DownloadIcon from "@mui/icons-material/Download";
import "react-toastify/dist/ReactToastify.css";
import { Button, ButtonGroup, Modal, styled } from "@mui/material";
import { Box } from "@mui/system";
import { AiFillStar } from "react-icons/ai";
import { io } from "socket.io-client";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CancelIcon from "@mui/icons-material/Cancel";
import { PROXY, S3PROXY } from "../../../config";
import ReactPlayer from "react-player";
import Reviews from "../../writeReviewCard/Reviews";
import ReviewCard from "../../writeReviewCard/ReviewCard";
import VenuesCard from "../../newCard/VenuesCard/VenuesCard";
import { useDispatch, useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import Slide from "@mui/material/Slide";
import {
  loginRoute,
  selectLocation,
  selectUser,
} from "../../../redux/reducer/appEssentials";
import { useGetAllVenueQuery } from "redux/Api/common.api";
import {
  useGetAllQualityQuery,
  useGetOneReviewQuery,
  useGetallReviewsQuery,
} from "redux/Api/reviews.api";
import {
  useCheckHiredVendorQuery,
  useDeleteHiredVendorMutation,
  useGetOneContactQuery,
  useAddHiredVendorMutation,
  useAddContactMutation,
  useGetOneMesbyTwoIdsMutation,
} from "redux/Api/chw.api";
import {
  useAddWishListMutation,
  useDeleteWishListMutation,
} from "redux/Api/common.api";
import Image from "next/image";
import moment from "moment";
import LoginModal from "Components/CustomerLogin/LoginModal";
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

const Albums = ({ data, setOpen, setSelectedAlbums, setInitialSlide }) => {
  return (
    <div
      className={`${styles.imgListContainerforAlbum} VENUEdETAILS1234567890`}
    >
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {data?.map((items) => {
          return (
            <div
              className={styles.imgListCardforAlbum}
              onClick={() => {
                setSelectedAlbums(items.value);
                setOpen(true);
                setInitialSlide(0);
              }}
            >
              {items.value[0] && (
                <Image
                  src={`${S3PROXY}${items.value[0]}`}
                  height={0}
                  width={0}
                  alt=""
                />
              )}
              <span>{items.name}</span>
            </div>
          );
        })}
      </ScrollMenu>
    </div>
  );
};
const Video = ({ data, setCurrentVideos, setOpen, setSelectedVideos }) => {
  return (
    <div
      className={`${styles.imgListContainerforAlbum} VENUEdETAILS1234567890`}
    >
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {data?.map((items) => {
          return (
            <div
              className={styles.imgListCardforAlbum}
              onClick={() => {
                setSelectedAlbums(items.value);
                setOpen(true);
              }}
            >
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
const ImageBackground = styled(Box)(({ theme, image }) => ({
  backgroundImage: `url(${S3PROXY}${image})`,
  display: "flex !important",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 10px",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  height: "100%",
  width: "100%",
  position: "relative",
}));
const VenueDetails1 = ({ data }) => {
  const [deleteWishList] = useDeleteWishListMutation();
  const [deleteHiredVendor] = useDeleteHiredVendorMutation();
  const [addWishList] = useAddWishListMutation();
  const [addHiredVendor] = useAddHiredVendorMutation();
  const [addContact] = useAddContactMutation();
  const [getOneMesbyTwoIds] = useGetOneMesbyTwoIdsMutation();
  const globleuser = useSelector(selectUser);
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  const [showContact, setShowContact] = useState(false);
  const [isWishlist, setIsWishList] = useState();
  const [wishList, setWishList] = useState({});
  useEffect(() => {
    setIsWishList(data?.wishlist ? data?.wishlist : false);
    setWishList({
      _id: data?.wishlistID ? data?.wishlistID : "",
    });
  }, [data?.wishlist]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { innerWidth: windowWidth } = useWindowSize();

  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(data?.mainImage);
  const [activeTab, setActiveTab] = useState("albums");
  const socketRef = useRef(null);

  const [oneReview, setOneReview] = useState();
  const [reviewData, setReviewData] = useState([]);
  const [totalReview, setTotalReview] = useState();
  const [subRev, setSubRev] = useState();
  const [isHiredvendor, setIsHiredVendor] = useState(false);
  const [hiredVendor, setHiredvendor] = useState(false);
  const { id } = router.query;
  const [open, setOpen] = useState(false);
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const [initialSlide, setInitialSlide] = useState();
  const [updated, setUpdate] = useState(false);
  const [page, setPage] = useState(0);
  const [viewmoretac, setViewMoretac] = useState(false);
  const [viewmoreav, setViewMoreav] = useState(false);
  const [changeSeemore, setChangeSeemore] = useState(false);
  const [venueHeaderToggle, setvenueHeaderToggle] = useState("Facility");
  const [allSimilarProd, setAllSimilarProd] = useState([]);
  useEffect(() => {
    if (windowWidth < 1050) {
      setChangeSeemore(true);
    }
  }, [windowWidth]);
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
  }, [subRev, onlyoneReview]);
  const [quaility, setquality] = useState();
  const [totalReview1, setTotalReview1] = useState();
  const [existingContact, setExistingContact] = useState([]);
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
  }, [qualityData]);
  const { data: getoneContact, refetch: contactRefetch } =
    useGetOneContactQuery({
      prospectId: globleuser?.data?._id,
      vendorId: id,
    });
  const getContact = async () => {
    const result = getoneContact;
    setExistingContact(result ? result : []);
  };
  useEffect(() => {
    globleuser && getContact();
  }, [globleuser, getoneContact]);
  useEffect(() => {
    contactRefetch();
    if (existingContact.length) {
      setShowContact(true);
    }
  }, [existingContact]);

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
  }, [page, allReview, updated]);

  const { data: checkVendor, refetch: checkforVendor } =
    useCheckHiredVendorQuery(data?.id);
  useEffect(() => {
    checkforVendor();
    setIsHiredVendor(checkVendor?.success);
    checkVendor?.success && setHiredvendor(checkVendor?.data[0]);
  }, [data?.name, checkVendor]);
  const [page1, setPage1] = useState(0);
  const [limit, setLimit] = useState();
  const location = useSelector(selectLocation);
  useEffect(() => {
    socketRef.current = io.connect(PROXY);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const { data: venueData, refetch: venueRefetch } = useGetAllVenueQuery({
    city: location,
    category: data?.category,
    subCategory: data?.subCategory,
    page: page1 + 1,
    isUser: globleuser ? globleuser?.data?._id : undefined,
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
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  return (
    <div className={styles.mainbody}>
      <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Button
            type="button"
            onClick={() => {
              setOpen(false);
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
            className=" albumBigSlider1234567890 albumBigSlider12345678902"
          >
            <Slider {...settings} initialSlide={initialSlide}>
              {selectedAlbums?.map((data) => {
                return (
                  <div className={styles.albumImgConntainer}>
                    <Image
                      height={0}
                      width={0}
                      // layout='responsive'
                      src={`${S3PROXY}${data}`}
                      alt=""
                      // className={styles.bigSliderImage}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </>
      </Modal>
      <span className={styles.prdctpath}>
        <a href={`/venue?category=${data?.category}`}>
          Venues / {data?.category} / {data?.productName}
        </a>
      </span>
      <div className={styles.topdiv}>
        <div>
          <div className={styles.leftdiv}>
            <div
              className={`${styles.imgcontainer}  VenueImageContainer1234567890 albumBigSlider12345678901`}
            >
              <Slider
                {...settings}
                afterChange={(index) => {
                  index === 0
                    ? setCurrentImage(data.mainImage)
                    : setCurrentImage(data.images[index - 1]);
                }}
              >
                <div>
                  <ImageBackground
                    image={data?.mainImage}
                    className={styles.imageBackground}
                  >
                    {data?.mainImage && (
                      <Image
                        src={`${S3PROXY}${data?.mainImage}`}
                        height={0}
                        width={0}
                        alt=""
                        onClick={() => {
                          setInitialSlide(0);
                          setSelectedAlbums([data?.mainImage, ...data?.images]);
                          setOpen(true);
                        }}
                      />
                    )}
                  </ImageBackground>
                </div>
                {data?.images?.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        setInitialSlide(index + 1);
                        setSelectedAlbums([data?.mainImage, ...data?.images]);
                        setOpen(true);
                      }}
                    >
                      <ImageBackground
                        image={item}
                        className={styles.imageBackground}
                      >
                        {item && (
                          <Image
                            src={`${S3PROXY}${item}`}
                            height={0}
                            width={0}
                            alt=""
                          />
                        )}
                      </ImageBackground>
                    </div>
                  );
                })}
              </Slider>
              <div className={styles.wishlistandHiredvendor1}>
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
                      // height={0}
                      // width={0}
                      src={`${S3PROXY}/public/images/webp/heart (1).webp`}
                      alt=""
                    />
                  </button>
                ) : (
                  <button
                    className={styles.HiredVendorbtns}
                    onClick={async () => {
                      if (globleuser) {
                        const config = {
                          headers: {
                            authorization: JSON.parse(
                              localStorage.getItem("wedfield")
                            ).data.token,
                          },
                        };
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
                        const result = addWishList(body);
                        const res = await result;

                        setIsWishList(true);
                        setWishList(res.data.data);
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
                      // height={0}
                      // width={0}
                      src={`${S3PROXY}/public/images/webp/heart12.webp`}
                      alt=""
                    />
                  </button>
                )}
                {isHiredvendor ? (
                  <button
                    className={styles.HiredVendorbtns}
                    onClick={async () => {
                      if (globleuser) {
                        deleteHiredVendor(hiredVendor._id);
                        setIsHiredVendor(false);
                        setHiredvendor("");
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
                      // height={0}
                      // width={0}
                      src={`${S3PROXY}/public/images/webp/handshake (1).webp`}
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
                            bannerImage: data?.mainImage,
                            size: [],
                            category: data?.category,
                            subCategory: data?.subCategory,
                          },
                        };
                        const result = addHiredVendor(body);
                        const res = await result;

                        setIsHiredVendor(true);
                        setHiredvendor(res?.data?.data);
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
                      // height={0}
                      // width={0}
                      src={`${S3PROXY}/public/images/webp/handshake.webp`}
                      alt=""
                    />
                  </button>
                )}
              </div>
            </div>
            {windowWidth > 1050 ? (
              <div className="gallery-container pb-3 bg-white box-shadow w-100">
                <div className="tabs-container d-flex align-items-center">
                  <div
                    className={Styles.tab}
                    style={{
                      backgroundColor:
                        activeTab === "albums" ? "#fff" : "#f8f8f8",
                      color:
                        activeTab === "albums"
                          ? "hsla(0, 70%, 24%, 1)"
                          : "#000",
                    }}
                    onClick={() => setActiveTab("albums")}
                  >
                    <h5 className="fw-bold">Albums </h5>
                  </div>
                  <div
                    className={Styles.tab}
                    style={{
                      backgroundColor:
                        activeTab === "videos" ? "#fff" : "#f8f8f8",
                      color:
                        activeTab === "videos"
                          ? "hsla(0, 70%, 24%, 1)"
                          : "#000",
                    }}
                    onClick={() => setActiveTab("videos")}
                  >
                    <h5 className="fw-bold">Videos</h5>
                  </div>
                </div>
                <div className="active-comp px-4 mt-4">
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

                  {activeTab == "videos" && data?.vidLinks && (
                    <>
                      <Video data={data?.vidLinks} />
                    </>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
            {windowWidth > 1050 && (
              <>
                <div style={{ width: "100%" }}>
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
                              Food
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={(quaility?.food / totalReview1) * 100}
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
                              Great Staff
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={(quaility?.staff / totalReview1) * 100}
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
                              Beautiful Banquet
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.banquet / totalReview1) * 100
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
                              Hospitality
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.hospitality / totalReview1) * 100
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
                  type={"item"}
                  oneReview={oneReview}
                  subRev={subRev}
                  setSubRev={setSubRev}
                  subType={"Venue"}
                  setUpdate={setUpdate}
                ></ReviewCard>
              </>
            )}
          </div>
        </div>
        <div>
          <div className={styles.rightdiv}>
            <div className={styles.prdctdesc}>
              <div className={styles.prdctname124}>
                <span className={styles.prdctname}>{data?.name}</span>
                <div className={styles.wishlistandHiredvendor}>
                  {isWishlist ? (
                    <button
                      className={styles.HiredVendorbtns}
                      onClick={async () => {
                        const config = {
                          headers: {
                            authorization: JSON.parse(
                              localStorage.getItem("wedfield")
                            ).data.token,
                          },
                        };
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
                        // height={0}
                        // width={0}
                        src={`${S3PROXY}/public/images/webp/heart (1).webp`}
                        alt=""
                      />
                    </button>
                  ) : (
                    <button
                      className={styles.HiredVendorbtns}
                      onClick={async () => {
                        if (globleuser) {
                          const config = {
                            headers: {
                              authorization: JSON.parse(
                                localStorage.getItem("wedfield")
                              ).data.token,
                            },
                          };
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
                              link: `/vendors/${data?.name
                                .toLowerCase()
                                .replaceAll(" ", "-")}/${data?._id}`,
                            },
                          };
                          const result = addWishList(body);
                          const res = await result;
                          setIsWishList(true);
                          setWishList(res.data.data);
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
                        // height={0}
                        // width={0}
                        src={`${S3PROXY}/public/images/webp/heart12.webp`}
                        alt=""
                      />
                    </button>
                  )}
                  {isHiredvendor ? (
                    <button
                      className={styles.HiredVendorbtns}
                      onClick={async () => {
                        if (globleuser) {
                          const config = {
                            headers: {
                              authorization: JSON.parse(
                                localStorage.getItem("wedfield")
                              ).data.token,
                            },
                          };
                          deleteHiredVendor(hiredVendor._id);
                          setIsHiredVendor(false);
                          setHiredvendor("");
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
                        // height={0}
                        // width={0}
                        src={`${S3PROXY}/public/images/webp/handshake (1).webp`}
                        alt=""
                      />
                    </button>
                  ) : (
                    <button
                      className={styles.HiredVendorbtns}
                      onClick={async () => {
                        if (globleuser) {
                          const config = {
                            headers: {
                              authorization: JSON.parse(
                                localStorage.getItem("wedfield")
                              ).data.token,
                            },
                          };
                          const body = {
                            product: {
                              productId: data?._id,
                              name: data?.name,
                              price: data?.price,
                              type: "Venue",
                              bannerImage: data?.mainImage,
                              size: [],
                              category: data?.category,
                              subCategory: data?.subCategory,
                            },
                          };
                          const result = addHiredVendor(body);
                          const res = await result;
                          setIsHiredVendor(true);
                          setHiredvendor(res?.data?.data);
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
                        // height={30}
                        // width={30}
                        // layout='responsive'
                        src={`${S3PROXY}/public/images/webp/handshake.webp`}
                        alt=""
                      />
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.loc}>
                <MdLocationPin
                  style={{
                    height: "20px",
                    width: "20px",
                    marginTop: "-8px",
                    marginRight: "5px",
                    color: "#DB3672",
                  }}
                />
                <span>{data?.address}</span>
              </div>
              <div className={styles.rating}>
                <div className={styles.starate}>
                  <StarIcon
                    sx={{
                      color: "white",
                    }}
                  />
                  <span>
                    {data?.avgRating === 0
                      ? "0"
                      : Number(data?.avgRating).toFixed(1)}
                  </span>
                </div>
                <div className={styles.peoplerated}>
                  <span style={{ fontSize: "14px" }}>
                    <span style={{ fontSize: "18px" }}>
                      {data?.avgRatingTotalRates}
                    </span>{" "}
                    Ratings
                  </span>
                </div>
              </div>

              <div className={styles.btndiv}>
                <ButtonGroup
                  variant="outlined"
                  aria-label="button group"
                  sx={{
                    // borderRadius: "20px",
                    width: "95%",
                  }}
                >
                  <a
                    target={"_blank"}
                    href={data?.brochure ? `${data?.brochure[0]}` : "#"}
                    className={styles.addTocart}
                    download
                    rel="noreferrer"
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px 0px 0px 10px",
                    }}
                  >
                    <span
                      className=" flex-row d-flex align-items-center justify-content-center"
                      style={{
                        color: "#b6255a",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "15px",
                      }}
                    >
                      Brochure {"  "} <DownloadIcon />
                    </span>
                  </a>
                  <button
                    className={styles.addTocart}
                    style={{
                      width: "50%",
                      fontSize: "15px",
                      borderRadius: "0px 10px 10px 0px",
                      marginLeft: "-2px",
                      borderLeft: ".3px ",
                    }}
                  >
                    View Menu
                  </button>
                </ButtonGroup>
              </div>
              <div className={styles.priceshead}>
                <article>
                  <span className={styles.prdctprice}>
                    <img src={`${S3PROXY}/public/images/webp/bed.webp`} />₹
                    {data?.price}
                    <span style={{ fontSize: "11px" }}>/Per Night</span>
                  </span>
                  <span>Room Price</span>
                </article>
                <article>
                  <span className={styles.prdctprice}>
                    <img
                      src={`${S3PROXY}/public/img/webp/icons8-veg-48.webp`}
                    />
                    ₹{data?.vegPerPlate}
                    <span style={{ fontSize: "11px" }}>/Per Plate</span>
                  </span>
                  <span>Veg Price</span>
                </article>
                <article>
                  <span className={styles.prdctprice}>
                    <img
                      src={`${S3PROXY}/public/img/webp/icons8-non-vegetarian-food-symbol-48.webp`}
                    />
                    ₹{data?.nonVegPerPlate}
                    <span style={{ fontSize: "11px" }}>/Per Plate</span>
                  </span>
                  <span>Non-Veg Price</span>
                </article>
              </div>
              <div
                style={{
                  display: showContact
                    ? windowWidth > 700
                      ? "flex"
                      : "grid"
                    : "flex",
                  gap: "20px",
                  width: "100%",
                  justifyContent: showContact ? "space-between" : "end",
                }}
              >
                {showContact ? (
                  <div
                    className={styles.showingcontact}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "15px",
                      marginBottom: "-10px",
                      fontWeight: "500",
                      wordSpacing: "3px",
                    }}
                  >
                    <span>Primary Mo : {data.contactPhone}</span>
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

                    <span>Email : {data.contactEmail}</span>
                  </div>
                ) : (
                  <></>
                )}
                <button
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
                      vendorName: data?.name,
                      vendorId: data?._id,
                      vendorContact: data.contactPhone,
                      vendorType: "venue",
                      vendorImage: data.mainImage,
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
                        const result = addContact(body);
                        if (result.status == 200) {
                          getContact();
                          socketRef.current.emit("initiateChat", {
                            id: data?._id,
                          });
                        }
                      }
                    } else {
                      setOpenLoginModal(true);
                    }
                  }}
                >
                  {existingContact.length ? "Chat" : "View Contacts"}
                </button>
              </div>
            </div>
            {windowWidth > 1050 ? (
              <>
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div className={styles.leftsec}>
                      <span className={` ${styles.detailspan1}`}>Facility</span>
                      <div className={styles.faciliteisiv}>
                        <article>
                          <img src={`${S3PROXY}/public/images/webp/bed.webp`} />
                          <span>Rooms</span>
                          <span>
                            {data?.totalRooms ? data?.totalRooms : "0"}
                          </span>
                        </article>
                        <article>
                          <img
                            src={`${S3PROXY}/public/images/webp/ceremony.webp`}
                          />
                          <span>Banquets</span>
                          <span>
                            {data?.totalBanquet ? data?.totalBanquet : "0"}
                          </span>
                        </article>
                        <article>
                          <img
                            src={`${S3PROXY}/public/images/webp/grass.webp`}
                          />
                          <span>Lawns</span>
                          <span>
                            {data?.totalLawns ? data?.totalLawns : "0"}
                          </span>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div className={styles.leftsec}>
                      <span className={` ${styles.detailspan1}`}>
                        Plans And Packages
                      </span>
                      <div className={styles.planandfeatureGrid1}>
                        {data?.plans && data?.plans?.length ? (
                          data?.plans?.map((items) => {
                            return (
                              <article>
                                <span className={styles.cats}>
                                  {items.name}
                                </span>
                                <span className={styles.value}>
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
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div
                      className={`${styles.rightsec} productRightsec1234567890`}
                    >
                      <article>
                        <span className={`${styles.detailspan1}`}>
                          Banquet Hall/ Lawn
                        </span>
                      </article>
                      <article className={styles.allowedVendors}>
                        <span
                          className={styles.cats}
                          style={{ textTransform: "uppercase", width: "50%" }}
                        >
                          Name
                        </span>
                        <span
                          className={styles.value}
                          style={{
                            fontWeight: "600",
                            textTransform: "uppercase",
                            width: "25%",
                          }}
                        >
                          Min
                        </span>
                        <span
                          className={styles.value}
                          style={{
                            fontWeight: "600",
                            textTransform: "uppercase",
                            width: "25%",
                          }}
                        >
                          Max
                        </span>
                      </article>
                      {data?.amenities?.map((items, index) => {
                        return (
                          <article
                            className={styles.allowedVendors}
                            key={index}
                          >
                            <span
                              className={styles.cats}
                              style={{ width: "50%", display: "flex" }}
                            >
                              <div className={styles.allowedvendorimg1}>
                                <img
                                  src={`${S3PROXY}/public/productDetailsAssets/webp/hall.webp`}
                                  alt=""
                                />
                              </div>
                              {items.name}
                            </span>
                            <span
                              className={styles.value}
                              style={{ width: "25%" }}
                            >
                              {items.min}
                            </span>
                            <span
                              className={styles.value}
                              style={{ width: "25%" }}
                            >
                              {items.max}
                            </span>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div className={styles.leftsec}>
                      <span className={` ${styles.detailspan1}`}>
                        Vendor Allow Policy
                      </span>
                      <div className={styles.planandfeatureGrid}>
                        {data?.allowedVendors?.map((items, index) => {
                          return (
                            <article
                              className={styles.allowedVendors}
                              key={index}
                            >
                              <div className={styles.allowedvendorimg}>
                                {items.name === "DJ" ? (
                                  <img
                                    src={`${S3PROXY}/public/productDetailsAssets/webp/dj.webp`}
                                    alt=""
                                  />
                                ) : items.name === "Decor" ? (
                                  <img
                                    src={
                                      "/productDetailsAssets/webp/wedding-arch.webp"
                                    }
                                    alt=""
                                  />
                                ) : items.name === "Cake" ? (
                                  <img
                                    src={`${S3PROXY}/public/productDetailsAssets/webp/cake.webp`}
                                    alt=""
                                  />
                                ) : items.name === "Liquor" ? (
                                  <img
                                    src={
                                      "/productDetailsAssets/webp/liquor.webp"
                                    }
                                    alt=""
                                  />
                                ) : items.name === "Pan Counter" ? (
                                  <img
                                    src={`${S3PROXY}/public/productDetailsAssets/webp/leaf.webp`}
                                    alt=""
                                  />
                                ) : (
                                  <></>
                                )}
                              </div>
                              <span
                                className={styles.cats}
                                style={{ width: "70%", overflow: "scroll" }}
                              >
                                {items.name}
                              </span>
                              <span
                                className={styles.value}
                                style={{ width: "30%" }}
                              >
                                <img
                                  src={
                                    items.value === true
                                      ? "/icons/webp/GrnTick.webp"
                                      : "/icons/webp/remove.webp"
                                  }
                                  className={Styles.logo1}
                                  height={18}
                                  width={18}
                                ></img>
                              </span>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div className={styles.leftsec}>
                      <span className={` ${styles.detailspan1}`}>Features</span>
                      <div className={styles.planandfeatureGrid}>
                        {data?.features && data?.features?.length ? (
                          <>
                            {data?.features?.map((items, index) => {
                              if (changeSeemore) {
                                return (
                                  <article
                                    className={styles.allowedVendors}
                                    key={index}
                                  >
                                    <span
                                      className={styles.cats}
                                      style={{
                                        width: "70%",
                                        overflow: "scroll",
                                      }}
                                    >
                                      {items.name}
                                    </span>
                                    <span
                                      className={styles.value}
                                      style={{ width: "30%" }}
                                    >
                                      <img
                                        src={
                                          items.value === true
                                            ? "/icons/webp/GrnTick.webp"
                                            : "/icons/webp/remove.webp"
                                        }
                                        className={Styles.logo1}
                                        height={18}
                                        width={18}
                                      ></img>
                                    </span>
                                  </article>
                                );
                              }
                              for (const i = index; i < 4; i++) {
                                return (
                                  <article
                                    className={styles.allowedVendors}
                                    key={index}
                                  >
                                    <span
                                      className={styles.cats}
                                      style={{
                                        width: "70%",
                                        overflow: "scroll",
                                      }}
                                    >
                                      {items.name}
                                    </span>
                                    <span
                                      className={styles.value}
                                      style={{ width: "30%" }}
                                    >
                                      <img
                                        src={
                                          items.value === true
                                            ? "/icons/webp/GrnTick.webp"
                                            : "/icons/webp/remove.webp"
                                        }
                                        className={Styles.logo1}
                                        height={18}
                                        width={18}
                                      ></img>
                                    </span>
                                  </article>
                                );
                              }
                            })}
                          </>
                        ) : (
                          <p
                            style={{
                              textAlign: "center",
                            }}
                          >
                            No Features found
                          </p>
                        )}
                      </div>
                      {windowWidth > 1050 ? (
                        <span
                          style={{
                            width: "95%",
                            display: "flex",
                            justifyContent: "end",
                            fontSize: "15px",
                            color: "#B6255A",
                          }}
                          onClick={() => {
                            setChangeSeemore(!changeSeemore);
                          }}
                        >
                          {changeSeemore ? "Show Less" : "See More"}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails1}>
                    <div className={styles.leftsec1}>
                      <span className={` ${styles.detailspan1}`}>
                        Terms And Conditions
                      </span>
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
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails1}>
                    <div className={`${styles.leftsec1} `}>
                      <span className={` ${styles.detailspan1}`}>
                        About Vendor
                      </span>
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
              </>
            ) : (
              <>
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails1}>
                    <article className={styles.venueToglle}>
                      <span
                        className={
                          venueHeaderToggle === "Facility" &&
                          styles.selectedmenu
                        }
                        style={{
                          height: "35px",
                          borderBottom:
                            venueHeaderToggle === "Facility"
                              ? "3px solid #B6255A"
                              : "",
                        }}
                        onClick={() => setvenueHeaderToggle("Facility")}
                      >
                        Facility
                      </span>
                      <span
                        className={
                          venueHeaderToggle === "Plans" && styles.selectedmenu
                        }
                        style={{
                          height: "35px",
                          borderBottom:
                            venueHeaderToggle === "Plans"
                              ? "3px solid #B6255A"
                              : "",
                        }}
                        onClick={() => setvenueHeaderToggle("Plans")}
                      >
                        Plans
                      </span>
                      <span
                        className={
                          venueHeaderToggle === "Vendors" && styles.selectedmenu
                        }
                        style={{
                          height: "35px",
                          borderBottom:
                            venueHeaderToggle === "Vendors"
                              ? "3px solid #B6255A"
                              : "",
                        }}
                        onClick={() => setvenueHeaderToggle("Vendors")}
                      >
                        Vendors
                      </span>
                      <span
                        className={
                          venueHeaderToggle === "Features" &&
                          styles.selectedmenu
                        }
                        style={{
                          height: "35px",
                          borderBottom:
                            venueHeaderToggle === "Features"
                              ? "3px solid #B6255A"
                              : "",
                        }}
                        onClick={() => setvenueHeaderToggle("Features")}
                      >
                        Features
                      </span>
                      <span
                        className={
                          venueHeaderToggle === "Hall" && styles.selectedmenu
                        }
                        style={{
                          height: "35px",
                          borderBottom:
                            venueHeaderToggle === "Hall"
                              ? "3px solid #B6255A"
                              : "",
                        }}
                        onClick={() => setvenueHeaderToggle("Hall")}
                      >
                        Hall
                      </span>
                      <span
                        className={
                          venueHeaderToggle === "Albums" && styles.selectedmenu
                        }
                        style={{
                          height: "35px",
                          borderBottom:
                            venueHeaderToggle === "Albums"
                              ? "3px solid #B6255A"
                              : "",
                        }}
                        onClick={() => setvenueHeaderToggle("Albums")}
                      >
                        Albums
                      </span>
                      <span
                        className={
                          venueHeaderToggle === "Videos" && styles.selectedmenu
                        }
                        style={{
                          height: "35px",
                          borderBottom:
                            venueHeaderToggle === "Videos"
                              ? "3px solid #B6255A"
                              : "",
                        }}
                        onClick={() => setvenueHeaderToggle("Videos")}
                      >
                        Videos
                      </span>
                      <span
                        className={
                          venueHeaderToggle === "T&C" && styles.selectedmenu
                        }
                        style={{
                          height: "35px",
                          borderBottom:
                            venueHeaderToggle === "T&C"
                              ? "3px solid #B6255A"
                              : "",
                        }}
                        onClick={() => setvenueHeaderToggle("T&C")}
                      >
                        T&C
                      </span>
                      <span
                        className={
                          venueHeaderToggle === "AboutVendors" &&
                          styles.selectedmenu
                        }
                        style={{
                          height: "35px",
                          borderBottom:
                            venueHeaderToggle === "AboutVendors"
                              ? "3px solid #B6255A"
                              : "",
                        }}
                        onClick={() => setvenueHeaderToggle("AboutVendors")}
                      >
                        About
                      </span>
                    </article>
                    {venueHeaderToggle === "Facility" ? (
                      <Slide
                        direction="right"
                        in={venueHeaderToggle === "Facility"}
                        mountOnEnter
                        unmountOnExit
                      >
                        <div className={styles.leftsec}>
                          <span className={` ${styles.detailspan1}`}>
                            Facility
                          </span>
                          <div className={styles.faciliteisiv}>
                            <article>
                              <img
                                src={`${S3PROXY}/public/images/webp/bed.webp`}
                              />
                              <span>Rooms</span>
                              <span>
                                {data?.totalRooms ? data?.totalRooms : "0"}
                              </span>
                            </article>
                            <article>
                              <img
                                src={`${S3PROXY}/public/images/webp/ceremony.webp`}
                              />
                              <span>Banquets</span>
                              <span>
                                {data?.totalBanquet ? data?.totalBanquet : "0"}
                              </span>
                            </article>
                            <article>
                              <img
                                src={`${S3PROXY}/public/images/webp/grass.webp`}
                              />
                              <span>Lawns</span>
                              <span>
                                {data?.totalLawns ? data?.totalLawns : "0"}
                              </span>
                            </article>
                          </div>
                        </div>
                      </Slide>
                    ) : (
                      <></>
                    )}

                    {venueHeaderToggle === "Plans" ? (
                      <Slide
                        direction="right"
                        in={venueHeaderToggle === "Plans"}
                        mountOnEnter
                        unmountOnExit
                      >
                        <div className={styles.leftsec}>
                          <span className={` ${styles.detailspan1}`}>
                            Plans And Packages
                          </span>
                          <div className={styles.planandfeatureGrid1}>
                            {data?.plans && data?.plans?.length ? (
                              data?.plans?.map((items) => {
                                return (
                                  <article>
                                    <span className={styles.cats}>
                                      {items.name}
                                    </span>
                                    <span className={styles.value}>
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
                      </Slide>
                    ) : (
                      <></>
                    )}
                    {venueHeaderToggle === "Hall" ? (
                      <Slide
                        direction="right"
                        in={venueHeaderToggle === "Hall"}
                        mountOnEnter
                        unmountOnExit
                      >
                        <div
                          className={`${styles.rightsec} productRightsec1234567890`}
                        >
                          <article>
                            <span className={`${styles.detailspan1}`}>
                              Banquet Hall/ Lawn
                            </span>
                          </article>
                          <article className={styles.allowedVendors}>
                            <span
                              className={styles.cats}
                              style={{
                                textTransform: "uppercase",
                                width: "50%",
                              }}
                            >
                              Name
                            </span>
                            <span
                              className={styles.value}
                              style={{
                                fontWeight: "600",
                                textTransform: "uppercase",
                                width: "25%",
                              }}
                            >
                              Min
                            </span>
                            <span
                              className={styles.value}
                              style={{
                                fontWeight: "600",
                                textTransform: "uppercase",
                                width: "25%",
                              }}
                            >
                              Max
                            </span>
                          </article>
                          {data?.amenities?.map((items, index) => {
                            return (
                              <article
                                className={styles.allowedVendors}
                                key={index}
                              >
                                <span
                                  className={styles.cats}
                                  style={{ width: "50%", display: "flex" }}
                                >
                                  <div className={styles.allowedvendorimg1}>
                                    <img
                                      src={
                                        "/productDetailsAssets/webp/hall.webp"
                                      }
                                      alt=""
                                    />
                                  </div>
                                  {items.name}
                                </span>
                                <span
                                  className={styles.value}
                                  style={{ width: "25%" }}
                                >
                                  {items.min}
                                </span>
                                <span
                                  className={styles.value}
                                  style={{ width: "25%" }}
                                >
                                  {items.max}
                                </span>
                              </article>
                            );
                          })}
                        </div>
                      </Slide>
                    ) : (
                      <></>
                    )}
                    {venueHeaderToggle === "Features" ? (
                      <Slide
                        direction="right"
                        in={venueHeaderToggle === "Features"}
                        mountOnEnter
                        unmountOnExit
                      >
                        <div className={styles.leftsec}>
                          <span className={` ${styles.detailspan1}`}>
                            Features
                          </span>
                          <div className={styles.planandfeatureGrid}>
                            {data?.features && data?.features?.length ? (
                              <>
                                {data?.features?.map((items, index) => {
                                  if (changeSeemore) {
                                    return (
                                      <article
                                        className={styles.allowedVendors}
                                        key={index}
                                      >
                                        <span
                                          className={styles.cats}
                                          style={{
                                            width: "70%",
                                            overflow: "scroll",
                                          }}
                                        >
                                          {items.name}
                                        </span>
                                        <span
                                          className={styles.value}
                                          style={{ width: "30%" }}
                                        >
                                          <img
                                            src={
                                              items.value === true
                                                ? "/icons/webp/GrnTick.webp"
                                                : "/icons/webp/remove.webp"
                                            }
                                            className={Styles.logo1}
                                            height={18}
                                            width={18}
                                          ></img>
                                        </span>
                                      </article>
                                    );
                                  }
                                  for (const i = index; i < 4; i++) {
                                    return (
                                      <article
                                        className={styles.allowedVendors}
                                        key={index}
                                      >
                                        <span
                                          className={styles.cats}
                                          style={{
                                            width: "70%",
                                            overflow: "scroll",
                                          }}
                                        >
                                          {items.name}
                                        </span>
                                        <span
                                          className={styles.value}
                                          style={{ width: "30%" }}
                                        >
                                          <img
                                            src={
                                              items.value === true
                                                ? "/icons/webp/GrnTick.webp"
                                                : "/icons/webp/remove.webp"
                                            }
                                            className={Styles.logo1}
                                            height={18}
                                            width={18}
                                          ></img>
                                        </span>
                                      </article>
                                    );
                                  }
                                })}
                              </>
                            ) : (
                              <p
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                No Features found
                              </p>
                            )}
                          </div>
                        </div>
                      </Slide>
                    ) : (
                      <></>
                    )}
                    {venueHeaderToggle === "Vendors" ? (
                      <Slide
                        direction="right"
                        in={venueHeaderToggle === "Vendors"}
                        mountOnEnter
                        unmountOnExit
                      >
                        <div className={styles.leftsec}>
                          <span className={` ${styles.detailspan1}`}>
                            Vendor Allow Policy
                          </span>
                          <div className={styles.planandfeatureGrid}>
                            {data?.allowedVendors?.map((items, index) => {
                              return (
                                <article
                                  className={styles.allowedVendors}
                                  key={index}
                                >
                                  <div className={styles.allowedvendorimg}>
                                    {items.name === "DJ" ? (
                                      <img
                                        src={
                                          "/productDetailsAssets/webp/dj.webp"
                                        }
                                        alt=""
                                      />
                                    ) : items.name === "Decor" ? (
                                      <img
                                        src={
                                          "/productDetailsAssets/webp/wedding-arch.webp"
                                        }
                                        alt=""
                                      />
                                    ) : items.name === "Cake" ? (
                                      <img
                                        src={
                                          "/productDetailsAssets/webp/cake.webp"
                                        }
                                        alt=""
                                      />
                                    ) : items.name === "Liquor" ? (
                                      <img
                                        src={
                                          "/productDetailsAssets/webp/liquor.webp"
                                        }
                                        alt=""
                                      />
                                    ) : items.name === "Pan Counter" ? (
                                      <img
                                        src={
                                          "/productDetailsAssets/webp/leaf.webp"
                                        }
                                        alt=""
                                      />
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <span
                                    className={styles.cats}
                                    style={{
                                      width: "70%",
                                      overflow: "scroll",
                                    }}
                                  >
                                    {items.name}
                                  </span>
                                  <span
                                    className={styles.value}
                                    style={{ width: "30%" }}
                                  >
                                    <img
                                      src={
                                        items.value === true
                                          ? "/icons/webp/GrnTick.webp"
                                          : "/icons/webp/remove.webp"
                                      }
                                      className={Styles.logo1}
                                      height={18}
                                      width={18}
                                    ></img>
                                  </span>
                                </article>
                              );
                            })}
                          </div>
                        </div>
                      </Slide>
                    ) : (
                      <></>
                    )}
                    {venueHeaderToggle === "T&C" ? (
                      <Slide
                        direction="right"
                        in={venueHeaderToggle === "T&C"}
                        mountOnEnter
                        unmountOnExit
                      >
                        <div className={styles.fulldetails1}>
                          <div className={styles.leftsec1}>
                            <span className={` ${styles.detailspan1}`}>
                              Terms And Conditions
                            </span>
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
                      </Slide>
                    ) : (
                      <></>
                    )}
                    {venueHeaderToggle === "AboutVendors" ? (
                      <Slide
                        direction="right"
                        in={venueHeaderToggle === "AboutVendors"}
                        mountOnEnter
                        unmountOnExit
                      >
                        <div className={styles.fulldetails1}>
                          <div className={`${styles.leftsec1} `}>
                            <span className={` ${styles.detailspan1}`}>
                              About Vendor
                            </span>
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
                      </Slide>
                    ) : (
                      <></>
                    )}
                    {venueHeaderToggle === "Albums" ? (
                      <Slide
                        direction="right"
                        in={venueHeaderToggle === "Albums"}
                        mountOnEnter
                        unmountOnExit
                      >
                        <div className="active-comp px-4 mt-4">
                          <Albums
                            data={data?.albums}
                            setCurrentImage={setCurrentImage}
                            setOpen={setOpen}
                            setSelectedAlbums={setSelectedAlbums}
                            setInitialSlide={setInitialSlide}
                          />
                        </div>
                      </Slide>
                    ) : (
                      <></>
                    )}
                    {venueHeaderToggle === "Videos" ? (
                      <Slide
                        direction="right"
                        in={venueHeaderToggle === "Videos"}
                        mountOnEnter
                        unmountOnExit
                      >
                        <div className="active-comp px-4 mt-4">
                          <Video data={data?.vidLinks} />
                        </div>
                      </Slide>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </>
            )}
            {windowWidth <= 1050 && (
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
                              Food
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={(quaility?.food / totalReview1) * 100}
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
                              Great Staff
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={(quaility?.staff / totalReview1) * 100}
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
                              Beautiful Banquet
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.banquet / totalReview1) * 100
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
                              Hospitality
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.hospitality / totalReview1) * 100
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
                  type={"item"}
                  oneReview={oneReview}
                  subRev={subRev}
                  setSubRev={setSubRev}
                ></ReviewCard>
              </>
            )}
          </div>
        </div>
      </div>
      <p className={styles.vendortitle}>Similar Venues</p>
      <div style={{ width: "100%", height: "100ss%", marginBottom: "50px" }}>
        <ScrollMenu
          LeftArrow={LeftArrow1}
          RightArrow={
            // RightArrow
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
              <>
                <div
                  className=""
                  key={key}
                  style={{
                    margin: "15px",
                    width: "310px",
                    height: "100%",
                  }}
                >
                  <VenuesCard data={datas} from={"vendet"} />
                </div>
              </>
            );
          })}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default VenueDetails1;
