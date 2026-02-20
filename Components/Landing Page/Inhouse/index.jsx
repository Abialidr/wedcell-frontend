import React from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { S3PROXY } from "../../../config";

const Inhouse = ({ adminEssen }) => {
  const router = useRouter();
  return (
    <div className={styles.Inhouse}>
      <div className={styles.left}>
        <div className={styles.absolute}>
          <span>Venue</span>
          <hgroup>
            Book Your <br /> Venue <p>by Venue Expert</p>
          </hgroup>
          <button onClick={() => router.push("in-house/venue")}>
            Book Now
          </button>
        </div>
        <img src={`${S3PROXY}/public/LandingPage/venuebook.png`} alt="" />
      </div>
      <div className={styles.right}>
        {[
          // {
          //   id: 5,
          //   img: 'https://images.unsplash.com/photo-1509316554658-04f9287cdb78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlZGRpbmclMjBwbGFubmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
          //   title: 'In-House Services in Wedding Planner',
          //   desc: adminEssen?.weddingpannerDescruption,
          //   route: 'in-house/wedding',
          // },
          // {
          //   id: 6,
          //   img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=898&q=80',
          //   title: 'Popular in Hotels',
          //   desc: adminEssen?.mehendiDescruption,
          //   route: 'venue?category=Hotel',
          // },
          // {
          //   id: 2,
          //   img: 'https://images.unsplash.com/photo-1525772764200-be829a350797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
          //   title: 'In-House Services in Decor',
          //   desc: adminEssen?.decoreDescruption,
          //   route: 'in-house/decore',
          // },
          {
            id: 2,
            img: "https://images.unsplash.com/photo-1676804899250-18a342d77e16?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            desc: adminEssen?.photographerDescruption,
            title: "In-House Services in Dhol",
            route: "dhol",
          },
          {
            id: 3,
            img: "https://images.unsplash.com/photo-1513031300226-c8fb12de9ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            desc: adminEssen?.photographerDescruption,
            title: "In-House Services in Photography",
            route: "photography",
          },
          {
            id: 4,
            img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFrZXVwfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
            desc: adminEssen?.makeupDescruption,
            title: "In-House Services in Make-Up",
            route: "makeup",
          },
          {
            id: 6,
            img: "https://images.unsplash.com/photo-1613665667184-81bb9b8605e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1laGVuZGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
            title: "In-House Services in Mehandi",
            desc: adminEssen?.mehendiDescruption,
            route: "mehendi",
          },
        ].map((val, key) => {
          return (
            <article key={key}>
              <div className={styles.absolute}>
                <span>{val.title}</span>

                <button onClick={() => router.push(val.route)}>
                  Book Now{" "}
                  <span>
                    <Icon icon={"iconamoon:arrow-right-2"} />
                  </span>
                </button>
              </div>
              <img src={`${val.img}`} alt="" />
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Inhouse;
