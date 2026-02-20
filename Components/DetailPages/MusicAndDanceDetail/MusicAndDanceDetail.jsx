import React, { useState, useEffect } from "react";
import styles from "./products.module.scss";
import StarRatings from "react-star-ratings";
import useWindowSize from "@rooks/use-window-size";
import Slider from "react-slick";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import LoginModal from "Components/CustomerLogin/LoginModal";
import { newLocations } from "constants/colors";
import { RightArrow1 } from "Components/common/DetailPageCommonComp";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Modal,
  Radio,
  Select,
  Slide,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Reviews from "../../writeReviewCard/Reviews.jsx";
import ReviewCard from "../../writeReviewCard/ReviewCard.jsx";
import { extractYouTubeId } from "../../../helper/index";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  loginRoute,
  selectUser,
} from "../../../redux/reducer/appEssentials.js";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player/lazy";
import {
  useAddContactMutation,
  useCheckWishListQuery,
  useGetOneContactQuery,
  useGetOneMesbyTwoIdsMutation,
} from "redux/Api/chw.api";
import {
  useAddWishListMutation,
  useDeleteWishListMutation,
  useGetAllVendorQuery,
} from "redux/Api/common.api";
import {
  useGetAllQualityQuery,
  useGetOneReviewQuery,
  useGetallReviewsQuery,
} from "redux/Api/reviews.api";
import Carousal from "Components/Landing Page/Carousel/Index";
import { Icon } from "@iconify/react";
import { io } from "socket.io-client";
import OtherProductCards from "Components/Cards/MusicianCard";
import { PROXY, S3PROXY } from "../../../config/index.js";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { pink } from "@mui/material/colors";
import { otherserviceval } from "yupValidation/inhouseValidation";
import { useCheckOutKeyQuery, useCheckOutMutation } from "redux/Api/others.api";
import { useCreateOppforOthersMutation } from "redux/Api/intheHouse.api";
import Head from "next/head";
import { useLazyGetAllVendorQuery } from "../../../redux/Api/common.api.js";



const theme = createTheme({
  palette: {
    primary: {
      main: "#828282",
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: "rgba(255, 255, 255, 0.87)",
      },
    },
  },
  components: {
    MuiOutlinedInput: {
      borderColor: "#828282 !important",
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            // borderRadius: 20,
            borderColor: "#828282",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderRadius: "0px 0px 0px 0px",
            borderColor: "#828282 !important",
            // paddingRight: '0px',
          },
          ".Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#828282 !important",
          },
          ".Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#828282",
          },
          MuiInputLabel: {
            color: "rgba(255, 255, 255, 0.87)",
          },
        },
      },
    },
    // MuiAutocomplete: {
    //   styleOverrides: {
    //     'MuiFormLabel-root': {
    //       color: '#b6255a !important',
    //     },
    //   },
    // },
  },
});

const socialLinks = {
  Anchor: {
    instagram: "https://www.instagram.com/wedfield_anchor/",
    facebook: "https://www.facebook.com/profile.php?id=61562034851638",
    linkedin: "https://www.linkedin.com/company/wedfield-anchor/",
    youtube:
      "https://www.youtube.com/playlist?list=PLoH-5JAhl1QLuDO4KojkJ_zk0EASHKqfV",
  },
  Choreographer: {
    instagram: "https://www.instagram.com/wedfield_choreographer/",
    facebook: "https://www.facebook.com/profile.php?id=61562350319353",
    linkedin: "https://www.linkedin.com/company/wedcell-choreography/",
    youtube:
      "https://www.youtube.com/playlist?list=PLoH-5JAhl1QIh6XwYTLiScyCiB3ZGYwTx",
  },
  DJ: {
    instagram: "https://www.instagram.com/wedfield_dj/",
    facebook: "https://www.facebook.com/profile.php?id=61562961651721",
    linkedin: "https://www.linkedin.com/company/wedfield-dj/",
    youtube:
      "https://www.youtube.com/playlist?list=PLoH-5JAhl1QLWAx8wjsxmnRF7rxb474tr",
  },
  "Live band": {
    instagram: "https://www.instagram.com/wedfield_liveband/",
    facebook: "https://www.facebook.com/profile.php?id=61563068734627",
    linkedin: "https://www.linkedin.com/company/wedfield-live-band/",
    youtube:
      "https://www.youtube.com/playlist?list=PLoH-5JAhl1QJ2vhBItFlFlIENSBlVmGud",
  },
  "DJ based Band": {
    instagram: "https://www.instagram.com/wedfield_djbasedband/",
    facebook: "https://www.facebook.com/profile.php?id=61562740800107",
    linkedin: "https://www.linkedin.com/company/wedfield-dj-base-band",
    youtube:
      "https://www.youtube.com/playlist?list=PLoH-5JAhl1QIBtRi3QyZ3jgnEyf7eWQyW",
  },
  "Male & Female Singer": {
    instagram: "https://www.instagram.com/wedfield_malefemalesinger/",
    facebook: "https://www.facebook.com/profile.php?id=61562826010963",
    linkedin:
      "https://www.linkedin.com/company/wedfield-male-female-singer/about/",
    youtube:
      "https://www.youtube.com/playlist?list=PLoH-5JAhl1QLgEP4b4GpVbRtPDur6_2IF",
  },
  // "Bride and Groom Entry": {
  //   instagram: "https://www.instagram.com/wedfield_brideandgroomentry/",
  //   facebook: "https://www.facebook.com/profile.php?id=61563041864847",
  //   youtube:
  //     "https://www.youtube.com/playlist?list=PLoH-5JAhl1QKDGVo7DIwDKLQE-GnTkuQa",
  //   linkedin: null, // No LinkedIn link provided
  // },
};

const MusicAndDanceDetail = ({ alldata, SimilarProd }) => {

  
  const [open1, setOpen1] = useState(false);

  const [form, setform] = useState({
    name: "",
    number: "",
    slot: "",
    address: "",
    otherRequrements: "",
    paymentType: "full",
    people: "",
    type: "",
    location: "",
    eventDate: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedValue, setSelectedValue] = React.useState("full");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setform({ ...form, paymentType: event.target.value });
  };
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  const [venueHeaderToggle, setvenueHeaderToggle] = useState("Plans");
  const [play, setPlay] = useState("");
  const [deleteWishList] = useDeleteWishListMutation();
  const [addWishList] = useAddWishListMutation();
  const globleuser = useSelector(selectUser);
  const data = alldata;
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  const [size, setSize] = useState("Small");

  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const router = useRouter();
  const [isWishlist, setIsWishList] = useState(false);
  const [wishList, setWishList] = useState(false);
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
    height: "100%",
  };
  const [getOneMesbyTwoIds] = useGetOneMesbyTwoIdsMutation();

  const [allSimilarProd, setAllSimilarProd] = useState([
    ...JSON.parse(SimilarProd).data,
  ]);
  const { id } = router.query;

  const { innerWidth } = useWindowSize();
  const slider = useRef();
  const [initialSlide, setInitialSlide] = useState();
  const [updated, setUpdate] = useState(false);

  const [oneReview, setOneReview] = useState();
  const [reviewData, setReviewData] = useState({ averageReview: 0 });
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
  const [createInhouseforOthers] = useCreateOppforOthersMutation();

  const [checkOut] = useCheckOutMutation();
  const { data: checkOutKey } = useCheckOutKeyQuery();
  useEffect(() => {
    reviewRefetch();
    const getData = async () => {
      const result = allReview;
      if (result?.data) {
        const totalReviews = result?.data?.length;
        const totalStars = result?.data?.reduce((total, val) => {
          return total + val.rating;
        }, 0);
        let averageReview = Math.round((totalStars / totalReviews) * 100) / 100;
        setReviewData({
          reviews: [...result?.data],
          totalReviews,
          averageReview: !averageReview ? 0 : averageReview,
        });
      }
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
      setIsWishList(checkWihlist?.success);
      res?.data?.success && setWishList(res?.data?.data[0]);
    };
    if (globleuser) get();
  }, [data?.name, updated]);

  const [page1, setPage1] = useState(0);
  const [limit, setLimit] = useState();
  const [fetchData] = useLazyGetAllVendorQuery();

  useEffect(() => {
    if (page1 > 0) {
      (async () => {
        const d = await fetchData({
          category: data?.category,
          subCategory: data?.subCategory,
          subSubCategory: data?.subSubCategory,
          page: page1 + 1,
          isUser: globleuser ? globleuser?.data?._id : undefined,
        });
        let newData = allSimilarProd.concat(d?.data.data);
        newData = newData.filter((val) => val._id !== data?.id);
        setAllSimilarProd(newData);
      })();
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
    Description: false,
  });
  const [openReview, setOpenReview] = useState(false);
  const style = {
    position: "absolute",
    top: innerWidth > 900 ? "190px" : "50%",
    left: "50%",
    transform: innerWidth > 900 ? "translateX(-50%)" : "translate(-50%,-50%)",
    width: innerWidth >= 1400 ? "50%" : "95%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    padding: innerWidth <= 900 ? "10px" : "32px",
    borderRadius: "10px",
    height: "fit-content",
    maxHeight: "70vh",
    overflow: "scroll",

    // paddingTop: "270px",
    zIndex: "-1",
  };
  const [showContact, setShowContact] = useState(false);
  const [existingContact, setExistingContact] = useState([]);
  const { data: getoneContact, refetch: contactRefetch } =
    useGetOneContactQuery({
      prospectId: globleuser?.data?._id,
      vendorId: data?._id,
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
    <>
      <Head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <div className={`${styles.mainbody} music-and-dance-xpefdst`}>
        <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
        <Modal
          open={open1}
          onClose={() => {
            setOpen1(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ThemeProvider theme={theme}>
            <Box sx={style}>
              <div
                className={styles.mainModaldiv}
                style={{ position: "relative" }}
              >
                <span
                  className={styles.seemoreX}
                  onClick={() => {
                    setOpen1(false);
                  }}
                >
                  <img
                    src={`${S3PROXY}/public/images/webp/Vector12.webp`}
                    alt=""
                  />
                </span>
                <div className={styles.seemorehead}>Confirm order</div>
              </div>
              <div className={styles.bodyy}>
                <div className={styles.bodyy_1}>
                  <div className={styles.modal1stleftdiv}>
                    <span style={{ fontWeight: "600", color: "#828282" }}>
                      select location
                    </span>
                    <FormControl fullWidth>
                      <Select
                        native
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={form.location}
                        label=""
                        onChange={(e) => {
                          setform((val) => ({
                            ...val,
                            location: e.target.value,
                          }));
                        }}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                        }}
                      >
                        <option value="">select</option>
                        {newLocations.map((data, key) => {
                          return (
                            <option value={data.id}>{data.location}</option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <TextField
                    value={form.otherRequrements}
                    onChange={(e) => {
                      setform({ ...form, otherRequrements: e.target.value });
                    }}
                    multiline
                    id="standard-number"
                    label={
                      <span
                        style={{
                          // fontSize: "20px",
                          color: "#828282",
                          fontWeight: "600",
                        }}
                      >
                        Any requirement or specific preferences
                      </span>
                    }
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />{" "}
                  <TextField
                    value={form.address}
                    onChange={(e) => {
                      setform({ ...form, address: e.target.value });
                    }}
                    type="number"
                    multiline
                    id="standard-number"
                    label={
                      <span
                        style={{
                          // fontSize: "20px",
                          color: "#828282",
                          fontWeight: "600",
                        }}
                      >
                        Venue
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    value={form.name}
                    onChange={(e) => {
                      setform({ ...form, name: e.target.value });
                    }}
                    id="standard-number"
                    label={
                      <span
                        style={{
                          // fontSize: "20px",
                          color: "#828282",
                          fontWeight: "600",
                        }}
                      >
                        Name
                      </span>
                    }
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    value={form.number}
                    onChange={(e) => {
                      setform({ ...form, number: e.target.value });
                    }}
                    id="mobile"
                    label={
                      <span
                        style={{
                          // fontSize: "20px",
                          color: "#828282",
                          fontWeight: "600",
                        }}
                      >
                        Mobile Number
                      </span>
                    }
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </div>
              </div>
              <div className={styles.bodyDivs2}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: innerWidth <= 600 ? "1fr " : "1fr 1fr",
                  }}
                  className={styles.modalMainbodyMain}
                >
                  <div className={styles.modalMainbody}>
                    <div className={styles.radiodiv1}>
                      <article>
                        <Radio
                          {...controlProps("full")}
                          sx={{
                            color: pink[800],
                            "&.Mui-checked": {
                              color: pink[600],
                            },
                          }}
                        />
                        <span>
                          Pay full amount and get{" "}
                          <span style={{ color: "#e72e77" }}>5% off</span>
                          <span> ₹{totalPrice - (totalPrice * 5) / 100}</span>
                        </span>
                      </article>
                    </div>
                    <div className={styles.radiodiv1}>
                      <article>
                        <Radio
                          {...controlProps("50%")}
                          sx={{
                            color: pink[800],
                            "&.Mui-checked": {
                              color: pink[600],
                            },
                          }}
                        />
                        <span>
                          Pay 50% now and 50% later and get{" "}
                          <span style={{ color: "#e72e77" }}> 3% off</span>
                        </span>
                        <span> ₹{totalPrice / 2 - (totalPrice * 3) / 100}</span>
                      </article>
                    </div>
                    <div className={styles.radiodiv1}>
                      <article>
                        <Radio
                          {...controlProps("30%")}
                          sx={{
                            color: pink[800],
                            "&.Mui-checked": {
                              color: pink[600],
                            },
                          }}
                        />
                        <span>
                          Pay 30% now, 50% 1 week before Event & 20% at time of
                          Deliverable
                        </span>
                        <span> ₹{totalPrice * 0.3}</span>
                      </article>
                    </div>
                  </div>
                  <div className={styles.tail1}>
                    <div className={styles["tail-right"]}>
                      <div className={styles.first}>
                        <span>TOTAL</span>
                        <div>
                          ₹{" "}
                          {form.paymentType === "full"
                            ? totalPrice - (totalPrice * 5) / 100
                            : form.paymentType === "50%"
                            ? totalPrice / 2 - (totalPrice * 3) / 100
                            : form.paymentType === "30%" && totalPrice * 0.3}
                        </div>
                      </div>
                      <button
                        className={styles.button2}
                        onClick={async () => {
                          try {
                            await otherserviceval.validate(form);
                            const user = globleuser?.data;
                            if (!user) {
                              router.push("/customer-login");
                              dispatch(
                                loginRoute({
                                  pathname: router.pathname,
                                  query: router.query,
                                })
                              );
                            } else {
                              const discount =
                                form.paymentType === "full"
                                  ? (totalPrice * 5) / 100
                                  : form.paymentType === "50%"
                                  ? (totalPrice * 3) / 100
                                  : form.paymentType === "30%" && 0;
                              const paid =
                                form.paymentType === "full"
                                  ? totalPrice - (totalPrice * 5) / 100
                                  : form.paymentType === "50%"
                                  ? totalPrice / 2 - (totalPrice * 3) / 100
                                  : form.paymentType === "30%" &&
                                    totalPrice * 0.3;

                              try {
                                const { data: amountData } = await checkOut({
                                  price: paid,
                                });
                                const { data: keyData } = { data: checkOutKey };
                                const data = {
                                  name: form.name,
                                  number: form.number,
                                  address: form.address,
                                  city: form.location,
                                  requirments: form.otherRequrements,
                                  eventDate: form.eventDate,
                                  data: alldata[0],
                                  type: alldata[0].subCategory,
                                  vendor_id: alldata[0]._id,
                                  totalPayment: totalPrice,
                                  paidPayment: paid,
                                  qauntity: 1,
                                  remainingpayment:
                                    totalPrice - paid - discount,
                                  discount,
                                  paymentType: form.paymentType,
                                  status: "initiated",
                                };
                                const res1 = await createInhouseforOthers(data);

                                if (res1?.data) {
                                  const options = {
                                    key: keyData?.key,
                                    amount: amountData?.amount,
                                    currency: "INR",
                                    name: "WedField",
                                    description: "Test Transaction",
                                    image: "./assests/webp/logo.webp",
                                    order_id: amountData?.id,
                                    // callback_url: `${PROXY}/api/v1/verify/payment`,
                                    prefill: {
                                      name: form.name,
                                      contact: form.number,
                                    },
                                    notes: {
                                      _id: res1?.data?.venues?._id,
                                      type: "product purchase",
                                      address: form.address,
                                    },
                                    theme: {
                                      color: "#3399cc",
                                    },
                                    handler: async (res) => {},
                                  };
                                  var rzp1 = window && new Razorpay(options);
                                  rzp1 && rzp1.open();
                                }
                              } catch (error) {
                                console.error(error);
                              }
                            }
                          } catch (e) {
                            toast.error(`${e}`, {
                              position: "top-right",
                              autoClose: 2000,
                            });
                          }
                        }}
                      >
                        Pay to Proceed
                      </button>
                      <div className={styles.radiodiv2}>
                        <article>
                          <Checkbox
                            sx={{
                              color: pink[800],
                              "&.Mui-checked": {
                                color: pink[600],
                              },
                            }}
                          />
                          <span>I agree to term & conditions</span>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </ThemeProvider>
        </Modal>
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
            <Icon
              onClick={() => router.back()}
              icon={"icon-park-outline:back"}
            />
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
                        bannerImage: data?.mainImage,
                        size: size,
                        exclusive: data?.popular,
                        category: data?.category,
                        link: `/music-and-dance/${data?.name
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
                  {/* {data?.vidLinks?.map((data, key) => {
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
                })} */}
                  {data?.vidLinks?.map((item, index) => {
                    let url;
                    const id = extractYouTubeId(item);
                    if (id) {
                      url = `https://img.youtube.com/vi/${id}/default.jpg`;
                    } else {
                      url = `${S3PROXY}/public/Layout/logo.svg`;
                    }
                    return (
                      <div
                        className={styles.cardInnimg}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          // height: "600px",
                          position: "relative",
                        }}
                        onClick={() => {
                          slider.current.slickGoTo(index);
                          setPlay(undefined);
                        }}
                      >
                        <img
                          src={`${url}`}
                          alt=""
                          // onClick={() => {
                          //   slider.current.slickGoTo(key);
                          // }}
                        />
                        <YouTubeIcon
                          fontSize="large"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            zIndex:
                              "9                                                                                                                                                                                                                                                     ",
                            color: "red",
                            height: "50px",
                            width: "100px",
                          }}
                        ></YouTubeIcon>
                      </div>
                    );
                  })}
                </div>
                <Slider {...settings} ref={slider}>
                  {data?.vidLinks?.map((item, index) => {
                    return (
                      <div
                        className="hello-world"
                        style={{
                          width: "100% !important",
                          height: "100% !important",
                        }}
                      >
                        <ReactPlayer
                          url={item}
                          playing={index == play}
                          onPlay={() => {
                            setPlay(index);
                            // setTimeout(() => {
                            //   setMuted(false);
                            // }, 500);
                          }}
                          onPause={() => {
                            setPlay(undefined);
                            // setMuted(true);
                          }}
                          style={{
                            width: "100% !important",
                            height: "100% !important",
                          }}
                          controls
                          volume={1}
                          muted={true}
                        />
                        {/* <img
                        src={`${S3PROXY}${item}`}
                        alt=""
                        onClick={() => {
                          setInitialSlide(index);
                          setSelectedImage([...data?.images]);
                          setOpenImage(true);
                        }}
                      /> */}
                      </div>
                    );
                  })}
                  {/* {data?.videos?.map((item, index) => {
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
                })} */}
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
                                price: data?.price,
                                type: "Vendor",
                                bannerImage: data?.mainImage,
                                size: size,
                                exclusive: data?.popular,
                                category: data?.category,
                                link: `/music-and-dance/${data?.name
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
                  <StarRatings
                    starDimension="15px"
                    starSpacing="0px"
                    starRatedColor="#F9DE50"
                    numberOfStars={5}
                    // rating={4}
                    rating={reviewData?.averageReview}
                  ></StarRatings>
                  <span style={{ fontSize: "14px" }}>
                    ({reviewData?.totalReviews} Reviews)
                  </span>
                </article>
                <div className={styles.loc}>
                  <img src={`${S3PROXY}/public/Detail/loc.png`} alt="" />
                  <span>{data?.city}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "100px",
                  }}
                >
                  <span className={styles.prdctprice}>₹{data.price}</span>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      height: "52px",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "end",
                    }}
                    className={styles["social-icon-container-mobile"]}
                  >
                    {socialLinks[data?.subCategory]?.instagram && (
                      <a
                        href={socialLinks[data?.subCategory]?.instagram}
                        target="_blank"
                      >
                        <img
                          src={`${S3PROXY}/public/icons/instagram.png`}
                          height={25}
                          width={25}
                        ></img>
                      </a>
                    )}

                    {socialLinks[data?.subCategory]?.facebook && (
                      <a
                        href={socialLinks[data?.subCategory]?.facebook}
                        target="_blank"
                      >
                        <img
                          src={`${S3PROXY}/public/icons/facebook.png`}
                          height={25}
                          width={25}
                        ></img>
                      </a>
                    )}
                    {socialLinks[data?.subCategory]?.linkedin && (
                      <a
                        href={socialLinks[data?.subCategory]?.linkedin}
                        target="_blank"
                      >
                        <img
                          src={`${S3PROXY}/public/icons/linkedin.png`}
                          height={25}
                          width={25}
                        ></img>
                      </a>
                    )}
                    {socialLinks[data?.subCategory]?.youtube && (
                      <a
                        href={socialLinks[data?.subCategory]?.youtube}
                        target="_blank"
                      >
                        <img
                          src={`${S3PROXY}/public/icons/youtube.png`}
                          height={25}
                          width={25}
                        ></img>
                      </a>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    margin: "20px 0px",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    style={{
                      fontSize: "12px",
                    }}
                    className={styles.buyNow}
                    onClick={async () => {
                      const userdata = JSON.parse(
                        localStorage.getItem("wedfield")
                      )?.data;
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
                        const result = await addContact(body);
                        if (result.data?.success) {
                          socketRef.current.emit("initiateChat", {
                            id: data?._id,
                          });
                          const result = await getOneMesbyTwoIds({
                            prospectId: userdata?._id,
                            vendorId: data?._id,
                          });
                          console.log(result, "hello");
                          if (result?.data[0]?._id) {
                            router.push(
                              `/user-dashboard/Message?id=${result?.data[0]?._id}`
                            );
                          }
                        }
                        // }
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
                    Talk to Expert
                  </button>
                  <div
                    className={styles.modal1stleftdiv}
                    style={{
                      width: "200px",
                      maxWidth: "49%",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{
                          "& .MuiInputBase-root": {
                            borderRadius: "27px !important",
                            color: "#b6255a ",
                            height: "36px",
                            width: "100%",
                          },
                          "& .MuiSvgIcon-root": {
                            color: "#b6255a ",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#b6255a !important",
                          },
                        }}
                        shouldDisableDate={(date) => {
                          const isDate = alldata[0]?.bookedDate?.find(
                            (datee) => {
                              return date.isSame(dayjs(datee));
                            }
                          );
                          if (isDate) {
                            return true;
                          }
                          return date.isBefore(dayjs().subtract(1, "day"));
                        }}
                        slotProps={{
                          popper: {
                            className: "edededf",
                            sx: {
                              "& .MuiCalendarPicker-root": {
                                border: "2px solid #b6255a !important", // Border around the calendar popup
                                backgroundColor: "#fff !important", // Background color of the popup
                              },
                              "& .MuiPickersPopper-paper": {
                                borderRadius: "16px !important", // Rounded corners for the popup
                              },
                              "& .MuiPickersCalendarHeader-labelContainer": {
                                color: "#b6255a !important",
                              },
                              "& .Mui-disabled:not(.Mui-selected)": {
                                color: "#f0b5c5 !important",
                              },
                              "& .MuiPickersDay-root": {
                                color: "#333 !important", // Default color for day numbers
                                "&.Mui-selected": {
                                  backgroundColor: "#b6255a !important", // Selected day background color
                                  color: "#fff !important",
                                  borderRadius: "8px !important",
                                  // Selected day text color
                                },
                                "&:hover": {
                                  backgroundColor: "#f0b5c5 !important", // Hover color for day numbers
                                  color: "#fff !important",
                                  borderRadius: "8px !important",
                                },
                              },
                              "& .MuiPickersDay-today": {
                                borderColor: "#b6255a !important", // Border color for today's date
                                color: "#b6255a !important",
                                borderRadius: "8px !important",
                              },
                              "& .MuiPickersArrowSwitcher-root .MuiButtonBase-root":
                                {
                                  color: "#b6255a !important", // Color of the month navigation arrows
                                },
                              "& .MuiTypography-root": {
                                color: "#333 !important", // Color of month and year text
                              },
                            },
                          },
                          mobilePaper: {
                            className: "edededf",
                            sx: {
                              "& .MuiCalendarPicker-root": {
                                border: "2px solid #b6255a !important", // Border around the calendar popup
                                backgroundColor: "#fff !important", // Background color of the popup
                              },
                              "& .MuiPickersPopper-paper": {
                                borderRadius: "16px !important", // Rounded corners for the popup
                              },
                              "& .MuiPickersCalendarHeader-labelContainer": {
                                color: "#b6255a !important",
                              },
                              "& .Mui-disabled:not(.Mui-selected)": {
                                color: "#f0b5c5 !important",
                              },
                              "& .MuiPickersLayout-toolbar span,.MuiPickersLayout-toolbar h4":
                                {
                                  color: "#b6255a !important",
                                },
                              "& .MuiDialogActions-root button": {
                                color: "#b6255a !important",
                              },
                              "& .MuiPickersDay-root": {
                                color: "#333 !important", // Default color for day numbers
                                "&.Mui-selected": {
                                  backgroundColor: "#b6255a !important", // Selected day background color
                                  color: "#fff !important",
                                  borderRadius: "8px !important",
                                  // Selected day text color
                                },
                                "&:hover": {
                                  backgroundColor: "#f0b5c5 !important", // Hover color for day numbers
                                  borderRadius: "8px !important",
                                },
                              },
                              "& .MuiPickersDay-today": {
                                borderColor: "#b6255a !important", // Border color for today's date
                                borderRadius: "8px !important",
                              },
                              "& .MuiPickersArrowSwitcher-root .MuiButtonBase-root":
                                {
                                  color: "#b6255a !important", // Color of the month navigation arrows
                                },
                              "& .MuiTypography-root": {
                                color: "#333 !important", // Color of month and year text
                              },
                            },
                          },
                        }}
                        // slots={{
                        //   popper: (d) => {
                        //     console.log(
                        //       "🚀 ~ file: MusicAndDanceDetail.jsx:1462 ~ onClick={ ~ d:",
                        //       d
                        //     );
                        //     return (
                        //       <Popper open={d.open} anchorEl={d.anchorEl}>
                        //         {d.children}{" "}
                        //       </Popper>
                        //     );
                        //   },
                        // }}
                        defaultValue={dayjs(form.eventDate)}
                        value={dayjs(form.eventDate)}
                        onChange={(e) => {
                          if (globleuser) {
                            setform({
                              ...form,
                              eventDate: e.$d,
                            });
                            setTotalPrice(alldata[0].price);
                          } else {
                            setOpenLoginModal(true);
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                {form.eventDate ? (
                  <div className={styles.tail1}>
                    <div className={styles["tail-right"]}>
                      <div className={styles.first}>
                        <span>TOTAL : ₹ {totalPrice}</span>
                      </div>
                      <button
                        className={styles.button}
                        onClick={() => {
                          setOpen1(true);
                        }}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        {innerWidth <= 900 ? (
          <div className={styles.drops}>
            {[
              {
                name: "Plans",
                content: (
                  <div>
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
                ),
              },
              {
                name: "Description",
                content: (
                  <div className={styles.prdctdetail}>
                    <div className={styles.fulldetails1}>
                      <div
                        className={`${styles.rightsec1} productRightsec1234567890`}
                      >
                        <span className={styles.manufacturerDetailspan}>
                          {data?.description}
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
                  <span
                    onClick={() => setDrop({ ...drop, [name]: !drop[name] })}
                  >
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
                  {["Plans", "Description", "Reviews"].map((val, key) => {
                    return (
                      <span
                        key={key}
                        style={{
                          height: "35px",
                          borderBottom:
                            venueHeaderToggle === val
                              ? "3px solid #B6255A"
                              : "",
                          color: venueHeaderToggle === val ? " #B6255A" : "",
                        }}
                        onClick={() => setvenueHeaderToggle(val)}
                      >
                        {val}
                      </span>
                    );
                  })}
                </article>
                {venueHeaderToggle === "Plans" ? (
                  <Slide
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    direction="right"
                    in={venueHeaderToggle === "Plans"}
                    mountOnEnter
                    unmountOnExit
                  >
                    <div>
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
                {venueHeaderToggle === "Description" ? (
                  <Slide
                    direction="right"
                    in={venueHeaderToggle === "Description"}
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
                        <div
                          className={`${styles.rightsec1} productRightsec1234567890`}
                        >
                          <span className={styles.manufacturerDetailspan}>
                            Description
                          </span>
                          <span className={styles.manufacturername}>
                            {data?.description}
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
                              {reviewData.reviews?.map((items) => {
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
                  {reviewData.reviews?.map((items) => {
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
                  key={key}
                  style={{
                    margin: "15px",
                    height: "92%",
                  }}
                >
                  <OtherProductCards data={datas} />
                </div>
              );
            })}
          </Carousal>
        </div>
      </div>
    </>
  );
};

export default MusicAndDanceDetail;
