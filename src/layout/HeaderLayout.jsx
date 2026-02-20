import { forwardRef, useRef } from "react";
import { downloadObjectAsJson } from "../utils/download.ts";
import { useEditor } from "@adojs/editor";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "redux/reducer/appEssentials.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router.js";
import useWindowSize from "@rooks/use-window-size";
import { useInviteUpdateMutation } from "redux/Api/invites.api.js";
import { S3PROXY } from "../../config/index.js";
const HeaderLayout = forwardRef(function HeaderLayout(
  { openPreview, propertyName },
  ref
) {
  const {
    innerWidth: windowWidth,
    innerHeight: windowHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  const uploadRef = useRef(null);
  const { actions, query, layers, pages, state } = useEditor((state) => ({
    layers: state.selectedLayers,
    pages: state?.pages,
  }));
  const [inviteUpdate] = useInviteUpdateMutation();
  const handleExport = () => {
    downloadObjectAsJson("file", query.serialize());
  };
  const handleSave = async (propertyName) => {
    const arr = propertyName.map((val) => val.propertyId);
    const hello = Object?.keys(pages[0]?.layers)?.map((ids) => {
      return pages[0]?.layers[ids]?.data;
    });
    const counts = hello.reduce((count, obj) => {
      if (obj.props.rsvp === true) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
    try {
      if (counts === 1) {
        const rsvps = hello.find((obj) => {
          return obj.props.rsvp === true;
        });
        const res = await inviteUpdate({
          invitesData: query.serialize(),
          eventID: arr,
          events: propertyName,
          zoom: state.scale,
        });
        toast.success(`Invite Card Saved`, {
          position: "top-right",
          autoClose: 1000,
        });
      } else {
        toast.error(`Enter One RSVP`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

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

  return (
    <div
      ref={ref}
      className="mediaquery4"
      style={{
        background:
          "linear-gradient(rgb(197, 50, 68) 0%, rgb(180, 36, 93) 100%)",
        padding: "12px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "@media (max-width: 900px)": {
          padding: 12,
        },
      }}
    >
      <div
        style={{
          color: "#3d8eff",
          fontSize: 36,
          display: "flex",
          gap: "10px",
          marginLeft: "-10px",
        }}
      >
        <button
          onClick={() => {
            router.push("user-dashboard?direction=Invites");
          }}
          style={{
            border: "none",
            backgroundColor: "rgba(0,0,0,0)",
          }}
        >
          <ArrowBackIcon />
        </button>
        <div style={{ color: "white", height: 46 }}>
          {/* <
            src={'wedfield.s3.ap-south-1.amazonaws.com/public./assets/webp/logo.webp'}
            style={{ maxHeight: '100%' }}
          /> */}
          {/* Wedfield */}

          <img
            src={`${S3PROXY}/public/images/webp/Group 4 (1).webp`}
            alt="Wedfield"
            style={{
              width: "60%",
              height: "60%",
              maxHeight: "70px",
              maxWidth: "70px",
              minHeight: "40px",
              minWidth: "40px",
              cursor: "pointer",
            }}
            // style={{ marginTop: "4px" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <div
          style={{
            margin: '0 16px',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 700,
            ':hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={() => uploadRef.current?.click()}
        >
          <input
            ref={uploadRef}
            type='file'
            accept='application/json'
            onChange={handleImport}
            style={{ display: 'none' }}
          />
          Import
        </div> */}
        {/* <div
          style={{
            margin: '0 16px',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 700,
            ':hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={() => handleExport()}
        >
          Export
        </div> */}
        <div
          style={{
            margin: "0 16px",
            cursor: "pointer",
            color: "#fff",
            fontWeight: 700,
            ":hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => handleSave(propertyName)}
        >
          Save
        </div>
      </div>
    </div>
  );
});

export default HeaderLayout;
