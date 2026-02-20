import React from "react";
import AllOtherService from "../Components/inhouse/AllOtherService";
import { S3PROXY } from "config";

function photography() {
  return (
    <AllOtherService
      name="photography"
      type="photography"
      img={`url(${S3PROXY}/public/assets/images/bgimg.jpeg)`}
      isPeople
    />
  );
}

export default photography;
