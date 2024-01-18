import React from 'react'
import styles from "./Stat.module.css"

export default function Stats(data) {
    const{userData} = data;
  return (
    <div className={styles.stat}>
    <div>
      <div className={styles.num}>{userData.public_repos.toLocaleString()}</div>
      <div className={styles.numlabel}>REPOSITORIES</div>
    </div>
    <div>
      <div className={styles.num}>{userData.followers.toLocaleString()}</div>
      <div className={styles.numlabel}>FOLLOWERS</div>
    </div>
    <div>
      <div className={styles.num}>{userData.following.toLocaleString()}</div>
      <div className={styles.numlabel}>FOLLOWING</div>
    </div>
  </div>
  )
}
