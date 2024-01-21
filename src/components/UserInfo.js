import React from "react";
import { Briefcase, Calendar, Info, Link, MapPin } from "react-feather";
import styles from "./UserInfo.module.css";

export default function UserInfo(user) {
  const { userData } = user;
  return (
    <div className={styles.card}>
      <div className={styles.sides}>
        <div>
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
        </div>
        <div>
          {userData?.blog && (
            <p className={styles.info__item}>
              <Link size={18} />{" "}
              <a href={userData.blog} target="_blank">
                {userData.blog}
              </a>
            </p>
          )}
          {userData?.email && (
            <p className={styles.info__item}>
              <Link size={18} />{" "}
              <a href={`mailto:@${userData.email}`} target="_blank">
                {userData.email}
              </a>
            </p>
          )}
          {userData?.bio && (
            <p className={styles.info__item}>
              <Info size={18} /> {userData.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
