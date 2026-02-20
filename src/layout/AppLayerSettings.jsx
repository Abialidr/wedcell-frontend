import React from "react";
import { LayerSettings, useSelectedLayers } from "@adojs/editor";

const AppLayerSettings = () => {
  const { selectedLayerIds } = useSelectedLayers();
  return (
    <div
      className="mediaquery3"
      style={{
        background: "white",
        borderBottom: "1px solid rgba(57,76,96,.15)",
        height: "50px",
        overflowX: "auto",
        display: selectedLayerIds.length > 0 ? "flex" : "none",
        flexShrink: 0,
      }}>
      <LayerSettings />
    </div>
  );
};

export default AppLayerSettings;
