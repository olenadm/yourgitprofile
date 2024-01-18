import React from "react";
import Corner from "./Corner";
import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero(data) {
  const { userData } = data;
  return (
    <section className={styles.hero}>
        <Corner/>
      <div className={styles.cristalBall}>
        <div className={styles.cristal}>
          {userData && (
            <div className={styles.ball}>
              {userData.avatar_url && (
                <Image
                  src={userData.avatar_url}
                  alt={`User: ${userData?.name}`}
                  width={120}
                  height={120}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.about}>
        {userData.login && <h5>@{userData.login}</h5>}
        {userData.name && <h2>{userData.name}</h2>}
      </div>
      <div className={styles.background}>
        <div className={styles.circle}>
          <div className={styles.circle1}>
            <div className={styles.circle2}>
              <div className={styles.circle3}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
