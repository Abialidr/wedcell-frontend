import { Box, Grid, Modal, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { S3PROXY } from "../../../config";
import { useSelector } from "react-redux";
import { selectLocation } from "redux/reducer/appEssentials";

const style = {
  // position: 'absolute',

  display: "flex",

  // left: '50%',
  // transform: 'translateX(-50%)',
  bgcolor: "#fff",
  borderRadius: 3,
  boxShadow: 24,
  padding: "30px",
  flexDirection: "row",
  width: "fit-content",
  maxWidth: "977px",
  // marginLeft: '30px',
};

const columnStyle = {
  // m: 5,
  display: "flex",
  flexDirection: "column",
  margin: "20px",
  fontFamily: "Bahnschrift",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "22px",
  color: "#E48F0E",

  h2: {
    fontWeight: "400 !important",
  },
};
const columnStyle2 = {
  // m: 5,
  display: "flex",
  flexDirection: "column",
  margin: "20px",
  fontFamily: "Bahnschrift",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "22px",
  color: "#E48F0E",
  height: "375px !important",
  marginRight: "-30px",
  borderRadius: "0px 0px 10px",
  marginTop: "-30px",
  marginBottom: "-30px",
  zIndex: "20",
  background: "#FAF5F7",
  h2: {
    fontWeight: "400 !important",
  },
  paddingLeft: "20px",
  justifyContent: "center",
};

const columnHeader = {
  color: "#170F49",

  // fontFamily: `Poppins`,
  fontStyle: "normal",
  fontWeight: "900",
  fontSize: "18px",
  lineHeight: "22px",
  m: 1,
  marginBottom: "20px",

  // p: {
  //   fontFamily: "Bahnschrift",
  //   fontStyle: "normal",
  //   fontWeight: "300",
  //   fontSize: "14px",
  //   lineHeight: "17px",
  //   textAlign: " center",
  //   color: "#444444",
  // },
};
const columnHeader2 = {
  color: "#B6255A",

  fontStyle: "normal",
  fontWeight: "900",
  fontSize: "18px",
  lineHeight: "22px",
  m: 1,

  // p: {
  //   fontFamily: "Bahnschrift",
  //   fontStyle: "normal",
  //   fontWeight: "300",
  //   fontSize: "14px",
  //   lineHeight: "17px",
  //   textAlign: " center",
  //   color: "#444444",
  // },
};
const imgTitle = {
  marginTop: "20px",
  paddingLeft: "0px !important",
  marginTop: "0px !important",
  paddingTop: "0px !important",
  cursor: "pointer",
  p: {
    fontFamily: "Bahnschrift",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "14px",
    lineHeight: "17px",
    textAlign: " center",
    color: "#444444",
  },
  img: {
    borderRadius: "10px",
    marginBottom: "5px",
  },
};

const gridStyle = {
  marginTop: "20px !important",
};

const rowsStyle = {
  fontFamily: `'Be Vietnam Pro', sans-serif`,
  fontStyle: "normal",
  fontWeight: "200",
  fontSize: "16px",
  lineHeight: "22px",
  m: 1,
  color: "#6F6C90",

  h2: {
    fontWeight: "400 !important",
    textAlign: "center",
    color: "#444444",
  },
  cursor: "pointer",
};

const VenuesByType = [
  {
    venue: "Hotel",
    id: "hotel",
  },
  {
    venue: "Farm House",
    id: "farm-house",
  },
  {
    venue: "Resort",
    id: "resort",
  },
  {
    venue: "Banquet Hall",
    id: "banquet-hall",
  },
  {
    venue: "Lawn",
    id: "lawn",
  },
  {
    venue: "Destination Wedding",
    id: "destination-wedding",
  },
];

const VenuesByLocation = [
  {
    venue: "Delhi",
    id: "Delhi",
  },
  {
    venue: "Noida",
    id: "Noida",
  },
  {
    venue: "Gurgaon",
    id: "Gurgaon",
  },
  {
    venue: "Kolkata",
    id: "Kolkata",
  },
  {
    venue: "Mumbai",
    id: "Mumbai",
  },
  {
    venue: "Agra",
    id: "Agra",
  },
];

const imageData = [
  {
    img: `${S3PROXY}/public/images/webp/Goa.webp`,
    title: "Goa",
  },
  {
    img: `${S3PROXY}/public/images/webp/Jaipur.webp`,
    title: "Jaipur",
  },
  {
    img: `${S3PROXY}/public/images/webp/Udaipur.webp`,
    title: "Udaipur",
  },
  {
    img: `${S3PROXY}/public/images/webp/agra.webp`,
    title: "Agra",
  },
  {
    img: `${S3PROXY}/public/images/webp/Jodhpur.webp`,
    title: "Jodhpur",
  },
  {
    img: `${S3PROXY}/public/images/webp/Thailand.webp`,
    title: "Thailand",
  },
  {
    img: `${S3PROXY}/public/images/webp/Maldives.webp`,
    title: "Maldives",
  },
  {
    img: `${S3PROXY}/public/images/webp/Kashmir.webp`,
    title: "Kashmir",
  },
];

function FormRow({ props }) {
  const router = useRouter();

  return (
    <React.Fragment>
      {imageData?.map((item) => (
        <div
          style={{
            color: "#6F6C90",
            display: "flex",
            flexDirection: "column",
            gap: "13px",
            alignItems: "center",
            fontSize: "15px",
          }}
          sx={imgTitle}
          item
          xs={3}
          key={item.title}
          onClick={(e) => {
            e.preventDefault();
            props.handleLocation(item.title);
            router.push({
              pathname: `/venue/wedding/1/${item.title}/destination-wedding`,
            });
            props.handleClose();
          }}
        >
          <img
            style={{ borderRadius: "15px", width: "100%", height: "80px" }}
            // src=5
            //   "https://blog.logrocket.com/wp-content/uploads/2021/06/new-nextjs-11.png"
            // }

            src={`${item.img}`}
            height={"64"}
            width={"64"}
          />
          <p style={{ margin: 0 }}>{item.title}</p>
        </div>
      ))}
    </React.Fragment>
  );
}

export const VenuesModal = (props) => {
  const router = useRouter();
  const location = useSelector(selectLocation);
  return (
    <>
      <Box
        spacing={2}
        sx={style}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        style={{
          width: "816px",
        }}
      >
        <Box sx={columnStyle}>
          <Typography
            style={{
              fontWeight: "900",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={columnHeader}
          >
            By Type
          </Typography>
          {VenuesByType?.map((el) => {
            return (
              <Typography
                key={el.id}
                id="modal-modal-item"
                variant="h4"
                component="h2"
                sx={rowsStyle}
                onClick={(e) => {
                  e.preventDefault();
                  router.push({
                    pathname: `/venue/wedding/1/${location}/${el.id}`,
                  });
                  props.handleClose();
                }}
              >
                {el.venue}
              </Typography>
            );
          })}
        </Box>
        {/* <Box sx={columnStyle}>
          <Typography
            style={{
              fontWeight: "900",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={columnHeader}
          >
            By Locality
          </Typography>
          {VenuesByLocation?.map((el) => {
            return (
              <Typography
                key={el.id}
                id="modal-modal-item"
                variant="h4"
                component="h2"
                sx={rowsStyle}
                onClick={(e) => {
                  e.preventDefault();
                  props.handleLocation(el.id);
                  router.push({
                    pathname: "/venue",
                    query: { category: "Hotel" },
                  });
                  props.handleClose();
                }}
              >
                {el.venue}
              </Typography>
            );
          })}
        </Box> */}
        <Box sx={columnStyle2}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={columnHeader2}
            style={{
              fontWeight: "900",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            Destination Wedding Venues
          </Typography>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              paddingRight: "30px",
              gap: "10px",
              marginTop: "10px",
            }}
            sx={gridStyle}
            container
            spacing={0}
          >
            <FormRow props={props} />
          </div>
        </Box>
      </Box>
    </>
  );
};
