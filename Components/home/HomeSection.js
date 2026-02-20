import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import VenueVendorCards from "./Venue.Vendor.Card";
import { useSelector } from "react-redux";
import styles from "../../styles/Dashboard/Dashboard.module.scss";
import { selectLocation } from "../../redux/reducer/appEssentials";

export default function HomeSection({
  popularList,
  abclocation,
  setLoadingState,
}) {
  const [isAvailable, setIsAvailable] = useState(true);
  const location = useSelector(selectLocation);
  useEffect(() => {
    setIsAvailable(true);
  }, [location]);
  return isAvailable ? (
    <Grid
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <Grid
        sx={{
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: "-10px",
          marginTop: "3em",
        }}
      >
        <div className={styles.midheading} style={{ marginBottom: "24px" }}>
          <span
            style={{
              fontFamily: "Poppins",
              fontSize: "36px",
              fontWeight: "700",
              lineHeight: "54px",
              letterSpacing: " -0.6000000238418579px",
              textAlign: "left",
              color: "rgba(182, 37, 90, 1)",
            }}
          >
            {popularList?.header}
          </span>
          {/* <div className={styles.hr}></div> */}
        </div>
      </Grid>
      <VenueVendorCards
        abclocation={abclocation}
        popularList={popularList}
        setIsAvailable={setIsAvailable}
        setLoadingState={setLoadingState}
      />
    </Grid>
  ) : (
    <></>
  );
}
