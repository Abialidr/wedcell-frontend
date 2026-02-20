import { FunctionComponent, useState } from "react";
import styles from "./Section12.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import styless from "../choose course/index.module.scss";
import { PROXY } from "../../../config";

const Section12 = ({ className = "" }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    query: "",
  });

  const handleSubmit = async () => {
    const { name, email, phone, location, course, query } = form;
    if (!name || !email || !phone || !location) {
      alert("Fill All Fields");
    } else {
      try {
        const res = await axios.post(`${PROXY}/inquiry`, {
          pName: name,
          email,
          city: location,
          mNo: phone,
          description: query,
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          location: "",
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
    <section className={[styles.section, className].join(" ")}>
      <div className={styles.boostContent}>
        <h1 className={styles.joinOurEvent}>
          Where Every Moment Becomes a Timeless Memory.
        </h1>
        <div className={styless.right2}>
          <article>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              name=""
              id=""
              placeholder="Enter Name...."
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="text"
              name=""
              id=""
              placeholder="Enter Email...."
            />
            <section>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                type="text"
                name=""
                id=""
                placeholder="Enter Phone...."
              />
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                type="text"
                name=""
                id=""
                placeholder="Enter Location...."
              />
            </section>
            <textarea
              value={form.query}
              onChange={(e) => setForm({ ...form, query: e.target.value })}
              name=""
              id=""
              cols="30"
              rows="4"
              placeholder="Enter Query...."
            ></textarea>
            <button onClick={() => handleSubmit()}>Book Now</button>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Section12;
