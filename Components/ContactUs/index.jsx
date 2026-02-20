import React from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

const ContactUsComp = () => {
  const router = useRouter();
  return (
    <div className={styles.contactUs}>
      <span
        className={styles.gradient_span}
        style={{
          fontFamily: "Gill Sans MT",
          fontSize: "40px",
          fontWeight: "700",
          letterSpacing: "0.02em",
        }}
      >
        Contact Us
      </span>
      <article>
        <section>
          <hgroup>Have Something In Mind?</hgroup>
          <span>Let's Talk.</span>
          {/* <p>
            We're all ears! Reach out to us using the form below, and our
            dedicated team will get back to you as soon as possible. Let's start
            a conversation!
          </p> */}
          <p>
            <strong>Company :</strong> WedField Events Private Limited <br />
            <strong>Email :</strong>{" "}
            <span onClick={() => router.push(`mailto:info@wedfield.com`)}>
              info@wedfield.com
            </span>{" "}
            <br />
            <strong>Mobile :</strong>{" "}
            <span onClick={() => router.push(`tel:+919910990378`)}>
              +91-9910990378
            </span>{" "}
            <br />
            <strong>Address :</strong>{" "}
            <span
              onClick={() =>
                router.push(
                  `https://www.google.com/maps/place/Wedcell/@28.4919826,77.1384098,17z/data=!4m10!1m2!2m1!1s403,+2nd+Floor+Pillar+Number-118,+Metro+Station-Ghitorni,+near+Ghitorni,+Gadaipur,+DLF+Farms,+New+Delhi,%C2%A0Delhi%C2%A0110030!3m6!1s0x390d1f12722e8ea3:0xc2cbaef8b8213cd5!8m2!3d28.492322!4d77.1456913!15sCnc0MDMsIDJuZCBGbG9vciBQaWxsYXIgTnVtYmVyLTExOCwgTWV0cm8gU3RhdGlvbi1HaGl0b3JuaSwgbmVhciBHaGl0b3JuaSwgR2FkYWlwdXIsIERMRiBGYXJtcywgTmV3IERlbGhpLMKgRGVsaGnCoDExMDAzMFpwIm40MDMgMm5kIGZsb29yIHBpbGxhciBudW1iZXIgMTE4IG1ldHJvIHN0YXRpb24gZ2hpdG9ybmkgbmVhciBnaGl0b3JuaSBnYWRhaXB1ciBkbGYgZmFybXMgbmV3IGRlbGhpIGRlbGhpIDExMDAzMJIBGGV2ZW50X21hbmFnZW1lbnRfY29tcGFueZoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VST2NuVlllR1IzRUFF4AEA!16s%2Fg%2F11mb0gyfmt?entry=ttu`
                )
              }
            >
              403, 2nd Floor Pillar Number-118, Metro Station-Ghitorni, near
              Ghitorni, Gadaipur, DLF Farms, New Delhi, Delhi 110030
            </span>
          </p>
          <p></p>
          <p></p>
        </section>
        <div className={styles.Form}>
          <article>
            <input type="text" name="" id="" placeholder="First Name*" />
            <input type="text" name="" id="" placeholder="Last Name*" />
          </article>
          <input type="text" name="" id="" placeholder="Email*" />
          <input type="text" name="" id="" placeholder="Phone Number*" />
          <textarea
            placeholder="Your Message..."
            name=""
            id=""
            cols={30}
            rows={5}
          ></textarea>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              fontFamily: "Gill Sans MT",
              fontSize: "20px",
              fontWeight: "700",
              color: "#ffffff",
              padding: "6px 40px",
              borderRadius: "35px",
              marginTop: "20px",
            }}
          >
            Submit{" "}
          </button>
        </div>
      </article>
    </div>
  );
};

export default ContactUsComp;
