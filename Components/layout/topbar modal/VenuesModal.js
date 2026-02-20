import { Box, Grid, Modal, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { S3PROXY } from "../../../config";

const style = {
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  borderRadius: 3,
  boxShadow: 24,
  padding: "30px",
  flexDirection: "row",
  width: "max-content",
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

const columnHeader = {
  color: "#E48F0E",
  fontFamily: `'Be Vietnam Pro', sans-serif`,
  fontStyle: "normal",
  fontWeight: "300",
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
  color: "#444444",

  h2: {
    fontWeight: "400 !important",
    textAlign: "center",
    color: "#444444",
  },
};

const VenuesByType = [
  {
    venue: "Hotel",
    id: "Hotel",
  },
  {
    venue: "Farm House",
    id: "Farm House",
  },
  {
    venue: "Resort",
    id: "Resort",
  },
  {
    venue: "Banquet Hall",
    id: "Banquet Hall",
  },
  {
    venue: "Lawn",
    id: "Lawn",
  },
  {
    venue: "Destination Wedding",
    id: "Destination Wedding",
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
        <Grid
          sx={imgTitle}
          item
          xs={3}
          key={item.title}
          onClick={(e) => {
            e.preventDefault();
            props.handleClose();
            props.handleLocation(item.title);
            router.push({
              pathname: "/venue",
              query: { category: "Destination Wedding" },
            });
          }}
        >
          <Image
            // src={
            //   "https://blog.logrocket.com/wp-content/uploads/2021/06/new-nextjs-11.png"
            // }
            src={`${S3PROXY}${item.img}`}
            height={"64"}
            width={"64"}
          />
          <p>{item.title}</p>
        </Grid>
      ))}
    </React.Fragment>
  );
}

export const VenuesModal = (props) => {
  const router = useRouter();
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <Box sx={style}>
        <Box sx={columnStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={columnHeader}
          >
            By Type
          </Typography>
          {VenuesByType.map((el) => {
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
                    pathname: "/venue",
                    query: { category: el.id },
                  });
                  props.handleClose();
                }}
              >
                {el.venue}
              </Typography>
            );
          })}
        </Box>
       
      </Box> */}

      <Box
        spacing={2}
        sx={style}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
      >
        <Box sx={columnStyle}>
          <Typography
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
                  props.handleClose();
                  router.push({
                    pathname: "/venue",
                    query: { category: el.id },
                  });
                }}
              >
                {el.venue}
              </Typography>
            );
          })}
        </Box>
        <Box sx={columnStyle}>
          <Typography
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
                  props.handleClose();
                  router.push({
                    pathname: "/venue",
                    query: { category: "Hotel" },
                  });
                }}
              >
                {el.venue}
              </Typography>
            );
          })}
        </Box>
        <Box sx={columnStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={columnHeader}
          >
            Destination Wedding Venues
          </Typography>

          <Grid container spacing={1}>
            <Grid sx={gridStyle} container spacing={1}>
              <FormRow props={props} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};
