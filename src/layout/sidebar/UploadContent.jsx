import React, { useEffect, useRef, useState } from "react";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@adojs/editor";
import { fetchSvgContent } from "@adojs/utils";
import axios from "axios";
import { PROXY, S3PROXY } from "../../../config";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducer/appEssentials";
import { ToastContainer, toast } from "react-toastify";
import {
  useGetInviteUserImgQuery,
  useInviteImgDeleteMutation,
  useInviteImgUploadMutation,
} from "redux/Api/invites.api";
import compressAndAppendFiles from "Components/compressAndAppendFiles";
const UploadContent = ({ visibility, onClose }) => {
  const inputFileRef = useRef(null);
  const { actions } = useEditor();

  const [images, setImages] = useState([]);
  async function convertImageUrlToDataUrl(imageUrl) {
    try {
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      if (response.status === 200) {
        const base64data = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const dataUrl = `data:image/png;base64,${base64data}`;
        return dataUrl;
      } else {
        console.error(
          `Failed to retrieve the image. Status code: ${response.status}`
        );
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  const addImage = async (url) => {
    try {
      const hello = await convertImageUrlToDataUrl(url);

      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      img.onload = async () => {
        actions.addImageLayer(
          { url: hello, thumb: url },
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
  const [update, setUpdate] = useState(false);
  const [adminImg, setAdminImg] = useState();
  const globleuser = useSelector(selectUser);
  const { data: imgs, refetch: imgRefetch } = useGetInviteUserImgQuery();
  useEffect(() => {
    imgRefetch();
  }, [update]);
  useEffect(() => {
    try {
      const getallImg = async () => {
        const res = { data: imgs };
        setImages(res?.data?.data);
        setAdminImg(res?.data?.adminImg);
      };
      getallImg();
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }, [update, imgs]);
  const [inviteImgUpload] = useInviteImgUploadMutation();
  const handleUpload = async (e) => {
    try {
      const file = e.target.files && e.target.files[0];
      try {
        const formData = new FormData();
        const compImg = await compressAndAppendFiles(file);
        formData.append("Img", compImg);
        const res = await inviteImgUpload(formData);

        setUpdate(!update);
      } catch (e) {
        console.error(`🚀 ~ file: UploadContent.jsx:52 ~ handleUpload ~ e:`, e);
      }
      // if (file) {
      //     const reader = new FileReader();
      //     reader.onloadend = () => {
      //         setImages((prevState) => {
      //             return prevState.concat([
      //                 { url: reader.result, type: file.type === 'image/svg+xml' ? 'svg' : 'image' },
      //             ]);
      //         });
      //     };
      //     reader.readAsDataURL(file);
      // }
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };
  const [inviteImgDelete] = useInviteImgDeleteMutation();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        overflowY: "auto",
        display: visibility ? "flex" : "none",
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
            lineHeight: "48px",
            fontWeight: 600,
            color: "#181C32",
            flexGrow: 1,
          }}
        >
          Upload Images
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
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "center",
          color: "white",
          background: "#B6255A",
          padding: "10px",
          borderRadius: "30px",
          border: "1px solid #B6255A",
          marginTop: "10px",
          alignSelf: "center",
        }}
        onClick={() => inputFileRef.current?.click()}
      >
        Upload
      </div>
      <input
        ref={inputFileRef}
        type={"file"}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <div style={{ padding: "16px" }}>
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            display: "grid",
            position: "relative",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gridGap: 8,
          }}
        >
          {/* {adminImg?.map((item, idx) => {
            
            return (
              <>
                <div
                  key={idx}
                  style={{
                    cursor: 'pointer',
                    position: 'relative',
                    border: '1px solid gray',
                  }}
                  onClick={
                    () => addImage(item.Images)
                    //   : addSvg(item.Images)
                  }
                >
                  <div style={{ paddingBottom: '100%', height: 0 }} />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <
                      src={`${S3PROXY}${item.Images}`}
                      loading='lazy'
                      style={{ maxHeight: '100%', width: '100%' }}
                    />
                  </div>
                </div>
              </>
            );
          })} */}
          {images?.map((item, idx) => (
            <>
              <div
                key={idx}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  border: "1px solid gray",
                }}
                onClick={
                  () => addImage(item.Images)
                  //   : addSvg(item.Images)
                }
              >
                <div
                  style={{
                    position: "absolute",
                    zIndex: "100",
                    right: "0px",
                    top: "0px",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                  onClick={async (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    try {
                      const res = await inviteImgDelete(item._id);
                      setUpdate(!update);
                    } catch (e) {
                      console.error(
                        `🚀 ~ file: UploadContent.jsx:189 ~ UploadContent ~ e:`,
                        e
                      );
                    }
                  }}
                >
                  <XIcon />
                </div>
                <div style={{ paddingBottom: "100%", height: 0 }} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`${S3PROXY}${item.Images}`}
                    loading="lazy"
                    style={{ maxHeight: "100%", width: "100%" }}
                  />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadContent;
