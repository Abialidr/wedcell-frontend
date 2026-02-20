import { useRef, useState } from "react";
import SidebarTab from "../tabs/TabList";
import LayoutIcon from "@duyank/icons/regular/Layout";
import TextTIcon from "@duyank/icons/regular/TextT";
import SquareIcon from "@duyank/icons/regular/Square";
import ImageIcon from "@duyank/icons/regular/Image";
import TextContent from "./sidebar/TextContent";
import ShapeContent from "./sidebar/ShapeContent";
import ImageContent from "./sidebar/ImageContent";
import UploadIcon from "@duyank/icons/regular/Upload";
import UploadContent from "./sidebar/UploadContent";
import TemplateContent from "./sidebar/TemplateContent";
import FrameCornersIcon from "@duyank/icons/regular/FrameCorners";
import FrameContent from "./sidebar/FrameContent";
import { useEditor } from "@adojs/editor";
import Events from "./sidebar/Events";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials";
import Sticker from "./sidebar/Sticker";
import GridFrames from "./sidebar/GridFrames";

import Graphics from "./sidebar/Graphics";
import Elements from "./sidebar/Elements";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CropFreeIcon from "@mui/icons-material/CropFree";
import GifBoxIcon from "@mui/icons-material/GifBox";
import TimelineIcon from "@mui/icons-material/Timeline";
import RSVPContent from "./sidebar/RSVPContent";
const tabs = [
  {
    name: "Template",
    icon: <LayoutIcon />,
  },
  // {
  //   name: 'Text',
  //   icon: <TextTIcon />,
  // },
  // {
  //   name: 'Shape',
  //   icon: <SquareIcon />,
  // },
  // {
  //   name: 'Frame',
  //   icon: <FrameCornersIcon />,
  // },
  // {
  //   name: 'Image',
  //   icon: <ImageIcon />,
  // },

  // {
  //   name: 'Sticker',
  //   icon: <EmojiEmotionsIcon />,
  // },
  // {
  //   name: 'GridFrames',
  //   icon: <CropFreeIcon />,
  // },
  // {
  //   name: 'Graphics',
  //   icon: <GifBoxIcon />,
  // },
  // {
  //   name: 'Elements',
  //   icon: <TimelineIcon />,
  // },
  // {
  //   name: 'Upload',
  //   icon: <UploadIcon />,
  // },
  // {
  //   name: 'Hello',
  //   icon: <UploadIcon />,
  // },
  {
    name: "Events",
    icon: <FormatListBulletedIcon />,
  },
  // {
  //   name: "Events",
  //   icon: <LocalActivityIcon />,
  // },
];
const Sidebar = ({
  openPreview,
  setOpenPreview,
  propertyName,
  setPropertyName,
  inviteDataId,
}) => {
  const globleuser = useSelector(selectUser);
  const allLayers = useRef(["ROOT"]);

  const [events, setevents] = useState([]);

  const { actions } = useEditor();
  const action = useEditor();
  const [tab, setTab] = useState(null);
  return (
    <div
      style={{
        display: "flex",
        zIndex: 2,
        position: "relative",
        backgroundColor: "#ffffff",
        borderRight: "1px solid rgba(217, 219, 228, 0.6)",
        borderRadius: "0px 10px 10px 0px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
        className="mediaquery10"
      >
        <SidebarTab
          openPreview={openPreview}
          setOpenPreview={setOpenPreview}
          propertyName={propertyName}
          inviteDataId={inviteDataId}
          tabs={tabs}
          active={tab}
          onChange={(_, tab) => {
            actions.setSidebar();
            setTab(tab);
          }}
        />
        {tab && (
          <div
            className="mediaquery5"
            style={{
              width: 360,

              // width: "100%",
              position: "sticky",
              bottom: 0,
              left: "74px",
              top: "80px",
              background: "#fff",
            }}
          >
            {tab === "Template" && (
              <TemplateContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === "Text" && (
              <TextContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === "RSVP" && (
              <RSVPContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === "Frame" && (
              <FrameContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === "Image" && (
              <ImageContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}

            {/* {tab === 'Sticker' && (
              <Sticker
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === 'GridFrames' && (
              <GridFrames
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )} */}
            {/* {tab === 'Graphics' && (
              <Graphics
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )} */}
            {tab === "Elements" && (
              <Elements
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === "Shape" && (
              <ShapeContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}

            {tab === "Events" && (
              <Events
                propertyName={propertyName}
                setPropertyName={setPropertyName}
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
                allLayers={allLayers}
              />
            )}
            {/* {tab === "Events" && (
              <Events
                propertyName={propertyName}
                setPropertyName={setPropertyName}
                setevents={setevents}
                events={events}
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
                allLayers={allLayers}
              />
            )} */}
            <UploadContent
              visibility={tab === "Upload"}
              onClose={() => {
                setTab(null);
                actions.setSidebar();
              }}
            />
          </div>
        )}
      </div>
      <div
        style={{
          width: 360,
          position: "absolute",
          overflow: "hidden",
          top: 0,
          left: 73,
          height: "100%",
          pointerEvents: "none",
        }}
        id={"settings"}
      />
    </div>
  );
};

export default Sidebar;
