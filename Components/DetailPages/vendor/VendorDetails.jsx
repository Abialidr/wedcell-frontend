import React, { useRef, useContext, useEffect, useState } from "react";
import styles from "./vendordetails.module.scss";
import Slider from "react-slick";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import useWindowSize from "@rooks/use-window-size";
import DownloadIcon from "@mui/icons-material/Download";
import "react-toastify/dist/ReactToastify.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Modal, Slide, styled } from "@mui/material";
import { Box } from "@mui/system";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { PROXY, S3PROXY } from "../../../config";
import ReactPlayer from "react-player/lazy";
import Reviews from "../../writeReviewCard/Reviews.jsx";
import ReviewCard from "../../writeReviewCard/ReviewCard.jsx";
import AllVendorCards from "../../Cards/AllVendorCards/index";
import { useDispatch, useSelector } from "react-redux";
import { extractYouTubeId } from "../../../helper/index";
import YouTubeIcon from "@mui/icons-material/YouTube";
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
import LoginModal from "Components/CustomerLogin/LoginModal";
import Carousal from "Components/Landing Page/Carousel/Index";
import { Icon } from "@iconify/react";

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
                setOpen(true);
                setInitialSlide(0);
              }}
            >
              {items.value.length ? (
                <img
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
        <div style={{ width: innerWidth > 900 ? "30px" : "0px" }}></div>
      </Carousal>
    </div>
  );
};

const Video = ({ data, setOpen }) => {
  return (
    <div
      style={{ display: data?.length ? "" : "none" }}
      className={`${styles.imgListContainerforAlbum} VENUEdETAILS1234567890`}
    >
      <Carousal slides={data} pushData={() => {}}>
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
      </Carousal>
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
  console.log(
    "🚀 ~ file: VendorDetails.jsx:257 ~ existingContact:",
    existingContact
  );
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
  const [page, setPage] = useState(0);
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
  const [venueHeaderToggle, setvenueHeaderToggle] = useState("Descriptions");
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
  }, [subRev, onlyoneReview, updated]);

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
    console.log(
      "🚀 ~ file: VendorDetails.jsx:361 ~ getContact ~ result:",
      result
    );
    setExistingContact(result?.length ? result : []);
  };
  useEffect(() => {
    globleuser && getContact();
  }, []);
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
  }, [data?.name, checkVendor]);
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
      newData = newData.filter((val) => val._id !== data?.id);
      setAllSimilarProd(newData);
    }
  }, [data?._id, location, venueData]);
  useEffect(() => {
    if (page1 > 0) {
      venueRefetch();
    }
  }, [page1]);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
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
  return (
    <div className={styles.mainbody}>
      <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
      <Modal
        style={{
          zIndex: "1402",
        }}
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
            type={"item"}
            oneReview={oneReview}
            subRev={subRev}
            subType={"Vendor"}
            mobile={true}
            setUpdate={setUpdate}
            setSubRev={setSubRev}
          ></ReviewCard>
        </Box>
      </Modal>
      <div className={styles.header}>
        <article>
          <Icon onClick={() => router.back()} icon={"icon-park-outline:back"} />
          Vendor
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
              <img src={`${S3PROXY}/public/images/webp/heart.png`} alt="" />
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
              <img src={`${S3PROXY}/public/images/webp/handshake.png`} alt="" />
            </button>
          )}
        </div>
      </div>
      <div className={styles.topdiv}>
        <div>
          <div className={styles.leftdiv}>
            <div
              className={`${styles.imgcontainer} albumBigSlider12345678901  VenueImageContainer1234567891 `}
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
              {/* <div className={styles.wishlistandHiredvendor1}>
                {isWishlist ? (
                  <button
                    className={styles.HiredVendorbtns}
                    onClick={async () => {
                      if (globleuser) {
                        deleteWishList(wishList._id);
                        setIsWishList(false);
                        setWishList('');
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
                      alt=''
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
                            type: 'Vendor',
                            bannerImage: data?.mainImage,
                            size: [],
                            exclusive: data?.popular,
                            category: data?.category,
                            subCategory: data?.subCategory,
                            city: data?.city,
                            mobile: data?.contactPhone,
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
                      alt=''
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
                        setHiredvendor('');
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
                      alt=''
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
                            type: 'Vendor',
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
                      alt=''
                    />
                  </button>
                )}
              </div> */}
            </div>
          </div>
        </div>
        <div
          style={
            innerWidth <= 900
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
          </section>
        </div>
        <div>
          <div className={styles.rightdiv}>
            <div className={styles.prdctdesc}>
              <div className={styles.prdctname124}>
                <span className={styles.prdctname}>{data?.name}</span>
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
                        src={`${S3PROXY}/public/images/webp/heart.png`}
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
                        src={`${S3PROXY}/public/images/webp/handshake.png`}
                        alt=""
                      />
                    </button>
                  )}
                </div>
              </div>
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
                <span>{data?.address}</span>
              </div>
              <div className={styles.priceList}>
                <article>
                  <section>
                    <hgroup>₹ {data?.price}</hgroup>
                    <span>/Event</span>
                  </section>
                </article>
              </div>

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
                {data?.brochure && data?.brochure[0] ? (
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
                        // color: '#b6255a',
                        alignItems: "center",
                      }}
                    >
                      Brochure {"  "} <DownloadIcon />
                    </span>
                  </a>
                ) : (
                  <button
                    className={styles.addTocart}
                    style={{
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <span
                      className=" flex-row d-flex align-items-center justify-content-center"
                      style={{
                        // color: '#b6255a',
                        alignItems: "center",
                      }}
                    >
                      Brochure {"  "} <DownloadIcon />
                    </span>
                  </button>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: innerWidth > 900 ? "space-between" : "start",
                  marginTop: "30px",
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
                          window.open(`tel://+${data.contactPhone}`)
                        }
                      >
                        {data?.contactPhone}
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
                          window.open(`mailto:${data?.contactEmail}`)
                        }
                      >
                        {data?.contactEmail}
                      </span>{" "}
                    </span>
                  </div>
                ) : (
                  <div></div>
                )}
                <button
                  className={styles.buyNow}
                  style={{
                    fontSize: "12px",
                    alignSelf: innerWidth > 900 ? "end" : "center",
                  }}
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
                      IsWedcell: true,
                    };
                    if (userdata) {
                      const result = await getOneMesbyTwoIds(body);
                      console.log(
                        "🚀 ~ file: VendorDetails.jsx:1227 ~ onClick={ ~ result:",
                        result
                      );
                      if (result?.data[0]?._id) {
                        router.push(
                          `/user-dashboard/Message?id=${result?.data[0]?._id}`
                        );
                      } else {
                        setShowContact(!showContact);
                        const result = await addContact(body);
                        console.log(
                          "🚀 ~ file: VendorDetails.jsx:1238 ~ onClick={ ~ result:",
                          result
                        );
                        setExistingContact([{ ...body }]);
                        if (result.data?.success) {
                          // await contactRefetch();
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
                  <span>
                    <img
                      src={`${S3PROXY}/public/productDetailsAssets/call.png`}
                    ></img>
                  </span>
                  {existingContact.length ? "Chat" : "View Number"}
                </button>
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
        </section>
      </div>
      {innerWidth > 900 ? (
        <>
          <div className={styles.alldetails}>
            <div className={styles.fulldetails1}>
              <article className={styles.venueToglle}>
                {[
                  "Descriptions",
                  "Terms & Conditions",
                  "About Vendor",
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
              {venueHeaderToggle === "Descriptions" ? (
                <Slide
                  direction="right"
                  in={venueHeaderToggle === "Descriptions"}
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
                          >
                            Plans And Packages
                          </span>

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
              {venueHeaderToggle === "About Vendor" ? (
                <Slide
                  direction="right"
                  in={venueHeaderToggle === "About Vendor"}
                  mountOnEnter
                  unmountOnExit
                >
                  <div className={styles.fulldetails1}>
                    <div className={`${styles.leftsec1} `}>
                      <span className={` ${styles.detailspan1}`}>
                        About Vendor
                      </span>
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
      <p className={styles.vendortitle}>Similar Vendors</p>
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
                    width: innerWidth > 900 ? "330px" : "250px",
                    height: "100%",
                  }}
                >
                  <AllVendorCards data={datas} from={"vendet"} />
                </div>
              </>
            );
          })}
        </Carousal>
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
