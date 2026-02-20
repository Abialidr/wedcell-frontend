import React from "react";
import AllOtherService from "../Components/inhouse/AllOtherService";
import { S3PROXY } from "config";

function photography() {
  return (
    <AllOtherService
      name="makeup"
      type="makeup"
      img={`url(${S3PROXY}/public/assets/images/bgimgmakeup.jpeg)`}
    />
  );
}

export default photography;
