import React, { useEffect } from "react";
import { data } from "../../data";
import { DesignFrame } from "@adojs/editor";
const EditorContent = ({ data: data2 }) => {
  return data.length ? <DesignFrame data={data} /> : <>fuck me this is shit</>;
};

export default EditorContent;
