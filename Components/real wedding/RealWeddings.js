import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomButton from "../Components/CustomButton";
import Styles from "../styles/PopularMakeup.module.css";
import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import Link from "next/link";

const RealWeddings = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <div className="py-60 ">
        <div className=" px-4">
          <div className="title-container text-center">
            <h2>Real Weddings</h2>
            <p className="text-gray">
              Real inspiration from the real wedding couple. Get ideas for
              grooms and brides.
            </p>
          </div>

          <Carousel
            responsive={responsive}
            infinite={true}
            ssr={true}
            swipeable={true}
            draggable={true}
            arrows={false}
            customButtonGroup={<CustomButton />}
            itemClass={Styles.carousel_item}
            containerClass={"py-5"}
          >
            <Link href={"/WeddingProfile"}>
              <div className={`${Styles.cr_container} box-shadow`}>
                <div
                  className={`${Styles.cr_img_wrapper} w-100 position-relative`}
                >
                  <Image
                    src={
                      "https://www.wedfield.com/assetss/images/blogs/6193d25f35f41.jpg"
                    }
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="cr-body mt-2 p-3 text-center">
                  <span className="fw-bold">
                    Picture Perfect Place for Pre Wedding shoots in Delhi
                  </span>
                  <div className="info d-flex align-items-center justify-content-center">
                    <div className="date">
                      2021-11-09
                      <hr className="text-danger my-0" />
                    </div>
                    <div className="location d-flex ms-5">
                      <span>
                        <MdLocationPin />
                      </span>
                      <span className="text-gray d-block">Delhi</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* <div className={`${Styles.cr_container} box-shadow`} >
                            <div className={`${Styles.cr_img_wrapper} w-100 position-relative`}>
                                <Image
                                    src={'wedfield.s3.ap-south-1.amazonaws.com/publichttps://www.wedfield.com/assetss/images/blogs/6193d25f35f41.jpg'}
                                    layout='fill'
                                    objectFit='cover'
                                />

                            </div>
                            <div className="cr-body mt-2 p-3 text-center">
                                <span className='fw-bold' >Picture Perfect Place for Pre Wedding shoots in Delhi</span>
                                <div className="info d-flex align-items-center justify-content-center">
                                    <div className="date">
                                        2021-11-09
                                        <hr className='text-danger my-0' />
                                    </div>
                                    <div className="location d-flex ms-5">
                                        <span>
                                        <MdLocationPin/>
                                        </span>
                                    <span className="text-gray d-block">Delhi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${Styles.cr_container} box-shadow`} >
                            <div className={`${Styles.cr_img_wrapper} w-100 position-relative`}>
                                <Image
                                    src={'wedfield.s3.ap-south-1.amazonaws.com/publichttps://www.wedfield.com/assetss/images/blogs/6193d25f35f41.jpg'}
                                    layout='fill'
                                    objectFit='cover'
                                />

                            </div>
                            <div className="cr-body mt-2 p-3 text-center">
                                <span className='fw-bold' >Picture Perfect Place for Pre Wedding shoots in Delhi</span>
                                <div className="info d-flex align-items-center justify-content-center">
                                    <div className="date">
                                        2021-11-09
                                        <hr className='text-danger my-0' />
                                    </div>
                                    <div className="location d-flex ms-5">
                                        <span>
                                        <MdLocationPin/>
                                        </span>
                                    <span className="text-gray d-block">Delhi</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default RealWeddings;
