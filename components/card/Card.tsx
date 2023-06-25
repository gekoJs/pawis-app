"use client";
import Image from "next/image";
import s from "./Card.module.scss";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface type_card {
  id_user: string;
  id_dog: string | number;
  img: string;
  breed: string;
  temperaments: string[];
  weight: number;
  like: boolean;
  refetch: any;
  likesLength: string[];
}

export default function Card({
  img,
  breed,
  temperaments,
  weight,
  id_dog,
  id_user,
  like,
  refetch,
  likesLength,
}: type_card) {
  const likePOST = useMutation({
    mutationFn: async () =>
      await axios.post("/api/dogs/like", { id_dog, id_user }),
  });

  const handleCLick = (e: any) => {
    e.preventDefault();
    if (id_user) {
      likePOST.mutate();
      refetch();
    }
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper_img}>
        <Image
          sizes={"(min-width: 60px) 100vw"}
          fill={true}
          alt={breed}
          src={img}
          className={s.img}
        />
      </div>
      <div className={s.wrapper_content}>
        <div className={s.wrapper_flex}>
          <h3 className={s.breed}>{breed}</h3>

          <div className={s.like_svg}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 39.57 35.31"
              onClick={(e) => handleCLick(e)}
            >
              <g id="Capa_2" data-name="Capa 2">
                <g id="Capa_1-2" data-name="Capa 1">
                  <path
                    className={like ? s.like_full : s.unlike}
                    d="M36.51,15.15C31.77,21.64,26.13,27.46,20,34.58,14.08,28.2,9.15,23,4.33,17.64a12.11,12.11,0,0,1-2-3.7C.68,9.74,1,5.72,4.91,3.07,9,.29,13.15,1.15,16.33,4.73c2.22,2.49,3.53,4,6.42.51,3.61-4.39,8.46-4.85,12.18-2A8.51,8.51,0,0,1,36.51,15.15Z"
                  />
                  <path
                    className={like ? s.like_full : s.unlike_border}
                    d="M28.69.11c-3.09.4-6,2.44-9.53,4C12.8-.91,7.37-1.37,3,2.92s-4.1,10.43.7,16.71a75,75,0,0,0,8.37,9.18c9.09,8.5,6.24,8.89,15.35-.17,4.39-4.36,8.62-9.39,11.2-14.91A9.69,9.69,0,0,0,28.69.11Zm6.84,15.2C31.07,21.42,25.76,26.9,20,33.6c-5.57-6-10.21-10.92-14.74-15.94a11.29,11.29,0,0,1-1.88-3.49C1.81,10.22,2.14,6.44,5.79,3.94c3.83-2.61,7.76-1.8,10.75,1.57,2.09,2.34,3.32,3.78,6,.48,3.4-4.14,8-4.57,11.47-1.91A8,8,0,0,1,35.53,15.31Z"
                  />
                </g>
              </g>
            </svg>
            <span className={s.allLikes}>{likesLength.length}</span>
          </div>
        </div>
        <ul className={s.wrapper_list}>
          {temperaments?.map((e, i) => (
            <li key={i}>
              &nbsp;{e}&nbsp;
              {i !== temperaments.length - 1 && "|"}
            </li>
          ))}
        </ul>
        <p className={s.weight}>Weight: {weight}Kg</p>
      </div>
    </div>
  );
}
