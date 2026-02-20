import { FunctionComponent, useState } from "react";
import styles from "./FrameComponent5.module.css";
import { PROXY } from "../../../config";
import styless from "../choose course/index.module.scss";
import axios from "axios";
const FrameComponent5 = ({ className = "" }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    course: null,
    query: "",
  });

  const handleSubmit = async () => {
    const { name, email, phone, location, course, query } = form;
    if (!name || !email || !phone || !location || course == null) {
      alert("Fill All Fields");
    } else {
      try {
        const res = await axios.post(`${PROXY}/inquiry`, form);
        setForm({
          name: "",
          email: "",
          phone: "",
          location: "",
          course: null,
          query: "",
        });
        alert("Application Submitted");
      } catch (e) {
        alert("Something Went Wrong");
        console.log("🚀 ~ handleSubmit ~ e:", e);
      }
    }
  };
  return (
    <section className={[styles.sectionWrapper, className].join(" ")}>
      <div className={styles.section}>
        <div className={styles.background} />
        <div className={styles.whyNDIEMTitleContainer}>
          <div className={styles.whyNDIEMSmallTitle}>
            <div className={styles.yourPathTo}>Your Path to Success</div>
          </div>
          <h1 className={styles.heading3}>
            Why Choose WedCell Institute for Studying Event Management Course ?
          </h1>
        </div>
        <div className={styles.link} />
        <div className={styles.whyNDIEMDescription}>
          <div className={styles.whyNDIEMContentContaine}>
            <div className={styles.atWedcellEventContainer}>
              <p className={styles.atWedcellEvent}>
                At WedCell Event Management Institute in Delhi Group of
                WedField. We also operate as an event management company based
                in New Delhi. With experienced and skilled faculty from the
                event industry, we offer Best education to our students. Our
                programs include regular weekly assignments and live event
                practical exposure to prepare every student individually for
                their successful future careers. Our focused aim is to create
                professionally, academically, and ethically sound event managers
                and executives.
              </p>
              <p className={styles.atWedcellEvent}>&nbsp;</p>
              <p className={styles.atWedcellEvent}>
                As a popular event management company in India, we have designed
                our curriculum to cater to the practical and theoretical
                learning needs of our students. Our strong industry approach
                guides and assists our students to form their own event company
                under the guidance of the CEO and CMD of event management
                companies.
              </p>
              <p className={styles.atWedcellEvent}>&nbsp;</p>
              <p className={styles.atWedcellEvent}>
                Our various courses are facilitated by expert and experienced
                teachers who are industry professionals and understand the needs
                and priorities of both the corporate world and students. The
                excellent course syllabus and teaching methodology have created
                widespread awareness for events and event management in India.
                Our students are equipped with the necessary technology to form
                their own event companies.
              </p>
            </div>
            <div className={styles.enquiryFormContainerWrapper}>
              <div className={styles.enquiryFormContainer}>
                {/* <img
                  className={styles.line361pngIcon}
                  loading="lazy"
                  alt=""
                  src="/line-361png@2x.png"
                /> */}
                {/* <div className={styles.border}>
                  <div className={styles.background1}>
                    <div className={styles.enquiryFormTitleContainer}>
                      <h1 className={styles.enquiryForm}>Enquiry Form</h1>
                      <div className={styles.enquiryFormInputs}>
                        <div className={styles.background2} />
                        <div className={styles.enquiryFormInputContainer}>
                          <div className={styles.input2}>
                            <input type="text" placeholder="name" />
                            <div className={styles.enquiryFormNameIconContain}>
                              <img
                                className={styles.icon1}
                                alt=""
                                src="/icon-11.svg"
                              />
                            </div>
                          </div>
                          <div className={styles.input2}>
                            <input type="text" placeholder="email" />
                            <div className={styles.enquiryFormNameIconContain}>
                              <img
                                className={styles.icon1}
                                alt=""
                                src="/icon-12.svg"
                              />
                            </div>
                          </div>
                        </div>
                        <div className={styles.input2}>
                          <input type="text" placeholder="Phone number" />
                          <div className={styles.enquiryFormNameIconContain}>
                            <img
                              className={styles.icon1}
                              alt=""
                              src="/icon-13.svg"
                            />
                          </div>
                        </div>
                        {/* <div className={styles.options}>
                          <div className={styles.container2}>
                            <div className={styles.pleaseChooseAn}>
                              —Please choose an option—
                            </div>
                          </div>
                          <div className={styles.iconContainer}>
                            <img
                              className={styles.icon}
                              alt=""
                              src="/icon-14.svg"
                            />
                          </div>
                        </div> 
                      </div>
                      <textarea
                        className={styles.textarea}
                        rows={8}
                        cols={15}
                      />
                    </div>
                    <button className={styles.button}>
                      <div className={styles.sendMessage}>Send Message</div>
                      <img className={styles.icon4} alt="" src="/icon-16.svg" />
                    </button>
                  </div>
                </div> */}
                <div className={styless.right}>
                  <article>
                    <hgroup>Choose Your Course</hgroup>
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter Name...."
                    />
                    <input
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter Email...."
                    />
                    <section>
                      <input
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter Phone...."
                      />
                      <input
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter Location...."
                      />
                    </section>
                    <section>
                      <select
                        value={form.course}
                        onChange={(e) =>
                          setForm({ ...form, course: e.target.value })
                        }
                        name=""
                        id=""
                      >
                        <option
                          style={{ color: "gray" }}
                          value={null}
                          disabled
                          selected
                        >
                          -----Select Course-----
                        </option>
                        {[
                          "DIPLOMA IN EVENT MANAGMENT",
                          "PGDM IN EVENT MANAGEMENT",
                          "DIPLOMA IN WEDDING PLANNING",
                          "ADVANCED DIPLOMA IN WEDDING PLANNING",
                          "DIPLOMA COURSE IN DIGITAL MARKETING",
                          "SIX MONTH CERTIFICATION COURSE IN SEO",
                          "THREE MONTH CERTIFICATION COURSE IN SEO",
                          "THREE MONTH CERTIFICATION COURCE IN SOCIAL MEDIA",
                          "DIPLOMA IN HOTEL MANAGEMENT",
                        ].map((val, key) => {
                          return (
                            <option key={key} value={val}>
                              {val}
                            </option>
                          );
                        })}
                      </select>
                    </section>
                    <textarea
                      value={form.query}
                      onChange={(e) =>
                        setForm({ ...form, query: e.target.value })
                      }
                      name=""
                      id=""
                      cols="30"
                      rows="4"
                      placeholder="Enter Query...."
                    ></textarea>
                    <button onClick={() => handleSubmit()}>Send</button>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent5;
