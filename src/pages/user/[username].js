import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Head";
import Hero from "@/components/Hero";
import Repos from "@/components/Repos";
import styless from "@/components/Repos.module.css";
import styles from "@/styles/User.module.css";
import Stats from "@/components/Stats";
import GhPolyglot from "gh-polyglot";
import langColors from "@/components/utils/langColors";

import { ArrowUpRight, Briefcase, Calendar, MapPin } from "react-feather";

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
    fetch(`https://api.github.com/users/${username}/repos?per_page=10`)
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
  const getLangData = () => {
    const me = new GhPolyglot(`${username}`);
    me.userStats((err, stats) => {
      if (err) {
        console.error("Error:", err);
        setError({ active: true, type: 400 });
      }
      setLangData(stats);
    });
  };

  useEffect(() => {
    if (router.isReady) {
      getUserData();
      getRepoData();
      getLangData();
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
          {userData && <Stats userData={userData} />}
          <div className={styles.wrap}>
            <div className={styles.leftPane}>
              <div className={styles.card}>
                {userData?.location && (
                  <p className={styles.info__item}>
                    <MapPin size={18} /> {userData.location}
                  </p>
                )}

                {userData?.company && (
                  <p className={styles.info__item}>
                    <Briefcase size={18} /> {userData.company}
                  </p>
                )}

                {userData?.created_at && (
                  <p className={styles.info__item}>
                    <Calendar size={18} />
                    Joined{" "}
                    {new Date(userData.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>

              <div className={styles.card}>
                {langData && repoData && (
                  <div className={styles.language_bar}>
                    {langData.map((language, index) => (
                      <span
                        className={styles.lang}
                        style={{ backgroundColor: langColors[language.label] }}
                        key={`${language.value}${index}`}
                      >
                        {language.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <section className={styless.repos} id="repos">
              <div className={styles.seeAll}>
                <a
                  href={`https://github.com/${username}?tab=repositories`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  See All <ArrowUpRight size={18} />
                </a>
              </div>

              <ul>{repoData && <Repos repoData={repoData} />}</ul>
            </section>
          </div>
        </>
      )}
    </>
  );
}
