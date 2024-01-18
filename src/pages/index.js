
import Router from "next/router";
import styles from "@/styles/Home.module.css";
import { GitHub } from "react-feather";
import { useState } from "react";



export default function Home() {
  const [username, setUsername] = useState("");
  const handleChange = (e) => setUsername(e.target.value);

  const d = new Date();
  var day = d.toLocaleString("default", { weekday: "long" });

  return (
    <>
     <div className={styles.main}>
        <div className={styles.description}>
          <p>
            {day} needs some colour.
            <code className={styles.code}> So does your GitHub Profile</code>
          </p>
        </div>

        <div className={styles.center}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Router.push({
                pathname: `/user/${username}`,
               // query: { username: username },

              });
            }}
          >
            <label htmlFor="username" className={styles.label}>
              <GitHub size={35} /> <span>Find Your Profile</span>
            </label>
            <input
              name="username"
              type="text"
              onChange={handleChange}
              className={styles.form}
            />
          </form>
        </div>

        <div className={styles.grid}>
          <a
            href="https://github.com/olenadm/yourgitprofile"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Built with Next.js· ·GitHub Polyglot· </p>
          </a>
        </div>
        </div>
    
    </>
  );
}
