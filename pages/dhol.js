import React from "react";
import AllOtherService from "../Components/inhouse/AllOtherService";
import { S3PROXY } from "config";

function photography() {
  return (
    <AllOtherService
      name="dhol"
      type="dhol"
      img={`url(${S3PROXY}/public/assets/images/bgimgdhol.jpeg)`}
    />
  );
}

export default photography;
