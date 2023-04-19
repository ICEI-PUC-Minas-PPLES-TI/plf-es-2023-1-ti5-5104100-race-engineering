import Image from "next/image";
import React from "react";
import spinner from "../images/spinner.gif";
// import styles from "../weather2/styles/style.module.css";
import styles from "../styles/style.module.css";

const Spinner = () => {
  return (
    <>
      {/* <Image className="w-[200px] m-auto block" src={spinner} alt="loading.." /> */}
      <Image className={styles["img"]} src={spinner} alt="loading..." />
    </>
  );
};

export default Spinner;
