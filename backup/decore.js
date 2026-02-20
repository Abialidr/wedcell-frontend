import React, { useContext, useState } from "react";
import styles from "../../styles/Makeup.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginRoute, selectUser } from "../redux/reducer/appEssentials";
import { useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import useWindowSize from "@rooks/use-window-size";
import { pink } from "@mui/material/colors";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CancelIcon from "@mui/icons-material/Cancel";
import Slider from "react-slick";
import { otherserviceval } from "../yupValidation/inhouseValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCheckOutKeyQuery, useCheckOutMutation } from "redux/Api/others.api";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import {
  useCreateInhouseforOthersMutation,
  useGetForAllInhouseQuery,
} from "redux/Api/intheHouse.api";
import Head from "next/head";
import { S3PROXY } from "../config";
function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Button
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      sx={{
        display: { md: "flex", xs: "none", minWidth: "15px", fontSize: "10px" },
      }}
    >
      <ArrowBackIosIcon sx={{ fontSize: "14px" }} />
    </Button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <Button
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      sx={{
        display: { md: "flex", xs: "none", minWidth: "15px", fontSize: "10px" },
      }}
    >
      <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
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
      style={{ width: "100%" }}
    >
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {data?.map((items, index) => {
          return (
            <div
              className={styles.imgListCardforAlbum}
              onClick={() => {
                setSelectedAlbums(data);
                setOpen(true);
                setInitialSlide(index);
              }}
            >
              <img src={`${S3PROXY}${items}`} alt="" />
            </div>
          );
        })}
      </ScrollMenu>
    </div>
  );
};
const id = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 5000,
  };
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => {
    setOpen(true);
  };
  const handleClose1 = () => {
    setOpen(false);
  };
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const [initialSlide, setInitialSlide] = useState();
  const globleuser = useSelector(selectUser);
  const [decoreData, setData] = useState([]);
  const { data: inhousedata } = useGetForAllInhouseQuery("decore");
  const [checkOut] = useCheckOutMutation();
  const { data: checkOutKey } = useCheckOutKeyQuery();
  const [createInhouseforOthers] = useCreateInhouseforOthersMutation();
  useEffect(() => {
    const getData = async () => {
      try {
        const result = { data: inhousedata };
        setData(result?.data?.data?.data);
      } catch (error) {
        console.error(`🚀 ~ file: makeup.js:26 ~ getData ~ error:`, error);
      }
    };
    getData();
  }, [inhousedata]);
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  const router = useRouter();
  const arr = [1, 2, 3];
  const [totalPrice, setTotalPrice] = useState(0);
  const [first, setFirst] = useState({
    first: 0,
    second: 0,
    third: 0,
  });
  const [second, setSecond] = useState({
    first: 0,
    second: 0,
    third: 0,
  });
  const [third, setThird] = useState({
    first: 0,
    second: 0,
    third: 0,
  });
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    height: windowWidth >= 900 ? "fit-content" : "fit-content",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
    maxHeight: "90%",
  };
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
  const [form, setform] = useState({
    name: "",
    number: "",
    slot: "Morning",
    address: "",
    otherRequrements: "",
    paymentType: "full",
  });
  return (
    <>
      <Head>
        <title>Best Décor Booking Service – Wedfield</title>
        <meta
          name="description"
          content="Book Best Decors with Our Décor Service Packages. Get Trained Artists, At Home Service and Premium Products for Decoration – Wedfield"
        />
        <link name="canonical" href={`https://wedfield.com/in-house/decore`} />
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
        <>
          <Button
            type="button"
            onClick={() => {
              setOpen1(false);
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.mainModaldiv} style={{ position: "relative" }}>
            <span className={styles.seemoreX} onClick={() => handleClose()}>
              <img src={`${S3PROXY}/public/images/webp/Vector12.webp`} alt="" />
            </span>
            <div className={styles.seemorehead}>Confirm Order</div>
          </div>

          <div className={styles.modalMainbody}>
            {decoreData?.map((item, index) => {
              return (
                <div className={styles.bodyDivs}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      {item?.title}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        flexDirection: windowWidth > 500 ? "row" : "column",
                      }}
                    >
                      <div className={styles.modal1stleftdiv}>
                        <span style={{ fontWeight: "400" }}>
                          Small Any One Event
                        </span>
                        <span>₹{item?.sao.ammount}</span>
                      </div>

                      <div className={styles.modal1strightdiv}>
                        {index === 0 ? (
                          <span>
                            ₹{parseInt(item?.sao.ammount) * first.first}
                          </span>
                        ) : index === 1 ? (
                          <span>
                            ₹{parseInt(item?.sao.ammount) * second.first}
                          </span>
                        ) : index === 2 ? (
                          <span>
                            ₹{parseInt(item?.sao.ammount) * third.first}
                          </span>
                        ) : (
                          ""
                        )}
                        <button className={styles.threeButtons1}>
                          <button
                            className={styles.threeButtons2}
                            style={{
                              display:
                                index === 0 && first.first > 0
                                  ? "block"
                                  : index === 1 && second.first > 0
                                  ? "block"
                                  : index === 2 && third.first > 0
                                  ? "block"
                                  : "none",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (index === 0) {
                                setFirst({
                                  ...first,
                                  first: first.first - 1,
                                });
                                setTotalPrice(
                                  totalPrice - parseInt(item?.sao.ammount)
                                );
                              }
                              if (index === 1) {
                                setSecond({
                                  ...second,
                                  first: second.first - 1,
                                });
                                setTotalPrice(
                                  totalPrice - parseInt(item?.sao.ammount)
                                );
                              }
                              if (index === 2) {
                                setThird({
                                  ...third,
                                  first: third.first - 1,
                                });
                                setTotalPrice(
                                  totalPrice - parseInt(item?.sao.ammount)
                                );
                              }
                            }}
                          >
                            -
                          </button>
                          <span
                            style={{ paddingLeft: "5px", paddingRight: "5px" }}
                          >
                            {index === 0 && first.first > 0
                              ? first.first
                              : index === 1 && second.first > 0
                              ? second.first
                              : index === 2 && third.first > 0
                              ? third.first
                              : "Add"}
                          </span>
                          <button
                            className={styles.threeButtons2}
                            onClick={() => {
                              if (index === 0) {
                                setFirst({
                                  ...first,
                                  first: first.first + 1,
                                });
                                setTotalPrice(
                                  totalPrice + parseInt(item?.sao.ammount)
                                );
                              }
                              if (index === 1) {
                                setSecond({
                                  ...second,
                                  first: second.first + 1,
                                });
                                setTotalPrice(
                                  totalPrice + parseInt(item?.sao.ammount)
                                );
                              }
                              if (index === 2) {
                                setThird({
                                  ...third,
                                  first: third.first + 1,
                                });
                                setTotalPrice(
                                  totalPrice + parseInt(item?.sao.ammount)
                                );
                              }
                            }}
                          >
                            +
                          </button>
                        </button>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: "10px",
                        flexDirection: windowWidth > 500 ? "row" : "column",
                      }}
                    >
                      <div className={styles.modal1stleftdiv}>
                        <span style={{ fontWeight: "400" }}>
                          Small Any Two Events
                        </span>
                        <span>₹{item?.sat.ammount}</span>
                      </div>

                      <div className={styles.modal1strightdiv}>
                        {index === 0 ? (
                          <span>
                            ₹{parseInt(item?.sat.ammount) * first.second}
                          </span>
                        ) : index === 1 ? (
                          <span>
                            ₹{parseInt(item?.sat.ammount) * second.second}
                          </span>
                        ) : index === 2 ? (
                          <span>
                            ₹{parseInt(item?.sat.ammount) * third.second}
                          </span>
                        ) : (
                          ""
                        )}
                        <button className={styles.threeButtons1}>
                          <button
                            className={styles.threeButtons2}
                            style={{
                              display:
                                index === 0 && first.second > 0
                                  ? "block"
                                  : index === 1 && second.second > 0
                                  ? "block"
                                  : index === 2 && third.second > 0
                                  ? "block"
                                  : "none",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (index === 0) {
                                setFirst({
                                  ...first,
                                  second: first.second - 1,
                                });
                                setTotalPrice(
                                  totalPrice - parseInt(item?.sat.ammount)
                                );
                              }
                              if (index === 1) {
                                setSecond({
                                  ...second,
                                  second: second.second - 1,
                                });
                                setTotalPrice(
                                  totalPrice - parseInt(item?.sat.ammount)
                                );
                              }
                              if (index === 2) {
                                setThird({
                                  ...third,
                                  second: third.second - 1,
                                });
                                setTotalPrice(
                                  totalPrice - parseInt(item?.sat.ammount)
                                );
                              }
                            }}
                          >
                            -
                          </button>
                          <span
                            style={{ paddingLeft: "5px", paddingRight: "5px" }}
                          >
                            {index === 0 && first.second > 0
                              ? first.second
                              : index === 1 && second.second > 0
                              ? second.second
                              : index === 2 && third.second > 0
                              ? third.second
                              : "Add"}
                          </span>
                          <button
                            className={styles.threeButtons2}
                            onClick={() => {
                              if (index === 0) {
                                setFirst({
                                  ...first,
                                  second: first.second + 1,
                                });
                                setTotalPrice(
                                  totalPrice + parseInt(item?.sat.ammount)
                                );
                              }
                              if (index === 1) {
                                setSecond({
                                  ...second,
                                  second: second.second + 1,
                                });
                                setTotalPrice(
                                  totalPrice + parseInt(item?.sat.ammount)
                                );
                              }
                              if (index === 2) {
                                setThird({
                                  ...third,
                                  second: third.second + 1,
                                });
                                setTotalPrice(
                                  totalPrice + parseInt(item?.sat.ammount)
                                );
                              }
                            }}
                          >
                            +
                          </button>
                        </button>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: "10px",
                        flexDirection: windowWidth > 500 ? "row" : "column",
                      }}
                    >
                      <div className={styles.modal1stleftdiv}>
                        <span style={{ fontWeight: "400" }}>
                          Complete Wedding
                        </span>
                        <span>₹{item?.cw.ammount}</span>
                      </div>

                      <div className={styles.modal1strightdiv}>
                        {index === 0 ? (
                          <span>
                            ₹{parseInt(item?.cw.ammount) * first.third}
                          </span>
                        ) : index === 1 ? (
                          <span>
                            ₹{parseInt(item?.cw.ammount) * second.third}
                          </span>
                        ) : index === 2 ? (
                          <span>
                            ₹{parseInt(item?.cw.ammount) * third.third}
                          </span>
                        ) : (
                          ""
                        )}
                        <button className={styles.threeButtons1}>
                          <button
                            className={styles.threeButtons2}
                            style={{
                              display:
                                index === 0 && first.third > 0
                                  ? "block"
                                  : index === 1 && second.third > 0
                                  ? "block"
                                  : index === 2 && third.third > 0
                                  ? "block"
                                  : "none",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (index === 0) {
                                setFirst({
                                  ...first,
                                  third: first.third - 1,
                                });
                                setTotalPrice(
                                  totalPrice - parseInt(item?.cw.ammount)
                                );
                              }
                              if (index === 1) {
                                setSecond({
                                  ...second,
                                  third: second.third - 1,
                                });
                                setTotalPrice(
                                  totalPrice - parseInt(item?.cw.ammount)
                                );
                              }
                              if (index === 2) {
                                setThird({
                                  ...third,
                                  third: third.third - 1,
                                });
                                setTotalPrice(
                                  totalPrice - parseInt(item?.cw.ammount)
                                );
                              }
                            }}
                          >
                            -
                          </button>
                          <span
                            style={{ paddingLeft: "5px", paddingRight: "5px" }}
                          >
                            {index === 0 && first.third > 0
                              ? first.third
                              : index === 1 && second.third > 0
                              ? second.third
                              : index === 2 && third.third > 0
                              ? third.third
                              : "Add"}
                          </span>
                          <button
                            className={styles.threeButtons2}
                            onClick={() => {
                              if (index === 0) {
                                setFirst({
                                  ...first,
                                  third: first.third + 1,
                                });
                                setTotalPrice(
                                  totalPrice + parseInt(item?.cw.ammount)
                                );
                              }
                              if (index === 1) {
                                setSecond({
                                  ...second,
                                  third: second.third + 1,
                                });
                                setTotalPrice(
                                  totalPrice + parseInt(item?.cw.ammount)
                                );
                              }
                              if (index === 2) {
                                setThird({
                                  ...third,
                                  third: third.third + 1,
                                });
                                setTotalPrice(
                                  totalPrice + parseInt(item?.cw.ammount)
                                );
                              }
                            }}
                          >
                            +
                          </button>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className={styles.bodyDivs}>
              <div className={styles.modal1stleftdiv}>
                <span style={{ fontWeight: "600" }}>Select a Slot</span>
              </div>
              <div className={styles.modal1strightdiv}>
                <Select
                  size="small"
                  value={form.slot}
                  onChange={(e) => {
                    setform({ ...form, slot: e.target.value });
                  }}
                >
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="After Noon">After Noon</MenuItem>
                  <MenuItem value="Evening">Evening</MenuItem>
                  <MenuItem value="Night">Night</MenuItem>
                </Select>
              </div>
            </div>
            <div className={styles.bodyDivs1}>
              <TextField
                id="standard-number"
                value={form.address}
                onChange={(e) => {
                  setform({ ...form, address: e.target.value });
                }}
                multiline
                rows={2}
                label={
                  <span
                    style={{
                      fontSize: "20px",
                      color: "black",
                      fontWeight: "600",
                    }}
                  >
                    Add Address
                  </span>
                }
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
            </div>
            <div className={styles.bodyDivs1}>
              <TextField
                multiline
                value={form.otherRequrements}
                onChange={(e) => {
                  setform({ ...form, otherRequrements: e.target.value });
                }}
                id="standard-number"
                label={
                  <span
                    style={{
                      fontSize: "20px",
                      color: "black",
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
                variant="standard"
              />
            </div>
            <div
              className={styles.bodyDivs1}
              style={{ display: "flex", gap: "30px", flexDirection: "row" }}
            >
              <TextField
                value={form.name}
                onChange={(e) => {
                  setform({ ...form, name: e.target.value });
                }}
                sx={{ width: "50%" }}
                id="standard-number"
                label={
                  <span
                    style={{
                      fontSize: "20px",
                      color: "black",
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
                variant="standard"
              />
              <TextField
                value={form.number}
                onChange={(e) => {
                  setform({ ...form, number: e.target.value });
                }}
                sx={{ width: "50%" }}
                id="standard-number"
                label={
                  <span
                    style={{
                      fontSize: "20px",
                      color: "black",
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
                variant="standard"
              />
            </div>
            <div className={styles.bodyDivs2}>
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
                  <span>Pay full amount and get 5% off</span>
                </article>
                <span>₹{totalPrice}</span>
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
                  <span>Pay 50% now and 50% later</span>
                </article>
                <span>₹{totalPrice * 0.5}</span>
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
                  <span>Pay 30% first and 30%, 40% in next installment</span>
                </article>
                <span>₹{totalPrice * 0.3}</span>
              </div>
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
            <div className={styles.modalClassesbutton}>
              {totalPrice > 0 ? (
                <button
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
                        const paid =
                          form.paymentType === "full"
                            ? totalPrice
                            : form.paymentType === "50%"
                            ? totalPrice / 2
                            : form.paymentType === "30%" && totalPrice * 0.3;
                        const { data: amountData } = await checkOut({
                          price: paid,
                        });
                        const { data: keyData } = { data: checkOutKey };

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
                            address: "Delhi",
                          },
                          theme: {
                            color: "#3399cc",
                          },
                          handler: async (res) => {
                            const data = {
                              name: form.name,
                              number: form.number,
                              slot: form.slot,
                              address: form.address,
                              requirments: form.otherRequrements,
                              type: "Decore",
                              data: [
                                {
                                  name: `${decoreData[0].title} - one event `,
                                  qty: first.first,
                                  total:
                                    first.first *
                                    parseInt(decoreData[0].sao.ammount),
                                },
                                {
                                  name: `${decoreData[0].title} - two event `,
                                  qty: first.second,
                                  total:
                                    first.second *
                                    parseInt(decoreData[0].sat.ammount),
                                },
                                {
                                  name: `${decoreData[0].title} - complete wedding `,
                                  qty: first.third,
                                  total:
                                    first.third *
                                    parseInt(decoreData[0].cw.ammount),
                                },
                                {
                                  name: `${decoreData[1].title} - one event `,
                                  qty: second.first,
                                  total:
                                    second.first *
                                    parseInt(decoreData[1].sao.ammount),
                                },
                                {
                                  name: `${decoreData[1].title} - two event `,
                                  qty: second.second,
                                  total:
                                    second.second *
                                    parseInt(decoreData[1].sat.ammount),
                                },
                                {
                                  name: `${decoreData[1].title} - complete wedding `,
                                  qty: second.third,
                                  total:
                                    second.third *
                                    parseInt(decoreData[1].cw.ammount),
                                },
                                {
                                  name: `${decoreData[2].title} - one event `,
                                  qty: third.first,
                                  total:
                                    third.first *
                                    parseInt(decoreData[2].sao.ammount),
                                },
                                {
                                  name: `${decoreData[2].title} - two event `,
                                  qty: third.second,
                                  total:
                                    third.second *
                                    parseInt(decoreData[2].sat.ammount),
                                },
                                {
                                  name: `${decoreData[2].title} - complete wedding `,
                                  qty: third.third,
                                  total:
                                    third.third *
                                    parseInt(decoreData[2].cw.ammount),
                                },
                              ],
                              totalPayment: totalPrice,
                              paidPayment: paid,
                              remainingpayment: totalPrice - paid,
                              paymentType: form.paymentType,
                              payment_id: res.razorpay_payment_id,
                            };

                            const res1 = await createInhouseforOthers(data);
                            if (res1?.data) {
                              toast.success(
                                `your payment is successfully submited we will reach you soon`,
                                {
                                  position: "top-right",
                                  autoClose: 1000,
                                }
                              );
                              // alert(
                              //   'your payment is successfully submited we will reach you soon'
                              // );
                            } else {
                              console.error(err);
                            }
                          },
                        };

                        var rzp1 = new window.Razorpay(options);
                        rzp1.open();
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
              ) : (
                <></>
              )}
            </div>
          </div>
        </Box>
      </Modal>
      {totalPrice > 0 && (
        <div className={`${styles.totalPrice}`}>
          <button
            // onClick={async () => {
            //   const user = globleuser?.data;
            //   if (!user) {
            //     router.push('/customer-login');
            //     dispatch(
            //       loginRoute({
            //         pathname: router.pathname,
            //         query: router.query,
            //       })
            //     );

            //     const options = {
            //       key: keyData?.key,
            //       amount: amountData?.amount,
            //       currency: 'INR',
            //       name: 'wedField',
            //       description: 'Test Transaction',
            //       image: './assests/webp/logo.webp',
            //       order_id: amountData?.id,
            //       // callback_url: `${PROXY}/api/v1/verify/payment`,
            //       prefill: {
            //         name: user.name,
            //         email: user.email,
            //         contact: user.mobile,
            //       },
            //       notes: {
            //         address: 'Delhi',
            //       },
            //       theme: {
            //         color: '#3399cc',
            //       },
            //       handler: (res) => {
            //         const data = {
            //           name: user.name,
            //           email: user.email,
            //           city: user.city,
            //           locality: user.address,
            //           number: user.mobile,
            //           type: 'decore',
            //           price: totalPrice,
            //         };

            //     var rzp1 = new window.Razorpay(options);
            //     rzp1.open();
            //   }
            // }}
            onClick={() => {
              setOpen(true);
            }}
          >
            ₹ {totalPrice}
          </button>
        </div>
      )}
      <div className={styles.mainMakeupWrapper}>
        <div className={styles.inhouseHeads}>
          <div className={styles.inhoueseheadspan}>
            <span>
              Decore Service by{" "}
              <span style={{ color: "#E72E77" }}>WedField</span> 
            </span>
          </div>
          <div className={styles.inhoueseheaddown}>
            <article>
              <img src={`${S3PROXY}/public/images/webp/image 710.webp`} />
              <span>Trained Artists</span>
            </article>
            <article>
              <img src={`${S3PROXY}/public/images/webp/image 711.webp`} />
              <span>At Home service</span>
            </article>
            <article>
              <img src={`${S3PROXY}/public/images/webp/image 714.webp`} />
              <span>Premium Products</span>
            </article>
          </div>
        </div>
        <div className={styles.serviceWrapper}>
          {decoreData?.map((item, index) => {
            return (
              <div className={styles.one} key={index}>
                <div className={styles.upper}>
                  <h2>{item?.title} </h2>
                </div>
                <div className={styles.contentWrapper}>
                  <p style={{ paddingLeft: "1rem", color: "gray" }}>Services</p>
                  <div className={styles.items}>
                    <div className={styles.left}>
                      <span>Small any one event </span>
                    </div>
                    <div className={styles.left}>
                      <span>{item?.sao.price}</span>
                    </div>
                    <div className={styles.right}>
                      <button className={styles.threeButtons1}>
                        <button
                          className={styles.threeButtons2}
                          style={{
                            display:
                              index === 0 && first.first > 0
                                ? "block"
                                : index === 1 && second.first > 0
                                ? "block"
                                : index === 2 && third.first > 0
                                ? "block"
                                : "none",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (index === 0) {
                              setFirst({
                                ...first,
                                first: first.first - 1,
                              });
                              setTotalPrice(
                                totalPrice - parseInt(item?.sao.ammount)
                              );
                            }
                            if (index === 1) {
                              setSecond({
                                ...second,
                                first: second.first - 1,
                              });
                              setTotalPrice(
                                totalPrice - parseInt(item?.sao.ammount)
                              );
                            }
                            if (index === 2) {
                              setThird({
                                ...third,
                                first: third.first - 1,
                              });
                              setTotalPrice(
                                totalPrice - parseInt(item?.sao.ammount)
                              );
                            }
                          }}
                        >
                          -
                        </button>
                        <span
                          style={{ paddingLeft: "5px", paddingRight: "5px" }}
                        >
                          {index === 0 && first.first > 0
                            ? first.first
                            : index === 1 && second.first > 0
                            ? second.first
                            : index === 2 && third.first > 0
                            ? third.first
                            : "Add"}
                        </span>
                        <button
                          className={styles.threeButtons2}
                          onClick={() => {
                            if (index === 0) {
                              setFirst({
                                ...first,
                                first: first.first + 1,
                              });
                              setTotalPrice(
                                totalPrice + parseInt(item?.sao.ammount)
                              );
                            }
                            if (index === 1) {
                              setSecond({
                                ...second,
                                first: second.first + 1,
                              });
                              setTotalPrice(
                                totalPrice + parseInt(item?.sao.ammount)
                              );
                            }
                            if (index === 2) {
                              setThird({
                                ...third,
                                first: third.first + 1,
                              });
                              setTotalPrice(
                                totalPrice + parseInt(item?.sao.ammount)
                              );
                            }
                          }}
                        >
                          +
                        </button>
                      </button>
                    </div>
                  </div>
                  <div className={styles.items}>
                    <div className={styles.left}>
                      <span>Small any two event </span>
                    </div>

                    <div className={styles.left}>
                      <span>{item?.sat.price}</span>
                    </div>
                    <div className={styles.right}>
                      <button className={styles.threeButtons1}>
                        <button
                          className={styles.threeButtons2}
                          style={{
                            display:
                              index === 0 && first.second > 0
                                ? "block"
                                : index === 1 && second.second > 0
                                ? "block"
                                : index === 2 && third.second > 0
                                ? "block"
                                : "none",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (index === 0) {
                              setFirst({
                                ...first,
                                second: first.second - 1,
                              });
                              setTotalPrice(
                                totalPrice - parseInt(item?.sat.ammount)
                              );
                            }
                            if (index === 1) {
                              setSecond({
                                ...second,
                                second: second.second - 1,
                              });
                              setTotalPrice(
                                totalPrice - parseInt(item?.sat.ammount)
                              );
                            }
                            if (index === 2) {
                              setThird({
                                ...third,
                                second: third.second - 1,
                              });
                              setTotalPrice(
                                totalPrice - parseInt(item?.sat.ammount)
                              );
                            }
                          }}
                        >
                          -
                        </button>
                        <span
                          style={{ paddingLeft: "5px", paddingRight: "5px" }}
                        >
                          {index === 0 && first.second > 0
                            ? first.second
                            : index === 1 && second.second > 0
                            ? second.second
                            : index === 2 && third.second > 0
                            ? third.second
                            : "Add"}
                        </span>
                        <button
                          className={styles.threeButtons2}
                          onClick={() => {
                            if (index === 0) {
                              setFirst({
                                ...first,
                                second: first.second + 1,
                              });
                              setTotalPrice(
                                totalPrice + parseInt(item?.sat.ammount)
                              );
                            }
                            if (index === 1) {
                              setSecond({
                                ...second,
                                second: second.second + 1,
                              });
                              setTotalPrice(
                                totalPrice + parseInt(item?.sat.ammount)
                              );
                            }
                            if (index === 2) {
                              setThird({
                                ...third,
                                second: third.second + 1,
                              });
                              setTotalPrice(
                                totalPrice + parseInt(item?.sat.ammount)
                              );
                            }
                          }}
                        >
                          +
                        </button>
                      </button>
                    </div>
                  </div>
                  <div className={styles.items}>
                    <div className={styles.left}>
                      <span>Complete Wedding with all event </span>
                    </div>

                    <div className={styles.left}>
                      <span>{item?.cw.price}</span>
                    </div>
                    <div className={styles.right}>
                      <button className={styles.threeButtons1}>
                        <button
                          className={styles.threeButtons2}
                          style={{
                            display:
                              index === 0 && first.third > 0
                                ? "block"
                                : index === 1 && second.third > 0
                                ? "block"
                                : index === 2 && third.third > 0
                                ? "block"
                                : "none",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (index === 0) {
                              setFirst({
                                ...first,
                                third: first.third - 1,
                              });
                              setTotalPrice(
                                totalPrice - parseInt(item?.cw.ammount)
                              );
                            }
                            if (index === 1) {
                              setSecond({
                                ...second,
                                third: second.third - 1,
                              });
                              setTotalPrice(
                                totalPrice - parseInt(item?.cw.ammount)
                              );
                            }
                            if (index === 2) {
                              setThird({
                                ...third,
                                third: third.third - 1,
                              });
                              setTotalPrice(
                                totalPrice - parseInt(item?.cw.ammount)
                              );
                            }
                          }}
                        >
                          -
                        </button>
                        <span
                          style={{ paddingLeft: "5px", paddingRight: "5px" }}
                        >
                          {index === 0 && first.third > 0
                            ? first.third
                            : index === 1 && second.third > 0
                            ? second.third
                            : index === 2 && third.third > 0
                            ? third.third
                            : "Add"}
                        </span>
                        <button
                          className={styles.threeButtons2}
                          onClick={() => {
                            if (index === 0) {
                              setFirst({
                                ...first,
                                third: first.third + 1,
                              });
                              setTotalPrice(
                                totalPrice + parseInt(item?.cw.ammount)
                              );
                            }
                            if (index === 1) {
                              setSecond({
                                ...second,
                                third: second.third + 1,
                              });
                              setTotalPrice(
                                totalPrice + parseInt(item?.cw.ammount)
                              );
                            }
                            if (index === 2) {
                              setThird({
                                ...third,
                                third: third.third + 1,
                              });
                              setTotalPrice(
                                totalPrice + parseInt(item?.cw.ammount)
                              );
                            }
                          }}
                        >
                          +
                        </button>
                      </button>
                    </div>
                  </div>
                  <div className={styles.imgdiv}>
                    <Albums
                      data={item?.images}
                      setOpen={setOpen1}
                      setSelectedAlbums={setSelectedAlbums}
                      setInitialSlide={setInitialSlide}
                    ></Albums>
                  </div>
                </div>
                {/* <div className={styles.smallBoxWrapper}>
                <div
                  className={`${
                    index === 0 ? styles.smallBox : styles.smallBox2
                  } ${index === 2 ? styles.smallBox3 : ""}`}
                >
                  <span> {item?.price} </span>
                </div>
              </div> */}
              </div>
            );
          })}
        </div>
        {/* <div className={styles.workWrapper}>
          <div className={styles.Heading}>
            <h1>Our latest work</h1>
          </div>

          <div className={styles.Albums}>
            <div className={styles.allAlbums}>
              <p>
                <span>All Albums(189)</span>
              </p>
              <p>Silver(68)</p>
              <p>Gold(86)</p>
              <p>Diamond(35)</p>
            </div>

            <div className={styles.allCities}>
              <select
                name=''
                id=''
              >
                <option value=''>All Cities</option>
              </select>
            </div>
          </div>
          <div className={styles.workImage}>
            <
              src={`${S3PROXY}/public/assests/webp/girls.webp`}
              alt='girls'
            />
          </div>
        </div> */}
        {/* <div className={styles.FeedbackWarrper}>
          <div className={styles.FeedbackHading}>
            <h1>let them speak for us!</h1>
            <p>Some impressions from our customers</p>
          </div>

          <div className={styles.AllReviews}>
            <div className={styles.ReviewUpper}>
              <span>All Reviews (109)</span>
              <span>Silver (58)</span>
              <span>Gold (36)</span>
              <span>Diamond (15)</span>
            </div>
            {arr?.map((item, index) => {
              return (
                <div
                  className={styles.reviewsWrapper}
                  key={index}
                >
                  <div className={styles.left}>
                    <FaUserCircle className={styles.icon} />
                  </div>
                  <div className={styles.right}>
                    <div className={styles.user}>
                      <p>
                        anjli_abc <span>3.5</span>
                      </p>
                    </div>
                    <div className={styles.author}>
                      <p> Reviews By Vedsta Diamond Package </p>
                      <span> | 3 Feb 2022 </span>
                    </div>
                    <div className={styles.review}>
                      <h5>
                        Absolutely wonderful experience. I booked the WedMeGood
                        team for my mother and I for two wedding events and
                        we're both all praises for the professionalism of the
                        hair and makeup artists and the quality of their work.
                        Karishma with her team - Supriya and Rekha did an
                        incredibly spectacular job and I loved both my looks. I
                        strongly recommend their services. Thank you so much!
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className={styles.btn}>
              <button>View More</button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default id;
