import React from "react";
import { Frame } from "@adojs/screen";
import { fulldata } from "../data";
import { getPageSize } from "@adojs/core";

const Publish = () => {
  const size = getPageSize(fulldata);
  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Frame width={size.width} height={size.height} data={fulldata} />
    </div>
  );
};

export default Publish;
