import React, { useEffect, useRef, useState } from "react";
// import { useAsync } from 'react-use';
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@adojs/editor";
import { PROXY, S3PROXY } from "config/index.js";
import { ToastContainer, toast } from "react-toastify";
import { useGetInviteTextQuery } from "redux/Api/invites.api";
const RSVPContent = ({ onClose }) => {
  const { actions } = useEditor();
  const [texts, setTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: getInviteText } = useGetInviteTextQuery({
    type: "RSVP",
  });
  const useFunc = async () => {
    const response = { data: getInviteText };
    setTexts(response?.data?.data);
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
  }, [getInviteText]);
  const handleAddText = (data1) => {
    try {
      const data2 = data1;
      const data = JSON.parse(data2);
      actions.addLayerTree(data);
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
          Text
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
            // flexGrow: 1,
            // overflowY: "auto",
            // display: "grid",
            // gridTemplateColumns: "repeat(3,minmax(0,1fr))",
            // gridGap: 8,
            // padding: "16px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {isLoading && <div>Loading...</div>}
          {texts?.map((data, idx) => (
            <div
              key={idx}
              style={{
                // cursor: 'pointer',
                // position: 'relative',
                // paddingBottom: '100%',
                // width: '100%',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                width: "100%",
                border: "1px solid ",
                height: "fit-content",
              }}
              onClick={() => handleAddText(data.data)}
            >
              <img
                src={`${S3PROXY}${data.Images}`}
                style={{
                  padding: "5px",
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RSVPContent;
