import { FunctionComponent } from "react";
import styles from "./FrameComponent6.module.css";
import { S3PROXY } from "../../../config/index";

const FrameComponent6 = ({ className = "" }) => {
  return (
    <section
      className={[styles.howNDIEmpowersContainerWrapper, className].join(" ")}
    >
      <div className={styles.howNDIEmpowersContainer}>
        <div className={styles.howNDIEmpowersContent}>
          <div className={styles.howNDIEmpowersDetailsCon}>
            <div className={styles.howNDIEmpowersDetails}>
              <h1 className={styles.heading2}>Our Services</h1>
            </div>
          </div>
        </div>
        <div className={styles.processContainerWrapper}>
          <div className={styles.processContainer}>
            <div className={styles.processContent}>
              <div className={styles.processStepsContainer}>
                <img
                  className={styles.containerIcon}
                  alt=""
                  src={`${S3PROXY}/public/landing/container@2x.png`}
                />

                <div className={styles.featuresDetails}>
                  <div className={styles.featuresListContainer}>
                    <h3 className={styles.heading3}>Pre-Wedding Shoots</h3>
                  </div>
                  <div className={styles.ourCoursesAre}>
                    Celebrate your love story with a customized pre-wedding
                    photoshoot that reflects your unique journey.
                  </div>
                </div>
              </div>
            </div>
            <img
              className={styles.processArrowsvgIcon}
              alt=""
              src={`${S3PROXY}/public/landing/processarrowsvg.svg`}
            />
            <div className={styles.processContent}>
              <div className={styles.processStepsContainer}>
                <img
                  className={styles.containerIcon}
                  alt=""
                  src={`${S3PROXY}/public/landing/container-1@2x.png`}
                />
                <div className={styles.featuresDetails}>
                  <div className={styles.featuresListContainer1}>
                    <h3 className={styles.heading3}>Wedding Day Coverage</h3>
                  </div>
                  <div className={styles.ourCoursesAre}>
                    From the first look to the last dance, we cover every aspect
                    of your wedding with comprehensive photography.
                  </div>
                </div>
              </div>
            </div>
            <img
              className={styles.processArrowsvgIcon}
              alt=""
              src={`${S3PROXY}/public/landing/processarrowsvg.svg`}
            />
            <div className={styles.processContent}>
              <div className={styles.processStepsContainer}>
                <img
                  className={styles.containerIcon}
                  alt=""
                  src={`${S3PROXY}/public/landing/container-2@2x.png`}
                />

                <div className={styles.featuresDetails}>
                  <div className={styles.featuresListContainer1}>
                    <h3 className={styles.heading3}>Post-Wedding Sessions</h3>
                  </div>
                  <div className={styles.ourCoursesAre}>
                    Extend the magic with a post-wedding shoot that captures the
                    newlywed glow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent6;
