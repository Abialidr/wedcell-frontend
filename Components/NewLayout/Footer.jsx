import React, { useEffect, useState } from "react";
import styles from "./layout.module.scss";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  location as setLocation,
  user,
} from "../../redux/reducer/appEssentials";
const Footer = ({ footerBottom }) => {
  const dispatch = useDispatch();
  // dispatch(loginRoute(""));
  const router = useRouter();
  const handleLocation = (el) => {
    localStorage.setItem("location", el);
    window.dispatchEvent(new Event("location"));
    dispatch(setLocation(el));
    // setLocation(el);
    // setOpenLocation(false);
  };
  let role;
  if (typeof window !== "undefined") {
    let local = localStorage.getItem("role");
    role = local ? JSON.parse(local).role : null;
  }

  return (
    <>
      <div
        style={{
          display: process.env.NEXT_PUBLIC_ENVR == "mobile" ? "none" : "flex",
        }}
        className={styles.footer}
      >
        <div className={styles.top}>
          <div className={styles.left}>
            <article>
              <hgroup>Destination Wedding</hgroup>
              {[
                "Agra",
                "Delhi",
                "Jaipur",
                "Udaipur",
                "Jodhpur",
                "Mussoorie",
                "Dehradun",
              ].map((val, key) => {
                return (
                  <span
                    onClick={() => {
                      handleLocation(val);
                      router.push({
                        pathname: `/venue/wedding/1/${val}/destination-wedding`,
                      });
                    }}
                    key={key}
                  >
                    {val}
                  </span>
                );
              })}
            </article>
            <article>
              <hgroup>Venue</hgroup>
              {[
                "Agra",
                "Delhi",
                "Jaipur",
                "Udaipur",
                "Jodhpur",
                "Mussoorie",
                "Dehradun",
              ].map((val, key) => {
                return (
                  <span
                    onClick={() => {
                      handleLocation(val);
                      router.push({
                        pathname: `/venue/wedding/1/${val}`,
                      });
                    }}
                    key={key}
                  >
                    {val}
                  </span>
                );
              })}
            </article>
            <article>
              <hgroup>Vendor</hgroup>
              {[
                "Agra",
                "Delhi",
                "Jaipur",
                "Udaipur",
                "Jodhpur",
                "Mussoorie",
                "Dehradun",
              ].map((val, key) => {
                return (
                  <span
                    onClick={() => {
                      handleLocation(val);
                      router.push({
                        pathname: `/vendors/wedding/1/${val}`,
                      });
                    }}
                    key={key}
                  >
                    {val}
                  </span>
                );
              })}
            </article>
            <article>
              <hgroup>Important Links</hgroup>
              {[
                { n: "Home", l: "/" },
                { n: "Blog", l: "/blog" },
                { n: "Wedcell Institute", l: "https://wedcellinstitute.com/" },
                // { n: "Get Jobs", l: "/vendor" },
                {
                  // n: "Hire freelancer",
                  // l: "/student",
                },
              ].map((val, key) => {
                return (
                  <span onClick={() => router.push(val.l)} key={key}>
                    {val.n}
                  </span>
                );
              })}

              <span
                onClick={() => {
                  router.push("/contact-us");
                }}
              >
                Contact Us
              </span>
            </article>
            <article>
              <hgroup>Contact Us</hgroup>
              {[
                {
                  n: "FaceBook",
                  i: "ant-design:facebook-filled",
                  l: "https://www.facebook.com/wedfieldevents",
                },
                {
                  n: "Instagram",
                  i: "ri:instagram-line",
                  l: "https://www.instagram.com/wedfieldevents/",
                },
                {
                  n: "LinkedIn",
                  i: "mdi:linkedin",
                  l: "https://in.linkedin.com/company/wedfieldevents",
                },
                {
                  n: "Pinterest",
                  i: "ri:pinterest-fill",
                  l: "https://in.pinterest.com/wedfieldevents/",
                },
                {
                  n: "Youtube",
                  i: "bi:youtube",
                  l: "https://www.youtube.com/channel/UCoKp6wKacwTzkhCKpNq1uAw",
                },
              ].map((val, key) => {
                return (
                  <span onClick={() => router.push(val.l)} key={key}>
                    <Icon width={"23px"} icon={val.i}></Icon> {val.n}
                  </span>
                );
              })}
            </article>
            <div className={styles.right}>
              <hgroup>List You Buisness</hgroup>
              <p>
                Are you vendor ? List your Venue and Service get more from
                listing business.
              </p>
              <button
                onClick={() => {
                  router.push("https://vendors.wedfield.com/");
                }}
              >
                Login for Business
              </button>
            </div>
          </div>
          <div className={styles.right1}>
            <hgroup>List You Buisness</hgroup>
            <p>
              Are you vendor ? List your Venue and Service get more from listing
              business.
            </p>
            <button
              onClick={() => {
                router.push("https://vendors.wedfield.com/");
              }}
            >
              Login for Business
            </button>
          </div>
        </div>
        <span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/terms-conditions")}
          >
            Terms and Conditions
          </span>
          |
          <span
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/privacy-policy")}
          >
            Privacy Policy
          </span>{" "}
          &nbsp;&nbsp;&nbsp; © 2018 Wedfield. All Rights Reserved.
        </span>
      </div>
      <div
        style={{
          display: footerBottom > 0 ? "none" : "",
        }}
        className={styles.mobileFooter}
      >
        {[
          {
            n: "Home",
            i: "ic:baseline-home",
            l: "/",
          },
          {
            n: "Chats",
            i: "bxs:chat",
            l: "/user-dashboard/Message",
          },
          {
            n: "Venues",
            i: "fluent-emoji-high-contrast:wedding",
            l: "/venue/wedding/1",
          },
          {
            n: "Vendors",
            i: "game-icons:shop",
            l: "/vendors/wedding/1",
          },
          {
            n: "Shop Now",
            i: "ion:cart",
            l: "/products/wedding/1",
          },
        ].map((val, key) => {
          return (
            <span
              onClick={() => router.push(val.l)}
              style={{
                color:
                  val.n !== "Home" && val.n !== "Account"
                    ? router.pathname.includes(val.l)
                      ? "#B6255A"
                      : ""
                    : router.pathname.endsWith(val.l)
                    ? "#B6255A"
                    : "",
              }}
            >
              <Icon width={"30px"} icon={val.i}></Icon>
              {val.n}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Footer;
