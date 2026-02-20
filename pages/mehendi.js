import React from "react";
import AllOtherService from "../Components/inhouse/AllOtherService";
import { S3PROXY } from "config";

function photography() {
  return (
    <AllOtherService
      name="mehendi"
      type="mehendi"
      img={`url(${S3PROXY}/public/assets/images/bgimgmehendi.jpeg)`}
    />
  );
}

export default photography;
