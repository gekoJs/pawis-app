"use client";
import axios from "axios"
import style from "./Landing.module.scss";
import landing_anim from "../../public/assets/animations/landing_anim.json";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loader_active_fn } from "@/redux/displayTrigger";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { Loader } from "@/components";

/////////////////////////////////////////////////////////////

export default function Landing() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState({ img: true, anim: true });
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    lottieRef.current?.animationLoaded
      ? (setLoading({ ...loading, anim: false }),
        dispatch(loader_active_fn(false)))
      : null;
  }, [lottieRef.current?.animationLoaded]);
  
  return (
    <div className={style.container}>
      {Object.values(loading).some((e) => e === true) && <Loader />}
      <h1 className={style.title}>
        Welcome to Pawis
        <div className={style.img_wrapper}>
          <Image
            src={"/assets/icons/paw.svg"}
            alt="pawis logo"
            fill={true}
            onLoadingComplete={() => setLoading({ ...loading, img: false })}
          />
        </div>
      </h1>

      <div className={style.main_wrapper}>
        <div className={style.flex_wrapper}>
          <p className={style.description}>
            A page designed for you to search and learn more about your favorite
            breed or at least take a look for the +100 breeds in our database
          </p>
          <Link href={"/dogs"} className={style.link}>
            Lets start!
          </Link>
        </div>

        <div className={style.animation}>
          <Lottie lottieRef={lottieRef} animationData={landing_anim} />
        </div>
      </div>
    </div>
  );
}
