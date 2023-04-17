import Image from "next/image";
import React from "react";
import styles from "../styles/weather.module.css";

const Weather = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.weather}>
      {/* Top */}
      <div className={styles.top}>
        <div className={styles.icon}>
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="/"
            width="100"
            height="100"
          />
          <p className={styles.text2xl}>{data.weather[0].main}</p>
        </div>
        <p className={styles.text9xl}>{data.main.temp.toFixed(0)}&#176;</p>
      </div>
      {/* Bottom */}
      <div className={styles.bottom}>
        <p
          className={
            styles.text2xl + " " + styles.textCenter + " " + styles.pb6
          }
        >
          Temperatura em {data.name}
        </p>
        <div className={styles.bottomContent}>
          <div className={styles.bottomItem}>
            <p className={styles.fontBold + " " + styles.text2xl}>
              {data.main.feels_like.toFixed(0)}&#176;
            </p>
            <p className={styles.textXl}>Sençação Termica</p>
          </div>
          <div className={styles.bottomItem}>
            <p className={styles.fontBold + " " + styles.text2xl}>
              {data.main.humidity}%
            </p>
            <p className={styles.textXl}>Humidade</p>
          </div>
          <div className={styles.bottomItem}>
            <p className={styles.fontBold + " " + styles.text2xl}>
              {data.wind.speed.toFixed(0)} KM/H
            </p>
            <p className={styles.textXl}>Velocidade de Vento</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
