import { S3PROXY } from "../../../config";
import styles from "./index.module.css";

const FrameComponent4 = ({ className = "" }) => {
  return (
    <section className={[styles.courseContentWrapper, className].join(" ")}>
      <div className={styles.courseContent}>
        <div className={styles.courseItems}>
          <div className={styles.courseItem}>
            <div className={styles.topCoursesHeadingWrapper}>
              <h1 className={styles.heading2}>Why Choose us </h1>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.courseList}>
            <div className={styles.backgroundborder}>
              <img
                className={styles.backgroundborderIcon}
                loading="lazy"
                alt=""
                src={`${S3PROXY}/public/landing/backgroundborder@2x.png`}
              />
              <div className={styles.container}>
                <div className={styles.pgdmInEvent}>Experienced Team</div>
                <p style={{ fontSize: "16px" }}>
                  Our photographers are experts in wedding photography, blending
                  technical skill with an artistic eye.
                </p>
              </div>
            </div>
            <div className={styles.backgroundborder}>
              <img
                className={styles.backgroundborderIcon}
                loading="lazy"
                alt=""
                src={`${S3PROXY}/public/landing/backgroundborder@2x.png`}
              />
              <div className={styles.container}>
                <div className={styles.pgdmInEvent}>Tailored Packages</div>
                <p style={{ fontSize: "16px" }}>
                  Whether you’re planning a small gathering or a grand affair,
                  we offer packages customized to your needs.
                </p>
              </div>
            </div>
            <div className={styles.backgroundborder}>
              <img
                className={styles.backgroundborderIcon}
                loading="lazy"
                alt=""
                src={`${S3PROXY}/public/landing/backgroundborder@2x.png`}
              />
              <div className={styles.container}>
                <div className={styles.pgdmInEvent}>High-Quality Images</div>
                <p style={{ fontSize: "16px" }}>
                  We use top-notch equipment and techniques to deliver stunning
                  images that make your memories come alive.
                </p>
              </div>
            </div>
            <div className={styles.backgroundborder}>
              <img
                className={styles.backgroundborderIcon}
                loading="lazy"
                alt=""
                src={`${S3PROXY}/public/landing/backgroundborder@2x.png`}
              />
              <div className={styles.container}>
                <div className={styles.pgdmInEvent}>Candid & Styled Shots</div>
                <p style={{ fontSize: "16px" }}>
                  From natural candid moments to beautifully styled portraits,
                  we capture every emotion with authenticity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent4;
