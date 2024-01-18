import React from "react";
import { useState, useEffect } from "react";
import styles from "./Repos.module.css";
import { Box } from "react-feather";

export default function Repos(data) {
  const { repoData } = data;

  const [topRepos, setTopRepos] = useState([]);

  const getTopRepos = (type) => {
    const LIMIT = 8;
    const map = {
      stars: "stargazers_count",
      forks: "forks_count",
      size: "size",
    };
    /*const sortProperty = map[type];
    const sorted = repoData
      .filter((repo) => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT);*/

    //setTopRepos(sorted);
    setTopRepos(repoData);
  };

  useEffect(() => {
    if (repoData.length) {
      getTopRepos();
    }
  }, []);

  return (
    <>
      {topRepos.length > 0 ? (
        <>
          {topRepos.map((repo) => (
            <li key={repo.id}>
              <h3><Box size={18} color="#888"/> {repo.name}</h3>
              <p>{repo.description}</p>
              <div className={styles.repostats}>
                <div className={styles.left}>
                  <div className={styles.language}>{repo.language}</div>
                </div>
                <div className={styles.right}>
                  {" "}
                  <span>{repo.size.toLocaleString()} KB</span>
                </div>
              </div>
            </li>
          ))}
        </>
      ) : (
        <li>
          {" "}
          <h3>No available repositories!</h3>
        </li>
      )}
    </>
  );
}
