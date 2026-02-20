import React, { useEffect, useState } from "react";
// import { useAsync } from 'react-use';
import Styles from "../../../styles/planning.module.scss";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@adojs/editor";
import { PROXY, S3PROXY } from "config/index.js";
import { ToastContainer, toast } from "react-toastify";
import {
  useGetComponentQuery,
  useGetInviteTextQuery,
} from "redux/Api/invites.api";
const TextContent = ({ onClose }) => {
  const [currState, setCurrState] = useState("Texts");
  const { actions } = useEditor();
  const [texts, setTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedtype, setSelectedType] = useState("All");
  const [TypeArray, setTypeArray] = useState([]);
  const { data: component } = useGetComponentQuery();
  useEffect(() => {
    try {
      const getComp = async () => {
        const res = { data: component };
        setTypeArray(res?.data?.data?.TextTypes);
      };
      getComp();
    } catch (e) {}
  }, [currState, component]);
  const { data: getInviteText } = useGetInviteTextQuery({
    type: currState === "Texts" ? "Text" : "RSVP",
    Subtype:
      currState === "Texts"
        ? selectedtype === "All"
          ? "false"
          : selectedtype
        : undefined,
  });
  const useFunc = async () => {
    let response;
    if (currState === "Texts") {
      response = { data: getInviteText };
    } else {
      response = { data: getInviteText };
    }
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
  }, [currState, selectedtype, getInviteText]);

  const handleAddText = (data) => {
    try {
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
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "15px",
          fontWeight: "600",
          color: "gray",
          padding: "10px",
          gap: "10px",
        }}
      >
        <span
          onClick={() => {
            setCurrState("Texts");
          }}
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",

            color: currState === "Texts" ? "white" : "#B6255A",
            background: currState === "Texts" ? "#B6255A" : "white",
            padding: "10px",
            borderRadius: "30px",
            border: "1px solid #B6255A",
          }}
        >
          Texts
        </span>
        <span
          onClick={() => {
            setCurrState("RSVPs");
          }}
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",

            color: currState !== "Texts" ? "white" : "#B6255A",
            background: currState !== "Texts" ? "#B6255A" : "white",
            padding: "10px",
            borderRadius: "30px",
            border: "1px solid #B6255A",
          }}
        >
          RSVPs
        </span>
      </div>
      {currState === "Texts" && (
        <div style={{ padding: "10px 15px", width: "100%" }}>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "#bb6a74",
              width: "100%",
              // display: 'flex',
              // justifyContent: 'center',
            }}
          >
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
              onClick={() => setSelectedType("All")}
              style={{
                width: "fit-content",
                whiteSpace: "nowrap",
                fontSize: "14px",
                fontWeight: "bold",
                color: selectedtype === "All" ? "#c53244" : "gray",
                cursor: "pointer",
              }}
            >
              All
            </span>
            {TypeArray?.map((data, key) => {
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
      )}
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
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {isLoading && <div>Loading...</div>}
          {texts?.map(({ Images, data }, idx) => (
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
              onClick={() => handleAddText(JSON.parse(data))}
            >
              <img
                src={`${S3PROXY}${Images}`}
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

export default TextContent;
