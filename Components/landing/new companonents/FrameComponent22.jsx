import styles from "./FrameComponent2.module.css";
import TC from "./TC";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
const FrameComponent22 = () => {
  return (
    <div className={[styles.sectionWrapper]}>
      <div className={styles.section}>
        <div className={styles.bestInstitute}>
          <h1 className={styles.heading3}>What Our Clients Say</h1>
        </div>
        <div
          style={{
            width: "100%",
          }}
          className="TestimonialCarousals2"
        >
          <Swiper
            effect={"coverflow"}
            grabCursor={false}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            navigation={true}
            modules={[Navigation]}
          >
            {[
              {
                name: "Anjali Verma",
                content:
                  "We hired WedField Photography for our wedding, and they exceeded all our expectations. The photographers were highly professional, capturing every candid moment without ever being intrusive. The final album was simply stunning, with vibrant colors and creative angles that perfectly showcased the magic of our day. Highly recommended if you want timeless memories of your wedding!",
              },
              {
                name: "Priya Sharma",
                content:
                  "We couldn’t be happier with our experience with WedField Photography! The team was incredibly patient and flexible, accommodating all our requests. They captured our wedding moments in such a way that each photo feels like a work of art. Their attention to detail, lighting, and timing were impeccable, making every shot picture-perfect. Highly recommend their service for any event!",
              },
              {
                name: "Amit Khanna",
                content:
                  "Choosing WedField Photography was the best decision we made for our wedding. They took the time to understand our vision and executed it flawlessly. The photographers were kind and professional, and they captured all the emotions beautifully, from laughter to tears of joy. Our wedding album is filled with memories we’ll cherish forever. Thank you, WedField, for making our special day unforgettable!",
              },
              {
                name: "Ravi Mehta",
                content:
                  "WedField Photography made the entire process enjoyable and stress-free. They guided us through every shot with ease, making sure we felt comfortable. The result was a set of breathtaking photos that genuinely captured the essence of our wedding. The editing was subtle yet impactful, making each shot look cinematic without feeling overdone. We recommend them to anyone wanting high-quality photography with a personal touch.",
              },
              {
                name: "Sanya Arora",
                content:
                  "WedField Photography made our big day unforgettable. The photographers were fun, creative, and very friendly, which helped us feel comfortable and natural in front of the camera. Every picture captured the emotions and beauty of the event. From the candid shots to the posed family portraits, every photo was beautifully framed and full of life. The team was also punctual, responsive, and delivered everything on time.",
              },
            ].map((data, key) => {
              return (
                <SwiperSlide>
                  <TC name={data.name} content={data.content} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div
          style={{
            width: "100%",
          }}
          className="TestimonialCarousals3"
        >
          <Swiper
            grabCursor={false}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[EffectCoverflow, Navigation]}
          >
            {[
              {
                name: "Anjali Verma",
                content:
                  "We hired WedField Photography for our wedding, and they exceeded all our expectations. The photographers were highly professional, capturing every candid moment without ever being intrusive. The final album was simply stunning, with vibrant colors and creative angles that perfectly showcased the magic of our day. Highly recommended if you want timeless memories of your wedding!",
              },
              {
                name: "Priya Sharma",
                content:
                  "We couldn’t be happier with our experience with WedField Photography! The team was incredibly patient and flexible, accommodating all our requests. They captured our wedding moments in such a way that each photo feels like a work of art. Their attention to detail, lighting, and timing were impeccable, making every shot picture-perfect. Highly recommend their service for any event!",
              },
              {
                name: "Amit Khanna",
                content:
                  "Choosing WedField Photography was the best decision we made for our wedding. They took the time to understand our vision and executed it flawlessly. The photographers were kind and professional, and they captured all the emotions beautifully, from laughter to tears of joy. Our wedding album is filled with memories we’ll cherish forever. Thank you, WedField, for making our special day unforgettable!",
              },
              {
                name: "Ravi Mehta",
                content:
                  "WedField Photography made the entire process enjoyable and stress-free. They guided us through every shot with ease, making sure we felt comfortable. The result was a set of breathtaking photos that genuinely captured the essence of our wedding. The editing was subtle yet impactful, making each shot look cinematic without feeling overdone. We recommend them to anyone wanting high-quality photography with a personal touch.",
              },
              {
                name: "Sanya Arora",
                content:
                  "WedField Photography made our big day unforgettable. The photographers were fun, creative, and very friendly, which helped us feel comfortable and natural in front of the camera. Every picture captured the emotions and beauty of the event. From the candid shots to the posed family portraits, every photo was beautifully framed and full of life. The team was also punctual, responsive, and delivered everything on time.",
              },
            ].map((data, key) => {
              return (
                <SwiperSlide>
                  <TC name={data.name} content={data.content} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent22;
