import React, { useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import {
  Modal,
  Box,
  TextField,
  Radio,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
  Autocomplete,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-solid-svg-icons";
// import { FaWhatsapp } from "react-icons/fa";
import ReactPlayer from "react-player";
import { otherserviceval } from "../../yupValidation/inhouseValidation";
import { newLocations } from "../../constants/colors";
import useWindowSize from "@rooks/use-window-size";
import { pink } from "@mui/material/colors";
import {
  useCreateInhouseforOthersMutation,
  useGetForAllInhouseQuery,
} from "../../redux/Api/intheHouse.api";
import {
  useCheckOutKeyQuery,
  useCheckOutMutation,
} from "../../redux/Api/others.api";
import { loginRoute, selectUser } from "../../redux/reducer/appEssentials";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { YouTube } from "@mui/icons-material";
import { extractYouTubeId } from "../../helper";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import { v4 as uuidv4 } from "uuid";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { S3PROXY } from "../../config";
import { MetaTags } from "Components/common/DetailPageCommonComp";

const number = {
  photography: "9910990378",
  mehendi: "919910990613",
  makeup: "919910990613",
};

const metaTags = {
  photography: {
    description:
      "Capture your wedding's finest moments with WedField Photography, featuring the best wedding photographers in Delhi, Jaipur, and Udaipur. Specializing in high-quality, elegant wedding photography, we bring creativity and expertise to every shot. Book now for unforgettable wedding memories.",
    title:
      "Best Wedding Photographer - Top Wedding Photographers in Delhi, Jaipur & Udaipur | WedField Photographer",
    url: "https://wedfield.com/photography",
  },
  dhol: {
    description:
      "Book Dhol Players With WedField Events With Perfect for weddings, baraats, and celebrations, our talented dhol artists create a lively atmosphere with powerful beats. Book the best dhol players with WedField for an unforgettable experience.",
    title: "WedField Dhol - Best Dhol Players for Weddings & Events",
    url: "https://wedfield.com/dhol",
  },
  makeup: {
    description:
      "Book the best bridal makeup artists with WedField. Our expert artists specialize in flawless wedding makeup looks, from traditional elegance to modern glamour, ensuring you shine on your special day.",
    title: "Top Bridal Makeup Artists | Wedding Makeup Services by WedField",
    url: "https://wedfield.com/makeup",
  },
  mehendi: {
    description:
      "Book WedField's top mehendi artists for intricate bridal mehendi designs. From traditional to contemporary styles, find the perfect artist to adorn your wedding with beautiful, lasting mehendi.",
    title: "Best Mehendi Artists for Weddings | Bridal Mehendi by WedField",
    url: "https://wedfield.com/mehendi",
  },
};

function Field({
  name,
  price,
  setTotalPrice,
  totalPrice,
  setData,
  customFunction,
  people,
  peoples,
  isPeople,
  type = "normal",
}) {
  const [count, setCount] = useState(0);
  const [peopleCount, setPeopleCount] = useState(0);
  useMemo(() => {
    if (isPeople) {
      const d = peoples?.find((data) => {
        return data[0] === people;
      });
      if (d?.length && parseInt(d[1])) {
        setPeopleCount(parseInt(d[1]));
        setCount(parseInt(d[1]));
        customFunction(setData, parseInt(d[1]), name, price);
        setTotalPrice((val) => val + price * parseInt(d[1]));
      }
    }
  }, [people, peoples]);
  return (
    <div className={styles["field-main"]}>
      <span className={styles["field-main-left"]}>{name}</span>
      {type === "normal" && (
        <div className={styles["field-main-right"]}>
          <span className={styles["span"]}>
            {count == 0 ? price : price * count}
          </span>
          <button className={styles.threeButtons1}>
            <button
              className={styles.threeButtons2}
              style={{
                display: count > 0 ? "block" : "none",
              }}
              onClick={(e) => {
                if (peopleCount && count === peopleCount) {
                  setTotalPrice(
                    (totalPrice) => totalPrice - price * peopleCount
                  );
                  setCount(0);
                  customFunction(setData, count, name, price);
                } else {
                  setTotalPrice((totalPrice) => totalPrice - price);
                  setCount((val) => --val);
                  customFunction(setData, count, name, price);
                }
              }}
            >
              -
            </button>
            <span
              style={{
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              {count === 0 ? "Add" : count}
            </span>
            <button
              className={styles.threeButtons2}
              onClick={() => {
                if (peopleCount && count === 0) {
                  setTotalPrice(
                    (totalPrice) => totalPrice + price * peopleCount
                  );
                  setCount(peopleCount);
                  customFunction(setData, count, name, price);
                } else {
                  const newVal = totalPrice + price;
                  setTotalPrice((totalPrice) => totalPrice + price);
                  setCount((val) => ++val);
                  customFunction(setData, count, name, price);
                }
              }}
            >
              +
            </button>
          </button>
        </div>
      )}
    </div>
  );
}
function Field2({
  name,
  price,
  setTotalPrice,
  totalPrice,
  setData,
  customFunction,
  people,
  peoples,
  isPeople,
  type = "normal",
}) {
  const [count, setCount] = useState(0);
  const [peopleCount, setPeopleCount] = useState(0);
  useMemo(() => {
    if (isPeople) {
      const d = peoples?.find((data) => {
        return true;
      });
      if (d?.length && parseInt(d[1])) {
        setPeopleCount(parseInt(d[1]));
        setCount(parseInt(d[1]));
        customFunction(setData, parseInt(d[1]), name, price);
        setTotalPrice((val) => val + price * parseInt(d[1]));
      }
    }
  }, [people, peoples]);
  return (
    <div className={styles["field-main"]}>
      <span className={styles["field-main-left"]}>{name}</span>
      {type === "normal" && (
        <div className={styles["field-main-right"]}>
          <span className={styles["span"]}>
            {count == 0 ? price : price * count}
          </span>
          <button className={styles.threeButtons1}>
            <button
              className={styles.threeButtons2}
              style={{
                display: count > 0 ? "block" : "none",
              }}
              onClick={(e) => {
                if (peopleCount && count === peopleCount) {
                  setTotalPrice(
                    (totalPrice) => totalPrice - price * peopleCount
                  );
                  setCount(0);
                  customFunction(setData, count, name, price);
                } else {
                  setTotalPrice((totalPrice) => totalPrice - price);
                  setCount((val) => --val);
                  customFunction(setData, count, name, price);
                }
              }}
            >
              -
            </button>
            <span
              style={{
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              {count === 0 ? "Add" : count}
            </span>
            <button
              className={styles.threeButtons2}
              onClick={() => {
                if (peopleCount && count === 0) {
                  setTotalPrice(
                    (totalPrice) => totalPrice + price * peopleCount
                  );
                  setCount(peopleCount);
                  customFunction(setData, count, name, price);
                } else {
                  const newVal = totalPrice + price;
                  setTotalPrice((totalPrice) => totalPrice + price);
                  setCount((val) => ++val);
                  customFunction(setData, count, name, price);
                }
              }}
            >
              +
            </button>
          </button>
        </div>
      )}
    </div>
  );
}
function FieldIncluded({ name, price }) {
  return (
    <div
      className={styles["field-main"]}
      style={{ border: "1px solid #e72e77" }}
    >
      <span className={styles["field-main-left"]}>
        Include : {name} {price && "worth"}{" "}
        {price && <span className={styles["span"]}>{price}</span>}
      </span>
    </div>
  );
}
export function ImgCard({
  val,
  keyy,
  isVideo = false,
  setImg,
  setOpenImage,
  setAlbum,
}) {
  const [url, setUrl] = useState("");
  useMemo(() => {
    const id = extractYouTubeId(`${val.url}`);
    setUrl(`http://img.youtube.com/vi/${id}/hqdefault.jpg`);
  }, []);
  if (isVideo === true) {
    return (
      <div
        className={styles.cardContainer}
        onClick={() => {
          setOpenImage(true);
          setImg(val.url);
        }}
      >
        <article>
          <img src={`${url}`} alt="img" />
          <div className={styles.youtube}>
            <YouTube
              height={"150px"}
              width={"150px"}
              color="red"
              style={{
                height: "50px",
                width: "50px",
                color: "red",
              }}
            />
          </div>
          <span>{val.description}</span>
        </article>
      </div>
    );
  }
  return (
    <div
      className={styles.cardContainer}
      onClick={() => {
        setOpenImage(true);
        if (isVideo === "album") {
          setAlbum(val.value);
          setImg(0);
        } else {
          setImg(keyy);
        }
      }}
    >
      <article>
        <img
          src={
            val.image ? `${S3PROXY}${val.image}` : `${S3PROXY}${val.value[0]}`
          }
          alt="img"
        />
        <span>
          {isVideo === "album" ? val.name : val.description}
          {`${isVideo === "album" ? `(${val.value.length})` : ""}`}
        </span>
      </article>
    </div>
  );
}

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
function AllOtherService({
  name,
  img,
  type,
  isPeople = false,

  isInclude = true,
}) {
  const meta = metaTags[type] || metaTags["photography"];
  const [openImage, setOpenImage] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [image, setImg] = useState("");
  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState([]);
  const [video, setVideo] = useState("");
  const [data12, setData] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedValue, setSelectedValue] = React.useState("full");
  const [createInhouseforOthers] = useCreateInhouseforOthersMutation();
  const { data: inhousedata } = useGetForAllInhouseQuery(type);
  const [checkOut] = useCheckOutMutation();
  const { data: checkOutKey } = useCheckOutKeyQuery();
  const globleuser = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
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
  useEffect(() => {
    const Service = inhousedata?.data?.data[0]?.Service.map((data) => {
      return {
        ...data,
        id: uuidv4(),
      };
    });

    setform((val) => ({
      ...val,
      Service,
    }));
    setTotalPrice(0);
  }, [inhousedata, form.people, form.type]);
  useEffect(() => {
    const IncludedService = inhousedata?.data?.data[0]?.IncludedService.map(
      (data) => {
        return {
          ...data,
          id: uuidv4(),
        };
      }
    );
    setform((val) => ({
      ...val,
      IncludedService,
    }));
  }, [inhousedata]);

  const [open1, setOpen1] = useState(false);
  const { innerWidth: windowWidth } = useWindowSize();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowWidth >= 900 ? "50%" : windowWidth >= 460 ? "95%" : "95%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "50%",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
    maxHeight: "90%",
  };

  return (
    <>
      <MetaTags meta={meta} />
      <Head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <ToastContainer />
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
              <h1 className={styles.h1}>
                Total Service : {Object.entries(data12).length}
              </h1>
              <div className={styles.bodyy_1}>
                <div className={styles.modal1stleftdiv}>
                  <span style={{ fontWeight: "600", color: "#828282" }}>
                    Select Date
                  </span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
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
                    select Slot
                  </span>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={form.slot}
                      label=""
                      onChange={(e) => {
                        setform((val) => ({
                          ...val,
                          slot: e.target.value,
                        }));
                      }}
                    >
                      {["Morning", "Evening"].map((name, key) => {
                        return <MenuItem value={name}>{name}</MenuItem>;
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
                        fontSize: "20px",
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
                        fontSize: "20px",
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
                        fontSize: "20px",
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
                  id="standard-number"
                  label={
                    <span
                      style={{
                        fontSize: "20px",
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
                  gridTemplateColumns: "1fr 1fr",
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
                                slot: form.slot,
                                address: form.address,
                                people: isPeople ? form.people : [],
                                requirments: form.otherRequrements,
                                type,
                                eventDate: form.eventDate,
                                data: Object.entries(data12).map((val) => {
                                  return {
                                    name: val[0],
                                    qty: val[1].qauntity,
                                    total: val[1].totalPrice,
                                  };
                                }),
                                totalPayment: totalPrice,
                                paidPayment: paid,
                                remainingpayment: totalPrice - paid - discount,
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
                                    type: "inhouse Others",
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
      <div
        className={styles.main}
        style={{
          "--bgimg": img,
        }}
      >
        <h1 className={styles.h1}>
          <span style={{ textTransform: "capitalize" }}>{name}</span> Service by{" "}
          <span className={styles.span}>WedField</span>
        </h1>

        <div className={styles["main-body"]}>
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
            {inhousedata?.data?.data[0]?.Link?.instagram && (
              <a
                href={inhousedata?.data?.data[0]?.Link.instagram}
                target="_blank"
              >
                <img
                  src={`${S3PROXY}/public/icons/instagram.png`}
                  height={25}
                  width={25}
                ></img>
              </a>
            )}
            {inhousedata?.data?.data[0]?.Link?.pintress && (
              <a
                href={inhousedata?.data?.data[0]?.Link.pintress}
                target="_blank"
              >
                <img
                  src={`${S3PROXY}/public/icons/pinterest.png`}
                  height={25}
                  width={25}
                ></img>
              </a>
            )}
            {inhousedata?.data?.data[0]?.Link?.youtube && (
              <a
                href={inhousedata?.data?.data[0]?.Link.youtube}
                target="_blank"
              >
                <img
                  src={`${S3PROXY}/public/icons/youtube.png`}
                  height={25}
                  width={25}
                ></img>
              </a>
            )}
            {inhousedata?.data?.data[0]?.Link?.facebook && (
              <a
                href={inhousedata?.data?.data[0]?.Link.facebook}
                target="_blank"
              >
                <img
                  src={`${S3PROXY}/public/icons/facebook.png`}
                  height={25}
                  width={25}
                ></img>
              </a>
            )}
            {inhousedata?.data?.data[0]?.Link?.linkedin && (
              <a
                href={inhousedata?.data?.data[0]?.Link.linkedin}
                target="_blank"
              >
                <img
                  src={`${S3PROXY}/public/icons/linkedin.png`}
                  height={25}
                  width={25}
                ></img>
              </a>
            )}
            {typeof number[type] === "string" && (
              <a href={`https://wa.me/${number[type]}`} target="_blank">
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
            {typeof number[type] === "string" && (
              <a href={`tel:${number[type]}`} target="_blank">
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
          <div className={styles["main-body-0"]}>
            <h1 className={styles.h1}>
              <span className={styles.span}>Event Details</span>
            </h1>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                select event
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.type}
                label="select event"
                onChange={(e) => {
                  setform((val) => ({ ...val, type: e.target.value }));
                  setTotalPrice(0);
                  setData({});
                }}
              >
                {inhousedata?.data?.data[0]?.Type.map(({ name }, key) => {
                  return <MenuItem value={name}>{name}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Autocomplete
                style={{
                  width: "100%",
                }}
                id="combo-box-demo"
                options={newLocations.map(({ location: label, id }, key) => {
                  return { label, id };
                })}
                onChange={(e) => {
                  setform((val) => ({
                    ...val,
                    location: e.target.textContent,
                  }));
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    value={form.location}
                    onChange={(e) => {
                      setform((val) => ({ ...val, location: e.target.value }));
                    }}
                    {...params}
                    label="location"
                  />
                )}
              />
              {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.location}
                label="Location"
                onChange={(e) => {
                  setform((val) => ({ ...val, location: e.target.value }));
                }}
              >
                {newLocations.map(({ location, id }, key) => {
                  return <MenuItem value={id}>{location}</MenuItem>;
                })}
              </Select> */}
            </FormControl>
            {isPeople && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">People</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.people}
                  label="People"
                  onChange={(e) => {
                    setform((val) => ({ ...val, people: e.target.value }));
                    setTotalPrice(0);
                    setData({});
                  }}
                >
                  {inhousedata?.data?.data[0]?.People.map((name, key) => {
                    return <MenuItem value={name}>{name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            )}
          </div>
          {isPeople ? (
            <div className={styles["middel-body"]}>
              {form.people && form.Service && (
                <h1 className={styles.h1}>
                  <span className={styles.span}>Suggested Team</span>
                </h1>
              )}
              <div className={styles["main-body-1"]}>
                {form.people &&
                  form?.Service?.filter(({ type }) => {
                    return type === form.type;
                  })?.length > 0 &&
                  form?.Service?.filter(({ type }) => {
                    return type === form.type;
                  }).map(({ name, price, id, people }, key) => {
                    return (
                      <Field
                        isPeople={isPeople}
                        key={id}
                        name={name}
                        peoples={people}
                        people={form.people}
                        price={parseInt(price)}
                        setTotalPrice={setTotalPrice}
                        totalPrice={totalPrice}
                        setData={setData}
                        customFunction={(setData, count, name, price) => {
                          setData((val) => ({
                            ...val,
                            [name]: {
                              qauntity: count,
                              totalPrice: price * count,
                            },
                          }));
                        }}
                      />
                    );
                  })}
              </div>

              <div className={styles["main-body-2"]}>
                {form.people &&
                  form?.IncludedService &&
                  form?.IncludedService?.filter(({ type }) => {
                    return type === form.type;
                  }).length && (
                    <>
                      <FieldIncluded
                        key={0}
                        name={form?.IncludedService?.filter(({ type }) => {
                          return type === form.type;
                        })
                          .map(({ name, id, price }, key) => {
                            return name;
                          })
                          .join(", ")}
                      />
                    </>
                  )}
              </div>
            </div>
          ) : (
            <div className={styles["middel-body"]}>
              {form.Service && (
                <h1 className={styles.h1}>
                  <span className={styles.span}>Suggested Team</span>
                </h1>
              )}
              <div className={styles["main-body-1"]}>
                {form?.Service?.filter(({ type }) => {
                  return type === form.type;
                })?.length > 0 &&
                  form?.Service?.filter(({ type }) => {
                    return type === form.type;
                  }).map(({ name, price, id, people }, key) => {
                    return isPeople ? (
                      <Field
                        isPeople={isPeople}
                        key={id}
                        name={name}
                        peoples={people}
                        people={form.people}
                        price={parseInt(price)}
                        setTotalPrice={setTotalPrice}
                        totalPrice={totalPrice}
                        setData={setData}
                        customFunction={(setData, count, name, price) => {
                          setData((val) => ({
                            ...val,
                            [name]: {
                              qauntity: count,
                              totalPrice: price * count,
                            },
                          }));
                        }}
                      />
                    ) : (
                      <Field2
                        isPeople={type === "dhol" ? true : isPeople}
                        key={id}
                        name={name}
                        peoples={people}
                        people={form.people}
                        price={parseInt(price)}
                        setTotalPrice={setTotalPrice}
                        totalPrice={totalPrice}
                        setData={setData}
                        customFunction={(setData, count, name, price) => {
                          setData((val) => ({
                            ...val,
                            [name]: {
                              qauntity: count,
                              totalPrice: price * count,
                            },
                          }));
                        }}
                      />
                    );
                  })}
              </div>

              <div className={styles["main-body-2"]}>
                {form?.IncludedService ? (
                  form?.IncludedService?.filter(({ type }) => {
                    return type === form.type;
                  }).length ? (
                    <>
                      <FieldIncluded
                        key={0}
                        name={form?.IncludedService?.filter(({ type }) => {
                          return type === form.type;
                        })
                          .map(({ name, id, price }, key) => {
                            return name;
                          })
                          .join(", ")}
                      />
                    </>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignSelf: "start",
              justifyContent: "start",
              alignItems: "end",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                height: "52px",
                justifyContent: "center",
                alignItems: "center",
              }}
              className={styles["social-icon-container-desktop"]}
            >
              {inhousedata?.data?.data[0]?.Link?.instagram && (
                <a
                  href={inhousedata?.data?.data[0]?.Link.instagram}
                  target="_blank"
                >
                  <img
                    src={`${S3PROXY}/public/icons/instagram.png`}
                    height={25}
                    width={25}
                  ></img>
                </a>
              )}
              {inhousedata?.data?.data[0]?.Link?.pintress && (
                <a
                  href={inhousedata?.data?.data[0]?.Link.pintress}
                  target="_blank"
                >
                  <img
                    src={`${S3PROXY}/public/icons/pinterest.png`}
                    height={25}
                    width={25}
                  ></img>
                </a>
              )}
              {inhousedata?.data?.data[0]?.Link?.youtube && (
                <a
                  href={inhousedata?.data?.data[0]?.Link.youtube}
                  target="_blank"
                >
                  <img
                    src={`${S3PROXY}/public/icons/youtube.png`}
                    height={25}
                    width={25}
                  ></img>
                </a>
              )}
              {inhousedata?.data?.data[0]?.Link?.facebook && (
                <a
                  href={inhousedata?.data?.data[0]?.Link.facebook}
                  target="_blank"
                >
                  <img
                    src={`${S3PROXY}/public/icons/facebook.png`}
                    height={25}
                    width={25}
                  ></img>
                </a>
              )}
              {inhousedata?.data?.data[0]?.Link?.linkedin && (
                <a
                  href={inhousedata?.data?.data[0]?.Link.linkedin}
                  target="_blank"
                >
                  <img
                    src={`${S3PROXY}/public/icons/linkedin.png`}
                    height={25}
                    width={25}
                  ></img>
                </a>
              )}
              {typeof number[type] === "string" && (
                <a href={`https://wa.me/${number[type]}`} target="_blank">
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
              {typeof number[type] === "string" && (
                <a href={`tel:${number[type]}`} target="_blank">
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
          {totalPrice ? (
            <div className={styles.tail}>
              <h2 className={styles.h2}>Check out our work below</h2>
              <div className={styles["tail-right"]}>
                <div className={styles.first}>
                  <span>TOTAL : </span>
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
      <div className={styles["main-under"]}>
        {inhousedata?.data?.data[0]?.Images.length ? (
          <div className={styles["imgCard"]}>
            <div className={styles["imgCard-text-container"]}>
              <hgroup>
                Our Images ({inhousedata?.data?.data[0]?.Images?.length})
              </hgroup>
              <Link href={`/in-house-service-images/${type}`}>see all</Link>
            </div>
            <div className={styles["imgContainer"]}>
              {inhousedata?.data?.data[0]?.Images.filter(
                (data, key) => key < 20
              ).map((val, key) => {
                return (
                  <ImgCard
                    val={val}
                    key={key}
                    keyy={key}
                    setOpenImage={setOpenImage}
                    setImg={setImg}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
        {inhousedata?.data?.data[0]?.albums?.length ? (
          <div className={styles["imgCard"]}>
            <div className={styles["imgCard-text-container"]}>
              <hgroup>
                Albums ({inhousedata?.data?.data[0]?.albums?.length})
              </hgroup>
              <Link href={`/in-house-service-albums/${type}`}>see all</Link>
            </div>
            <div className={styles["imgContainer"]}>
              {inhousedata?.data?.data[0]?.albums
                .filter((data, key) => key < 20)
                .map((val, key) => {
                  return (
                    <ImgCard
                      val={val}
                      key={key}
                      keyy={key}
                      isVideo={"album"}
                      setOpenImage={setOpen}
                      setAlbum={setAlbum}
                      setImg={setImg}
                    />
                  );
                })}
            </div>
          </div>
        ) : (
          <></>
        )}
        {inhousedata?.data?.data[0]?.Video?.length ? (
          <div className={styles["imgCard"]}>
            <div className={styles["imgCard-text-container"]}>
              <hgroup>
                Our Videos ({inhousedata?.data?.data[0]?.Video?.length})
              </hgroup>
              <Link href={`/in-house-service-videos/${type}`}>see all</Link>
            </div>

            <div className={styles["imgContainer"]}>
              {inhousedata?.data?.data[0]?.Video.filter(
                (data, key) => key < 20
              ).map((val, key) => {
                return (
                  <ImgCard
                    val={val}
                    key={key}
                    isVideo={true}
                    setOpenImage={setOpenVideo}
                    setImg={setVideo}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
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
            className=" albumBigSlider1234567890 albumBigSlider12345678902"
          >
            <Slider
              {...{
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
              }}
            >
              {inhousedata?.data?.data[0]?.Images?.map((data) => {
                return (
                  <div className={styles.albumImgConntainer}>
                    <Image
                      height={0}
                      width={0}
                      // layout='responsive'
                      src={`${S3PROXY}${data.image}`}
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
            <Slider
              {...{
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
              }}
              initialSlide={image}
            >
              {album?.map((data, key) => {
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
                    <div className={styles["number-counter"]}>
                      {key + 1} of {album.length}
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </>
      </Modal>
      <Modal
        style={{
          zIndex: "1402",
        }}
        open={openVideo}
        onClose={() => {
          setOpenVideo(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Button
            type="button"
            onClick={() => {
              setOpenVideo(false);
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
            <ReactPlayer
              url={video}
              controls={true}
              style={{
                objectFit: "cover",
                maxHeight: "80vh",
                maxWidth: "80vw",
                width: "100%",
                height: "100%",
              }}
              width={"80vw"}
              height={"80vh"}
            />
          </div>
        </>
      </Modal>
    </>
  );
}

export default AllOtherService;
