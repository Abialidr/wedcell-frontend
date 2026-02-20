// import React, { useEffect, useState } from "react";
import Styles from "../../styles/Dashboard/Sidebar.module.css";
import { AiOutlineCompass, AiOutlineContacts } from "react-icons/ai";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import TodayIcon from "@mui/icons-material/Today";
import { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useState } from "react";
function Sidebar({ headerHeight, dashboard, setShow, show }) {
  
  const closeSidebar = () => setShow(false);
  const showSidebar = () => setShow(true);
  const globleuser = useSelector(selectUser);

  const router = useRouter();

  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(JSON.parse(localStorage.getItem("role")).role);
  }, [router]);
  useEffect(() => {}, [role]);
  return (
    <Offcanvas show={show} onHide={closeSidebar} style={{ width: "250px" }}>
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <div className="sidebar-links-container">
          {role === "Vendor" || role === "Venue" ? (
            <>
              <div
                className={
                  router.pathname === "/dashboard"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/dashboard")}
              >
                <span className={`${Styles.sidebar_icon} me-2`}>
                  <AiOutlineCompass />
                </span>
                <span>Dashboard</span>
              </div>

              <div
                className={
                  router.pathname === "/dashboard/pricing"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/dashboard/pricing")}
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <FaMoneyBillAlt />
                </span>
                <span>Pricing</span>
              </div>
              <div
                className={
                  router.pathname === "/dashboard/event"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/dashboard/event")}
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <TodayIcon sx={{ fontSize: "20px" }} />
                </span>
                <span>Events</span>
              </div>
            </>
          ) : null}
          {role === "ShopNow" ? (
            <>
              <div
                className={
                  router.pathname === "/dashboard/sellersdashboard"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/dashboard/sellersdashboard")}
              >
                <span className={`${Styles.sidebar_icon} me-2`}>
                  <AiOutlineCompass />
                </span>
                <span>Sellers Dashboard</span>
              </div>
            </>
          ) : (
            <></>
          )}

          {role === "User" ? (
            <>
              <div
                className={
                  router.pathname === "/user-dashboard"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/user-dashboard")}
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <FavoriteIcon />
                </span>
                <span>Planning Tools</span>
              </div>
              <div
                className={
                  router.pathname === "/user-dashboard/wishlist"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/user-dashboard/wishlist")}
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <FavoriteIcon />
                </span>
                <span>Wishlist</span>
              </div>
              <div
                className={
                  router.pathname === "/user-dashboard/cart"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/user-dashboard/cart")}
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <ShoppingCartIcon />
                </span>
                <span>Cart</span>
              </div>
              <div
                className={
                  router.pathname === "/user-dashboard/orders"
                    ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                    : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
                }
                onClick={() => router.push("/user-dashboard/orders")}
              >
                <span className={`${Styles.sidebar_icon} me-3`}>
                  <LocalMallIcon />
                </span>
                <span>Orders</span>
              </div>
            </>
          ) : null}

          {role === "Students" ? (
            <div
              className={
                router.pathname === "/dashboard/profile" ||
                router.pathname === "/student/profile"
                  ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                  : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
              }
              onClick={() =>
                role === "Vendor"
                  ? router.push("/dashboard/profile")
                  : router.push("/student/profile")
              }
            >
              <span className={`${Styles.sidebar_icon} me-3`}>
                <AiOutlineContacts />
              </span>
              <span>Profile</span>
            </div>
          ) : (
            <div
              className={
                router.pathname === "/dashboard/profile" ||
                router.pathname === "/user-dashboard/profile"
                  ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                  : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
              }
              onClick={() =>
                role === "Vendor" || role === "ShopNow" || role === "Venue"
                  ? router.push("/dashboard/profile")
                  : router.push("/user-dashboard/profile")
              }
            >
              <span className={`${Styles.sidebar_icon} me-3`}>
                <AiOutlineContacts />
              </span>
              <span>Profile</span>
            </div>
          )}
          {role !== "Students" ? (
            <div
              className={
                router.pathname === "/dashboard/contact" ||
                router.pathname === "/user-dashboard/contact"
                  ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
                  : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
              }
              onClick={() =>
                role === "Vendor" || role === "ShopNow" || role === "Venue"
                  ? router.push("/dashboard/contact")
                  : router.push("/user-dashboard/contact")
              }
            >
              <span className={`${Styles.sidebar_icon} me-3`}>
                <ContactPhoneIcon sx={{ fontSize: "20px" }} />
              </span>
              <span>View Contact</span>
            </div>
          ) : null}
          {/* <div
          className={
            router.pathname === "/dashboard/change-password" ||
            router.pathname === "/user-dashboard/change-password"
              ? `${Styles.sidebar_links_wrapper} ${Styles.active}  d-flex align-items-center cursor-pointer`
              : `${Styles.sidebar_links_wrapper}   d-flex align-items-center cursor-pointer`
          }
          onClick={() =>
            dashboard && dashboard === "vendor"
              ? router.push("/dashboard/change-password")
              : router.push("/user-dashboard/change-password")
          }
        >
          <span className={`${Styles.sidebar_icon} me-3`}>
            <GrUpdate />
          </span>
          <span>Change Password</span>
        </div> */}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
