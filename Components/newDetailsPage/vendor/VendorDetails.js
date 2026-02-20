import React, { useRef, useContext, useEffect, useState } from "react";
import styles from "./vendordetails.module.css";
import { MdLocationPin } from "react-icons/md";
import Styles from "../../../styles/Vendors.module.scss";
import Slider from "react-slick";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import useWindowSize from "@rooks/use-window-size";
import DownloadIcon from "@mui/icons-material/Download";
import "react-toastify/dist/ReactToastify.css";
import CancelIcon from "@mui/icons-material/Cancel";
import ProgressBar from "@ramonak/react-progress-bar";
import StarIcon from "@mui/icons-material/Star";
import { Button, Modal, Slide, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { AiFillStar } from "react-icons/ai";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { PROXY, S3PROXY } from "../../../config";
import ReactPlayer from "react-player";
import Reviews from "../../writeReviewCard/Reviews";
import ReviewCard from "../../writeReviewCard/ReviewCard";
import AllVendorsCard from "../../newCard/AllVendorsCard/AllVendorsCard";
import { useDispatch, useSelector } from "react-redux";

import {
  loginRoute,
  selectLocation,
  selectUser,
} from "../../../redux/reducer/appEssentials";
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
import { useGetAllVendorQuery } from "redux/Api/common.api";
import Image from "next/image";
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
const Albums = ({
  data,
  setCurrentImage,
  setOpen,
  setSelectedAlbums,
  setInitialSlide,
}) => {
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
              {items.value.length ? (
                <Image
                  height={0}
                  width={0}
                  src={`${S3PROXY}${items.value[0]}`}
                  onClick={(e) => {
                    setCurrentImage(e.target.src);
                  }}
                  alt=""
                />
              ) : (
                <img
                  src={`${S3PROXY}${items.value[0]}`}
                  onClick={(e) => {
                    setCurrentImage(e.target.src);
                  }}
                ></img>
              )}
              <span>{items.name}</span>
            </div>
          );
        })}
      </ScrollMenu>
    </div>
  );
};

const Video = ({ data, setOpen }) => {
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
const VendorDetails1 = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [deleteHiredVendor] = useDeleteHiredVendorMutation();
  const [deleteWishList] = useDeleteWishListMutation();
  const [addWishList] = useAddWishListMutation();
  const [addHiredVendor] = useAddHiredVendorMutation();
  const [addContact] = useAddContactMutation();
  const [getOneMesbyTwoIds] = useGetOneMesbyTwoIdsMutation();
  const globleuser = useSelector(selectUser);
  const [subRev, setSubRev] = useState();
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  const [allSimilarProd, setAllSimilarProd] = useState([]);
  const [limit, setLimit] = useState();
  const socketRef = useRef(null);
  const location = useSelector(selectLocation);
  const [existingContact, setExistingContact] = useState([]);
  const [showContact, setShowContact] = useState(false);
  const [isWishlist, setIsWishList] = useState();
  const [isHiredvendor, setIsHiredVendor] = useState(false);
  const [hiredVendor, setHiredvendor] = useState(false);
  const [updated, setUpdate] = useState(false);
  const [wishList, setWishList] = useState();
  useEffect(() => {
    setIsWishList(data?.wishlist ? data?.wishlist : false);
    setWishList({
      _id: data?.wishlist ? data?.wishlistID : "",
    });
  }, [data?.wishlist]);
  const [page, setPage] = useState(1);
  const [page1, setPage1] = useState(0);
  const [oneReview, setOneReview] = useState();
  const [reviewData, setReviewData] = useState([]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    width: "100%",
  };
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
  const { innerWidth } = useWindowSize();
  const [currentImage, setCurrentImage] = useState();
  const [activeTab, setActiveTab] = useState("albums");
  const [config, setConfig] = useState();
  const [totalReview, setTotalReview] = useState();
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const [open, setOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState();
  const [venueHeaderToggle, setvenueHeaderToggle] = useState("Plans");
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

  useEffect(() => {
    socketRef.current = io.connect(PROXY);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
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
    if (existingContact.length) {
      setShowContact(true);
    }
  }, [existingContact]);
  const { data: checkVendor, refetch: checkforVendor } =
    useCheckHiredVendorQuery(data?.id);
  useEffect(() => {
    checkforVendor();
    setIsHiredVendor(checkVendor?.success);
    checkVendor?.success && setHiredvendor(checkVendor?.data[0]);
  }, [data?.name, checkVendor, updated]);
  const [viewmoretac, setViewMoretac] = useState(false);
  const [viewmoreav, setViewMoreav] = useState(false);

  const handleViewMore = (e) => {
    setPage(page + 1);
  };
  const { data: venueData, refetch: venueRefetch } = useGetAllVendorQuery({
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
            className="albumBigSlider1234567890 albumBigSlider12345678902"
          >
            <Slider {...settings} initialSlide={initialSlide}>
              {selectedAlbums?.map((data) => {
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
      {/* <Modal
        open={openImage}
        onClose={() => {
          setOpenImage(false);
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        
        <>
          <Button
            type='button'
            onClick={() => {
              setOpenImage(false);
            }}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: 'black',
              fontSize: '20px',
            }}
          >
            <CancelIcon fontSize='large' />
          </Button>
          <div
            style={{
              maxHeight: '80vh',
              maxWidth: '90vw',
              overflow: 'hidden',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            className='albumBigSlider1234567890'
          >
            <
              src={`${S3PROXY}${selectedImage}`}
              alt=''
              className={styles.bigSliderImage1}
              style={{ width: '100%', height: '600px' }}
            />
          </div>
        </>
      </Modal> */}
      <span className={styles.prdctpath}>
        <a href={`/vendors?category=${data?.category}`}>
          Vendors / {data?.category} / {data?.name}
        </a>
      </span>
      <div className={styles.topdiv}>
        <div>
          <div className={styles.leftdiv}>
            <div
              className={`${styles.imgcontainer} albumBigSlider12345678901  VenueImageContainer1234567890 `}
            >
              <Slider {...settings}>
                <div>
                  <ImageBackground
                    image={data?.mainImage}
                    className={styles.imageBackground}
                  >
                    <img
                      src={`${S3PROXY}${data?.mainImage}`}
                      alt=""
                      onClick={() => {
                        setInitialSlide(0);
                        setSelectedAlbums([data?.mainImage, ...data?.images]);
                        setOpen(true);
                      }}
                    />
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
                        <img src={`${S3PROXY}${item}`} alt="" />;
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
                        setHiredvendor(res.data.data);
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
                      src={`${S3PROXY}/public/images/webp/handshake.webp`}
                      alt=""
                    />
                  </button>
                )}
              </div>
            </div>
            {innerWidth > 1050 ? (
              <div className="gallery-container pb-2 bg-white w-100">
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
            {innerWidth > 1050 && (
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
                              Quality Work
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.qualitywork / totalReview1) * 100
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
                              Professionalism
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.professionalism / totalReview1) * 100
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
                              On Time Service
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.onTime / totalReview1) * 100
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
                  subType={"Vendor"}
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
                          setHiredvendor(res.data.data);
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
                    marginTop: "-5px",
                    marginRight: "5px",
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
              <span className={styles.prdctprice}>₹{data?.price}</span>
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
                  <span>Primary Mo : {data?.contactPhone}</span>
                  {data?.secondNumbers?.length ? (
                    <div style={{ display: "flex" }}>
                      <span style={{ marginRight: "6px" }}>Second Mo : </span>
                      <div style={{ display: "flex", flexDirection: "column" }}>
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
                <div></div>
              )}
              <div
                className={styles.btndiv}
                style={{ width: "100%", marginRight: "5px" }}
              >
                {/* <button
                  className={styles.buyNow}
                  style={{ fontSize: '12px' }}
                  onClick={async () => {
                    const userdata = JSON.parse(
                      localStorage.getItem('wedfield')
                    )?.data;
                    const config = {
                      headers: {
                        authorization: JSON.parse(
                          localStorage.getItem('wedfield')
                        )?.data?.token,
                      },
                    };
                    if (userdata) {
                      setShowContact(!showContact);
                    } else {
                      router.push('/customer-login');
                      dispatch(
                        loginRoute({
                          pathname: router.pathname,
                          query: router.query,
                        })
                      );
                    }
                  }}
                >
                  {showContact ? 'Hide Contact' : 'View Contact'}
                </button> */}
                <button
                  className={styles.buyNow}
                  style={{ fontSize: "12px" }}
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
                      prospectId: userdata?._id,
                      prospectImage: userdata?.profile_pic,
                      prospectContact: userdata?.mobile,
                      vendorName: data?.name,
                      vendorId: data?._id,
                      vendorContact: data?.contactPhone,
                      vendorType: "vendor",
                      vendorImage: data?.mainImage,
                      allowAccess: [],
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
                <a
                  target={"_blank"}
                  href={data?.brochure ? `${data?.brochure[0]}` : "#"}
                  className={styles.addTocart}
                  download
                  rel="noreferrer"
                  style={{
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
                  <span
                    className=" flex-row d-flex align-items-center justify-content-center"
                    style={{
                      color: "#b6255a",
                      alignItems: "center",
                    }}
                  >
                    Brochure {"  "} <DownloadIcon />
                  </span>
                </a>
              </div>
            </div>
            {innerWidth > 1050 ? (
              <>
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div
                      className={styles.leftsec}
                      style={{ width: "100%", border: "none" }}
                    >
                      <span
                        className={` ${styles.detailspan1}`}
                        style={{ width: "100%" }}
                      >
                        Plans And Packages
                      </span>

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
                            venueHeaderToggle === "About"
                              ? "3px solid #B6255A"
                              : "",
                        }}
                        onClick={() => setvenueHeaderToggle("AboutVendors")}
                      >
                        AboutVendor
                      </span>
                    </article>

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
                          <>
                            <Video data={data?.vidLinks} />
                          </>
                        </div>
                      </Slide>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </>
            )}
            {innerWidth <= 1050 && (
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
                              Quality Work
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.qualitywork / totalReview1) * 100
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
                              Professionalism
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.professionalism / totalReview1) * 100
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
                              On Time Service
                            </span>
                            <ProgressBar
                              className={Styles.ReviewBar}
                              barContainerClassName={Styles.ReviewBar1}
                              completedClassName={Styles.ReviewBar2}
                              labelClassName={Styles.ReviewBar3}
                              completed={
                                (quaility?.onTime / totalReview1) * 100
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
                {/* <div style={{ width: "100%", marginTop: "10px" }}>
                  <div className="bg-white py-3">
                    <h4 className="fw-bold text-center">Write A Review</h4>

                    <span className="d-block text-center">Select Rating</span>

                    <div className="stars-container d-flex align-items-center my-3 justify-content-center">
                     
                      <Rating
                        size="large"
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                          setreviewValues({
                            ...reviewValues,
                            reviewstars: newValue,
                          });
                        }}
                      />
                    </div>

                    <div
                      className="row gy-8"
                      style={{
                        margin: "20px",
                      }}
                    >
                      <div className="col-md-12">
                        <div className="field-container mb-3">
                          <input
                            onChange={(e) => {
                              setreviewValues({
                                ...reviewValues,
                                reviewtitle: e.target.value,
                              });
                            }}
                            type="text"
                            className="form-control py-3"
                            placeholder="Title"
                          />
                        </div>
                      </div>


                      <div className="field-container mb-3">
                        <textarea
                          onChange={(e) => {
                            setreviewValues({
                              ...reviewValues,
                              reviewbody: e.target.value,
                            });
                          }}
                          name=""
                          id=""
                          cols="30"
                          rows="5"
                          className="form-control"
                          placeholder="Write Review..."
                        ></textarea>
                      </div>

                      <button onClick={() => handleReviewSubmit()}>
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div> */}
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
      <p className={styles.vendortitle}>Similar Vendors</p>
      <div style={{ width: "100%", paddingBottom: "50px" }}>
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
                  <AllVendorsCard data={datas} from={"vendet"} />
                </div>
              </>
            );
          })}
        </ScrollMenu>
      </div>
    </div>
  );
};

// function RightArrow() {
//   const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

//   return (
//     <Button
//       disabled={isLastItemVisible}
//       onClick={() => scrollNext()}
//       sx={{ display: { md: "flex", xs: "none" } }}
//     >
//       <ArrowForwardIosIcon />
//     </Button>
//   );
// }
export default VendorDetails1;
