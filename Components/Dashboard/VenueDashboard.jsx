import React, { useEffect, useState } from "react";
import Image from "next/image";
import Styles from "../../styles/Vendors.module.scss";
import { AiTwotoneHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import { Box, Dialog, Modal, Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import {
  loginRoute,
  selectLocation,
  selectUser,
} from "../../redux/reducer/appEssentials";
import useWindowSize from "@rooks/use-window-size";
import {
  useFulltextSearchVenueQuery,
  useGetAllVenueQuery,
} from "redux/Api/common.api";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import VenueCard from "Components/Cards/VenueCard";
import Downloads from "Components/Landing Page/Downloads";
import { Icon } from "@iconify/react";
import Head from "next/head";
import { S3PROXY } from "../../config";
const CategoriesList = [
  {
    name: "Hotel",
    name2: "hotel",
    subCategories: [],
  },
  {
    name: "Resort",
    name2: "resort",
    subCategories: [],
  },
  {
    name: "Farm House",
    name2: "farm-house",
    subCategories: [],
  },
  {
    name: "Banquet Hall",
    name2: "banquet-hall",
    subCategories: [],
  },
  {
    name: "Lawn",
    name2: "lawn",
    subCategories: [],
  },
  {
    name: "Destination Wedding",
    name2: "destination-wedding",
    subCategories: [],
  },
];
const CatObj = {
  hotel: "Hotel",
  resort: "Resort",
  "farm-house": "Farm House",
  "banquet-hall": "Banquet Hall",
  lawn: "Lawn",
  "destination-wedding": "Destination Wedding",
};
function VenueDashboard({}) {
  const dispatch = useDispatch();
  dispatch(loginRoute(""));
  const router = useRouter();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "100px",
    overflow: "scroll",
    zIndex: "-1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const [searchText, setsearchText] = useState(
    router?.query && router?.query?.slug[2] ? router?.query?.slug[2] : ""
  );
  const [category, setCategory] = useState(
    router?.query && router?.query?.slug ? CatObj[router?.query?.slug[1]] : ""
  );
  const [page, setPage] = useState(
    router?.query && router?.query?.slug[0] ? router?.query?.slug[0] : 1
  );
  const [viewType, setViewType] = useState({ grid: true });
  const [filterOPen, setFilterOpen] = useState(false);
  const globleuser = useSelector(selectUser);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [pageCount, setPageCount] = useState("");
  const location = useSelector(selectLocation);
  const [type, setType] = useState(undefined);
  const [price, setPrice] = useState("");
  const [totalres, settotalres] = useState();
  const [totalpagesize, settotalpagesize] = useState();
  const [openloading, setOpenloading] = React.useState(false);
  const handlePageChange = (newPage) => {
    router.push(
      `/venue/wedding/${newPage}${
        router.query.slug ? `/${router.query.slug[1]}` : ""
      }//${searchText ? `/${searchText}` : ""}`
    );
  };
  const [pops, setPops] = useState();
  const [RCValue, setRCValue] = useState([
    {
      lessThan100: [undefined, 1000, false],
      "100to250": [1000, 2000, false],
      "250to500": [2000, 4000, false],
      "500to1000": [4000, 7000, false],
      moreThan1000: [7000, undefined, false],
    },
    undefined,
    undefined,
  ]);
  const [PP, setPP] = useState([
    {
      lessThan100: [undefined, 1000, false],
      "100to250": [1000, 2000, false],
      "250to500": [2000, 4000, false],
      "500to1000": [4000, 7000, false],
      moreThan1000: [7000, undefined, false],
    },
    undefined,
    undefined,
  ]);
  const [Lawns, setLawns] = useState([
    {
      lessThan100: [undefined, 80, false],
      "100to250": [80, 150, false],
      "250to500": [150, 400, false],
      "500to1000": [400, 1000, false],
      moreThan1000: [1000, undefined, false],
    },
    undefined,
    undefined,
  ]);
  const [Banquets, setBanquets] = useState([
    {
      lessThan100: [undefined, 80, false],
      "100to250": [80, 150, false],
      "250to500": [150, 400, false],
      "500to1000": [400, 1000, false],
      moreThan1000: [1000, undefined, false],
    },
    undefined,
    undefined,
  ]);
  const [Beds, setBeds] = useState([
    {
      lessThan100: [undefined, 20, false],
      "100to250": [20, 100, false],
      "250to500": [100, 200, false],
      "500to1000": [200, 400, false],
      moreThan1000: [400, 700, false],
    },
    undefined,
    undefined,
  ]);
  const [Rating, setRating] = useState([
    {
      lessThan100: [undefined, 3, false],
      "100to250": [3, 4, false],
      "250to500": [4, 5, false],
      "500to1000": [4.5, 5, false],
      moreThan1000: [5, undefined, false],
    },
    undefined,
    undefined,
  ]);
  const { data: allvenues, refetch } = useGetAllVenueQuery({
    category: category,
    city: location ? location : "",
    page,
    isUser: globleuser?.data?._id,
    rentalCostMin: RCValue[1],
    rentalCostMax: RCValue[2],
    pppMin: PP[1],
    pppMax: PP[2],
    lawnsMin: Lawns[1],
    lawnsMax: Lawns[2],
    banquetMin: Banquets[1],
    banquetMax: Banquets[2],
    roomsMin: Beds[1],
    roomsmax: Beds[2],
    ratingMin: Rating[1],
    ratingMaxss: Rating[2],
  });
  useEffect(() => {
    refetch();
  }, [
    RCValue[1],
    RCValue[2],
    PP[1],
    PP[2],
    Lawns[1],
    Lawns[2],
    Banquets[1],
    Banquets[2],
    Beds[1],
    Beds[2],
    Rating[1],
    Rating[2],
  ]);
  async function getData() {
    setOpenloading(true);
    const loca =
      location !== undefined
        ? location
        : localStorage.getItem("location")
        ? localStorage.getItem("location")
        : null;
    let res;
    res = { data: allvenues };
    if (res?.data?.success) {
      let filteredData = res.data.data;
      setData(filteredData);
      setPageCount(res?.data?.totalPage);
      settotalres(res?.data?.total);
      settotalpagesize(res?.data?.pageSize);
      setAllData(res?.data?.data);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setOpenloading(false);
    } else {
      console.error("No data found");
    }
  }
  const [cond, setCond] = useState(skipToken);
  const { data: textSearch } = useFulltextSearchVenueQuery(cond);
  const handleSearch = async (isPage) => {
    setOpenloading(true);
    setCond({
      searchText,
      page,
      ...(location === undefined ? {} : { city: location }),
      category: category,
      price: price,
    });
    const res = { data: textSearch };
    let filteredData = res?.data?.data;
    if (price) {
      filteredData = filteredData.filter((data) => {
        return parseInt(data.price) <= price;
      });
    }
    setData(filteredData);
    setPageCount(res?.data?.totalPage);
    setAllData(res?.data?.data);
    settotalres(res?.data?.total);
    settotalpagesize(res?.data?.pageSize);
    isPage && setPage(1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setOpenloading(false);
  };
  useEffect(() => {
    if (!searchText) {
      getData();
    } else {
      handleSearch(false);
    }
  }, [category, location, type, page, price, allvenues, textSearch, page]);
  const renderItemList = (item) => {
    return (
      <div
        className={`${Styles.v_card} box-shadow mb-4 bg-white`}
        onClick={() =>
          router.push(
            `/venue/${data.name.toLowerCase().replaceAll(" ", "-")}/${data._id}`
          )
        }
        style={{ cursor: "pointer" }}
      >
        <div className="row">
          <div className="col-md-4">
            <div
              className={`${Styles.card_img_wrapper} position-relative overflow-hidden`}
            >
              <Image
                src={`${S3PROXY}${item.mainImage}`}
                layout="fill"
                objectFit="cover"
                alt={item.name}
              />
              <div className={Styles.icon_wrapper}>
                <AiTwotoneHeart />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-info p-3 d-flex flex-column h-100 justify-content-center">
              <h4 className="vendor_name primary-text fw-bold">{item.name}</h4>
              <p className="text-gray">{item.city}</p>
              <div className="price-container d-flex align-items-center">
                <span className="fw-semi">Starting price</span>
                <span className="fw-semi"> ₹ {item.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderItemColumn = (ph, key) => {
    const longText = `${ph.description}`;
    return (
      <div style={{ marginRight: "15px", width: "fit-content" }}>
        <VenueCard data={ph} key={ph._id} />
      </div>
    );
  };
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const id = open1 ? "simple-popover" : undefined;
  const [windowSize, setWindowSize] = useState(true);
  const { innerWidth: windowWidth } = useWindowSize();
  useEffect(() => {
    if (windowWidth > 900) {
      setWindowSize(true);
    } else {
      setWindowSize(false);
    }
  }, [windowWidth]);
  const handleCheckboxChange = (event, type) => {
    const { name, checked } = event.target;
    let value;
    setPage(1);
    switch (type) {
      case "Rental Cost":
        value = [...RCValue];
        value[0][name][2] = checked;
        setRCValue([...value]);
        break;
      case "Price Per Plate":
        value = [...PP];
        value[0][name][2] = checked;
        setPP([...value]);
        break;
      case "Lawns":
        value = [...Lawns];
        value[0][name][2] = checked;
        setLawns([...value]);
        break;
      case "Banquet":
        value = [...Banquets];
        value[0][name][2] = checked;
        setBanquets([...value]);
        break;
      case "Beds":
        value = [...Beds];
        value[0][name][2] = checked;
        setBeds([...value]);
        break;
      case "Rating":
        value = [...Rating];
        value[0][name][2] = checked;
        setRating([...value]);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    let min,
      max,
      ismin = false;
    Object.entries(RCValue[0]).forEach((val) => {
      if (ismin) {
        if (val[1][2]) {
          max = val[1][1];
        }
      } else {
        if (val[1][2]) {
          ismin = true;
          min = val[1][0];
          max = val[1][1];
        }
      }
    });
    const val = RCValue;
    val[1] = min;
    val[2] = max;
    setRCValue(val);
  }, [RCValue]);
  useEffect(() => {
    let min,
      max,
      ismin = false;
    Object.entries(Rating[0]).forEach((val) => {
      if (ismin) {
        if (val[1][2]) {
          max = val[1][1];
        }
      } else {
        if (val[1][2]) {
          ismin = true;
          min = val[1][0];
          max = val[1][1];
        }
      }
    });
    const val = Rating;
    val[1] = min;
    val[2] = max;
    setRating(val);
  }, [Rating]);
  useEffect(() => {
    let min,
      max,
      ismin = false;
    Object.entries(Beds[0]).forEach((val) => {
      if (ismin) {
        if (val[1][2]) {
          max = val[1][1];
        }
      } else {
        if (val[1][2]) {
          ismin = true;
          min = val[1][0];
          max = val[1][1];
        }
      }
    });
    const val = Beds;
    val[1] = min;
    val[2] = max;
    setBeds(val);
  }, [Beds]);
  useEffect(() => {
    let min,
      max,
      ismin = false;
    Object.entries(Banquets[0]).forEach((val) => {
      if (ismin) {
        if (val[1][2]) {
          max = val[1][1];
        }
      } else {
        if (val[1][2]) {
          ismin = true;
          min = val[1][0];
          max = val[1][1];
        }
      }
    });
    const val = Banquets;
    val[1] = min;
    val[2] = max;
    setBanquets(val);
  }, [Banquets]);
  useEffect(() => {
    let min,
      max,
      ismin = false;
    Object.entries(Lawns[0]).forEach((val) => {
      if (ismin) {
        if (val[1][2]) {
          max = val[1][1];
        }
      } else {
        if (val[1][2]) {
          ismin = true;
          min = val[1][0];
          max = val[1][1];
        }
      }
    });
    const val = Lawns;
    val[1] = min;
    val[2] = max;
    setLawns(val);
  }, [Lawns]);
  useEffect(() => {
    let min,
      max,
      ismin = false;
    Object.entries(PP[0]).forEach((val) => {
      if (ismin) {
        if (val[1][2]) {
          max = val[1][1];
        }
      } else {
        if (val[1][2]) {
          ismin = true;
          min = val[1][0];
          max = val[1][1];
        }
      }
    });
    const val = PP;
    val[1] = min;
    val[2] = max;
    setPP(val);
  }, [PP]);
  const [popoutState, setPopoutState] = useState();
  return (
    <>
      <Head>
        <title>
          {category === "Destination Wedding"
            ? `Top Destination Wedding | Best Destination Wedding – WedField`
            : `${category ? category : "Venue"}s Collection For Your
          Wedding – WedField`}
        </title>
        <meta
          name="description"
          content={
            category === "Hotel"
              ? "Find Hotels Get Address, Plans, Packages, Facilities, Menu, Rating and Features of Hotels – Hotels, Fram House, Resort, Lawn , Destination Wedding and many more at WedField."
              : category === "Farm House"
              ? "Find Farm House Get Address, Plans, Packages, Facilities, Menu, Rating and Features of Farm House - Fram House, Hotels, Resort, Lawn, Destination Wedding and many more at WedField."
              : category === "Resort"
              ? "Find Resort Get Address, Plans, Packages, Facilities, Menu, Rating and Features of Resort - Resort, Fram House, Hotels, Lawn, Destination Wedding and many more at WedField."
              : category === "Banquet Hall"
              ? "Find Banquet Hall Get Address, Plans, Packages, Facilities, Menu, Rating and Review, Features of Resort – Banquet Hall, Resort, Fram House, Hotels, Lawn, Destination Wedding and many more at WedField."
              : category === "Lawn"
              ? "Find Lawn Get Address, Plans, Packages, Facilities, Menu, Rating and Features of Resort - Lawn, Resort, Fram House, Hotels, Destination Wedding and many more at WedField."
              : category === "Destination Wedding"
              ? "Find Destination Wedding Venus Get Address, Plans, Packages, Facilities, Menu, Rating and Review, Features of Destination Wedding Venus - Destination Wedding, Lawn, Resort, Fram House, Hotels and many more at WedField."
              : ""
          }
        />
        <link
          name="canonical"
          href={`https://wedfield.com/venue?category=${category?.replace(
            " ",
            "+"
          )}`}
        />
      </Head>
      <div className={Styles.header}>
        <article>
          <Icon onClick={() => router.back()} icon={"icon-park-outline:back"} />
          Venue
        </article>
      </div>
      <Modal
        open={openloading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Spinner></Spinner>
        </Box>
      </Modal>
      <Box sx={{ mt: 0, display: "flex", justifyContent: "center" }}>
        <div
          className=" mt-15 py-2 px-xl-5"
          style={{
            maxWidth: windowWidth > 1440 ? "1600px" : "90%",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            className={Styles.filterFat}
            onClick={() => setPops(!pops)}
            style={{
              overflow: "auto",
              margin: "30px 0px",
              padding: "5px 20px",
              width: "100%",
              gap: "20px",
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "0px 8px 16px 0px #00000014",
              borderRadius: "8px",
            }}
          >
            <span
              style={{
                textAlign: "right",
                color: "gray",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "18px",
                letterSpacing: "-0.14000000059604645px",
                textAlign: "left",
                color: "#db3672",
              }}
              onClick={() => setFilterOpen(!filterOPen)}
            >
              Venue
              <span style={{ transform: pops ? "rotate(180deg)" : "" }}>
                &#x25BC;
              </span>
            </span>
            <span
              style={
                pops
                  ? {
                      height: "auto",
                      marginTop: "0px",
                      display: windowSize ? "flex" : "none",
                    }
                  : {}
              }
              className={Styles.filter}
            >
              {[
                "Rental Cost",
                "Price Per Plat",
                "Venue Type",
                "Room Count",
                "Rating",
              ].map((val, key) => {
                return (
                  <span key={key}>
                    {val}{" "}
                    <Icon
                      fontSize={"20px"}
                      icon={"eva:arrow-ios-downward-outline"}
                    />
                  </span>
                );
              })}
            </span>
          </div>
          {windowSize ? (
            <div
              style={{ height: pops ? "fit-content" : "0px" }}
              className={Styles.popout}
            >
              <section>
                <article>
                  <hgroup>Rental Cost</hgroup>
                  <span>
                    <input
                      type="checkbox"
                      name="lessThan100"
                      id="lessThan100"
                      onChange={(e) => handleCheckboxChange(e, "Rental Cost")}
                    />{" "}
                    {"<"}1000
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="100to250"
                      id="100to250"
                      onChange={(e) => handleCheckboxChange(e, "Rental Cost")}
                    />{" "}
                    1000-2000
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="250to500"
                      id="250to500"
                      onChange={(e) => handleCheckboxChange(e, "Rental Cost")}
                    />{" "}
                    2000-4000
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="500to1000"
                      id="500to1000"
                      onChange={(e) => handleCheckboxChange(e, "Rental Cost")}
                    />{" "}
                    4000-7000
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="moreThan1000"
                      id="moreThan1000"
                      onChange={(e) => handleCheckboxChange(e, "Rental Cost")}
                    />{" "}
                    {">"}7000
                  </span>
                </article>
                <article>
                  <hgroup>Price Per Plate</hgroup>
                  <span>
                    <input
                      type="checkbox"
                      name="lessThan100"
                      id="lessThan100"
                      onChange={(e) =>
                        handleCheckboxChange(e, "Price Per Plate")
                      }
                    />{" "}
                    {"<"}1000
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="100to250"
                      id="100to250"
                      onChange={(e) =>
                        handleCheckboxChange(e, "Price Per Plate")
                      }
                    />{" "}
                    1000-2000
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="250to500"
                      id="250to500"
                      onChange={(e) =>
                        handleCheckboxChange(e, "Price Per Plate")
                      }
                    />{" "}
                    2000-4000
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="500to1000"
                      id="500to1000"
                      onChange={(e) =>
                        handleCheckboxChange(e, "Price Per Plate")
                      }
                    />{" "}
                    4000-7000
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="moreThan1000"
                      id="moreThan1000"
                      onChange={(e) =>
                        handleCheckboxChange(e, "Price Per Plate")
                      }
                    />{" "}
                    {">"}7000
                  </span>
                </article>
                <article>
                  <hgroup>Venue Type</hgroup>
                  {CategoriesList?.map((v, i) => {
                    return (
                      <span>
                        <input
                          type="radio"
                          name="Type"
                          onChange={() => {
                            router.push(
                              `/venue/wedding/1/${v.name2} ${
                                searchText ? `/${searchText}` : ""
                              }`
                            );
                          }}
                          id={i}
                        />
                        <label htmlFor={i}>{v.name}</label>
                      </span>
                    );
                  })}
                </article>
                <article>
                  <hgroup>Room Count</hgroup>
                  <span>
                    <input
                      type="checkbox"
                      name="lessThan100"
                      id="lessThan100"
                      onChange={(e) => handleCheckboxChange(e, "Beds")}
                    />{" "}
                    {"<"}20
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="100to250"
                      id="100to250"
                      onChange={(e) => handleCheckboxChange(e, "Beds")}
                    />{" "}
                    20-100
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="250to500"
                      id="250to500"
                      onChange={(e) => handleCheckboxChange(e, "Beds")}
                    />{" "}
                    100-200
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="500to1000"
                      id="500to1000"
                      onChange={(e) => handleCheckboxChange(e, "Beds")}
                    />{" "}
                    200-400
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="moreThan1000"
                      id="moreThan1000"
                      onChange={(e) => handleCheckboxChange(e, "Beds")}
                    />{" "}
                    400-700
                  </span>
                </article>
                <article>
                  <hgroup>Rating</hgroup>
                  <span>
                    <input
                      type="checkbox"
                      name="lessThan100"
                      id="lessThan100"
                      onChange={(e) => handleCheckboxChange(e, "Rating")}
                    />{" "}
                    {"<"}3
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="100to250"
                      id="100to250"
                      onChange={(e) => handleCheckboxChange(e, "Rating")}
                    />{" "}
                    3-4
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="250to500"
                      id="250to500"
                      onChange={(e) => handleCheckboxChange(e, "Rating")}
                    />{" "}
                    4
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="500to1000"
                      id="500to1000"
                      onChange={(e) => handleCheckboxChange(e, "Rating")}
                    />{" "}
                    4.5
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="moreThan1000"
                      id="moreThan1000"
                      onChange={(e) => handleCheckboxChange(e, "Rating")}
                    />{" "}
                    5
                  </span>
                </article>
              </section>
            </div>
          ) : (
            <Dialog
              fullScreen
              open={pops}
              onClose={() => setPops(false)}
              // TransitionComponent={Slide}
              // TransitionProps={{ direction: "up" }}
              sx={{
                height: "60vh",
                bottom: 0,
                top: "40vh",
                padding: "0px",
              }}
            >
              <div
                style={{ height: pops ? "fit-content" : "0px" }}
                className={Styles.popout}
              >
                <section>
                  <article>
                    <hgroup
                      onClick={() =>
                        setPopoutState((stete) =>
                          stete !== "Rental Cost" ? "Rental Cost" : ""
                        )
                      }
                    >
                      Rental Cost <Icon icon={"eva:arrow-down-fill"} />
                    </hgroup>
                    <section
                      style={{
                        height: popoutState == "Rental Cost" ? "150px" : "0px",
                      }}
                    >
                      <span>
                        <input
                          type="checkbox"
                          name="lessThan100"
                          id="lessThan100"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Rental Cost")
                          }
                        />{" "}
                        {"<"}1000
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="100to250"
                          id="100to250"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Rental Cost")
                          }
                        />{" "}
                        1000-2000
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="250to500"
                          id="250to500"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Rental Cost")
                          }
                        />{" "}
                        2000-4000
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="500to1000"
                          id="500to1000"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Rental Cost")
                          }
                        />{" "}
                        4000-7000
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="moreThan1000"
                          id="moreThan1000"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Rental Cost")
                          }
                        />{" "}
                        {">"}7000
                      </span>
                    </section>
                  </article>
                  <article>
                    <hgroup
                      onClick={() =>
                        setPopoutState((stete) =>
                          stete !== "Price Per Plate" ? "Price Per Plate" : ""
                        )
                      }
                    >
                      Price Per Plate <Icon icon={"eva:arrow-down-fill"} />
                    </hgroup>
                    <section
                      style={{
                        height:
                          popoutState == "Price Per Plate" ? "150px" : "0px",
                      }}
                    >
                      <span>
                        <input
                          type="checkbox"
                          name="lessThan100"
                          id="lessThan100"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Price Per Plate")
                          }
                        />{" "}
                        500-1000
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="100to250"
                          id="100to250"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Price Per Plate")
                          }
                        />{" "}
                        1000-2000
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="250to500"
                          id="250to500"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Price Per Plate")
                          }
                        />{" "}
                        2000-4000
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="500to1000"
                          id="500to1000"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Price Per Plate")
                          }
                        />{" "}
                        4000-7000
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="moreThan1000"
                          id="moreThan1000"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Price Per Plate")
                          }
                        />{" "}
                        {">"}7000
                      </span>
                    </section>
                  </article>
                  <article>
                    <hgroup
                      onClick={() =>
                        setPopoutState((stete) =>
                          stete !== "Venue Type" ? "Venue Type" : ""
                        )
                      }
                    >
                      Venue Type <Icon icon={"eva:arrow-down-fill"} />
                    </hgroup>
                    <section
                      style={{
                        height: popoutState == "Venue Type" ? "190px" : "0px",
                      }}
                    >
                      {CategoriesList?.map((v, i) => {
                        return (
                          <span>
                            <input
                              type="radio"
                              name="Type"
                              onChange={() => {
                                router.push(
                                  `/venue/wedding/1/${v.name2} ${
                                    searchText ? `/${searchText}` : ""
                                  }`
                                );
                              }}
                              id={i}
                            />
                            <label htmlFor={i}>{v.name}</label>
                          </span>
                        );
                      })}
                    </section>
                  </article>
                  <article>
                    <hgroup
                      onClick={() =>
                        setPopoutState((stete) =>
                          stete !== "Room Count" ? "Room Count" : ""
                        )
                      }
                    >
                      Room Count <Icon icon={"eva:arrow-down-fill"} />
                    </hgroup>
                    <section
                      style={{
                        height: popoutState == "Room Count" ? "150px" : "0px",
                      }}
                    >
                      <span>
                        <input
                          type="checkbox"
                          name="lessThan100"
                          id="lessThan100"
                          onChange={(e) => handleCheckboxChange(e, "Beds")}
                        />{" "}
                        {"<"}20
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="100to250"
                          id="100to250"
                          onChange={(e) => handleCheckboxChange(e, "Beds")}
                        />{" "}
                        20-100
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="250to500"
                          id="250to500"
                          onChange={(e) => handleCheckboxChange(e, "Beds")}
                        />{" "}
                        100-200
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="500to1000"
                          id="500to1000"
                          onChange={(e) => handleCheckboxChange(e, "Beds")}
                        />{" "}
                        200-400
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="moreThan1000"
                          id="moreThan1000"
                          onChange={(e) => handleCheckboxChange(e, "Beds")}
                        />{" "}
                        400-700
                      </span>
                    </section>
                  </article>
                  <article>
                    <hgroup
                      onClick={() =>
                        setPopoutState((stete) =>
                          stete !== "Rating" ? "Rating" : ""
                        )
                      }
                    >
                      Rating <Icon icon={"eva:arrow-down-fill"} />
                    </hgroup>
                    <section
                      style={{
                        height: popoutState == "Rating" ? "150px" : "0px",
                      }}
                    >
                      <span>
                        <input
                          type="checkbox"
                          name="lessThan100"
                          id="lessThan100"
                          onChange={(e) => handleCheckboxChange(e, "Rating")}
                        />{" "}
                        {"<"}3
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="100to250"
                          id="100to250"
                          onChange={(e) => handleCheckboxChange(e, "Rating")}
                        />{" "}
                        3-4
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="250to500"
                          id="250to500"
                          onChange={(e) => handleCheckboxChange(e, "Rating")}
                        />{" "}
                        4
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="500to1000"
                          id="500to1000"
                          onChange={(e) => handleCheckboxChange(e, "Rating")}
                        />{" "}
                        4.5
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="moreThan1000"
                          id="moreThan1000"
                          onChange={(e) => handleCheckboxChange(e, "Rating")}
                        />{" "}
                        5
                      </span>
                    </section>
                  </article>
                </section>
              </div>
            </Dialog>
          )}
          <div className="row mb-4 mt-lg-3">
            <div className="">
              <div className="d-flex flex-column h-100">
                <div className="row mb-3">
                  <div className="col-lg-3 d-none d-lg-block"></div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: " grid",
                    rowGap: "25px",
                    columnGap: "10px",
                    justifyContent: "center",
                    placeItems: "center",
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                  }}
                >
                  {data?.length === 0 ? (
                    <div className="card-info p-3 d-flex flex-column h-100 justify-content-center vendor-list-container bg-grey py-60">
                      <h4
                        className="vendor_name  fw-bold"
                        style={{ color: "#B4245D" }}
                      >
                        No data found
                      </h4>
                    </div>
                  ) : (
                    data?.map((item, key) => {
                      return !viewType.grid
                        ? renderItemList(item)
                        : renderItemColumn(item, key);
                    })
                  )}
                </div>
                <div className={Styles.pagination}>
                  <span>
                    Showing {40 * (page - 1) + 1}-
                    {40 * page - 40 + totalpagesize} of {totalres} results
                  </span>
                  <article>
                    {parseInt(page) === 1 ? (
                      <span></span>
                    ) : (
                      <>
                        <img
                          onClick={() => handlePageChange(parseInt(page) - 1)}
                          src={`${S3PROXY}/public/LandingPage/→.png`}
                          alt=""
                        ></img>
                        <span
                          onClick={() => handlePageChange(1)}
                          style={{ marginLeft: "6px" }}
                        >
                          1{" "}
                        </span>
                        ...
                      </>
                    )}
                    <hgroup>{page}</hgroup>
                    of{" "}
                    <span onClick={() => handlePageChange(pageCount)}>
                      {pageCount}
                    </span>
                    {parseInt(page) === pageCount ? (
                      <span></span>
                    ) : (
                      <img
                        onClick={() => handlePageChange(parseInt(page) + 1)}
                        src={`${S3PROXY}/public/LandingPage/→.png`}
                        alt=""
                      ></img>
                    )}
                  </article>
                </div>
              </div>
            </div>
            <Downloads></Downloads>
          </div>
        </div>
      </Box>
    </>
  );
}
export default VenueDashboard;
