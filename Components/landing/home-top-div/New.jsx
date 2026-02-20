import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.css";
import { S3PROXY } from "../../../config/index";
import Link from "next/link";
const NewHead = ({ className = "" }) => {
  return (
    <section className={[styles.eventInfo, className].join(" ")}>
      <div className={styles.container}>
        <img
          style={{
            filter: "brightness(50%)",
          }}
          className={styles.backgroundIcon}
          alt=""
          src={`${S3PROXY}/public/landing/background.png`}
        />
        <div className={styles.container1}>
          <div className={styles.eventDetails}>
            <div className={styles.eventHighlights}>
              <div className={styles.heading2BestEventManagemParent}>
                <h1 className={styles.heading2}>
                  WedField Photography - <br /> Best Photography Service 
                </h1>
                <div className={styles.weddingPlanningPgdm}>
                  Premier wedding photography company serving
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    background: "#B6255A",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  className={styles.getStarted}
                  // href="https://www.figma.com/design/YYFn6dRR0c5LfQugtdQt2R?node-id=1-2"
                  // target="_blank"
                >
                  Delhi
                </div>
                <div
                  style={{
                    background: "#B6255A",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  className={styles.getStarted}
                  // href="https://www.figma.com/design/YYFn6dRR0c5LfQugtdQt2R?node-id=1-2"
                  // target="_blank"
                >
                  Jaipur
                </div>
                <div
                  style={{
                    background: "#B6255A",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  className={styles.getStarted}
                  // href="https://www.figma.com/design/YYFn6dRR0c5LfQugtdQt2R?node-id=1-2"
                  // target="_blank"
                >
                  Udaipur
                </div>
                <div
                  style={{
                    background: "#B6255A",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  className={styles.getStarted}
                  // href="https://www.figma.com/design/YYFn6dRR0c5LfQugtdQt2R?node-id=1-2"
                  // target="_blank"
                >
                  Agra
                </div>
                <div
                  style={{
                    background: "#B6255A",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  className={styles.getStarted}
                  // href="https://www.figma.com/design/YYFn6dRR0c5LfQugtdQt2R?node-id=1-2"
                  // target="_blank"
                >
                  Jodhpur
                </div>
              </div>
              <button className={styles.link}>
                <div onClick={() => {}} className={styles.getStarted}>
                  <Link href={"/photography"}>Book Now</Link>
                </div>
                <FontAwesomeIcon
                  icon={"fa fa-arrow-right"}
                  color="white"
                  height={"20px"}
                  width={"20px"}
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </button>
              <img
                className={styles.shape14pngIcon}
                alt=""
                src={`${S3PROXY}/public/landing/shape-1-4png@2x.png`}
              />
            </div>
          </div>

          <div className={styles.shape13pngParent}>
            <img
              className={styles.frameChild}
              alt=""
              src={`${S3PROXY}/public/landing/group-1@2x.png`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHead;
