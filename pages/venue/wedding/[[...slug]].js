import React, { useEffect, useRef, useState } from "react";
import Styles from "../../../styles/Vendors.module.scss";
import { useRouter } from "next/router";
import { Box, Dialog, Modal, Slide } from "@mui/material";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { selectUser } from "../../../redux/reducer/appEssentials";
import useWindowSize from "@rooks/use-window-size";
import {
  useLazyGetAllVenueQuery,
  useLazyGetTextSeacrhAllVenueQuery,
} from "redux/Api/common.api";
import VenueCard from "Components/Cards/VenueCard";
import Downloads from "Components/Landing Page/Downloads";
import { Icon } from "@iconify/react";
import Head from "next/head";
import { S3PROXY } from "../../../config";
// import AllVendorsCard from "../../Components/newCard/AllVendorsCard";
import mongoose from "mongoose";
import VenueUserModels from "../../../models/VenueUserModels";
import WishlistModels from "../../../models/WishlistModel";
import { wrapper } from "redux/store";
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

const Venue = (props) => {
  const { allvenue, page, category, searchText, location } = props;
  // dispatch(loginRoute(""));
  const router = useRouter();

  const style = {
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

  const [filterOPen, setFilterOpen] = useState(false);
  const hasMounted = useRef(false);
  const [data, setData] = useState(JSON.parse(allvenue).data);
  const [pageCount, setPageCount] = useState(JSON.parse(allvenue).totalPage);
  const [totalres, settotalres] = useState(JSON.parse(allvenue).total);
  const [totalpagesize, settotalpagesize] = useState(
    JSON.parse(allvenue).pageSize
  );

  const [openloading, setOpenloading] = React.useState(false);
  const handlePageChange = (newPage) => {
    router.push(
      `/venue/wedding/${newPage}${location ? `/${location}` : ""}${
        router.query.slug[2] ? `/${router.query.slug[2]}` : ""
      }${searchText ? `/${searchText}` : ""}`
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
  const globleuser = useSelector(selectUser);
  const [getAllVenues] = useLazyGetAllVenueQuery();
  const [searchAllVenues] = useLazyGetTextSeacrhAllVenueQuery();

  const handleSearch = async () => {
    setOpenloading(true);
    try {
      let res;
      if (searchText) {
        res = await searchAllVenues({
          category: category ? category : "",
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
          searchText,
        });
      } else {
        res = await getAllVenues({
          category: category ? category : "",
          city: location != "all" ? location : "",
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
      }
      if (res?.data?.success) {
        let filteredData = res.data.data;
        setData(filteredData);
        setPageCount(res?.data?.totalPage);
        settotalres(res?.data?.total);
        settotalpagesize(res?.data?.pageSize);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        console.error("No data found");
      }
    } catch (error) {
    } finally {
      setOpenloading(false);
    }
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    } else {
      handleSearch();
    }
  }, [RCValue, PP, Beds, Rating]);

  // useEffect(() => {
  //   handleSearch();
  // }, [textSearch, allvenues]);

  const renderItemColumn = (ph, key) => {
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

  // Function to handle page change

  const handleCheckboxChange = (event, type) => {
    const { name, checked } = event.target;
    const setMinMax = (values, setFunction) => {
      let min,
        max,
        ismin = false,
        val,
        value;
      value = [...values];
      value[0][name][2] = checked;
      Object.entries(value[0]).forEach((val) => {
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
      val = value;
      val[1] = min;
      val[2] = max;
      setFunction(val);
    };
    switch (type) {
      case "Rental Cost":
        setMinMax(RCValue, setRCValue);
        break;
      case "Price Per Plate":
        setMinMax(PP, setPP);
        break;
      case "Lawns":
        setMinMax(Lawns, setLawns);
        break;
      case "Banquet":
        setMinMax(Banquets, setBanquets);
        break;
      case "Beds":
        setMinMax(Beds, setBeds);
        break;
      case "Rating":
        setMinMax(Rating, setRating);
        break;

      default:
        break;
    }
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
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
          {/* {searchText ? (
            <div
              style={{
                maxWidth: "calc(100vw + 60px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
                overflow: "hidden",
                // marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontSize: windowWidth > 500 ? "26px" : "18px",
                  textAlign: "right",
                  // color: "gray",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "end",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontWeight: "600",
                    textTransform: "capitalize",
                    width: "100%",
                    maxWidth: "140px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {searchText}
                </span>
                found in <span style={{ color: "#db3672" }}>Venue</span>
              </span>
              <span
                style={{
                  display: "flex",
                  fontSize: windowWidth > 500 ? "17px" : "14PX",
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                  alignItems: "end",
                  whiteSpace: "nowrap",

                  // position: 'fixed',
                }}
              >
                You can search{" "}
                <span
                  style={{
                    textTransform: "capitalize",
                    fontSize: windowWidth > 500 ? "19px" : "16PX",
                    maxWidth: "80px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {searchText}
                </span>
                in
                <span
                  style={{ color: "#db3672", cursor: "pointer" }}
                  onClick={() => {
                    router.push({
                      pathname: "products",
                      query: { search: searchText },
                    });
                  }}
                >
                  ShopNow
                </span>{" "}
                &{" "}
                <span
                  style={{ color: "#db3672", cursor: "pointer" }}
                  onClick={() => {
                    router.push({
                      pathname: "vendors",
                      query: { search: searchText },
                    });
                  }}
                >
                  Vendors
                </span>
              </span>
            </div>
          ) : (
            <></>
          )} */}
          {/* <Banner
            img={"venue"}
            head={"Book Your Venue by Venue Expert"}
            desc={
              "Fashion is a language that creates itself in clothes to interpret reality."
            }
          ></Banner> */}
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

              // border: "1px solid #00000029",
              boxShadow: "0px 8px 16px 0px #00000014",
              borderRadius: "8px",

              // marginBottom: '20px',
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
              {/* <span
                style={{
                  fontSize: '18px',
                  textAlign: 'right',
                  color: '#db3672',
                  gap: '10px',
                  fontWeight: '600',
                }}
              >
                {totalres}
              </span>{' '} */}
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
              {/** this knlsafbn gvkjfbjkdfsb */}
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
                              `/venue/wedding/1/${
                                location ? `/${location}` : ""
                              }/${v.name2}${searchText ? `/${searchText}` : ""}`
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
              {/* <article>
                  <button>Reset</button>
                  <button>View Result</button>
                </article> */}
            </div>
          ) : (
            <Dialog
              fullScreen
              open={pops}
              onClose={() => setPops(false)}
              TransitionComponent={Slide}
              TransitionProps={{ direction: "up" }}
              sx={{
                height: "60vh", // Adjust the height as needed
                bottom: 0,
                top: "40vh",
                padding: "0px",
              }}
            >
              <div
                style={{ height: pops ? "fit-content" : "0px" }}
                className={Styles.popout}
              >
                {/** this knlsafbn gvkjfbjkdfsb */}
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
                {/* <article>
                  <button>Reset</button>
                  <button>View Result</button>
                </article> */}
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
                    // windowSize
                    //   ? "repeat(auto-fit, minmax(350px, 1fr))"
                    //   : "repeat(auto-fit, minmax(280px, 1fr))",
                  }}
                  // class='row row-cols-1 gap-10 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3 mb-4 flex-shrink-0 row-cols-xl-4'
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
                      return renderItemColumn(item, key);
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
                {/* <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'end',
                    paddingTop: '15px',
                  }}
                >
                  <Pagination
                    count={pageCount}
                    size='large'
                    shape='rounded'
                    page={page}
                    onChange={handleChange}
                  />
                </div> */}
              </div>
            </div>
            <Downloads></Downloads>
          </div>
        </div>
        {/* <BottomNav /> */}
      </Box>
    </>
  );
};

export default Venue;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
      const cookies = req.headers.cookie;
      let globleuser =
        cookies &&
        cookies
          .split("; ")
          .find((row) => row.startsWith("id="))
          ?.split("=")[1];
      globleuser =
        globleuser == "undefined" || !globleuser ? undefined : globleuser;
      mongoose.connect(
        process.env.PROXY,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
          console.log("Connected to MongoDB");
        }
      );
      const { slug } = params;
      let condition = {};
      const sort = {};
      const CatArr = Object.keys(CatObj);
      let category = "";
      if (slug[2] && slug[2].length && CatArr.includes(slug[2])) {
        condition.category = CatObj[slug[2]];
        category = CatObj[slug[2]];
      }

      if (slug[1] && slug[1] !== "all") condition.city = slug[1];
      let searchText = "";
      if (!CatArr.includes(slug[2]) || (slug[3] && slug[3].length)) {
        let search = "";
        if (slug[3] && slug[3].length) search = slug[3];
        else if (slug[2] && slug[2].length) search = slug[2];
        searchText = search;
        if (search) {
          condition["$text"] = { $search: search };
          sort.score = { $meta: "textScore" };
        }
      } else {
        sort.priority = 1;
      }
      const page = parseInt(slug[0]);
      const skip = 40;
      const result = await VenueUserModels.find(condition)
        .sort(sort)
        .skip((page - 1) * skip)
        .limit(skip);
      const total = await VenueUserModels.countDocuments(condition);
      let res1;

      if (globleuser) {
        res1 = result.map(async (value) => {
          const value1 = JSON.parse(JSON.stringify(value));
          let condition = {
            is_delete: false,
            userId: globleuser,
            "product.productId": value1._id,
          };

          const result = await WishlistModels.find(condition);
          if (result.length) {
            value1.wishlist = true;
            value1.wishlistID = result[0]._id;
            return value1;
          } else {
            value1.wishlist = false;
            return value1;
          }
        });
      }
      res1 = globleuser ? await Promise.all(res1) : res1;

      const product = {
        success: true,
        message: "Items Gets Successfully",
        total,
        totalPage: Math.ceil(total / skip),
        page: slug[0],
        pageSize: result.length,
        data: res1 ? res1 : result,
      };
      mongoose.connection.close();
      return {
        props: {
          allvenue: JSON.stringify(product),
          searchText,
          category,
          page: parseInt(slug[0]),
          location: slug[1],
        },
      };
    }
);
