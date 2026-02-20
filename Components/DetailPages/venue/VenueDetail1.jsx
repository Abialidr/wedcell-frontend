import React, { useEffect, useRef, useState } from "react";
import styles from "./venuedetails.module.scss";
import Styles from "../../../styles/Vendors.module.scss";
import { useRouter } from "next/router";
import Slider from "react-slick";
import useWindowSize from "@rooks/use-window-size";
import DownloadIcon from "@mui/icons-material/Download";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { io } from "socket.io-client";
import CancelIcon from "@mui/icons-material/Cancel";
import { PROXY, S3PROXY } from "../../../config";
import Reviews from "../../writeReviewCard/Reviews.jsx";
import { useDispatch, useSelector } from "react-redux";
import Slide from "@mui/material/Slide";
import {
  loginRoute,
  selectLocation,
  selectUser,
} from "../../../redux/reducer/appEssentials";
import { useLazyGetAllVenueQuery } from "redux/Api/common.api";
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
import Carousal from "Components/Landing Page/Carousel/Index";
import VenueCard from "Components/Cards/VenueCard";
import ReviewCard from "Components/writeReviewCard/ReviewCard.jsx";
import { Icon } from "@iconify/react";
import {
  LeftArrow1,
  RightArrow1,
  Albums,
  Video,
  ImageBackground,
} from "../../common/DetailPageCommonComp.jsx";

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
const VenueDetails1 = ({ SimilarProd, location, category, data }) => {
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
  const [venueHeaderToggle, setvenueHeaderToggle] = useState("Descriptions");
  const [allSimilarProd, setAllSimilarProd] = useState([
    ...JSON.parse(SimilarProd).data,
  ]);
  console.log(
    "🚀 ~ file: VenueDetail1.jsx:127 ~ VenueDetails1 ~ allSimilarProd:",
    allSimilarProd
  );
  useEffect(() => {
    if (windowWidth < 900) {
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
  }, [subRev, onlyoneReview, updated]);
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
  useEffect(() => {
    socketRef.current = io.connect(PROXY);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const [venuefetch, { isFetching }] = useLazyGetAllVenueQuery();

  useEffect(() => {
    if (page1 > 0) {
      (async () => {
        const d = await venuefetch({
          city: location,
          category: category,
          page: page1 + 1,
          isUser: globleuser ? globleuser?.data?._id : undefined,
        });
        console.log("🚀 ~ file: VenueDetail1.jsx:239 ~ d:", d);
        let newData = allSimilarProd.concat(d?.data.data);
        newData = newData.filter((val) => val._id !== data?.id);
        setAllSimilarProd(newData);
      })();
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
  // Handle hardware back button press or swipe back gesture
  useEffect(() => {
    const handleBackButton = () => {
      if (openReview) {
        setOpenReview(false);
      }
    };

    // Listen for back button press or swipe back gesture
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [openReview, setOpenReview]);
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
            type={"venue"}
            oneReview={oneReview}
            subRev={subRev}
            subType={"Venue"}
            mobile={true}
            setSubRev={setSubRev}
            setUpdate={setUpdate}
          ></ReviewCard>
        </Box>
      </Modal>
      <div className={styles.header}>
        <article>
          <Icon onClick={() => router.back()} icon={"icon-park-outline:back"} />
          Venue
        </article>
        <div className={styles.wishlistandHiredvendor}>
          {isWishlist ? (
            <button
              className={styles.HiredVendorbtns}
              onClick={async () => {
                const config = {
                  headers: {
                    authorization: JSON.parse(localStorage.getItem("wedfield"))
                      .data.token,
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
                      subCategory: "",
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
                      subCategory: "",
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
                src={`${S3PROXY}/public/images/webp/handshake.png`}
                alt=""
              />
            </button>
          )}
        </div>
      </div>
      <div className={styles.topdiv}>
        <div className={styles.leftdiv}>
          <div
            className={`${styles.imgcontainer}  VenueImageContainer1234567891 albumBigSlider12345678901`}
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
          </div>
        </div>
        <div
          style={
            windowWidth <= 900
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
        <div className={styles.rightdiv}>
          <div className={styles.prdctdesc}>
            <div className={styles.prdctname124}>
              <span className={styles.prdctname}>{data?.name}</span>
              <div
                style={{ display: windowWidth <= 900 ? "none" : "" }}
                className={styles.wishlistandHiredvendor}
              >
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
                            subCategory: "",
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
                            subCategory: "",
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

            <div className={styles.btndiv}>
              {data?.brochure && data?.brochure[0] ? (
                <a
                  target={"_blank"}
                  href={
                    `${S3PROXY}${data?.brochure}`
                      ? `${S3PROXY}${data?.brochure[0]}`
                      : "#"
                  }
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
                      // color: '#b6255a',
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                    }}
                  >
                    Brochure {"  "} <DownloadIcon />
                  </span>
                </a>
              ) : (
                <button
                  className={styles.addTocart}
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
                      // color: '#b6255a',
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                    }}
                  >
                    Brochure {"  "} <DownloadIcon />
                  </span>
                </button>
              )}
              {data?.menu && data?.menu[0] ? (
                <a
                  target={"_blank"}
                  href={
                    `${S3PROXY}${data?.menu}`
                      ? `${S3PROXY}${data?.menu[0]}`
                      : "#"
                  }
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
                      // color: '#b6255a',
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                    }}
                  >
                    View Menu
                  </span>
                </a>
              ) : (
                <button
                  className={styles.addTocart}
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
                      // color: '#b6255a',
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                    }}
                  >
                    View Menu
                  </span>
                </button>
              )}
              {data?.lmenu && data?.lmenu[0] ? (
                <a
                  target={"_blank"}
                  href={
                    `${S3PROXY}${data?.lmenu}`
                      ? `${S3PROXY}${data?.lmenu[0]}`
                      : "#"
                  }
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
                      // color: '#b6255a',
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                    }}
                  >
                    View Liqour Menu
                  </span>
                </a>
              ) : (
                <button
                  className={styles.addTocart}
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
                      // color: '#b6255a',
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                    }}
                  >
                    View Liqour Menu
                  </span>
                </button>
              )}
            </div>
            <div className={styles.priceList}>
              <article>
                Room Price
                <section>
                  <img src={`${S3PROXY}/public/Card/bed.png`} alt="" />
                  <hgroup>₹ {data?.price}</hgroup>
                  <span>/Night</span>
                </section>
              </article>

              <article>
                Veg Menu
                <section>
                  <img src={`${S3PROXY}/public/Card/veg.png`} alt="" />
                  <hgroup>₹ {data?.vegPerPlate}</hgroup>
                  <span>/Plate</span>
                </section>
              </article>
              <article>
                Non-Veg Menu
                <section>
                  <img src={`${S3PROXY}/public/Card/nonveg.png`} alt="" />
                  <hgroup>₹ {data?.nonVegPerPlate}</hgroup>
                  <span>/Plate</span>
                </section>
              </article>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: windowWidth > 900 ? "space-between" : "start",
                marginTop: "30px",
                alignItems: "center",
                gap: "10px",
                flexDirection: windowWidth > 900 ? "row" : "column",
              }}
            >
              {showContact ? (
                <div
                  className={styles.showingcontact}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "15px",
                    width: windowWidth > 900 ? "" : "100%",
                    // marginBottom: '-10px',
                    fontWeight: "500",
                    wordSpacing: "3px",
                  }}
                >
                  <span>
                    Primary Mo :{" "}
                    <span
                      onClick={() => window.open(`tel://+${data.contactPhone}`)}
                    >
                      {data?.contactPhone}
                    </span>
                  </span>
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
                <></>
              )}
              <button
                style={{
                  fontSize: "12px",
                  alignSelf: windowWidth > 900 ? "end" : "center",
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
      <div
        style={
          windowWidth > 900
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
      {windowWidth > 900 ? (
        <>
          <div className={styles.alldetails}>
            <div className={styles.fulldetails1}>
              <article className={styles.venueToglle}>
                {[
                  "Descriptions",
                  "Terms & Conditions",
                  "About Venue",
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
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  mountOnEnter
                  unmountOnExit
                >
                  <div>
                    <div className={styles.prdctdetail}>
                      <div className={styles.fulldetails}>
                        <div className={styles.leftsec}>
                          <span className={` ${styles.detailspan1}`}>
                            Facility
                          </span>
                          <div className={styles.faciliteisiv}>
                            <article>
                              <img src={`${S3PROXY}/public/images/bed.png`} />
                              <span>Rooms</span>
                              <span>
                                {data?.totalRooms ? data?.totalRooms : "0"}
                              </span>
                            </article>
                            <article>
                              <img
                                src={`${S3PROXY}/public/images/ceremony.png`}
                              />
                              <span>Banquets</span>
                              <span>
                                {data?.totalBanquet ? data?.totalBanquet : "0"}
                              </span>
                            </article>
                            <article>
                              <img src={`${S3PROXY}/public/images/grass.png`} />
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
                          <article style={{ justifyContent: "center" }}>
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
                            <span
                              className={styles.value}
                              style={{
                                fontWeight: "600",
                                textTransform: "uppercase",
                                width: "25%",
                              }}
                            >
                              Sq Feet Area
                            </span>
                            <span
                              className={styles.value}
                              style={{
                                fontWeight: "600",
                                textTransform: "uppercase",
                                width: "25%",
                              }}
                            >
                              Layout
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
                                      src={`${S3PROXY}/public/images/ceremony.png`}
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
                                </span>{" "}
                                <span
                                  className={styles.value}
                                  style={{ width: "25%" }}
                                >
                                  {items.sqaurefeet}
                                </span>{" "}
                                <a
                                  className={styles.valueLink}
                                  style={{
                                    width: "25%",
                                    cursor: "pointer",
                                    color: "#b6255a !important",
                                    textDecoration: "underline !important",
                                  }}
                                  href={`${S3PROXY}${items.layout}`}
                                  target="_blank"
                                >
                                  download
                                </a>
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
                                        src={`${S3PROXY}/public/productDetailsAssets/dj.png`}
                                        alt=""
                                      />
                                    ) : items.name === "Decor" ? (
                                      <img
                                        src={`${S3PROXY}/public/productDetailsAssets/wedding-arch.png`}
                                        alt=""
                                      />
                                    ) : items.name === "Cake" ? (
                                      <img
                                        src={`${S3PROXY}/public/productDetailsAssets/cake.png`}
                                        alt=""
                                      />
                                    ) : items.name === "Liquor" ? (
                                      <img
                                        src={`${S3PROXY}/public/productDetailsAssets/liquor.png`}
                                        alt=""
                                      />
                                    ) : items.name === "Pan Counter" ? (
                                      <img
                                        src={`${S3PROXY}/public/productDetailsAssets/leaf.png`}
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
                                          ? `${S3PROXY}/public/icons/webp/GrnTick.webp`
                                          : `${S3PROXY}/public/icons/webp/remove.webp`
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
                                                ? `${S3PROXY}/public/icons/webp/GrnTick.webp`
                                                : `${S3PROXY}/public/icons/webp/remove.webp`
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
                                                ? `${S3PROXY}/public/icons/webp/GrnTick.webp`
                                                : `${S3PROXY}/public/icons/webp/remove.webp`
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
                          {windowWidth > 900 ? (
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
              {venueHeaderToggle === "About Venue" ? (
                <Slide
                  direction="right"
                  in={venueHeaderToggle === "About Venue"}
                  mountOnEnter
                  unmountOnExit
                >
                  <div className={styles.fulldetails1}>
                    <div className={`${styles.leftsec1} `}>
                      <span className={` ${styles.detailspan1}`}>
                        About Venue
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
                        <span>Be The First One to Review!!</span>
                      )}
                    </div>

                    <ReviewCard
                      pid={data?._id}
                      type={"venue"}
                      oneReview={oneReview}
                      subRev={subRev}
                      subType={"Venue"}
                      setSubRev={setSubRev}
                      setUpdate={setUpdate}
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
      {windowWidth <= 900 ? (
        <div className={styles.drops}>
          {[
            {
              name: "Facility",
              content: (
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div className={styles.leftsec}>
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
              ),
            },
            {
              name: "Plans & Packages",
              content: (
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div className={styles.leftsec}>
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
              ),
            },
            {
              name: "Banquet Hall/ Lawn",
              content: (
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div
                      className={`${styles.rightsec} productRightsec1234567890`}
                    >
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
                        <span
                          className={styles.value}
                          style={{
                            fontWeight: "600",
                            textTransform: "uppercase",
                            width: "25%",
                          }}
                        >
                          Sq Feet Area
                        </span>
                        <span
                          className={styles.value}
                          style={{
                            fontWeight: "600",
                            textTransform: "uppercase",
                            width: "25%",
                          }}
                        >
                          Layout
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
                              style={{
                                width: "50%",
                                display: "flex",
                                textWrap: "balance",
                              }}
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
                            <span
                              className={styles.value}
                              style={{ width: "25%" }}
                            >
                              {items.sqaurefeet}
                            </span>{" "}
                            <a
                              className={styles.valueLink}
                              style={{
                                width: "25%",
                                cursor: "pointer",
                                color: "#b6255a !important",
                                textDecoration: "underline !important",
                              }}
                              href={`${S3PROXY}${items.layout}`}
                              target="_blank"
                            >
                              download
                            </a>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              name: "Vendor Allow Policy",
              content: (
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div className={styles.leftsec}>
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
                                      ? `${S3PROXY}/public/icons/webp/GrnTick.webp`
                                      : `${S3PROXY}/public/icons/webp/remove.webp`
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
              ),
            },
            {
              name: "Features",
              content: (
                <div className={styles.prdctdetail}>
                  <div className={styles.fulldetails}>
                    <div className={styles.leftsec}>
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
                                            ? `${S3PROXY}/public/icons/webp/GrnTick.webp`
                                            : `${S3PROXY}/public/icons/webp/remove.webp`
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
                                            ? `${S3PROXY}/public/icons/webp/GrnTick.webp`
                                            : `${S3PROXY}/public/icons/webp/remove.webp`
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
      {windowWidth <= 900 ? (
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
      <p className={styles.vendortitle}>Similar Venues</p>
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
            if (!isFetching) setPage1((val) => ++val);
          }}
          LeftArrow={LeftArrow1}
          RightArrow={
            // RightArrow
            <RightArrow1 setPage={setPage} limit={limit} page1={page1} />
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
                    width: windowWidth > 900 ? "330px" : "250px",
                    height: "100%",
                  }}
                >
                  <VenueCard data={datas} from={"vendet"} />
                </div>
              </>
            );
          })}
        </Carousal>
      </div>
    </div>
  );
};

export default VenueDetails1;
