import React from "react";
import { Box, Button } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Styles from "../../styles/PopularMakeup.module.css";
// import styles from "./";
import RealWedCard from "../newCard/RealWeddingCard/RealWedCard";
const RealWeddingCard = ({ data }) => {
  const upperCase = (value) => {
    if (value) {
      const arr = value.split(" ");
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
      const str2 = arr.join(" ");
      return str2;
    }
  };
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data?.map((ph, key) => (
        <Box sx={{ m: 1, p: 1 }} key={key}>
          <div
            className={`${Styles.cr_container} box-shadow`}
            style={{ margin: "20px", width: "310px" }}
          >
            {/* <Link passHref href={`/WeddingProfile?id=${ph._id}`}> */}
            {/* <Box>
                <div
                  className={`${Styles.cr_img_wrapper} w-100 position-relative`}
                >
                  <Image
                    alt={ph.uploadAlbum[0].albumFile[0]}
                    src={`${S3PROXY}${ph.uploadAlbum[0].albumFile[0]}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                <div className="cr-body">
                  <div className="cr-info pt-4 px-5 text-center text-gray">
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "14px",
                          lineHeight: "18px",
                          color: "#666666",
                        }}
                      >
                        {upperCase(ph?.brideName)} and{" "}
                        {upperCase(ph?.groomName)}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          m: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <LocationOnIcon />{" "}
                        <Typography>{upperCase(ph.cityName)}</Typography>
                      </Box>
                    </Box>
                  </div>
                </div>
              </Box> */}
            <RealWedCard data={ph} key={key} />
            {/* </Link> */}
          </div>
        </Box>
      ))}
    </ScrollMenu>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Button
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      sx={{ display: { md: "flex", xs: "none" } }}
    >
      <ArrowBackIosIcon />
    </Button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Button
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      sx={{ display: { md: "flex", xs: "none" } }}
    >
      <ArrowForwardIosIcon />
    </Button>
  );
}

export default RealWeddingCard;
