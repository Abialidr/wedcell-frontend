import Head from "next/head";
import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "../styles/Dashboard/Dashboard.module.scss";
import HomeSection from "../Components/home/HomeSection";
import { useRouter } from "next/router";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { selectLocation, selectUser } from "../redux/reducer/appEssentials";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import useWindowSize from "@rooks/use-window-size";
import moment from "moment";
import { useAdminFrontPageLoadQuery } from "redux/Api/common.api";
import Image from "next/image";
import {
  useGetATQuery,
  useGetTodosQuery,
  useGetTotalVendorQuery,
} from "redux/Api/planningTools.api";
import TopDiv from "Components/Landing Page/TopDiv";
import PlanningTools from "Components/Landing Page/PlanningTools";
import Inhouse from "Components/Landing Page/Inhouse";
import Downloads from "Components/Landing Page/Downloads";
import Banner from "Components/Landing Page/Banners";
import { skipToken } from "@reduxjs/toolkit/dist/query";

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
export const Search = styled("div")(({ theme }) => ({
  borderWidth: 1,
  borderColor: "black",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
  if (isLastItemVisible) {
  }
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

const popularList = [
  {
    bgImg:
      "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    category: "Hotel",
    dataKey: "hotel",
    header: "Popular in Hotels",
    page: 1,
    type: "Venue",
  },
  {
    id: 0,
    bgImg:
      "https://cdn.pixabay.com/photo/2018/04/15/08/25/roses-3321091__340.jpg",
    category: "Planning %26 Decor",
    dataKey: "decor",
    header: "Popular in Decor",
    page: 1,
    type: "Vendor",
  },
  {
    bgImg:
      "https://wedfield-s3-1.s3.ap-south-1.amazonaws.com/next-s3-uploads/Optimized-photography-wedfield.jpeg",
    category: "Photographers",
    dataKey: "photographer",
    header: "Popular in Photography",
    page: 1,
    type: "Vendor",
  },
  {
    bgImg:
      "https://wedfield-s3-1.s3.ap-south-1.amazonaws.com/next-s3-uploads/wedding-5830629_1280.jpg",
    category: "Makeup",
    dataKey: "makeup",
    header: "Popular in Makeup",
    page: 1,
    type: "Vendor",
  },
  {
    bgImg:
      "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Food",
    dataKey: "mehndi",
    header: "Popular in Food",
    page: 1,
    type: "Vendor",
  },

  {
    bgImg:
      "https://wedfield-s3-1.s3.ap-south-1.amazonaws.com/next-s3-uploads/wedding-5830629_1280.jpg",
    category: "Bridal Wear",
    dataKey: "bride",
    header: "Popular Bride Wear",
    page: 1,
    type: "product",
  },
  {
    bgImg:
      "https://wedfield-s3-1.s3.ap-south-1.amazonaws.com/next-s3-uploads/wedding-5830629_1280.jpg",
    category: "Groom Wear",
    dataKey: "groom",
    header: "Popular Groom Wear",
    page: 1,
    type: "product",
  },
  {
    bgImg:
      "https://wedfield-s3-1.s3.ap-south-1.amazonaws.com/next-s3-uploads/wedding-5830629_1280.jpg",
    category: "Music & Dance",
    subCategory: "Live band",
    dataKey: "live-band",
    header: "Popular Products in Live Band",
    page: 1,
    type: "Vendor",
  },
  {
    bgImg:
      "https://wedfield-s3-1.s3.ap-south-1.amazonaws.com/next-s3-uploads/wedding-5830629_1280.jpg",
    category: "Gifts",
    dataKey: "invitation-gift",
    header: "Popular Products in Invitation Gifts",
    page: 1,
    type: "Other-Products",
  },
];

export default function Home() {
  const router = useRouter();
  const { data: adminEssenData } = useAdminFrontPageLoadQuery();
  const adminEssen = adminEssenData?.data;
  const location = useSelector(selectLocation);
  const { innerWidth: windowWidth } = useWindowSize();
  const [imgView, setImgView] = useState();

  useEffect(() => {
    if (windowWidth >= 1220) {
      setImgView("desktop");
    }
    if (windowWidth < 1220 && windowWidth >= 900) {
      setImgView("laptop");
    }
    if (windowWidth < 900 && windowWidth >= 600) {
      setImgView("tablet");
    }
    if (windowWidth < 600 && windowWidth >= 350) {
      setImgView("mobile");
    }
  }, [windowWidth]);
  const globleuser = useSelector(selectUser);
  const [loadingState, setLoadingState] = useState({
    "Popular in Decor": false,
    "Popular in Mehendi": false,
    "Popular in Photography": false,
    "Popular in Hotels": false,
    "Popular in Makeup": false,
    "Popular Products in Bride": false,
    "Popular Products in Groom": false,
    AdminEssentials: false,
  });

  useEffect(() => {
    if (adminEssen) {
      setLoadingState((oldData) => {
        return { ...oldData, AdminEssentials: true };
      });
    }
  }, [adminEssen]);
  const matches = useMediaQuery("(min-width:780px)");
  const adjustedWidth = matches ? { width: "100%" } : { width: "100%" };
  const [attendingTotal, setAttendingTotal] = useState();
  const [totalHiredvendors, setTotalHiredvendors] = useState();
  const [completedTask, setCompletedTask] = useState();
  const { data: resat } = useGetATQuery(!globleuser?.data?.token && skipToken);
  const { data: Todos } = useGetTodosQuery(
    !globleuser?.data?.token && skipToken
  );
  const { data: restotalVendor } = useGetTotalVendorQuery(
    !globleuser?.data?.token && skipToken
  );
  useEffect(() => {
    const getAllreportdata = async () => {
      if (globleuser?.data?.token) {
        const res = { data: Todos };
        setCompletedTask(res?.data?.data);
        const res1 = { data: resat };
        setAttendingTotal(res1?.data?.data);
        const res3 = { data: restotalVendor };
        setTotalHiredvendors(res3?.data?.data);
      }
    };
    getAllreportdata();
  }, [globleuser, resat, restotalVendor, Todos]);

  const [endDate, setEndDate] = useState();
  const [timeRemaining, setTimeRemaining] = useState();
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
  const settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box sx={adjustedWidth}>
      <Head>
        <title>Find Dream Wedding on Local Search Engine - WedField</title>
        <meta
          name="description"
          content="WedField, No. 1 Local Search Engine, For Hotels, Farm House, Resort, Banquet Hall, Photographers, Makeup artist, Mehndi artist and more. Find Addresses, Phone numbers, review and rating, photos of businesses."
        />
        <link name="canonical" href="https://wedfield.com/" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100;200;300;400;500;600&display=swap');
        </style>
      </Head>
      <div className={styles.mainBody}>
        <TopDiv imgs={adminEssen?.DesktopImage} imgView={imgView} />
        <PlanningTools
          globleuser={globleuser}
          videos={adminEssen?.DesktopImage.map((data) => {
            return data.youtubelink;
          })}
        />
        <Inhouse adminEssen={adminEssen} />
        <HomeSection
          abclocation={location}
          popularList={popularList[0]}
          setLoadingState={setLoadingState}
        />
        {/* <HomeSection
          abclocation={location}
          popularList={popularList[1]}
          setLoadingState={setLoadingState}
        /> */}
        {/* <HomeSection
          abclocation={location}
          popularList={popularList[2]}
          setLoadingState={setLoadingState}
        /> */}
        <Banner
          img={"startTimer"}
          head={"Start the countdown of your most precious Day"}
          desc={"India’s first wedding marketplace"}
          button={"Start Timer"}
          calculateTimeRemaining={calculateTimeRemaining}
          btnClick={() => {
            if (globleuser) {
              router.push("/user-dashboard");
            } else {
              router.push("/customer-login");
            }
          }}
        ></Banner>
        {/* <HomeSection
          abclocation={location}
          popularList={popularList[3]}
          setLoadingState={setLoadingState}
        />*/}
        <HomeSection
          abclocation={location}
          popularList={popularList[4]}
          setLoadingState={setLoadingState}
        />
        <HomeSection
          abclocation={location}
          popularList={popularList[5]}
          setLoadingState={setLoadingState}
        />
        <HomeSection
          abclocation={location}
          popularList={popularList[6]}
          setLoadingState={setLoadingState}
        />
        <HomeSection
          abclocation={location}
          popularList={popularList[7]}
          setLoadingState={setLoadingState}
        />{" "}
        <HomeSection
          abclocation={location}
          popularList={popularList[8]}
          setLoadingState={setLoadingState}
        />
        <Downloads />
      </div>
    </Box>
  );
}
