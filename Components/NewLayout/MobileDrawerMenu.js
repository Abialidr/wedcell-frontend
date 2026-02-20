import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import style from "./layout.module.scss";

import { useRouter } from "next/router";
import { useState } from "react";
import { selectUser, user } from "../../redux/reducer/appEssentials";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { S3PROXY } from "../../config";
import { selectLocation } from "redux/reducer/appEssentials";
const ListOption = ({ item, key, handleMobileMenu }) => {
  const location = useSelector(selectLocation);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const router = useRouter();
  return (
    <div key={key}>
      <div style={{ display: "flex", margin: "3px 0px", padding: "0px 6px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "12px",
          }}
        >
          <img
            style={{ width: "23px", height: "23px" }}
            src={`${item.icon}`}
            alt=""
          ></img>
        </div>
        <ListItemButton
          onClick={(e) => {
            e.preventDefault();
            if (item.subCategories.length > 0) {
              handleClick();
            } else if (item.link) {
              router.push(item.link);
              handleMobileMenu();
            } else {
              router.push({
                pathname: `/${item.id}`,
                query: {
                  ...(item.params
                    ? {
                        category: "Pandit Jee",
                      }
                    : {}),
                },
              });
              handleMobileMenu();
            }
          }}
        >
          <ListItemText primary={item.name} />
          {item.subCategories.length > 0 ? (
            open ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItemButton>
      </div>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item?.subCategories?.map((sub) => (
            <ListItemButton
              sx={{ pl: 4 }}
              key={sub}
              onClick={(e) => {
                e.preventDefault();
                router.push({
                  pathname: `/${item.id}/wedding/1/${
                    item.city ? `/${location}` : ""
                  }/${sub.venue}`,
                });
                handleMobileMenu();
              }}
            >
              <ListItemText primary={sub.id} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </div>
  );
};
const MobileMenu = ({ openDrawer, handleMobileMenu }) => {
  const router = useRouter();
  const DashboardList = [
    // {
    //   name: "Dashboard",
    //   subCategories: [
    //     {
    //       name: "Wishlist",
    //       icon: "account_circle",
    //       route: "wishlist",
    //     },
    //     {
    //       name: "Cart",
    //       route: "cart",
    //     },
    //     {
    //       name: "Order",
    //       route: "orders",
    //     },
    //     {
    //       name: "Contact",
    //       route: "contact",
    //     },
    //     {
    //       name: "Message",
    //       route: "Message",
    //     },
    //     {
    //       name: "Profile",
    //       route: "profile",
    //     },
    //   ],
    // },
    {
      name: "Planning Tools",
      icon: "construction",
      subCategories: [
        {
          name: "My Wedding",
          route: "MyWedding",
        },
        {
          name: "Checklist",
          route: "Checklist",
        },
        {
          name: "Vendor Manager",
          route: "VendorManager",
        },
        {
          name: "Guest List",
          route: "GuestList",
        },
        {
          name: "Budget Planner",
          route: "BudgetPlanner",
        },
        // {
        //   name: "Invites",
        //   route: "Invites",
        // },
      ],
    },
  ];
  const CategoriesList = [
    {
      name: "Venue",
      icon: `${S3PROXY}/public/Layout/l1.png`,
      id: "venue",
      city: true,
      subCategories: [
        { venue: "hotel", id: "Hotel" },
        { venue: "resort", id: "Resort" },
        { venue: "farm house", id: "Farm House" },
        { venue: "banquet hall", id: "Banquet Hall" },
        { venue: "lawn", id: "Lawn" },
        { venue: "destination wedding", id: "Destination Wedding" },
      ],
    },
    // {
    //   name: "Photographers",
    //   id: "vendors",
    //   icon: `${S3PROXY}/public/Layout/l2.png`,
    //   subCategories: [
    //     "Cinema/Video",
    //     "Album",
    //     "Collage Maker",
    //     "Drone",
    //     "Pre Wedding Shoot",
    //   ],
    // },
    // {
    //   name: "Makeup",
    //   id: "vendors",
    //   icon: `${S3PROXY}/public/Layout/l3.png`,
    //   subCategories: ["Bridal Makeup", "Groom Makeup", "Family Makeup"],
    // },
    {
      name: "Planning & Decor",
      id: "vendors",
      icon: `${S3PROXY}/public/Layout/l5.png`,
      link: "/planning-and-decor",
      subCategories: [],
    },

    // {
    //   name: "Mehndi",
    //   id: "vendors",
    //   icon: `${S3PROXY}/public/Layout/l8.png`,
    //   subCategories: ["Bride Mehndi", "Family Member Mehndi"],
    // },
    {
      name: "Music & Dance",
      id: "music-and-dance",
      icon: `${S3PROXY}/public/Layout/l9.png`,
      subCategories: [
        { venue: "anchor", id: "Anchor" },
        { venue: "choreographer", id: "Choreographer" },
        { venue: "dj", id: "DJ" },
        { venue: "dhol", id: "Dhol" },
        { venue: "live-band", id: "Live band" },
        { venue: "dj-based-band", id: "DJ based Band" },
        { venue: "male-and-female-singer", id: "Male & Female Singer" },
      ],
    },
    {
      name: "Photographer",
      icon: `${S3PROXY}/public/Layout/l2.png`,
      id: "photography",
      subCategories: [],
    },
    {
      name: "Mehendi",
      icon: `${S3PROXY}/public/Layout/l8.png`,
      id: "mehendi",
      subCategories: [],
    },
    {
      name: "Makeup",
      icon: `${S3PROXY}/public/Layout/l3.png`,
      id: "makeup",
      subCategories: [],
    },
    {
      name: "Cake",
      icon: `${S3PROXY}/public/icons/CAKE.png`,
      id: "other-products",
      link: "/cake/wedding/1",
      subCategories: [],
    },
    {
      name: "Invitation Card",
      icon: `${S3PROXY}/public/icons/INVITE.png`,
      id: "other-products",
      link: "/invitation-card/wedding/1",
      subCategories: [],
    },
    {
      name: "Invitation Gift",
      icon: `${S3PROXY}/public/icons/Gifts.png`,
      id: "other-products",
      link: "/invitation-gift/wedding/1",
      subCategories: [],
    },
    {
      name: "Dhol",
      icon: `${S3PROXY}/public/icons/DHOL.png`,
      id: "dhol",
      subCategories: [],
    },
    {
      name: "Food",
      id: "vendors",
      icon: `${S3PROXY}/public/Layout/l12.png`,
      city: true,
      subCategories: [
        { venue: "chaat-counter", id: "Chaat Counter" },
        { venue: "fruit-counter", id: "Fruit Counter" },
        { venue: "catering-services", id: "Catering services" },
        { venue: "pan-counter", id: "Pan Counter" },
        { venue: "bar-tenders", id: "Bar Tenders" },
      ],
    },
  ];

  const productsList = [
    {
      name: "Bridal Wear",
      id: "products",
      icon: `${S3PROXY}/public/Layout/l7.png`,
      subCategories: [
        { venue: "lehenga", id: "Lehenga" },
        { venue: "bridal-lehenga", id: "Bridal Lehenga" },
        { venue: "gowns", id: "Gowns" },
        { venue: "sharara", id: "Sharara" },
        { venue: "anarkali", id: "Anarkali" },
        { venue: "indo-western", id: "Indo Western" },
        { venue: "kurta", id: "Kurta" },
      ],
    },
    {
      name: "Groom Wear",
      id: "products",
      icon: `${S3PROXY}/public/Layout/l6.png`,
      subCategories: [
        { venue: "sherwani", id: "Sherwani" },
        { venue: "indo-western", id: "Indo Western" },
      ],
    },
  ];

  const CategotiesListVenue = [
    {
      name: "Hotel",
      subCategories: [],
    },
    {
      name: "Resort",
      subCategories: [],
    },
    {
      name: "Farm House",
      subCategories: [],
    },
    {
      name: "Banquet Hall",
      subCategories: [],
    },
    {
      name: "Lawn",
      subCategories: [],
    },
    {
      name: "Destination Wedding",
      subCategories: [],
    },
  ];

  const shopCategories = [
    {
      name: "Bridal Wear",
      id: "products",
      icon: "woman",
      subCategories: [
        // "Bridal Collection Lehenga",
        // "Gowns",
        "Lehenga",
        // "Saree",
        // "Skirt Top",
        // "Stitched Suit",
      ],
    },
    {
      name: "Groom Wear",
      id: "products",
      icon: "man",
      subCategories: [
        // "Blazer for Men",
        // "formal",
        // "Indo Western",
        // "Kids Kurta",
        // "Kids Kurta Jacket",
        // "kurta dhoti collection",
        // "Kurta Jacket Set",
        // "Kurta Pajama",
        // "Lower",
        // "Men Blazers Suits",
        // "Only Jacket",
        // "Only Kurta",
        "Sherwani",
        // "Stitched Suit",
        // "Twamev Kurta Set",
      ],
    },
  ];
  const globleuser = useSelector(selectUser);

  const occations = [
    "Engagement",
    "Haldi",
    "Mehendi",
    "Cocktail",
    "Wedding",
    "Reception",
    "Sangeet",
  ];

  const otherList = [
    {
      option: "Wedding Planning Tools",
      icon: `${S3PROXY}/public/Layout/l13.png`,
      id: "/user-dashboard",
    },
    {
      option: "E-Invites",
      icon: `${S3PROXY}/public/Layout/l13.png`,
      id: "/e-invite",
    },
    {
      option: "Hire freelance",
      icon: `${S3PROXY}/public/Layout/l13.png`,
      id: "/student",
    },
    {
      option: "Get Jobs",
      icon: `${S3PROXY}/public/Layout/l14.png`,
      id: "/vendor",
    },
    {
      option: "Wedfield-Institute",
      icon: `${S3PROXY}/public/Layout/l15.png`,
      id: "https://wedcellinstitute.com/",
    },
    {
      option: "Contact Us",
      icon: `${S3PROXY}/public/Layout/l16.png`,
      id: "/contact-us",
    },
    // {
    //   option: "Profile",
    //   icon: `${S3PROXY}/public/Layout/l13.png`,
    //   id: "/user-dashboard/profile",
    // },
  ];
  const ListOptionSingle = ({ item }) => {
    return (
      <div style={{ display: "flex", margin: "3px 0px", padding: "0px 6px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "12px",
          }}
        >
          <img
            style={{
              width: item.option === "Contact Us" ? "23px" : "33px",
              height: item.option === "Contact Us" ? "23px" : "33px",
              margin: item.option === "Contact Us" ? "0px 5px" : "0px",
            }}
            src={`${item.icon}`}
            alt=""
          ></img>
        </div>
        <ListItemButton
          onClick={(e) => {
            e.preventDefault();
            if (item.option === "Wedding Planning Tools") {
              if (globleuser) {
                router.push({
                  pathname: `${item.id}`,
                });
              } else {
                router.push("/customer-login");
              }
            } else {
              router.push({
                pathname: `${item.id}`,
              });
            }
            handleMobileMenu();
          }}
        >
          {/* <ListItemIcon>
          <InboxIcon />
        </ListItemIcon> */}
          <ListItemText primary={item.option} />
        </ListItemButton>
      </div>
    );
  };
  const dispatch = useDispatch();
  const ShopByOccasionOptions = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen(!open);
    };
    return (
      <>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "5px",
            }}
          >
            <Icon>celebration</Icon>
          </div>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary={"By Occasion"} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </div>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {occations?.map((sub) => (
              <ListItemButton
                sx={{ pl: 4 }}
                key={sub}
                onClick={(e) => {
                  e.preventDefault();
                  router.push({
                    pathname: "/products",
                    query: {
                      occation: sub,
                    },
                  });
                  handleMobileMenu();
                }}
              >
                {/* <ListItemIcon>
                  <StarBorder />
                </ListItemIcon> */}
                <ListItemText primary={sub} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  const ListOption1 = ({ item }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen(!open);
    };
    return (
      <div key={item.name}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "5px",
            }}
          >
            <Icon>{item.icon ? item.icon : "account_circle"}</Icon>
          </div>
          <ListItemButton
            onClick={() => {
              handleClick();
            }}
          >
            <ListItemText primary={item.name} />
            {item.subCategories.length > 0 ? (
              open ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItemButton>
        </div>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item?.subCategories?.map((sub, key) => (
              <ListItemButton
                sx={{ pl: 4 }}
                key={key}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (globleuser) {
                    router.push(
                      item.name === "Dashboard"
                        ? `/user-dashboard/${sub.route}`
                        : `/user-dashboard?direction=${sub.route}`
                    );
                  } else {
                    router.push(`/customer-login`);
                  }
                  handleMobileMenu();
                }}
              >
                <ListItemText primary={sub.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </div>
    );
  };

  //   const menuOptions = [""];

  var role;
  if (typeof window !== "undefined") {
    let local = localStorage.getItem("role");
    role = local ? JSON.parse(local).role : null;
  }

  return (
    <SwipeableDrawer
      onOpen={() => {}}
      variant="temporary"
      open={openDrawer}
      PaperProps={{
        sx: { width: "70%", maxWidth: "300px" },
      }}
      onClose={handleMobileMenu}
      disableBackdropTransition
    >
      <div className={style.mobilesidebar}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "10px",
            paddingRight: "16px",

            zIndex: "100",
            background: "white",
          }}
        >
          {/* <IconButton
          onClick={() => {
            router.push(
              role === 'User' ? '/user-dashboard' : '/customer-login'
            );
            handleMobileMenu();
          }}
          size='large'
          edge='end'
          aria-label='account of current user'
          aria-haspopup='true'
          color='inherit'
        >
          <Typography sx={styles.menuOptions}>
            {role === 'User' || role === 'Vendor'
              ? 'Dashboard'
              : 'Login / Register'}
          </Typography>
        </IconButton> */}
          <article
            onClick={() => {
              router.push(
                role === "User" ? "/user-dashboard" : "/customer-login"
              );
              handleMobileMenu();
            }}
            style={{
              paddingLeft: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {role === "User" ? (
              <span
                style={{
                  background: "#B6255A",
                  padding: "7px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50px",
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
              <img
                style={{
                  background: "#B6255A",
                  padding: "7px",
                  borderRadius: "50px",
                }}
                alt={""}
                src={`${S3PROXY}/public${S3PROXY}/public/Layout/prof.png`}
              ></img>
            )}
            {role === "User" ? globleuser?.data?.name : "Login / Signup"}
          </article>
          {role === "User" ||
          role === "Vendor" ||
          role === "Venue" ||
          role === "ShopNow" ? (
            <LogoutIcon
              onClick={(e) => {
                e.preventDefault();
                dispatch(user(undefined));
                document.cookie =
                  "id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                localStorage.removeItem("wedfield");
                localStorage.removeItem("role");
                localStorage.setItem("wedfieldIsLoged", "");
                router.push("/");
                handleMobileMenu();
              }}
            />
          ) : (
            <></>
          )}
        </div>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          // subheader={
          //   <ListSubheader component="div" id="nested-list-subheader">
          //     Wedding Options
          //   </ListSubheader>
          // }
        >
          <span
            style={{
              fontFamily: "Poppins",
              fontWeight: "700",
              fontSize: "18px",
              color: "#5D7285",
              padding: "0px 10px",
              paddingTop: "5px",
              display: "flex",
              background: "white",
            }}
          >
            Wedding Categories
          </span>
          {CategoriesList?.map((item, key) => (
            <ListOption
              handleMobileMenu={handleMobileMenu}
              item={item}
              key={key}
            />
          ))}
          <Divider />
          <span
            style={{
              fontFamily: "Poppins",
              fontWeight: "700",
              fontSize: "18px",
              color: "#5D7285",
              padding: "0px 10px",
              paddingTop: "10px",
              display: "flex",
            }}
          >
            Buy Products
          </span>
          {productsList?.map((item, key) => (
            <ListOption
              item={item}
              handleMobileMenu={handleMobileMenu}
              key={key}
            />
          ))}
          <Divider />
          <span
            style={{
              fontFamily: "Poppins",
              fontWeight: "700",
              fontSize: "18px",
              color: "#5D7285",
              padding: "0px 10px",
              paddingTop: "10px",
              display: "flex",
            }}
          >
            Services
          </span>
          {otherList?.map((item) => (
            <ListOptionSingle
              handleMobileMenu={handleMobileMenu}
              item={item}
              key={item.option}
            />
          ))}
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default MobileMenu;
