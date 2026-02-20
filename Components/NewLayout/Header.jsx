import React, { useEffect, useMemo } from "react";
import styles from "./layout.module.scss";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { VenuesModal } from "./topbar modal/VenuesModal";
import { VendorsModal } from "./topbar modal/VendorsModal";
import { ShopModal } from "./topbar modal/ShopModal";
import { LocationsModal } from "./topbar modal/LocationsModal";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@mui/material/Popover";
// import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Dialog, DialogContent, Slide, Tooltip } from "@mui/material";
import { useState } from "react";

import MobileMenu from "./MobileDrawerMenu";

import {
  selectLocation,
  selectUser,
  location as setLocation,
  user,
} from "../../redux/reducer/appEssentials";
import { useRouter } from "next/router";
import useWindowSize from "@rooks/use-window-size";
import { Icon } from "@iconify/react";
import moment from "moment";
import SearchBar from "./SearchBar";
import { makeStyles } from "@mui/styles";
import { S3PROXY } from "../../config";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  customWidth: {
    maxWidth: "1000px",
  },
  noMaxWidth: {
    maxWidth: "none",
  },
}));
const SearchModal = (props) => {
  const { innerWidth } = useWindowSize();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
      sx={{
        height: "50vh", // Adjust the height as needed
        bottom: 0,
        top: "50vh",
      }}
    >
      <DialogContent>
        <SearchBar handleCloseSearch={props.handleClose}></SearchBar>
      </DialogContent>
    </Dialog>
  );
};
const DashBoardModal = (props) => {
  const globleuser = useSelector(selectUser);
  const router = useRouter();

  const dispatch = useDispatch();
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
      position="bottom"
      sx={{
        height: "50vh", // Adjust the height as needed
        bottom: "0px !important",
        top: "50vh",
      }}
    >
      <DialogContent
        style={{
          padding: "10px 5px",
        }}
      >
        <div
          style={{
            // padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className={styles.profilepicImgName}>
            <div className={styles.profilepicImg}></div>
            <span className={styles.userName}>
              {globleuser?.data?.name} <br />
              <span className={styles.userEmail}>
                {globleuser?.data?.email}
              </span>{" "}
            </span>
          </div>
          <div className={`${styles.redirectionDiv}`}>
            <article
              className={
                router.pathname === "/user-dashboard"
                  ? styles.redirectioselectedArticle
                  : ""
              }
              onClick={(e) => {
                e.stopPropagation();
                router.push(globleuser ? "/user-dashboard" : "/customer-login");
              }}
            >
              <img
                style={{
                  filter:
                    router.pathname === "/user-dashboard"
                      ? "grayscale(0%)"
                      : "",
                }}
                src={`${S3PROXY}/public/images/pop11.png`}
                alt=""
              />
              {/* <StarRateIcon
                                style={{
                                  color:
                                    router.pathname === '/user-dashboard'
                                      ? 'red'
                                      : '#BBBBBB',
                                  fontSize: '25px',
                                }}
                              /> */}
              <span>Wedding Planner</span>
            </article>
            <article
              className={
                router.pathname === "/user-dashboard/profile"
                  ? styles.redirectioselectedArticle
                  : ""
              }
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  globleuser ? "/user-dashboard/profile" : "/customer-login"
                );
              }}
            >
              <img
                style={{
                  filter:
                    router.pathname === "/user-dashboard/profile"
                      ? "grayscale(0%)"
                      : "",
                }}
                src={`${S3PROXY}/public/images/pop21.png`}
                alt=""
              />

              <span>Edit Profile</span>
            </article>
            <article
              className={
                router.pathname === "/user-dashboard/wishlist"
                  ? styles.redirectioselectedArticle
                  : ""
              }
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  globleuser ? "/user-dashboard/wishlist" : "/customer-login"
                );
              }}
            >
              <img
                style={{
                  filter:
                    router.pathname === "/user-dashboard/wishlist"
                      ? "grayscale(0%)"
                      : "",
                }}
                src={`${S3PROXY}/public/images/pop31.png`}
                alt=""
              />

              <span>Wishlist</span>
            </article>
            <article
              className={
                router.pathname === "/user-dashboard/cart"
                  ? styles.redirectioselectedArticle
                  : ""
              }
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  globleuser ? "/user-dashboard/cart" : "/customer-login"
                );
              }}
            >
              <img
                style={{
                  filter:
                    router.pathname === "/user-dashboard/wishlist"
                      ? "grayscale(0%)"
                      : "",
                }}
                src={`${S3PROXY}/public/images/pop31.png`}
                alt=""
              />

              <span>Cart</span>
            </article>
            <article
              className={
                router.pathname === "/user-dashboard/Message"
                  ? styles.redirectioselectedArticle
                  : ""
              }
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  globleuser ? "/user-dashboard/Message" : "/customer-login"
                );
              }}
            >
              <img
                style={{
                  filter:
                    router.pathname === "/user-dashboard/Message"
                      ? "grayscale(0%)"
                      : "",
                }}
                src={`${S3PROXY}/public/images/pop61.png`}
                alt=""
              />

              <span>Message</span>
            </article>
          </div>
          <button
            className={styles.goToWed}
            onClick={() => {
              props.handleClose();
              localStorage.removeItem("wedfield");
              localStorage.setItem("wedfieldIsLoged", "");
              localStorage.removeItem("role");
              dispatch(user(undefined));
              document.cookie =
                "id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Header = () => {
  const classes = useStyles();

  const globleuser = useSelector(selectUser);
  const [endDate, setEndDate] = useState();
  const [timeRemaining, setTimeRemaining] = useState();
  useEffect(() => {
    const newTime = moment(`2024-04-21T00:00:00+05:30`).format();
    setEndDate(newTime);
  }, []);
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

  const [openAuto, setOpenAuto] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("Press Search To View Result");

  const searchData = async () => {
    try {
      setList([
        { name: `Search for "${input}" in Vendors`, link: "vendors", id: 1 },
        { name: `Search for "${input}" in Venues`, link: "venue", id: 2 },
        { name: `Search for "${input}" in Products`, link: "products", id: 3 },
      ]);
      setOpenAuto(true);
    } catch (error) {
      console.error(`🚀 ~ file: index.js:393 ~ searchData ~ error:`, error);
      setList([]);
      setIsLoading(false);
      setSearchText("No Data Found");
      setOpenAuto(true);
    }
  };
  const [list, setList] = useState([]);
  const [oldList, setOldList] = useState();
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setSearchText("Press Search To View Result");
    setInput(e.target.value.toLowerCase());
    setList([]);
  };
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openMobileDrawer, setOpenMobileDrawer] = React.useState(false);
  const [openVendor, setOpenVendor] = React.useState(false);
  const [openShop, setOpenShop] = React.useState(false);
  const [openLocation, setOpenLocation] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openDash, setOpenDash] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    handleCloseVendor();
    handleCloseSearch();
    handleCloseShop();
    handleCloselocation();
  };
  const handleOpenVendor = () => {
    setOpenVendor(true);
    handleClose();
    handleCloseSearch();
    handleCloseShop();
    handleCloselocation();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseShop = () => setOpenShop(false);
  const handleCloseVendor = () => {
    setOpenVendor(false);
  };
  const handleCloselocation = () => setOpenLocation(false);
  const handleOpenShop = () => {
    setOpenShop(true);
    handleCloseVendor();
    handleCloseSearch();
    handleClose();
    handleCloselocation();
  };
  const handleOpenLocation = () => setOpenLocation(true);
  const handleOpenSearch = () => {
    setOpenSearch(true);
    handleCloseVendor();
    handleClose();
    handleCloseShop();
    handleCloselocation();
  };
  const handleCloseSearch = () => setOpenSearch(false);
  const handleOpenDash = () => setOpenDash(true);
  const handleCloseDash = () => setOpenDash(false);

  const handleLocation = (el) => {
    localStorage.setItem("location", el);
    window.dispatchEvent(new Event("location"));
    const currentPath = router.asPath;

    dispatch(setLocation(el));
    setOpenLocation(false);
    if (currentPath.includes("venue") || currentPath.includes("vendor")) {
      let segments = currentPath.split("/");
      let city = el;
      // if (el == "") {
      //   city = "all";
      // }
      segments[4] = city;
      let newPath = segments.join("/");
      console.log(
        "🚀 ~ file: Header.jsx:398 ~ handleLocation ~ newPath:",
        newPath
      );
      router.push(newPath);
    }
  };

  const [open2, setOpen2] = React.useState(true);

  const handleClick = () => {
    setOpen2(!open2);
  };
  const [openCollapse, setOpenCollapse] = React.useState(false);

  function handleOpenSettings() {
    setOpenCollapse(!openCollapse);
  }

  function handleOpenMobileMenu() {
    setOpenMobileDrawer(!openMobileDrawer);
  }

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [open1, setopen1] = useState(false);

  const handleClick1 = (event) => {
    setopen1(true);
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setopen1(false);
    setAnchorEl1(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  var role;
  if (typeof window !== "undefined") {
    let local = localStorage.getItem("role");
    role = local ? JSON.parse(local).role : null;
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const router = useRouter();

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  const location = useSelector(selectLocation);
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const [closeOffer, setCloaseOffer] = useState(false);

  useMemo(() => {
    setCloaseOffer(!(router.pathname === "/"));
  }, [router.pathname]);
  return (
    <>
      {/* <VenuesModal
        open={open}
        handleClose={handleClose}
        handleLocation={handleLocation}
      /> */}
      {/* <ShopModal></ShopModal> */}

      {windowWidth > 900 ? (
        <></>
      ) : (
        <>
          <SearchModal
            open={openSearch}
            handleClose={handleCloseSearch}
            input={input}
            setInput={setInput}
            searchData={searchData}
            list={list}
            // handleLocation={handleLocation}
          />
          <DashBoardModal
            open={openDash}
            handleClose={handleCloseDash}

            // handleLocation={handleLocation}
          />
          <LocationsModal
            open={openLocation}
            handleClose={handleCloselocation}
            handleLocation={handleLocation}
          />
        </>
      )}
      <MobileMenu
        openDrawer={openMobileDrawer}
        handleMobileMenu={handleOpenMobileMenu}
      />
      <>
        {windowWidth > 900 ? (
          <>
            <div
              className={styles.offers}
              style={{ height: closeOffer ? "0px" : "" }}
            >
              <img
                onClick={() => setCloaseOffer(true)}
                src={`${S3PROXY}/public/Layout/cross.png`}
                alt=""
              />
              <article>
                50% OFF ON VENUE BOOKING
                <section>
                  <span>{calculateTimeRemaining().days}</span>:
                  <span>{calculateTimeRemaining().hours}</span>:
                  <span>{calculateTimeRemaining().minutes}</span>:
                  <span>{calculateTimeRemaining().seconds}</span>
                </section>
              </article>
            </div>
            <div className={styles.topHead}>
              <div className={styles.inner}>
                <img
                  onClick={() => router.push("/")}
                  src={`${S3PROXY}/public/Layout/logo.svg`}
                  alt=""
                />
                <SearchBar
                  searchData={searchData}
                  button={
                    <button
                      type="submit"
                      className={`${styles.formButton}`}
                      onClick={searchData}
                    >
                      <Icon icon={"iconoir:search"} />
                    </button>
                  }
                ></SearchBar>
                {/* {windowWidth > 900 ? (
                  <>
                    <div className={`${styles.form} SearchForM1234567890`}>
          
                      <ThemeProvider theme={theme}>
                        <Autocomplete
                          className={styles.autocomplete1}
                          noOptionsText={searchText}
                          open={openAuto}
                          loading={isloading}
                          onOpen={() => {
                            setOpenAuto(true);
                          }}
                          onClose={() => {
                            setOpenAuto(false);
                          }}
                          sx={{
                            borderColor: 'white',
                            width: '100%',
                            //  {
                            //   sm: '130px',
                            //   md: '280px',
                            //   lg: '300px',
                            //   xl: '270px',
                            //   xs: '180px',
                            // },
                          }}
                          disablePortal
                          id='combo-box-demo'
                          options={list?.map((item) => {
                            return { label: item.name, id: item._id };
                          })}
                          onChange={(data) => {
                            const selectedData =
                              list[
                                parseInt(
                                  data.target.id[data.target.id?.length - 1]
                                )
                              ];
                            if (selectedData?.link) {
                              if (selectedData?.link.includes('venue')) {
                                router.push({
                                  pathname: 'venue',
                                  query: { search: input },
                                });
                              } else if (
                                selectedData?.link.includes('vendors')
                              ) {
                                router.push({
                                  pathname: 'vendors',
                                  query: { search: input },
                                });
                              } else {
                                router.push({
                                  pathname: 'products',
                                  query: { search: input },
                                });
                              }
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              onKeyDown={(ev) => {
                                if (ev.key === 'Enter') {
                                  // Do code here
                                  ev.preventDefault();
                                  searchData();
                                }
                              }}
                              {...params}
                              label='Search Venue & Vendors'
                              onSelect={handleInput}
                              sx={{
                                width: {
                                  // sm: '350px',
                                  // xs: '210px',
                                  // lg: '210px',
                                },
                                fontFamily: 'Poppins',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#9A9EA6',

                                paddingRight: '5px',
                                margin: '10px auto',
                                borderColor: 'white',
                                borderRadius: '90px',
                                // backgroundColor: 'rgba(240, 241, 242, 1)',
                              }}
                            />
                          )}
                        />
                      </ThemeProvider>
                      <button
                        type='submit'
                        className={`${styles.formButton}`}
                        onClick={searchData}
                      >
                        <Icon icon={'iconoir:search'} />
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )} */}
                <div>
                  <article
                    onClick={() => router.push("/contact-us")}
                    style={{ cursor: "pointer" }}
                  >
                    <Icon width={"35px"} icon={"tabler:phone-call"} />
                    <span>
                      Have a question?
                      <p>Contact Us</p>
                    </span>
                  </article>
                  {role === "User" ? (
                    <div className={styles.span1}>
                      <div
                        className={styles.profilePic}
                        variant="contained"
                        onClick={
                          globleuser?.data?.email
                            ? handleClick1
                            : () => router.push("/user-dashboard")
                        }
                      >
                        {globleuser?.data?.name?.substring(0, 1)}
                      </div>
                      <Popover
                        style={{
                          marginTop: "7px",
                          zIndex: "1401",
                        }}
                        open={open1}
                        onClose={handleClose1}
                        anchorEl={anchorEl1}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <div
                          style={{
                            width: "280px",
                            // padding: "10px",
                            display: open1 ? "flex" : "none",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div className={styles.profilepicImgName}>
                            <div className={styles.profilepicImg}>
                              {globleuser?.data?.name?.substring(0, 1)}
                            </div>
                            <span className={styles.userName}>
                              {globleuser?.data?.name} <br />
                              <span className={styles.userEmail}>
                                {globleuser?.data?.email}
                              </span>{" "}
                            </span>
                          </div>
                          <div className={`${styles.redirectionDiv}`}>
                            <article
                              className={
                                router.pathname === "/user-dashboard"
                                  ? styles.redirectioselectedArticle
                                  : ""
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  globleuser
                                    ? "/user-dashboard"
                                    : "/customer-login"
                                );
                              }}
                            >
                              <img
                                style={{
                                  filter:
                                    router.pathname === "/user-dashboard"
                                      ? "grayscale(0%)"
                                      : "",
                                }}
                                src={`${S3PROXY}/public/images/pop11.png`}
                                alt=""
                              />
                              {/* <StarRateIcon
                                style={{
                                  color:
                                    router.pathname === '/user-dashboard'
                                      ? 'red'
                                      : '#BBBBBB',
                                  fontSize: '25px',
                                }}
                              /> */}
                              <span>Wedding Planner</span>
                            </article>
                            <article
                              className={
                                router.pathname === "/user-dashboard/profile"
                                  ? styles.redirectioselectedArticle
                                  : ""
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  globleuser
                                    ? "/user-dashboard/profile"
                                    : "/customer-login"
                                );
                              }}
                            >
                              <img
                                style={{
                                  filter:
                                    router.pathname ===
                                    "/user-dashboard/profile"
                                      ? "grayscale(0%)"
                                      : "",
                                }}
                                src={`${S3PROXY}/public/images/pop21.png`}
                                alt=""
                              />

                              <span>Edit Profile</span>
                            </article>
                            <article
                              className={
                                router.pathname === "/user-dashboard/wishlist"
                                  ? styles.redirectioselectedArticle
                                  : ""
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  globleuser
                                    ? "/user-dashboard/wishlist"
                                    : "/customer-login"
                                );
                              }}
                            >
                              <img
                                style={{
                                  filter:
                                    router.pathname ===
                                    "/user-dashboard/wishlist"
                                      ? "grayscale(0%)"
                                      : "",
                                }}
                                src={`${S3PROXY}/public/images/pop31.png`}
                                alt=""
                              />

                              <span>Wishlist</span>
                            </article>
                            <article
                              className={
                                router.pathname === "/user-dashboard/cart"
                                  ? styles.redirectioselectedArticle
                                  : ""
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  globleuser
                                    ? "/user-dashboard/cart"
                                    : "/customer-login"
                                );
                              }}
                            >
                              <img
                                style={{
                                  filter:
                                    router.pathname === "/user-dashboard/cart"
                                      ? "grayscale(0%)"
                                      : "",
                                }}
                                src={`${S3PROXY}/public/images/pop41.png`}
                                alt=""
                              />

                              <span>Cart</span>
                            </article>
                            {/* <article
                              className={
                                router.pathname === '/user-dashboard/cart'
                                  ? styles.redirectioselectedArticle
                                  : ''
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  globleuser
                                    ? '/user-dashboard/cart'
                                    : '/customer-login'
                                );
                              }}
                            >
                              <img
                                style={{
                                  filter:
                                    router.pathname === '/user-dashboard/cart'
                                      ? 'grayscale(0%)'
                                      : '',
                                }}
                                src={`${S3PROXY}/public/images/pop41.png`}
                                alt=''
                              />

                              <span>Cart</span>
                            </article>
                            <article
                              className={
                                router.pathname === '/user-dashboard/orders'
                                  ? styles.redirectioselectedArticle
                                  : ''
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  globleuser
                                    ? '/user-dashboard/orders'
                                    : '/customer-login'
                                );
                              }}
                            >
                              <img
                                style={{
                                  filter:
                                    router.pathname === '/user-dashboard/orders'
                                      ? 'grayscale(0%)'
                                      : '',
                                }}
                                src={`${S3PROXY}/public/images/pop51.png`}
                                alt=''
                              />

                              <span>My Orders</span>
                            </article> */}
                            <article
                              className={
                                router.pathname === "/user-dashboard/Message"
                                  ? styles.redirectioselectedArticle
                                  : ""
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  globleuser
                                    ? "/user-dashboard/Message"
                                    : "/customer-login"
                                );
                              }}
                            >
                              <img
                                style={{
                                  filter:
                                    router.pathname ===
                                    "/user-dashboard/Message"
                                      ? "grayscale(0%)"
                                      : "",
                                }}
                                src={`${S3PROXY}/public/images/pop61.png`}
                                alt=""
                              />

                              <span>Message</span>
                            </article>
                          </div>
                          <button
                            className={styles.goToWed}
                            onClick={() => {
                              setopen1(false);
                              localStorage.removeItem("wedfield");
                              localStorage.setItem("wedfieldIsLoged", "");
                              localStorage.removeItem("role");
                              dispatch(user(undefined));
                              document.cookie =
                                "id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                              router.push("/");
                            }}
                          >
                            Logout
                          </button>
                        </div>
                      </Popover>
                    </div>
                  ) : role === "Students" ||
                    role === "Vendor" ||
                    role === "Venue" ||
                    role === "ShopNow" ? (
                    <Link
                      href={
                        role === "User"
                          ? "/user-dashboard"
                          : role === "Students"
                          ? "/student/profile"
                          : role === "Vendor" || role === "Venue"
                          ? "/dashboard"
                          : role === "ShopNow"
                          ? "/dashboard/sellersdashboard"
                          : "/customer-login"
                      }
                      passHref
                    >
                      <IconButton
                        size="small"
                        edge="end"
                        // aria-label='account of current user'
                        // aria-controls={menuId}
                        // aria-haspopup='true'
                        color="inherit"
                      >
                        <Typography sx={{ fontSize: "12px" }}>
                          {role === "User" ||
                          role === "Students" ||
                          role === "Vendor" ||
                          role === "Venue" ||
                          role === "ShopNow"
                            ? "Dashboard"
                            : "Login"}
                        </Typography>
                      </IconButton>
                    </Link>
                  ) : (
                    <span>
                      <button
                        onClick={() => {
                          router.push("/customer-login");
                        }}
                      >
                        Register / Login
                      </button>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.bottomHead}>
              <div className={styles.inner}>
                <article>
                  <Tooltip
                    open={open}
                    onClose={handleClose}
                    onOpen={() => {
                      setOpen(true);
                    }}
                    title={
                      <VenuesModal
                        handleClose={handleClose}
                        handleLocation={handleLocation}
                      />
                    }
                    placement="bottom-end"
                  >
                    <span onClick={handleOpen}>
                      Venue{" "}
                      <img src={`${S3PROXY}/public/Layout/dwnarr.png`} alt="" />
                    </span>
                  </Tooltip>
                  <Tooltip
                    open={openVendor}
                    onClose={handleCloseVendor}
                    onOpen={() => {
                      setOpenVendor(true);
                    }}
                    title={
                      <VendorsModal
                        handleClose={handleCloseVendor}
                        handleLocation={handleLocation}
                      />
                    }
                    placement="bottom"
                  >
                    <span>
                      Vendor{" "}
                      <img src={`${S3PROXY}/public/Layout/dwnarr.png`} alt="" />
                    </span>
                  </Tooltip>
                  <Tooltip
                    open={openShop}
                    onClose={handleCloseShop}
                    onOpen={() => {
                      setOpenShop(true);
                    }}
                    title={
                      <ShopModal
                        handleClose={handleCloseShop}
                        handleLocation={handleLocation}
                      />
                    }
                    placement="bottom"
                  >
                    <span>
                      Shop Now{" "}
                      <img src={`${S3PROXY}/public/Layout/dwnarr.png`} alt="" />
                    </span>
                  </Tooltip>
                  <span
                    onClick={() => {
                      router.push("/e-invite");
                    }}
                  >
                    E-Invites{" "}
                  </span>
                  <span
                    onClick={() => {
                      if (globleuser) {
                        router.push("/user-dashboard");
                      } else {
                        router.push("/customer-login");
                      }
                    }}
                  >
                    Wedding Planning Tools
                  </span>
                  <span
                    onClick={() => {
                      router.push("/planning-and-decor");
                      // if (globleuser) {
                      // } else {
                      //   router.push("/customer-login");
                      // }
                    }}
                  >
                    Wedding Decor
                  </span>
                  <span
                    onClick={() => {
                      router.push("/photography");
                      // if (globleuser) {
                      // } else {
                      //   router.push("/customer-login");
                      // }
                    }}
                  >
                    Photography
                  </span>
                  <span
                    onClick={() => {
                      router.push("/invitation-gift/wedding/1");
                      // if (globleuser) {
                      // } else {
                      //   router.push("/customer-login");
                      // }
                    }}
                  >
                    Invitation Gift
                  </span>
                </article>
                <section>
                  <Tooltip
                    title={
                      <LocationsModal
                        OpenedModal={true}
                        handleLocation={handleLocation}
                      />
                    }
                    placement="bottom"
                  >
                    <article
                      className={classes.button}
                      onClick={() => {
                        setOpenLocation(true);
                        handleCloseVendor();
                        handleCloseSearch();
                        handleCloseShop();
                        handleClose();
                      }}
                    >
                      <img src={`${S3PROXY}/public/Layout/loc.png`} alt="" />
                      <span>{location?.length ? location : "All"}</span>
                      <img src={`${S3PROXY}/public/Layout/arr.png`} alt="" />
                    </article>
                  </Tooltip>
                  <span>
                    <img
                      onClick={() => {
                        if (globleuser) {
                          router.push("/user-dashboard/Message");
                        } else {
                          router.push("/customer-login");
                        }
                      }}
                      src={`${S3PROXY}/public/Layout/bth1.png`}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      onClick={() => {
                        if (globleuser) {
                          router.push("/user-dashboard/wishlist");
                        } else {
                          router.push("/customer-login");
                        }
                      }}
                      src={`${S3PROXY}/public/Layout/bth3.png`}
                      alt=""
                    />
                  </span>
                  {/* <span>
                    <img
                      onClick={() => {
                        if (globleuser) {
                          router.push('/user-dashboard/cart');
                        } else {
                          router.push('/customer-login');
                        }
                      }}
                      className={styles.del}
                      src={`${S3PROXY}/public/Layout/bth4.png`}
                      alt=''
                    />
                  </span> */}
                </section>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={styles["offers-mobile"]}
              style={{
                marginTop: closeOffer ? "-43px" : "0px",
                display:
                  process.env.NEXT_PUBLIC_ENVR == "mobile" ? "none" : "flex",
                position: "fixed",
              }}
            >
              <FontAwesomeIcon
                color="black"
                icon="fa fa-close"
                style={{
                  height: "25px",
                  width: "25px",
                }}
                onClick={() => {
                  setCloaseOffer(true);
                }}
              />
              <article>
                India’s #1 wedding planning app
                <br />2 million+ installs
              </article>
              <a
                href="https://play.google.com/store/apps/details?id=com.wedding.wedfield&pcampaignid=web_share"
                target="_blank"
              >
                <FontAwesomeIcon
                  color="green"
                  icon="fa-brands fa-android"
                  style={{
                    height: "25px",
                    width: "25px",
                  }}
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/wedfield-wedding-marketplace/id6736426335"
                target="_blank"
              >
                <FontAwesomeIcon
                  color="grey"
                  icon="fa-brands fa-apple"
                  style={{
                    height: "25px",
                    width: "25px",
                  }}
                />
              </a>
            </div>
            <div
              className={styles.mobileHeader}
              style={{
                marginTop:
                  process.env.NEXT_PUBLIC_ENVR == "web" && !closeOffer
                    ? "43px"
                    : "0px",
                transition: "all ease 0.4s",
              }}
            >
              <article>
                <img
                  onClick={handleOpenMobileMenu}
                  src={`${S3PROXY}/public/Layout/menu 1.png`}
                  alt=""
                />
                <img
                  onClick={() => router.push("/")}
                  src={`${S3PROXY}/public/Layout/logo copy.svg`}
                  alt=""
                />
              </article>
              <section>
                <article
                  onClick={() => {
                    setOpenLocation(true);
                    handleCloseVendor();
                    handleCloseSearch();
                    handleCloseShop();
                    handleClose();
                  }}
                >
                  <img src={`${S3PROXY}/public/Layout/loc2.png`} alt="" />
                  {location?.length ? location : "All"}
                  <img src={`${S3PROXY}/public/Layout/arr2.png`} alt="" />
                </article>
                <span onClick={() => setOpenSearch(true)}>
                  <Icon color="white" icon={"iconoir:search"}></Icon>
                </span>
                {globleuser ? (
                  <span
                    style={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    onClick={() => handleOpenDash()}
                  >
                    {globleuser?.data?.name?.substring(0, 1)}
                  </span>
                ) : (
                  <hgroup onClick={() => router.push("/customer-login")}>
                    <Icon icon={"ri:login-circle-line"}></Icon>
                  </hgroup>
                )}
              </section>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default Header;
