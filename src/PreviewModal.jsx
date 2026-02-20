import React, { useEffect, useState } from "react";
import XIcon from "@duyank/icons/regular/X";
import { Preview } from "@adojs/editor";

const PreviewModal = ({ onClose }) => {
  // const [open, setopen] = useState();
  // useEffect(() => {
  //   alert('Hello');
  // }, [open]);
  return (
    <div
      style={{
        position: "fixed",
        top: "100px",
        inset: 0,
        zIndex: 9999999,
        background: "rgba(13,18,22,.95)",
      }}>
      <Preview />
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          right: 24,
          top: "100px",
          borderRadius: "50%",
          fontSize: 36,
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={onClose}>
        <XIcon />
      </div>
    </div>
  );
};

export default PreviewModal;
