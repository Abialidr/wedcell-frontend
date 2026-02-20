import React, { useEffect, useState } from "react";
// import { useAsync } from 'react-use';
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@adojs/editor";
import { ToastContainer, toast } from "react-toastify";
import { useGetElementsQuery } from "redux/Api/diff.api";
const FrameContent = ({ onClose }) => {
  const [frames, setFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { actions } = useEditor();
  const { data: allFrames } = useGetElementsQuery("frames");

  const useFunc = async () => {
    const response = { data: allFrames };
    setFrames(response?.data);
    setIsLoading(false);
  };
  useEffect(() => {
    try {
      useFunc();
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }, [allFrames]);

  const addFrame = async (data) => {
    try {
      actions.addFrameLayer(data, data.clipPath);
      if (isMobile) {
        onClose();
      }
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
            fontWeight: 600,
            fontSize: "15px",
            color: "#181C32",
            flexGrow: 1,
            marginBottom: "0px",
          }}
        >
          Frames
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
            flexGrow: 1,
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(3,minmax(0,1fr))",
            gridGap: 8,
            padding: "16px",
          }}
        >
          {isLoading && <div>Loading...</div>}
          {frames?.map((item, index) => (
            <div
              key={index}
              style={{ cursor: "pointer", position: "relative" }}
              onClick={() => addFrame(item)}
            >
              <div style={{ paddingBottom: "100%" }} />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`${S3PROXY}${item.img}`}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameContent;
