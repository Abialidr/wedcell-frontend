import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { location, selectUser, user } from "../../redux/reducer/appEssentials";
import useWindowSize from "@rooks/use-window-size";
import { useCheckUserQuery } from "redux/Api/others.api";
import Header from "./Header";
import ChildrenWrapper from "./ChildrenWrapper";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const Layout = ({ children }) => {
  const globaluser = useSelector(selectUser);

  const [showLayout, setShowLayout] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const router = useRouter();
  const path = router?.pathname.split("/");
  const dispatch = useDispatch();
  const { data: checkUser } = useCheckUserQuery(!globaluser && skipToken);

  const checkSession = async () => {
    let user12;
    if (localStorage.getItem("wedfield") !== "") {
      user12 = JSON.parse(localStorage.getItem("wedfield"));
    }
    if (user12) {
      const res = { data: checkUser };
      if (res?.data?.success === false) {
        dispatch(user(undefined));
        document.cookie = "id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        localStorage.removeItem("wedfield");
        localStorage.removeItem("wedfieldIsLoged");
        localStorage.removeItem("role");
      }
    } else {
      dispatch(user(undefined));
      document.cookie = "id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  };
  useEffect(() => {
    checkSession();
    if (localStorage.getItem("wedfield") !== "") {
      const globaluser = JSON.parse(localStorage.getItem("wedfield"));
      dispatch(user(globaluser));
      document.cookie =
        `id=${globaluser?.data?.id}; path=/; expires=` +
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    }
    dispatch(location(localStorage.getItem("location")));
    const listenStorageChange = () => {
      if (localStorage.getItem("location") === null) {
        dispatch(location(""));
      } else {
        dispatch(location(localStorage.getItem("location")));
      }
    };
    window.addEventListener("location", listenStorageChange);
  }, [checkUser]);
  useEffect(() => {
    if (
      // path.some((path) => path === "dashboard") ||
      router?.pathname === "/student/profile" ||
      router?.pathname === "/InvitationCard" ||
      router?.pathname === "/Test" ||
      router?.pathname === "/canva"
    ) {
      setShowLayout(false);
      setShowFooter(false);
    } else {
      setShowLayout(true);
      setShowFooter(true);
    }
    if (
      router?.pathname === "/user-dashboard/Message" ||
      router?.pathname === "/user-dashboard/Group-Message"
    ) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [path]);

  const [footerBottom, setFooterBottom] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (document.activeElement.tagName === "INPUT") {
        const inputBottom =
          document.activeElement.getBoundingClientRect().bottom;
        const keyboardHeight = window.innerHeight - inputBottom;
        setFooterBottom(Math.max(0, keyboardHeight));
      } else {
        setFooterBottom(0);
      }
    };

    const handleInputBlur = () => {
      setFooterBottom(0);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {showLayout && (
        // <Header />
        <Header />
        // <></>
      )}

      <ChildrenWrapper footerBottom={footerBottom}>{children}</ChildrenWrapper>
      {showFooter && (
        <Footer footerBottom={footerBottom} />
        // <></>
      )}
    </>
  );
};

export default Layout;
