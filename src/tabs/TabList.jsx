import { useRef } from "react";
import { downloadObjectAsJson } from "../utils/download.ts";
import { useEditor } from "@adojs/editor";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/appEssentials.js";
import { PROXY, S3PROXY } from "../../config/index.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
const SidebarTab = ({ tabs, active, onChange, propertyName }) => {
  const { actions, query, layers, pages } = useEditor((state) => ({
    layers: state.selectedLayers,
    pages: state?.pages,
  }));
  const router = useRouter();
  const activeIdx = tabs.findIndex((tab) => tab.name === active);
  const uploadRef = useRef(null);
  const handleImport = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const fileContent = JSON.parse(reader.result);
        actions.setData(fileContent);
      };
      reader.readAsText(file);
      e.target.value = "";
    }
  };
  const globleuser = useSelector(selectUser);

  // const handleSave = async (propertyName) => {
  //   const arr = propertyName.map((val) => val.propertyId);
  //   const hello = Object?.keys(pages[0]?.layers)?.map((ids) => {
  //     return pages[0]?.layers[ids]?.data;
  //   });
  //   const counts = hello.reduce((count, obj) => {
  //     if (obj.props.rsvp === true) {
  //       return count + 1;
  //     } else {
  //       return count;
  //     }
  //   }, 0);
  //   try {
  //     if (counts === 1) {
  //       const rsvps = hello.find((obj) => {
  //         return obj.props.rsvp === true;
  //       });
  //       toast.success(`Invite Card Saved`, {
  //         position: "top-right",
  //         autoClose: 1000,
  //       });
  //     } else {
  //       toast.error(`Enter One RSVP`, {
  //         position: "top-right",
  //         autoClose: 1000,
  //       });
  //     }
  //   } catch (e) {
  //     toast.error(`Something Went Wrong`, {
  //       position: "top-right",
  //       autoClose: 1000,
  //     });
  //   }
  // };
  const handleExport = () => {
    downloadObjectAsJson("file", query.serialize());
  };

  return (
    <div
      className="mediaquery6"
      style={{
        color: "#5E6278",
        overflow: "auto",
        borderRight: "1px solid rgba(217, 219, 228, 0.6)",
        "@media (max-width: 900px)": {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <div
        className="mediaquery7"
        style={{
          overflow: "hidden",
          position: "relative",
        }}
      >
        {activeIdx >= 0 && (
          <div
            className="mediaquery8"
            style={{
              background: "#fff",
              width: 72,
              height: 72,
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translateY(${activeIdx * 100}%)`,
              "@media (max-width: 900px)": {
                display: "none",
              },
            }}
          >
            <div
              style={{
                position: "absolute",
                height: 8,
                width: 8,
                right: 0,
                top: -8,
                background:
                  "radial-gradient(circle closest-side,transparent 0,transparent 50%,#fff 0) 200% 200% /400% 400%",
              }}
            />
            <div
              style={{
                position: "absolute",
                height: 8,
                width: 8,
                right: 0,
                bottom: -8,
                transform: "scaleY(-1)",
                background:
                  "radial-gradient(circle closest-side,transparent 0,transparent 50%,#fff 0) 200% 200% /400% 400%",
              }}
            />
          </div>
        )}
        {tabs.map((tab, idx) => (
          <>
            <div
              key={idx}
              style={{
                color: idx === activeIdx ? "#B6255A" : undefined,
                borderBottomRightRadius: idx === activeIdx - 1 ? 8 : 0,
                borderTopRightRadius: idx === activeIdx + 1 ? 8 : 0,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 2px",
                height: 72,
                width: 72,
                cursor: "pointer",
                ":hover": {
                  color: "#009ef7",
                },
              }}
              onClick={(e) => onChange(e, tab.name)}
            >
              <div style={{ fontSize: 24 }}>{tab.icon}</div>
              <span style={{ fontSize: 10, lineHeight: 1.6, fontWeight: 600 }}>
                {tab.name}
              </span>
            </div>
          </>
        ))}
        {/* <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 2px",
            height: 72,
            width: 72,
            cursor: "pointer",
            ":hover": {
              color: "#009ef7",
            },
            ":hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => handleSave(propertyName)}>
          <div style={{ fontSize: 24 }}>
            <SaveAltIcon />
          </div>
          <span style={{ fontSize: 10, lineHeight: 1.6, fontWeight: 600 }}>
            Save
          </span>
        </div> */}
        {/* <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 2px',
            height: 72,
            width: 72,
            cursor: 'pointer',
            ':hover': {
              color: '#009ef7',
            },
            ':hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={() => {
            // router.push(`/InvitationCard?id=${inviteDataId}`);
            window.open(`/InvitationCard?id=${inviteDataId}`, '_blank');
          }}
        >
          <div style={{ fontSize: 24 }}>
            <PlayCircleIcon />
          </div>
          <span style={{ fontSize: 10, lineHeight: 1.6, fontWeight: 600 }}>
            Preview
          </span>
        </div> */}
        {/* <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 2px",
            height: 72,
            width: 72,
            cursor: "pointer",
            ":hover": {
              color: "#009ef7",
            },
            ":hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => uploadRef.current?.click()}>
          <input
            ref={uploadRef}
            type="file"
            accept="application/json"
            onChange={handleImport}
            style={{ display: "none" }}
          />
          <div style={{ fontSize: 24 }}>
            <DownloadIcon />
          </div>
          <span style={{ fontSize: 10, lineHeight: 1.6, fontWeight: 600 }}>
            Import
          </span>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 2px",
            height: 72,
            width: 72,
            fontSize: "12px",
            cursor: "pointer",
            ":hover": {
              color: "#009ef7",
            },
            ":hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => handleExport()}>
          <div style={{ fontSize: 24 }}>
            <UploadIcon />
          </div>
          <span style={{ fontSize: 10, lineHeight: 1.6, fontWeight: 600 }}>
            Export
          </span>
        </div> */}
        {/* <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 2px",
            height: 72,
            width: 72,
            fontSize: "12px",
            cursor: "pointer",
            ":hover": {
              color: "#009ef7",
            },
            ":hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => actions.selectAllLayers()}>
          <div style={{ fontSize: 24 }}>
            <UploadIcon />
          </div>
          <span style={{ fontSize: 10, lineHeight: 1.6, fontWeight: 600 }}>
            select layer
          </span>
        </div> */}

        {/* <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 2px',
            height: 72,
            width: 72,
            cursor: 'pointer',
            ':hover': {
              color: '#009ef7',
            },
            ':hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={() => setOpenPreview(true)}
        >
          <div style={{ fontSize: 24 }}>
            <PlayCircleIcon />
          </div>
          <span style={{ fontSize: 10, lineHeight: 1.6, fontWeight: 600 }}>
            Preview T
          </span>
        </div> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SidebarTab;
