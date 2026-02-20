import React, { useEffect } from "react";
import styles from "../../styles/planning.module.scss";
import ProgressBar from "@ramonak/react-progress-bar";
import useWindowSize from "@rooks/use-window-size";
// import Carousel from "react-spring-3d-carousel";
import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../../Components/Dashboard/layout";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Upload } from "antd";
import VendorWishlist from "../../Components/PlanningTools/VendorWishlist";
import Checklist from "../../Components/PlanningTools/Checklist";
import GuestList from "../../Components/PlanningTools/GuestList";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";
import { useRouter } from "next/router";
import BudgetPlanner from "../../Components/PlanningTools/BudgetPlanner";
import GuestInvites from "../../Components/PlanningTools/GuestInvites";
const Carousel = dynamic(() => import("react-spring-3d-carousel"), {
  ssr: false,
});
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// =======================================
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  checkNameEmail,
  wedplannerval,
} from "../../yupValidation/planningToolsValidation";
import {
  useGetAPDQuery,
  useGetATQuery,
  useGetInviteSentQuery,
  useGetTodosQuery,
  useGetTotalVendorQuery,
  useUpdateCoverPicMutation,
  useUpdateWeddingPersonalMutation,
} from "redux/Api/planningTools.api";
import { useGetBudgetCatsQuery } from "redux/Api/budgetPlanner.api";
import compressAndAppendFiles from "Components/compressAndAppendFiles";
import Head from "next/head";
import { S3PROXY } from "../../config";

const VerticalProgressBar = ({ progress, maxValue, bg }) => {
  const formattedProgress = Math.min(progress, maxValue);

  return (
    <div className={styles.progressContainer}>
      <div
        className={styles.progressBar}
        style={{
          height: `${(formattedProgress / maxValue) * 100}%`,
          backgroundColor: bg ? bg : "#4caf50",
        }}
      ></div>
      {/* <div className={styles.progressText}>{formattedProgress}</div> */}
    </div>
  );
};
const PlanningTools = ({ direction }) => {
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const loadingStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "100px",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  // ============================================
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  const [endDate, setEndDate] = useState();
  const [timeRemaining, setTimeRemaining] = useState();
  const settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };
  const [weddingData, setWeddingdata] = useState();

  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const [headerToggle, setHeaderToggle] = useState("MyWedding");
  const [goToSlide, setGoToSlide] = useState(null);
  const style = {
    position: "absolute",
    top: windowWidth > 900 ? "187px" : "50%",
    left: "50%",
    transform: windowWidth > 900 ? "translateX(-50%)" : "translate(-50%, -50%)",
    width: windowWidth >= 900 ? "600px" : windowWidth >= 460 ? "90%" : "95%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "10px",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    height: "fit-content",
    // display: 'flex',
    // flexDirection: 'column',
    overflow: "scroll",
    maxHeight: "calc(90vh - 187px)",
  };
  const style1 = {
    position: "absolute",
    top: windowWidth > 900 ? "177px" : "50%",
    left: "50%",
    transform: windowWidth > 900 ? "translateX(-50%)" : "translate(-50%, -50%)",
    width: windowWidth >= 900 ? "700px" : windowWidth >= 460 ? "450px" : "100%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "center",
    height: windowWidth >= 900 ? "350px" : "350px",
    overflow: "scroll",

    zIndex: "-1",
  };

  const setDefaultImages = (url, uid) => {
    return {
      uid,
      status: "done",
      url,
    };
  };
  const [iam, setiam] = useState("groom");
  const [pam, setpam] = useState("bride");
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (!globleuser?.data?.email) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [globleuser]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  useEffect(() => {
    const newTime = moment(
      `${moment(
        globleuser?.data?.weddingPersonal?.eventDate.replaceAll(`"`, "")
      ).format("YYYY-MM-DD")} ${moment(
        globleuser?.data?.weddingPersonal?.startTime.replaceAll(`"`, "")
      ).format("HH:MM")}`
    ).format();

    setEndDate(newTime);
  }, [globleuser]);
  const calculateTimeRemaining = () => {
    const currentTime = new Date().getTime();
    const endTime = new Date(endDate).getTime();
    const timeDiff = endTime - currentTime;

    if (timeDiff <= 0) {
      // Countdown has ended
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    let interval;
    if (endDate) {
      interval = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [endDate]);

  const [hours, sethour] = useState("");
  const [min, setmin] = useState("");

  const handleChange = (event) => {
    sethour(event.target.value);
  };

  const handleChange1 = (event) => {
    setmin(event.target.value);
  };
  const [weddingDet, setWeddingDet] = useState({
    groomImage: "",
    brideImage: "",
    groomName: "",
    brideName: "",
    eventDate: "",
    startTime: "",
    endTime: "",
  });

  const setDefaultImages1 = (data) => data?.map((data) => data?.url);
  const [coverPic, setCoverPic] = useState([]);
  const [coverPicLink, setCoverPicLink] = useState([]);

  let [fileListmain, setFileListmain] = useState([]);
  let [fileListmainlink, setFileListmainlink] = useState("");
  let [fileListmain1link, setFileListmain1link] = useState("");
  let [fileListmain1, setFileListmain1] = useState([]);
  const handleChange2 = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 50000) {
        setFileListmain(newFileList);
      } else {
        error();
      }
    } else {
      setFileListmain(newFileList);
      setFileListmainlink("");
    }
    if (iam === "groom") {
      setWeddingDet({ ...weddingDet, groomImage: newFileList });
    } else {
      setWeddingDet({ ...weddingDet, brideImage: newFileList });
    }
  };
  const handleChange3 = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 50000) {
        setFileListmain1(newFileList);
      } else {
        error();
      }
    } else {
      setFileListmain1(newFileList);
      setFileListmain1link("");
    }
    if (pam === "groom") {
      setWeddingDet({ ...weddingDet, groomImage: newFileList });
    } else {
      setWeddingDet({ ...weddingDet, brideImage: newFileList });
    }
  };
  const handleChangeCover = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      setCoverPic(newFileList);
    } else {
      const data = newFileList
        .filter((data) => data?.url)
        .map((data) => data?.url);
      setCoverPicLink(data);
      setCoverPic(newFileList);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setWeddingdata(globleuser?.data?.weddingPersonal);
    setWeddingDet({
      groomImage: globleuser?.data?.weddingPersonal?.groomImage,
      brideImage: globleuser?.data?.weddingPersonal?.brideImage,
      groomName: globleuser?.data?.weddingPersonal?.groomName,
      brideName: globleuser?.data?.weddingPersonal?.brideName,
      eventDate: moment(
        globleuser?.data?.weddingPersonal?.eventDate.replaceAll(`"`, "")
      ),
      startTime: moment(
        globleuser?.data?.weddingPersonal?.startTime.replaceAll(`"`, "")
      ),
      endTime: moment(
        globleuser?.data?.weddingPersonal?.endTime.replaceAll(`"`, "")
      ),
    });
    if (globleuser?.data?.weddingPersonal?.groomImage) {
      const data = setDefaultImages(
        globleuser?.data?.weddingPersonal?.groomImage,
        1
      );
      setFileListmain([data]);
      setFileListmainlink(data.url);
    }
    if (globleuser?.data?.weddingPersonal?.brideImage) {
      const data = setDefaultImages(
        globleuser?.data?.weddingPersonal?.brideImage,
        1
      );
      setFileListmain1([data]);
      setFileListmain1link(data.url);
    }
    if (globleuser?.data?.cover_pic?.length) {
      const data = globleuser?.data?.cover_pic?.map((url, uid) => {
        return setDefaultImages(url, uid);
      });
      setCoverPic(data);
      setCoverPicLink(setDefaultImages1(data));
    }
  }, [globleuser]);
  const [completedTask, setCompletedTask] = useState();
  useEffect(() => {
    if (direction) {
      setHeaderToggle(direction);
    }
  }, []);
  const { data: Todos } = useGetTodosQuery();
  useEffect(() => {
    const getCompletedTask = async () => {
      const res = {
        data: Todos,
      };
      setCompletedTask(res?.data?.data);
    };
    getCompletedTask();
  }, [headerToggle, Todos]);
  const [updateWeddingPersonal] = useUpdateWeddingPersonalMutation();
  const handleSubmitWed = async () => {
    setOpenLoadingModal(true);
    const EventDate = moment(weddingDet.eventDate).format();
    const StartTime = moment(weddingDet.startTime).format();
    const EndTime = moment(weddingDet.endTime).format();
    try {
      if (!globleuser?.data?.email) {
        await checkNameEmail.validate({
          name: weddingDet.name,
          email: weddingDet.email,
        });
      }
      await wedplannerval.validate({
        ...weddingDet,
        endTime: EndTime,
        startTime: StartTime,
        eventDate: EventDate,
      });
      const formData = new FormData();
      weddingDet.name && formData.append("name", weddingDet.name);
      weddingDet.email && formData.append("email", weddingDet.email);
      weddingDet.groomName &&
        formData.append("groomName", weddingDet.groomName);
      weddingDet.brideName &&
        formData.append("brideName", weddingDet.brideName);
      if (typeof weddingDet.groomImage === "string") {
        formData.append(`groomImageOld`, weddingDet.groomImage);
      } else {
        const CompgroomImage = await compressAndAppendFiles(
          weddingDet.groomImage[0].originFileObj
        );
        weddingDet.groomImage && formData.append(`groomImage`, CompgroomImage);
      }
      if (typeof weddingDet.brideImage === "string") {
        formData.append(`brideImageOld`, weddingDet.brideImage);
      } else {
        const Compbrideimg = await compressAndAppendFiles(
          weddingDet.brideImage[0].originFileObj
        );
        weddingDet.brideImage && formData.append(`brideImage`, Compbrideimg);
      }
      weddingDet.eventDate && formData.append("eventDate", EventDate);

      weddingDet.startTime && formData.append("startTime", StartTime);

      weddingDet.endTime && formData.append("endTime", EndTime);

      const config = {
        headers: { authorization: globleuser?.data?.token },
      };
      let res = await updateWeddingPersonal(formData);
      res = JSON.parse(JSON.stringify(res));
      res.data.data.token = globleuser?.data?.token;
      dispatch(user(res.data));
      localStorage.setItem("wedfield", JSON.stringify(res.data));
      setOpenLoadingModal(false);
      setOpen(false);
      toast.success("Wedding Detail Updated Successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (e) {
      setOpenLoadingModal(false);
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const [updateCoverPic] = useUpdateCoverPicMutation();
  const handleSubmitcoverPic = async () => {
    setOpenLoadingModal(true);

    const formData = new FormData();
    if (coverPic) {
      // (await compressAndAppendFilesMultiple(coverPic, formData, "cover"));
      for (const item of coverPic) {
        let CovImg = await compressAndAppendFiles(item.originFileObj);
        formData.append("cover", CovImg);
      }
    }
    formData.append("coverlink", JSON.stringify(coverPicLink));
    const config = {
      headers: { authorization: globleuser?.data?.token },
    };
    let res = await updateCoverPic(formData);
    res = JSON.parse(JSON.stringify(res));
    res.data.data.token = globleuser?.data?.token;
    dispatch(user(res.data));
    localStorage.setItem("wedfield", JSON.stringify(res.data));
    setOpenLoadingModal(false);
    setOpen1(false);
    toast.success("Cover Pic Changed Successfully", {
      position: "top-right",
      autoClose: 1000,
    });
  };
  const [inviteSent, setInviteSent] = useState();
  const [apd, setApd] = useState();
  const [attendingTotal, setAttendingTotal] = useState();
  const [totalHiredvendors, setTotalHiredvendors] = useState();
  const { data: resinviteSent, error } = useGetInviteSentQuery();
  const { data: resat } = useGetATQuery();
  const { data: resapd } = useGetAPDQuery();
  const { data: restotalVendor } = useGetTotalVendorQuery();
  useEffect(() => {
    const config = {
      headers: { authorization: globleuser?.data?.token },
    };
    const getAllreportdata = async () => {
      const res = { data: resinviteSent };
      setInviteSent(res?.data?.data);
      const res1 = { data: resat };
      setAttendingTotal(res1?.data?.data);
      const res2 = { data: resapd };
      setApd(res2?.data?.data);
      const res3 = { data: restotalVendor };
      setTotalHiredvendors(res3?.data?.data);
    };
    getAllreportdata();
  }, [resinviteSent, resat, resapd, restotalVendor]);
  const [allCats, setAllCats] = useState();
  const { data: resallCats } = useGetBudgetCatsQuery();
  useEffect(() => {
    const getallCat = async () => {
      const res = { data: resallCats };
      setAllCats(res?.data?.data);
    };
    getallCat();
  }, [resallCats]);
  return (
    <Layout>
      <Modal
        open={openLoadingModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={loadingStyles}>
          <Spinner></Spinner>
        </Box>
      </Modal>
      <Head>
        <title>Plan Your Wedding Here - WedField</title>
        <meta
          name="description"
          content="Plan Your Wedding Here – Create Invitation, Guest List, Do Vendor Management, Plan Your Budget, and track your big day Preparation also on WedField."
        />
        <link name="canonical" href={`https://wedfield.com/user-dashboard`} />
      </Head>
      <div
        className={styles.body}
        style={{
          // height: "700px",
          // width: "95%",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "50px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          // backgroundColor: "#FFDBD3",
        }}
      >
        <div className={styles.Header}>
          {[
            {
              i: "/public/LandingPage/pt1.png",
              n: "My Wedding",
              l: "MyWedding",
            },
            {
              i: "/public/LandingPage/pt2.png",
              n: "Checklist",
              l: "Checklist",
            },
            {
              i: "/public/LandingPage/pt3.png",
              n: "Vendor Manager",
              l: "VendorManager",
            },
            {
              i: "/public/LandingPage/pt4.png",
              n: "Guest List",
              l: "GuestList",
            },
            {
              i: "/public/LandingPage/pt5.png",
              n: "Budget Planner",
              l: "BudgetPlanner",
            },
            {
              i: "/public/LandingPage/pt6.png",
              n: "Invites",
              l: "Invites",
            },
          ].map((val, key) => {
            return (
              <span
                style={
                  val.l === headerToggle
                    ? {
                        color: "white",
                        background: "rgba(182, 37, 90, 1)",
                      }
                    : {}
                }
                onClick={() => setHeaderToggle(val.l)}
                key={key}
              >
                <img
                  style={
                    val.l === headerToggle
                      ? {
                          "-webkit-filter": "invert(100%)",
                          filter: "invert(100%)",
                        }
                      : {}
                  }
                  src={`${S3PROXY}${val.i}`}
                  alt=""
                />
                {val.n}
              </span>
            );
          })}
        </div>

        {headerToggle === "MyWedding" ? (
          <>
            <Modal
              open={open}
              onClose={globleuser?.data?.email ? handleClose : ""}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className={styles.mainModaldiv}>
                  <h3 className={styles.modalheader}>
                    Plan Your Wedding Now{" "}
                    <span onClick={() => setOpen(false)}>X</span>
                  </h3>
                  <div className={styles.mysidediv}>
                    {globleuser?.data?.email ? (
                      <></>
                    ) : (
                      <div className={styles.Iamname}>
                        <div className={styles.Nameinput}>
                          <span>Name</span>
                          <input
                            id="name"
                            label="Name"
                            variant="standard"
                            onChange={(e) => {
                              setWeddingDet({
                                ...weddingDet,
                                name: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className={styles.Nameinput}>
                          <span>Email</span>
                          <input
                            id="email"
                            label="Email"
                            variant="standard"
                            onChange={(e) => {
                              setWeddingDet({
                                ...weddingDet,
                                email: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <div className={styles.mysideImage}>
                      <div className={styles.imgcircle}>
                        <Upload
                          response={false}
                          // style={{ height: "100%", width: "100%" }}
                          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-card"
                          fileList={fileListmain}
                          maxCount={1}
                          onChange={handleChange2}
                          // onPreview={onPreview}
                        >
                          {fileListmain?.length < 1 && (
                            <div
                              style={{
                                height: "100px",
                                width: "100px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              Upload +
                            </div>
                          )}
                        </Upload>
                      </div>
                      <img
                        style={{
                          height: "80px",
                          width: "80px",
                          aspectRatio: "1/1",
                          objectFit: "contain",
                        }}
                        src={`${S3PROXY}/public/images/image 17.png`}
                        alt=""
                      />
                      <div className={styles.imgcircle}>
                        <Upload
                          style={{ height: "100%", width: "100%" }}
                          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-card"
                          fileList={fileListmain1}
                          maxCount={1}
                          onChange={handleChange3}
                          // onPreview={onPreview}
                        >
                          {fileListmain1?.length < 1 && (
                            <div
                              style={{
                                height: "100px",
                                width: "100px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50px",
                              }}
                            >
                              Upload +
                            </div>
                          )}
                        </Upload>
                      </div>
                    </div>
                    <div className={styles.Iamname}>
                      <div className={styles.Nameinput}>
                        <span>Your Name</span>
                        <input
                          value={
                            iam === "groom"
                              ? weddingDet.groomName
                              : weddingDet.brideName
                          }
                          id="id"
                          label="Name"
                          variant="standard"
                          onChange={(e) => {
                            if (iam === "groom") {
                              setWeddingDet({
                                ...weddingDet,
                                groomName: e.target.value,
                              });
                            } else {
                              setWeddingDet({
                                ...weddingDet,
                                brideName: e.target.value,
                              });
                            }
                          }}
                        />
                        <div className={styles.Nameinput}>
                          <span>I Am</span>
                          <div className={styles.brideGroom}>
                            <span
                              style={{
                                backgroundColor: iam === "groom" && "#b6255a",
                                color: iam === "groom" && "white",
                              }}
                              onClick={() => {
                                setiam("groom");
                                setpam("bride");
                                const data = weddingDet;
                                setWeddingDet({
                                  ...weddingDet,
                                  groomName: data.brideName,
                                  brideName: data.groomName,
                                  groomImage: data.brideImage,
                                  brideImage: data.groomImage,
                                });
                              }}
                            >
                              Groom
                            </span>
                            <span
                              style={{
                                backgroundColor: iam === "bride" && "#b6255a",
                                color: iam === "bride" && "white",
                              }}
                              onClick={() => {
                                setiam("bride");
                                setpam("groom");
                                const data = weddingDet;
                                setWeddingDet({
                                  ...weddingDet,
                                  groomName: data.brideName,
                                  brideName: data.groomName,
                                  groomImage: data.brideImage,
                                  brideImage: data.groomImage,
                                });
                              }}
                            >
                              Bride
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.Nameinput}>
                        <span>Partner's Name</span>
                        <input
                          value={
                            pam === "groom"
                              ? weddingDet.groomName
                              : weddingDet.brideName
                          }
                          id="name"
                          label="Name"
                          variant="standard"
                          onChange={(e) => {
                            if (pam === "groom") {
                              setWeddingDet({
                                ...weddingDet,
                                groomName: e.target.value,
                              });
                            } else {
                              setWeddingDet({
                                ...weddingDet,
                                brideName: e.target.value,
                              });
                            }
                          }}
                        />
                        <div className={styles.Nameinput}>
                          <span>My Partner is </span>
                          <div className={styles.brideGroom}>
                            <span
                              style={{
                                backgroundColor: pam === "groom" && "#b6255a",
                                color: pam === "groom" && "white",
                              }}
                              onClick={() => {
                                setiam("bride");
                                setpam("groom");
                                const data = weddingDet;
                                setWeddingDet({
                                  ...weddingDet,
                                  groomName: data.brideName,
                                  brideName: data.groomName,
                                  groomImage: data.brideImage,
                                  brideImage: data.groomImage,
                                });
                              }}
                            >
                              Groom
                            </span>
                            <span
                              style={{
                                backgroundColor: pam === "bride" && "#b6255a",
                                color: pam === "bride" && "white",
                              }}
                              onClick={() => {
                                setiam("groom");
                                setpam("bride");
                                const data = weddingDet;
                                setWeddingDet({
                                  ...weddingDet,
                                  groomName: data.brideName,
                                  brideName: data.groomName,
                                  groomImage: data.brideImage,
                                  brideImage: data.groomImage,
                                });
                              }}
                            >
                              Bride
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.Iamname}>
                      <div
                        className={styles.Nameinput}
                        style={{ width: "100%" }}
                      >
                        <span>Event Date</span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            defaultValue={dayjs(weddingDet.eventDate)}
                            onChange={(e) =>
                              setWeddingDet({
                                ...weddingDet,
                                eventDate: e.$d,
                              })
                            }
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                    <div className={styles.Times}>
                      <div className={styles.times1}>
                        <span>Start Time</span>
                        <div className={styles.allTime}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker
                              ampm={false}
                              defaultValue={dayjs(weddingDet.startTime)}
                              onChange={(e) => {
                                setWeddingDet({
                                  ...weddingDet,
                                  startTime: e.$d,
                                });
                              }}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      <div className={styles.times1}>
                        <span>End Time</span>
                        <div className={styles.allTime}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker
                              ampm={false}
                              defaultValue={dayjs(weddingDet.endTime)}
                              onChange={(e) => {
                                setWeddingDet({
                                  ...weddingDet,
                                  endTime: e.$d,
                                });
                              }}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className={styles.saveBtn} onClick={handleSubmitWed}>
                    Save
                  </button>
                </div>
              </Box>
            </Modal>
            <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{ zIndex: "999" }}
            >
              <Box sx={style1}>
                <div className={styles.mainModaldiv}>
                  <Upload
                    listType="picture-card"
                    fileList={coverPic}
                    onChange={handleChangeCover}
                  >
                    {coverPic?.length >= 5 ? null : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Upload +
                      </div>
                    )}
                  </Upload>
                  <button
                    className={styles.saveBtn}
                    onClick={handleSubmitcoverPic}
                  >
                    Save
                  </button>
                </div>
              </Box>
            </Modal>
            {/* {windowWidth > 560 ? ( */}
            <>
              <div className={styles.MainBody}>
                <div className={styles.newPTImgDiv}>
                  <img
                    src={
                      globleuser?.data?.weddingPersonal?.groomImage
                        ? `${S3PROXY}${globleuser?.data?.weddingPersonal?.groomImage}`
                        : "/"
                    }
                    alt=""
                  />
                  <img
                    src={
                      globleuser?.data?.weddingPersonal?.brideImage
                        ? `${S3PROXY}${globleuser?.data?.weddingPersonal?.brideImage}`
                        : "/"
                    }
                    alt=""
                  />
                  <div className={styles.Graidient}></div>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleOpen()}
                  >
                    <img src={`${S3PROXY}/public/images/ed.png`} alt="" />
                    Edit
                  </button>
                  <div className={styles.Absolute}>
                    <span className={styles.daysLeft}>Days Left</span>
                    <div className={styles.totaldate}>
                      <article>
                        <span className={styles.numbers}>
                          {timeRemaining?.days}
                        </span>
                        <span className={styles.values}>days</span>
                      </article>
                      <article>
                        <span className={styles.numbers}>
                          {timeRemaining?.hours}
                        </span>
                        <span className={styles.values}>hours</span>
                      </article>{" "}
                      <article>
                        <span className={styles.numbers}>
                          {timeRemaining?.minutes}
                        </span>
                        <span className={styles.values}>mins</span>
                      </article>{" "}
                      <article>
                        <span className={styles.numbers}>
                          {timeRemaining?.seconds}
                        </span>
                        <span className={styles.values}>sec</span>
                      </article>
                    </div>
                  </div>
                </div>
                <div className={styles.Newdetaildiv}>
                  <div className={styles.upper}>
                    <div className={styles.topdiv}>
                      <div className={styles.mainName}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <span className={styles.Name}>
                            {globleuser?.data?.weddingPersonal?.groomName}
                          </span>
                          <img
                            src={`${S3PROXY}/public/images/image 17.png`}
                            alt=""
                          />
                          <span className={styles.Name}>
                            {globleuser?.data?.weddingPersonal?.brideName}
                          </span>
                        </div>
                        <span className={styles.weddingdate}>
                          Wedding Date :{" "}
                          {moment(
                            globleuser?.data?.weddingPersonal?.eventDate
                          ).format("DD MMM YYYY")}
                        </span>
                      </div>
                    </div>
                    <div className={styles.middleDiv}>
                      <div
                        className={styles.middledivpan}
                        style={{ cursor: "pointer" }}
                      >
                        <span
                          className={styles.finaldiv}
                          // onClick={() => setHeaderToggle('Invites')}
                        >
                          <img
                            src={`${S3PROXY}/public/images/image 26.png`}
                            alt=""
                          />
                          <span className={styles.quickInvites}>
                            QUICK INVITES FOR THE CLOSE ONES
                          </span>
                        </span>
                        <span onClick={() => setHeaderToggle("Checklist")}>
                          Lets Start
                        </span>
                      </div>
                      <ProgressBar
                        completed={completedTask?.completed}
                        maxCompleted={completedTask?.all}
                        width="100%"
                        baseBgColor="#D9D9D9"
                        bgColor="#B6255A"
                        height="14px"
                        labelSize="0px"
                        borderRadius="50px"
                      />
                    </div>
                  </div>
                  <div className={styles.Thirddiv}>
                    <div className={styles.servicesDiv}>
                      <span className={styles.servicesnumb}>
                        <span
                          className={styles.servicesname}
                          style={{ cursor: "pointer" }}
                          onClick={() => setHeaderToggle("VendorManager")}
                        >
                          Services hired
                        </span>
                        <span className={styles.servicesoutof}>
                          {totalHiredvendors} of{" "}
                          {totalHiredvendors <= 10 ? 10 : totalHiredvendors}
                        </span>
                      </span>
                      <img src={`${S3PROXY}/public/images/sh.png`} alt="" />
                    </div>
                    <div className={styles.servicesDiv}>
                      <span className={styles.servicesnumb}>
                        <span
                          className={styles.servicesname}
                          style={{ cursor: "pointer" }}
                          onClick={() => setHeaderToggle("Checklist")}
                        >
                          Tasks completed
                        </span>

                        <span className={styles.servicesoutof}>
                          {completedTask?.completed} of {completedTask?.all}
                        </span>
                      </span>
                      <img src={`${S3PROXY}/public/images/tc.png`} alt="" />
                    </div>
                    <div className={styles.servicesDiv}>
                      <span className={styles.servicesnumb}>
                        <span
                          className={styles.servicesname}
                          style={{ cursor: "pointer" }}
                          onClick={() => setHeaderToggle("GuestList")}
                        >
                          Guest attending
                        </span>
                        <span className={styles.servicesoutof}>
                          {attendingTotal?.attending} of {attendingTotal?.total}
                        </span>
                      </span>
                      <img src={`${S3PROXY}/public/images/ga.png`} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className={styles.SecondDiv}>
                  <div className={styles.VendorManager}>
                    <span className={styles.VendorManagerspan}>
                      Vendor Manager
                    </span>
                    <span className={styles.vendorBokkedSpan}>
                      {totalHiredvendors <= 10
                        ? `${totalHiredvendors} of 10 VENDORS BOOKED`
                        : `${totalHiredvendors} of ${totalHiredvendors} VENDORS BOOKED`}
                    </span>
                    <div className={styles.CardDiv}>
                      <Carousel
                        slides={slides}
                        goToSlide={goToSlide}
                        offsetRadius={3}
                      />
                    </div>
                  </div>
                </div> */}
              <div className={styles.PTlastDiv}>
                <div className={styles.indexPageGuestlisdiv}>
                  <span className={styles.indexPageGuestlisdivSpan}>
                    Guest List
                  </span>
                  <div className={styles.graphDivindex}>
                    <div className={styles.GraphDiv}>
                      <div
                        style={{
                          width: "100%",
                          height: "80%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {apd !== undefined ? (
                          <Chart
                            options={{
                              labels: ["Attending", "Not Attending", "Pending"],
                              chart: { type: "donut" },
                              legend: {
                                show: true,
                                position: "bottom",
                                fontSize: "15px",
                                fontFamily: "Ledger",
                                fontWeight: "600",
                                horizontalAlign: "center",
                              },
                              dataLabels: { enabled: false },
                              tooltip: { enabled: false },
                              dataLabels: {
                                enabled: true,
                                formatter: function (val) {
                                  return val.toFixed(2) + "%";
                                },
                              },
                              stroke: { width: 0 },
                              plotOptions: {
                                pie: {
                                  expandOnClick: false,
                                  donut: {
                                    size: "80%",
                                    labels: {
                                      show: false,
                                      name: { show: false },

                                      total: {
                                        show: true,
                                        showAlways: false,
                                        formatter: function (w) {
                                          const totals = w.globals.seriesTotals;

                                          const result = totals.reduce(
                                            (a, b) => a + b,
                                            0
                                          );

                                          return (result / 1000).toFixed(3);
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            }}
                            series={[
                              apd?.attending,
                              apd?.pending,
                              apd?.decline,
                            ]}
                            type="donut"
                            height={"130%"}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className={styles.reporttoprightDiv}>
                      <article className={styles.reportinvitesentbox}>
                        <article>
                          <span>
                            <span>{inviteSent?.sent}</span>
                            <span>Invite Sent</span>
                          </span>
                        </article>
                        <article>
                          <span>
                            <span style={{ background: "#FFBA49" }}>
                              {inviteSent?.not_sent}
                            </span>
                            <span>Invite Pendings</span>
                          </span>
                        </article>
                      </article>
                    </div>
                  </div>
                </div>
                <div className={styles.indexBudgetPlannerDiv}>
                  <span className={styles.indexPageGuestlisdivSpan}>
                    Budget
                  </span>
                  <div className={styles.efpDiv}>
                    <div className={styles.progress}>
                      <article>
                        <VerticalProgressBar
                          progress={200000}
                          maxValue={200000}
                          bg={"#B6255A"}
                        />
                        E
                      </article>
                      <article>
                        <VerticalProgressBar
                          progress={3}
                          maxValue={6}
                          bg={"#FFBA49"}
                        />
                        F
                      </article>
                      <article>
                        <VerticalProgressBar
                          progress={3}
                          maxValue={6}
                          bg={"#A6D997"}
                        />
                        p
                      </article>
                    </div>
                    <article>
                      <article>
                        <span>Estimated Cost</span>
                        <span>
                          ₹ {allCats?.total_estimated_amount.toFixed(0)}
                        </span>
                      </article>
                      <article>
                        <span>Final Cost</span>
                        <span>₹ 20,000 </span>
                      </article>
                      <article>
                        <span>Paid Cost </span>
                        <span>₹ 20,000</span>
                      </article>
                    </article>
                  </div>
                  {/* <div className={styles.indexBudgetPlandet}>
                      <div className={styles.BudgetPlannerpayemntBoxTop}>
                        <div className={styles.BudgetPlannerpayemntBoxleft}>
                          <article style={{ fontFamily: 'Ledger' }}>
                            <span
                              style={{ fontWeight: '300', fontSize: '22px' }}
                            >
                              Estimated Cost
                            </span>
                            <span style={{ fontSize: '22px' }}>
                              ₹ {allCats?.total_estimated_amount.toFixed(2)}
                            </span>
                          </article>
                          <article style={{ fontFamily: 'Ledger' }}>
                            <span
                              style={{ fontWeight: '300', fontSize: '22px' }}
                            >
                              Final Cost
                            </span>
                            <span style={{ fontSize: '22px' }}>₹ 20,000 </span>
                          </article>
                          <article style={{ fontFamily: 'Ledger' }}>
                            <span
                              style={{ fontWeight: '300', fontSize: '22px' }}
                            >
                              Paid Cost{' '}
                            </span>
                            <span style={{ fontSize: '22px' }}>₹ 20,000</span>
                          </article>
                        </div>
                        <div className={styles.BudgetPlannerpayemntBoxRight}>
                          <div className={styles.bigBriefcase}>
                            <img
                              src={`${S3PROXY}/public/images/webp/briefcase-outline.webp`}
                              alt=''
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.viewGuestList}>
                      <pre onClick={() => setHeaderToggle('BudgetPlanner')}>
                        View Budget &#x3e;
                      </pre>
                    </div> */}
                </div>
              </div>
            </>

            {/*
            ) : (
              <>
                <div
                  className={styles.MainBody}
                  style={{ width: '100%' }}
                >
                  <div className={styles.imgdiv}>
                    <div className={styles.imgsection}>
                      {globleuser?.data?.cover_pic?.length ? (
                        <Slider {...settings1}>
                          {globleuser?.data?.cover_pic?.map((item, index) => {
                            return (
                              <div>
                                <Image
                                  height={0}
                                  width={0}
                                  style={{
                                    width: '100%',
                                  }}
                                  src={item ? item : '/'}
                                  alt=''
                                />
                              </div>
                            );
                          })}
                        </Slider>
                      ) : (
                        <Image
                          height={0}
                          width={0}
                          style={{
                            width: '100%',
                          }}
                          src={`${S3PROXY}/public/images/webp/image 33.webp`}
                          alt=''
                        />
                      )}
                    </div>
                    <div className={styles.alldiv1}>
                      <span
                        className={styles.changePhoto}
                        onClick={() => handleOpen()}
                      >
                        Edit Profile
                      </span>
                      <article
                        className={styles.mainNamesdiv}
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '10px',
                          }}
                        >
                          <span className={styles.mainNames}>
                            {globleuser?.data?.weddingPersonal?.groomName}
                          </span>
                          <img
                            style={{ height: '30px', width: '30px' }}
                            src={`${S3PROXY}/public/images/webp/marriage.webp`}
                            alt=''
                          />
                          <span className={styles.mainNames}>
                            {globleuser?.data?.weddingPersonal?.brideName}
                          </span>
                        </div>
                        <span className={styles.maindate}>
                          {moment(
                            globleuser?.data?.weddingPersonal?.eventDate
                          ).format('DD MMMM YYYY')}
                        </span>
                      </article>
                      <span
                        className={styles.uploadPhoto}
                        onClick={() => handleOpen1()}
                      >
                        Upload Photo
                      </span>
                      <span className={styles.daysLeft}>Days Left</span>
                      <div className={styles.totaldate}>
                        <article>
                          <span className={styles.numbers}>
                            {timeRemaining?.days}
                          </span>
                          <span className={styles.values}>days</span>
                        </article>
                        <article>
                          <span className={styles.numbers}>
                            {timeRemaining?.hours}
                          </span>
                          <span className={styles.values}>hours</span>
                        </article>{' '}
                        <article>
                          <span className={styles.numbers}>
                            {timeRemaining?.minutes}
                          </span>
                          <span className={styles.values}>mins</span>
                        </article>{' '}
                        <article>
                          <span className={styles.numbers}>
                            {timeRemaining?.seconds}
                          </span>
                          <span className={styles.values}>sec</span>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={styles.statusAndTaskdiv}
                  style={{ width: '90%', marginBottom: '30px' }}
                >
                  <div className={styles.statusdiv}>
                    <span>Status</span>
                    <ProgressBar
                      completed={completedTask?.completed}
                      maxCompleted={completedTask?.all}
                      width='100%'
                      baseBgColor='#e1e1e1'
                      bgColor='linear-gradient(90deg, #FF005C 0%, rgba(255, 186, 52, 0.83) 100%)'
                      height='13px'
                      labelSize='0px'
                      borderRadius='50px'
                    />
                  </div>
                  <div className={styles.taskCompleted}>
                    <span className={styles.taskCompletedspan}>
                      Task to be Completed
                    </span>
                    <div className={styles.allservices}>
                      <span className={styles.allservicesNumber}>
                        13{' '}
                        <span className={styles.allservicesoutOf}>Of 40</span>
                      </span>
                      <span className={styles.allservicesName}>
                        Services hired
                      </span>
                    </div>
                    <div className={styles.allservices}>
                      <span className={styles.allservicesNumber}>
                        {completedTask?.completed}{' '}
                        <span className={styles.allservicesoutOf}>
                          Of {completedTask?.all}
                        </span>
                      </span>
                      <span className={styles.allservicesName}>
                        Tasks completed
                      </span>
                    </div>
                    <div className={styles.allservices}>
                      <span className={styles.allservicesNumber}>
                        4 <span className={styles.allservicesoutOf}>Of 8</span>
                      </span>
                      <span className={styles.allservicesName}>
                        Guest attending
                      </span>
                    </div>
                  </div>
                  <div
                    className={styles.quickInvitesdiv}
                    onClick={() => setHeaderToggle('GuestList')}
                  >
                    <img
                      src={`${S3PROXY}/public/images/webp/image 26.webp`}
                      alt=''
                    />
                    <span>Quick Invites</span>
                  </div>
                </div>

                <div className={styles.indexPageGuestlisdiv}>
                  <span className={styles.indexPageGuestlisdivSpan}>
                    Guest List
                  </span>
                  <div className={styles.graphDivindex}>
                    <div className={styles.GraphDiv}>
                      <div style={{ width: '100%', height: '100%' }}>
                        {apd !== undefined ? (
                          <Chart
                            options={{
                              labels: ['Attending', 'Not Attending', 'Pending'],
                              chart: { type: 'donut' },
                              legend: {
                                show: true,
                                position: 'bottom',
                                fontSize: '15px',
                                fontFamily: 'Ledger',
                                fontWeight: '600',
                                horizontalAlign: 'center',
                              },
                              dataLabels: { enabled: false },
                              tooltip: { enabled: false },
                              dataLabels: {
                                enabled: true,
                                formatter: function (val) {
                                  return val.toFixed(2) + '%';
                                },
                              },
                              stroke: { width: 0 },
                              plotOptions: {
                                pie: {
                                  expandOnClick: false,
                                  donut: {
                                    size: '50%',
                                    labels: {
                                      show: false,
                                      name: { show: false },

                                      total: {
                                        show: false,
                                        showAlways: false,
                                        formatter: function (w) {
                                          const totals = w.globals.seriesTotals;

                                          const result = totals.reduce(
                                            (a, b) => a + b,
                                            0
                                          );

                                          return (result / 1000).toFixed(3);
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            }}
                            series={[
                              apd?.attending,
                              apd?.pending,
                              apd?.decline,
                            ]}
                            type='donut'
                            height={'130%'}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className={styles.reporttoprightDiv}>
                      <article className={styles.reportinvitesentbox}>
                        <span
                          style={{
                            marginBottom: '12px',
                          }}
                        >
                          Invitations
                        </span>
                        <article>
                          <span
                            style={{
                              display: 'flex',
                              gap: '10px',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              style={{
                                height: ' 17px',
                                width: '17px',
                              }}
                              src={`${S3PROXY}/public/images/webp/inviteSent.webp`}
                              alt=''
                            />
                            <span>Invite Sent</span>
                          </span>
                          <span>{inviteSent?.sent}</span>
                        </article>
                        <article>
                          <span
                            style={{
                              display: 'flex',
                              gap: '10px',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              style={{
                                height: ' 17px',
                                width: '17px',
                              }}
                              src={`${S3PROXY}/public/images/webp/invitePending.webp`}
                              alt=''
                            />

                            <span>Invite Pendings</span>
                          </span>
                          <span>{inviteSent?.not_sent}</span>
                        </article>
                      </article>
                    </div>
                  </div>
                  <div className={styles.viewGuestList}>
                    <pre onClick={() => setHeaderToggle('GuestList')}>
                      View Guest List &#x3e;
                    </pre>
                  </div>
                </div>
                <div className={styles.indexBudgetPlannerDiv}>
                  <span className={styles.indexPageGuestlisdivSpan}>
                    Budget
                  </span>
                  <div className={styles.indexBudgetPlandet}>
                    <div className={styles.BudgetPlannerpayemntBoxleft}>
                      <article style={{ fontFamily: 'Ledger' }}>
                        <span style={{ fontWeight: '300', fontSize: '22px' }}>
                          Estimated Cost
                        </span>
                        <span style={{ fontSize: '22px' }}>
                          ₹ {allCats?.total_estimated_amount.toFixed(2)}
                        </span>
                      </article>
                      <article style={{ fontFamily: 'Ledger' }}>
                        <span style={{ fontWeight: '300', fontSize: '22px' }}>
                          Final Cost
                        </span>
                        <span style={{ fontSize: '22px' }}>
                          ₹ {allCats?.total_final_cost.toFixed(2)}
                        </span>
                      </article>
                      <article style={{ fontFamily: 'Ledger' }}>
                        <span style={{ fontWeight: '300', fontSize: '22px' }}>
                          Paid Cost{' '}
                        </span>
                        <span style={{ fontSize: '22px' }}>
                          ₹{' '}
                          {(
                            allCats?.total_final_cost -
                            allCats?.total_paid_amount
                          ).toFixed(2)}
                        </span>
                      </article>
                    </div>
                  </div>
                  <div className={styles.viewGuestList}>
                    <pre onClick={() => setHeaderToggle('BudgetPlanner')}>
                      View Budget &#x3e;
                    </pre>
                  </div>
                </div>
              </>
            )} */}
          </>
        ) : headerToggle === "Checklist" ? (
          <div className={styles.MainBody}>
            <Checklist></Checklist>
          </div>
        ) : headerToggle === "VendorManager" ? (
          <div className={styles.MainBody}>
            <VendorWishlist></VendorWishlist>
          </div>
        ) : headerToggle === "GuestList" ? (
          <div className={styles.MainBody}>
            <GuestList></GuestList>
          </div>
        ) : headerToggle === "BudgetPlanner" ? (
          <div className={styles.MainBody}>
            <BudgetPlanner></BudgetPlanner>
          </div>
        ) : headerToggle === "Invites" ? (
          <div
            className={styles.MainBody}
            style={{
              width: "100%",
              marginTop: windowWidth > 900 ? "-30px" : "0px",
              marginBottom: "-50px",
            }}
          >
            {windowWidth > 900 ? (
              <GuestInvites></GuestInvites>
            ) : (
              <GuestInvites></GuestInvites>
            )}
          </div>
        ) : (
          <></>
        )}
        {/* <span>This Is Planning Tools Page</span> */}
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default PlanningTools;
