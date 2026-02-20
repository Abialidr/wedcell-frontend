import React, { useState, useContext, useEffect } from "react";
import styles from "./products.module.scss";
import StarRatings from "react-star-ratings";
import useWindowSize from "@rooks/use-window-size";
import Slider from "react-slick";
import axios from "axios";
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { RightArrow1 } from "Components/common/DetailPageCommonComp";
import LoginModal from "Components/CustomerLogin/LoginModal";
import {
  Box,
  Button,
  Checkbox,
  createTheme,
  FormControl,
  Modal,
  Radio,
  Select,
  Slide,
  TextField,
  ThemeProvider,
} from "@mui/material";
import Reviews from "../../writeReviewCard/Reviews.jsx";
import ReviewCard from "../../writeReviewCard/ReviewCard.jsx";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
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
  useGetAllOtherProductQuery,
  useLazyGetAllOtherProductQuery,
} from "redux/Api/common.api";
import {
  useGetAllQualityQuery,
  useGetOneReviewQuery,
  useGetallReviewsQuery,
} from "redux/Api/reviews.api";
import Carousal from "Components/Landing Page/Carousel/Index";
import { Icon } from "@iconify/react";
import { io } from "socket.io-client";
import moment from "moment";
import OtherProductCards from "Components/Cards/OtherProductCard";
import { PROXY, S3PROXY } from "../../../config/index.js";
import ImageBackground from "Components/common/ImageBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pink } from "@mui/material/colors";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { otherserviceval } from "yupValidation/inhouseValidation";
import { useCheckOutKeyQuery, useCheckOutMutation } from "redux/Api/others.api";
import { useCreateOppforOthersMutation } from "redux/Api/intheHouse.api";
import Head from "next/head";
import { newLocations } from "constants/colors";

const socialLinks = {
  Invites: {
    instagram: "https://www.instagram.com/wedfield_invitationcard/",
    facebook: "https://www.facebook.com/profile.php?id=61561414647626",
    linkedin: "https://www.linkedin.com/company/wedfield-invitationcard",
    contact: "tel:919910990568",
    WhatsApp: "https://wa.me/919910990568",
    youtube:
      "https://www.youtube.com/playlist?list=PLoH-5JAhl1QJ6ihXNQ_5ilRdt6Vrdb644",
  },
  Gifts: {
    instagram: "https://www.instagram.com/wedfield_invitationgift/",
    facebook: "https://www.facebook.com/profile.php?id=61562475579132",
    linkedin: "https://www.linkedin.com/company/wedfield-invitation-gift",
    contact: "tel:919910990568",
    WhatsApp: "https://wa.me/919910990568",
    youtube:
      "https://www.youtube.com/playlist?list=PLoH-5JAhl1QJluhAPFJaGxELcYHRPGF1m",
  },
  Cake: {
    instagram: "https://www.instagram.com/wedfield_cake/", // No Instagram link provided
    facebook: "https://www.facebook.com/profile.php?id=61562797681298", // No Facebook link provided
    contact: "tel:917033044151",
    WhatsApp: "https://wa.me/917033044151",
    youtube:
      "https://www.youtube.com/playlist?list=PLoH-5JAhl1QKI_vrmbdueLRosE5h7Dh0r",
    linkedin: null, // No LinkedIn link provided
  },
};
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

const OtherProductsDetail = ({ alldata, link, SimilarProd }) => {
  

  const divisible = link === "cake" ? 1 : 50;
  const globleuser = useSelector(selectUser);
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  const [checkOut] = useCheckOutMutation();
  const { data: checkOutKey } = useCheckOutKeyQuery();
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
  const [venueHeaderToggle, setvenueHeaderToggle] = useState("Included item");
  const [countcart, setCountCart] = useState(0);
  const [countcart2, setCountCart2] = useState(0);
  const [open1, setOpen1] = useState(false);
  const data = alldata;

  const [deleteWishList] = useDeleteWishListMutation();
  const [addWishList] = useAddWishListMutation();

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
  const [fetchData] = useLazyGetAllOtherProductQuery();
  useEffect(() => {
    if (page1 > 0) {
      (async () => {
        const d = await fetchData({
          category: data?.category,
          page: page1 + 1,
          isUser: globleuser ? globleuser?.data?._id : undefined,
        });
        let newData = allSimilarProd.concat(d?.data.data);
        newData = newData.filter((val) => val._id !== data?.id);
        setAllSimilarProd(newData);
      })();
    }
  }, [page1]);
  const [limit, setLimit] = useState();

  // useEffect(() => {
  //   if (venueData) {

  //   }
  // }, [venueData]);

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
    width: innerWidth >= 900 ? "50%" : "95%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    padding: innerWidth <= 900 ? "10px" : "32px",
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
      vendorId: data?.vendorDetails?._id,
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
      <div className={styles.mainbody}>
        <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
        <Modal
          open={open1}
          onClose={() => {
            setOpen1(false);
          }}
          style={{
            top: "20%",
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
                  <div className={styles.modal1stleftdiv} style={{}}>
                    <span style={{ fontWeight: "600", color: "#828282" }}>
                      Select Date
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        style={{ width: "100%" }}
                        fullWidth
                        defaultValue={dayjs(form.eventDate)}
                        onChange={(e) =>
                          setform({
                            ...form,
                            eventDate: e.$d,
                          })
                        }
                      />
                    </LocalizationProvider>
                  </div>
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
                        className={styles.button}
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
                                  type: link,
                                  eventDate: form.eventDate,
                                  data: alldata.product,
                                  type: link,
                                  vendor_id: alldata.product.vendorId,
                                  qauntity: countcart,
                                  totalPayment: totalPrice,
                                  paidPayment: paid,
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
                        type: "Product",
                        bannerImage: data?.mainImages,
                        size: "",
                        exclusive: data?.popular,
                        category: data?.category,
                        link: `/other-products/${data?.name
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
                className={`${styles.imgcontainer} VenueImageContainer1234567892 albumBigSlider12345678902`}
              >
                {/* <div className={`${styles.firstDiv}`}>
                {data?.images?.map((data, key) => {
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
                {data?.videos?.map((item, index) => {
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
                        slider.current.slickGoTo(data?.images.length + index);
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
              </div> */}
                <Slider {...settings} ref={slider}>
                  {data?.images?.map((item, index) => {
                    return (
                      <>
                        <ImageBackground
                          image={`${item}`}
                          className={styles.imageBackground}
                        >
                          <img
                            src={`${S3PROXY}${item}`}
                            alt=""
                            onClick={() => {
                              setInitialSlide(index);
                            }}
                          />
                        </ImageBackground>
                      </>
                    );
                  })}
                  {data?.videos?.map((item, index) => {
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
                            url={`${S3PROXY}${item}`}
                            controls
                            width={"100%"}
                            height={"auto"}
                          ></ReactPlayer>
                        </div>
                      </div>
                    );
                  })}
                  {data?.vidLinks?.map((item, index) => {
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
                            height={"100%"}
                            volume={1}
                            muted
                          ></ReactPlayer>
                        </div>
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
                {/* <div className={styles.prdctname124}>
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
                                type: "Product",
                                bannerImage: data?.mainImages,
                                size: size,
                                exclusive: data?.popular,
                                category: data?.category,
                                link: `/other-products/${data?.name
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
                </div> */}
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
                    gap: innerWidth <= 450 ? "40px" : "100px",
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
                    {socialLinks[data?.category]?.instagram && (
                      <a
                        href={socialLinks[data?.category]?.instagram}
                        target="_blank"
                      >
                        <img
                          src={`${S3PROXY}/public/icons/instagram.png`}
                          height={25}
                          width={25}
                        ></img>
                      </a>
                    )}

                    {socialLinks[data?.category]?.facebook && (
                      <a
                        href={socialLinks[data?.category]?.facebook}
                        target="_blank"
                      >
                        <img
                          src={`${S3PROXY}/public/icons/facebook.png`}
                          height={25}
                          width={25}
                        ></img>
                      </a>
                    )}
                    {socialLinks[data?.category]?.linkedin && (
                      <a
                        href={socialLinks[data?.category]?.linkedin}
                        target="_blank"
                      >
                        <img
                          src={`${S3PROXY}/public/icons/linkedin.png`}
                          height={25}
                          width={25}
                        ></img>
                      </a>
                    )}
                    {socialLinks[data?.category]?.youtube && (
                      <a
                        href={socialLinks[data?.category]?.youtube}
                        target="_blank"
                      >
                        <img
                          src={`${S3PROXY}/public/icons/youtube.png`}
                          height={25}
                          width={25}
                        ></img>
                      </a>
                    )}
                    {socialLinks[data?.category]?.WhatsApp && (
                      <a
                        href={socialLinks[data?.category]?.WhatsApp}
                        target="_blank"
                      >
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
                    )}
                    {socialLinks[data?.category]?.contact && (
                      <a
                        href={socialLinks[data?.category]?.contact}
                        target="_blank"
                      >
                        <FontAwesomeIcon
                          color="#b6255a"
                          icon="fa-solid fa-phone"
                          style={{
                            height: "25px",
                            width: "25px",
                          }}
                        ></FontAwesomeIcon>
                      </a>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: innerWidth > 900 ? "start" : "start",
                    margin: "20px 0px",
                    alignItems: "start",
                    gap: "10px",
                    // flexDirection: innerWidth > 900 ? "row" : "column",
                    flexWrap: "wrap",
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
                        vendorName: data?.vendorDetails?.name,
                        vendorId: data?.vendorDetails?._id,
                        vendorContact: data?.vendorDetails?.mobile,
                        vendorType: "product",
                        vendorImage: data?.vendorDetails?.profile_pic,
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
                              id: data?.vendorDetails?._id,
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
                    Talk to Experts
                  </button>
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
                        setCountCart(divisible);
                        setCountCart2(divisible);
                        setTotalPrice(divisible * data.price);
                      } else {
                        setOpenLoginModal(true);
                      }
                    }}
                  >
                    {countcart >= divisible ? (
                      <div style={{ display: "flex", width: "100%" }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            setCountCart((val) => {
                              if (val <= divisible) {
                                setTotalPrice(0);
                                setCountCart2(0);
                                return 0;
                              } else {
                                setTotalPrice((val - 1) * data.price);
                                setCountCart2(val - 1);
                                return val - 1;
                              }
                            });
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
                        <input
                          type="number"
                          value={countcart2}
                          onBlur={(e) => {
                            if (e.target.value < divisible) {
                              setCountCart2(divisible);
                              setTotalPrice(divisible * data.price);
                              setCountCart(divisible);
                            } else {
                              setCountCart(parseInt(e.target.value));
                              setTotalPrice(
                                parseInt(e.target.value) * data.price
                              );
                            }
                          }}
                          onChange={(e) => {
                            setCountCart2(parseInt(e.target.value));
                            setTotalPrice(
                              parseInt(e.target.value) * data.price
                            );
                          }}
                        ></input>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCountCart((countcart) => {
                              setTotalPrice((countcart + 1) * data.price);
                              setCountCart2(countcart + 1);
                              return countcart + 1;
                            });
                          }}
                          disabled={countcart >= data?.quantity}
                          style={{
                            border: "none",
                            background: "none",
                            width: "100%",
                            color:
                              countcart >= data?.quantity
                                ? "#ffffff"
                                : "#b6255a",
                          }}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                  {totalPrice ? (
                    <div className={styles.tail1}>
                      <div className={styles["tail-right"]}>
                        <div className={styles.first}>
                          <span>TOTAL</span>
                          <div>₹ {totalPrice}</div>
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
        </div>
        {innerWidth <= 900 ? (
          <div className={styles.drops}>
            {[
              {
                name: "Included item",
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
                name: "About",
                content: (
                  <div className={styles.prdctdetail}>
                    <div className={styles.fulldetails1}>
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
                  {["Included item", "About", "Reviews"].map((val, key) => {
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
                {venueHeaderToggle === "Included item" ? (
                  <Slide
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    direction="right"
                    in={venueHeaderToggle === "Included item"}
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
              <RightArrow1 setPage={setPage} limit={limit} page1={page1} />
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
                  <OtherProductCards data={datas} link={link} />
                </div>
              );
            })}
          </Carousal>
        </div>
      </div>
    </>
  );
};

export default OtherProductsDetail;
