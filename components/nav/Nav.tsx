"use client";

import style from "./Nav.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav({ data, setSearchedData, loading }: any) {
  const [searchValue, setSearchValue] = useState("");
  const test = data?.data;

  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
    handleFilter(e.target.value);
  };

  const handleFilter = (value: string) => {
    const searched = test?.filter((e: any) =>
      value === ""
        ? false
        : e.breed.toLowerCase().includes(value.toLocaleLowerCase())
    );
    console.log("searched value", searched.length, value);
    setSearchedData({ length: searched.length, data: searched });
  };
  
  return (
    <nav className={style.container}>
      <Link href={"/dogs"} className={`${style.imgWrapper} ${style.hover}`}>
        <Image
          src={"/assets/icons/paw.svg"}
          alt="pawis logo"
          width={30}
          height={30}
        />
      </Link>

      <form className={style.form}>
        <input
          type="text"
          placeholder= {loading ? "Loading..." : "Search a dog"}
          className={`${style.input} ${style.hover}`}
          value={searchValue}
          onChange={(e) => handleChange(e)}
        />
      </form>

      <div className={style.buttonsWrapper}>
        <button className={`${style.button} ${style.hover}`}>Sign in</button>
        <button className={`${style.button} ${style.hover}`}>Sign up</button>
      </div>
    </nav>
  );
}
