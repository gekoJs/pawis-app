"use client";

import Image from "next/image";
import style from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {Array.from({ length: 4 }, (e, i) => {
          return (
            <div
              style={{
                position: "absolute",
                top:  i*90,
                left: i % 2 === 0 ? "0%" : "calc(100% - 80px)",
              }}
            >
              <div className={style.imgWrapper} style={{animationDelay: `${i*1}s`}}>
                <Image src={"/assets/icons/paw.svg"} alt="loader" fill={true} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
