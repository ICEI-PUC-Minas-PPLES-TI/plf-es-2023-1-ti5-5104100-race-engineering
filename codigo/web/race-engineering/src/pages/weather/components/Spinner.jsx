import Image from "next/image";
import React from "react";
// import spinner from "../public/spinner.gif"; ALTEREI
// import spinner from "../public/images/spinner.gif";
import spinner from "../images/spinner.gif";

const Spinner = () => {
  return (
    <>
      <Image className="w-[200px] m-auto block" src={spinner} alt="loading.." />
    </>
  );
};

export default Spinner;
