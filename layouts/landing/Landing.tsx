"use client";

import Lottie from "lottie-react";
import landing_anim from "../../public/assets/animations/landing_anim.json";
import Link from "next/link";
import style from "./Landing.module.scss";
import Image from "next/image";
import logo from "../../public/assets/icons/pawis_logo.svg"

export default function Landing() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>
        Welcome to Pawis{" "}
        <div className={style.img_wrapper}>
          <Image
            src={"/assets/icons/pawis_logo.svg"}
            alt="pawis logo"
            fill={true}
          />
        </div>
      </h1>

      <div className={style.main_wrapper}>
        <div className={style.flex_wrapper}>
          <p className={style.description}>
            A page designed for you to search and learn more about your favorite
            breed or at least take a look for the +100 breeds in our database
          </p>
          <Link href={"/dogs"} className={style.link} as={"go home"}>
            Lets start!
          </Link>
        </div>

        <div className={style.animation}>
          <Lottie animationData={landing_anim} autoplay={false} />
        </div>
      </div>
    </div>
  );
}
