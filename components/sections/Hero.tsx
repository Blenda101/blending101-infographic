/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useVariant } from "../context/VariantProvider";
import styles from "./Hero.module.scss";

const Hero = () => {
  const isDeath = useVariant();
  console.log(isDeath);
  return (
    <section>
      <header
        className={styles.header}
        style={{
          background: isDeath
            ? "#282220"
            : "linear-gradient(180deg, rgba(97, 226, 226, 0.11) 0%, rgba(80, 184, 206, 0) 100%)",
        }}
      >
        <div
          className={styles.header__bg}
          style={{
            backgroundImage: isDeath
              ? "url(/images/Hero-Bg-Dark.svg)"
              : "url(/images/Hero-Bg.svg)",
          }}
        />
        <div
          className={styles.header__circle}
          style={{
            background: isDeath
              ? "linear-gradient(180deg, #161616 0%, rgba(22, 22, 22, 0) 100%)"
              : "#E0F3FF",
          }}
        >
          <img src="/images/Doctor.svg" alt="Super Doctor" />
        </div>
        <h1 className={styles.header__title}>
          <div>United States</div>
          <div>Chronic Disease</div>
          <div>Interactive Data</div>
          <div>
            Story <img src="/images/title.svg" alt="Super Doctor" />
          </div>
        </h1>
      </header>
      <div className={styles.line} />
    </section>
  );
};

export default Hero;
