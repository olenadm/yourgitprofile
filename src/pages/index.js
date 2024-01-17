import Head from "next/head";
import Router from "next/router";
import { DM_Sans } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { GitHub } from "react-feather";
import { useState } from "react";

const dm = DM_Sans({ subsets: ["latin"] });

export default function Home() {
  const [username, setUsername] = useState("");
  const handleChange = (e) => setUsername(e.target.value);

  const d = new Date();
  var day = d.toLocaleString("default", { weekday: "long" })  
 
  return (
    <>
      <Head/>
      <main className={`${styles.main} ${dm.className}`}>
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
                pathname: "/user/" + username,
                //query: { id: username },
              });
            }}
          >
            <label htmlFor="username" className={styles.label}>
            <GitHub size={35} /> <span>Find Your Profile</span>
            </label>
            <input name="username" type="text" onChange={handleChange} className={styles.form}/>
          </form>
        </div>

        <div className={styles.grid}>
          <a
            href="#"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Built with Next.js· ·GitHub Polyglot· </p>
          </a>
        </div>
      </main>
    </>
  );
}
