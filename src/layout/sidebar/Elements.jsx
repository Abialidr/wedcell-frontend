import React, { useState, useEffect } from "react";
import Styles from "../../../styles/planning.module.scss";
// import { getThumbnail } from '../../utils/thumbnail.ts';
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@adojs/editor";
import { PROXY, S3PROXY } from "../../../config/index.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducer/appEssentials.js";
import { fetchSvgContent } from "@adojs/utils";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import {
  useGetComponentQuery,
  useGetInviteImgQuery,
} from "redux/Api/invites.api";
const Lines = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { actions } = useEditor();
  const globleuser = useSelector(selectUser);
  const [selectedtype, setSelectedType] = useState("");
  const [compArray, setCompArray] = useState([]);
  const [selectedSubtype, setSelectedSubType] = useState("NotSelected");
  const [compSubArray, setCompSubArray] = useState([]);
  const { data: component } = useGetComponentQuery();
  useEffect(() => {
    try {
      const getComp = async () => {
        const res = { data: component };
        setCompArray(res?.data?.data?.data);
        setCompSubArray(res?.data?.data?.subTypes);
      };
      getComp();
    } catch (e) {}
  }, [component]);
  const { data: imgs } = useGetInviteImgQuery({
    selectedtype: selectedtype,
    selectedSubtype:
      selectedSubtype !== "NotSelected" ? selectedSubtype : "false",
  });
  useEffect(() => {
    try {
      const getallImg = async () => {
        setIsLoading(true);
        const res = { data: imgs };
        setIsLoading(false);
        setImages(res?.data?.data);
      };
      getallImg();
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }, [selectedtype, selectedSubtype, imgs]);
  const addSvg = async (url) => {
    const ele = await fetchSvgContent(url);
    const viewBox = ele.getAttribute("viewBox")?.split(" ") || [];
    const width =
      viewBox.length === 4 ? +viewBox[2] : +(ele.getAttribute("width") || 100);
    const height =
      viewBox.length === 4 ? +viewBox[3] : +(ele.getAttribute("height") || 100);
    actions.addSvgLayer(url, { width, height }, ele);
    if (isMobile) {
      onClose();
    }
  };
  const addImage = async (url) => {
    try {
      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      img.onload = async () => {
        actions.addImageLayer(
          { thumb: url, url },
          { width: img.naturalWidth, height: img.naturalHeight }
        );
        if (isMobile) {
          onClose();
        }
      };
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        overflowY: "auto",
        display: "flex",
      }}
    >
      <ToastContainer></ToastContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          height: 48,
          borderBottom: "1px solid rgba(57,76,96,.15)",
          padding: "0 20px",
        }}
      >
        <p
          style={{
            // lineHeight: '48px',
            fontWeight: 600,
            fontSize: "15px",
            color: "#181C32",
            flexGrow: 1,
            marginBottom: "0px",
          }}
        >
          Elements
        </p>
        <div
          style={{
            fontSize: 20,
            flexShrink: 0,
            width: 32,
            height: 32,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
        >
          <XIcon />
        </div>
      </div>
      <div style={{ padding: "10px 15px" }}>
        <span style={{ fontSize: "15px", fontWeight: "600", color: "#bb6a74" }}>
          Types
        </span>
        <div
          className={Styles.elementScroll}
          style={{
            width: "100%",
            display: "flex",
            gap: "15px",
            // padding: '5px 25px',
          }}
        >
          <span
            onClick={() => setSelectedType("")}
            style={{
              width: "fit-content",
              whiteSpace: "nowrap",
              fontSize: "14px",
              fontWeight: "bold",
              color: !selectedtype ? "#c53244" : "gray",
              cursor: "pointer",
            }}
          >
            All
          </span>
          {compArray?.map((data, key) => {
            return (
              <span
                key={key}
                onClick={() => setSelectedType(data)}
                style={{
                  width: "fit-content",
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: selectedtype === data ? "#c53244" : "gray",
                  cursor: "pointer",
                }}
              >
                {data}
              </span>
            );
          })}
        </div>
      </div>
      <div style={{ padding: "10px 15px" }}>
        <span style={{ fontSize: "15px", fontWeight: "600", color: "#bb6a74" }}>
          SubTypes
        </span>
        <div
          className={Styles.elementScroll}
          style={{
            width: "100%",
            display: "flex",
            gap: "15px",
          }}
        >
          <span
            onClick={() => setSelectedSubType("NotSelected")}
            style={{
              width: "fit-content",
              whiteSpace: "nowrap",
              fontSize: "14px",
              fontWeight: "bold",
              color: selectedSubtype === "NotSelected" ? "#c53244" : "gray",
              cursor: "pointer",
            }}
          >
            All
          </span>
          {compSubArray?.map((data, key) => {
            return (
              <span
                key={key}
                onClick={() => setSelectedSubType(data)}
                style={{
                  width: "fit-content",
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: selectedSubtype === data ? "#c53244" : "gray",
                  cursor: "pointer",
                }}
              >
                {data}
              </span>
            );
          })}
        </div>
      </div>
      <div
        style={{ flexDirection: "column", overflowY: "auto", display: "flex" }}
      >
        <div
          style={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            width: "100%",
            // border: '1px solid ',
            height: "fit-content",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {isLoading ? (
            <>Loading...</>
          ) : (
            images?.map((item, idx) => (
              <div
                key={idx}
                style={{
                  cursor: "pointer",
                  border: "1px solid gray",
                  width: "100%",
                }}
                onClick={() => {
                  try {
                    item.type1 === "image"
                      ? addImage(item.dataurl)
                      : addSvg(item.dataurl);
                  } catch (e) {
                    toast.error(`Something Went Wrong`, {
                      position: "top-right",
                      autoClose: 1000,
                    });
                  }
                }}
              >
                <img
                  src={`${S3PROXY}${item.dataurl}`}
                  loading="lazy"
                  style={{ width: "100%" }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Lines;
