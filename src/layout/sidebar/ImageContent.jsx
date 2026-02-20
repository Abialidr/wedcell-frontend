import React, { useState, useEffect } from "react";
import { getThumbnail } from "../../utils/thumbnail.ts";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@adojs/editor";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducer/appEssentials.js";
import { fetchSvgContent } from "@adojs/utils";
import { useGetInviteImgQuery } from "redux/Api/invites.api.js";

const ImageContent = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { actions } = useEditor();
  const globleuser = useSelector(selectUser);
  const { data: imgs } = useGetInviteImgQuery({ selectedtype: "Images" });
  useEffect(() => {
    const getallImg = async () => {
      const res = { data: imgs };
      setImages(res?.data?.data);
      setIsLoading(false);
    };
    getallImg();
  }, [imgs]);
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
            fontWeight: 600,
            fontSize: "15px",
            color: "#181C32",
            flexGrow: 1,
            marginBottom: "0px",
          }}
        >
          Images
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
          {isLoading && <div>Loading...</div>}
          {images?.map((item, idx) => (
            <div
              key={idx}
              style={{
                cursor: "pointer",
                position: "relative",
                border: "1px solid gray",
              }}
              onClick={() =>
                item.type1 === "image"
                  ? addImage(item.dataurl)
                  : addSvg(item.dataurl)
              }
            >
              <img
                src={`${S3PROXY}${item.dataurl}`}
                loading="lazy"
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageContent;
