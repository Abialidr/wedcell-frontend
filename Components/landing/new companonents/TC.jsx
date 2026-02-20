import * as React from "react";
import styles from "./TC.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { S3PROXY } from "../../../config";

export default function TC({ name, content }) {
  return (
    <>
      <div className={styles.div}>
        <div className={styles.tabpanel}>
          <div className={styles.div2}>
            <div className={styles.div3}>
              <FontAwesomeIcon icon={"fa fa-star"} color="yellow" />
              <FontAwesomeIcon icon={"fa fa-star"} color="yellow" />
              <FontAwesomeIcon icon={"fa fa-star"} color="yellow" />
              <FontAwesomeIcon icon={"fa fa-star"} color="yellow" />
              <FontAwesomeIcon icon={"fa fa-star"} color="yellow" />
            </div>
            <div
              className={
                styles.iReallyAppreciateNewDelhiInstitutionOfEventManagementThisInstituteReallyHelpedMeALotAndIHaveLearnedALotOfThingsFromThisInstituteIWouldLikeToThankNdiemDelhiAndAllTheTeachersForGivingWonderfulPlacementOpportunityAfterGivingInternshipOptions
              }
            >
              {content}
            </div>
          </div>
          <div className={styles.div4}>
            <div className={styles.div5}>
              <div className={styles.column}>
                <div className={styles.div6}>
                  <img
                    loading="lazy"
                    src={`${S3PROXY}/public/landing/Group 25.png`}
                    className={styles.img2}
                  />
                  <div className={styles.div7}>
                    <div className={styles.heading3}>{name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
