import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Head";
import Hero from "@/components/Hero";
import Repos from "@/components/Repos";
import styles from "@/components/Repos.module.css";
import Stats from "@/components/Stats";

export default function User() {
  const [userData, setUserData] = useState(null);
  const [langData, setLangData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState({ active: false, type: 200 });
  const [rateLimit, setRateLimit] = useState(null);

  const router = useRouter();
  const username = router.query.username;
  

  const getUserData = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.status === 404) {
          return setError({ active: true, type: 404 });
        }
        if (response.status === 403) {
          return setError({ active: true, type: 403 });
        }
        return response.json();
      })
      .then((json) => setUserData(json))
      .catch((error) => {
        setError({ active: true, type: 400 });
        console.error("Error:", error);
      });
  };

  const getRepoData = () => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((response) => {
        if (response.status === 404) {
          return setError({ active: true, type: 404 });
        }
        if (response.status === 403) {
          return setError({ active: true, type: 403 });
        }
        return response.json();
      })
      .then((json) => setRepoData(json))
      .catch((error) => {
        setError({ active: true, type: 200 });
        console.error("Error:", error);
      });
  };

  

  useEffect(() => {
    if(router.isReady){
    getUserData();
    getRepoData();
    }
  }, [router.isReady]);

  return (
    <>
      {error && error.active ? (
        <p>Error</p>
      ) : (
        <>
          <Header />
          {userData && <Hero userData={userData} />}

          <section className={styles.repos} id="repos">
          {userData && <Stats userData={userData} />}
           
            <ul>{repoData && <Repos repoData={repoData} />}</ul>
          </section>
        </>
      )}
    </>
  );
}
