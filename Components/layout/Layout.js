import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import TopBar from "./TopBar";
import { useDispatch } from "react-redux";
import { location, setUser } from "../../redux/reducer/appEssentials";
import useWindowSize from "@rooks/use-window-size";
import { useCheckUserQuery } from "redux/Api/others.api";

const Layout = ({ children }) => {
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();

  const [showLayout, setShowLayout] = useState(false);
  const router = useRouter();
  const path = router?.pathname.split("/");
  const dispatch = useDispatch();
  const { data: checkUser } = useCheckUserQuery();

  const checkSession = async () => {
    let user12;
    if (localStorage.getItem("wedfield") !== "") {
      user12 = JSON.parse(localStorage.getItem("wedfield"));
    }
    if (user12) {
      const res = { data: checkUser };
      if (res?.data?.success === false) {
        dispatch(setUser(undefined));
        localStorage.removeItem("wedfield");
        localStorage.removeItem("wedfieldIsLoged");
        localStorage.removeItem("role");
      }
    } else {
      dispatch(setUser(undefined));
    }
  };
  useEffect(() => {
    checkSession();
    if (localStorage.getItem("wedfield") !== "") {
      dispatch(setUser(JSON.parse(localStorage.getItem("wedfield"))));
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
      path.some((path) => path === "dashboard") ||
      router?.pathname === "/student/profile" ||
      router?.pathname === "/InvitationCard" ||
      router?.pathname === "/Test" ||
      router?.pathname === "/canva"
    ) {
      setShowLayout(false);
    } else {
      setShowLayout(true);
    }
  }, [path]);

  return (
    <>
      {showLayout && (
        // <Header />
        <TopBar />
        // <></>
      )}
      {children}

      {showLayout && (
        <Footer />
        // <></>
      )}
    </>
  );
};

export default Layout;
