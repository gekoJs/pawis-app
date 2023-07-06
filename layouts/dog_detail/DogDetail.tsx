"use client";
import { DOGS_ID } from "@/helpers/react_query/ks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import s from "./DogDetail.module.scss";
import { Loader } from "@/components";
import { BackButton, Nav } from "@/components/index";
//------------------------------------------

interface type_dog {
  id: string | number;
  breed: string;
  image: string;
  height_min: number;
  height_max: number;
  weight_min: number;
  weight_max: number;
  lifeTime_max: number;
  lifeTime_min: number;
  createdInDB: boolean;
  Temperaments: string[];
}

//------------------------------------------

export default function DogById({
  params,
}: {
  params: { dog_id: string | number };
}) {
  const [dog, setDog] = useState<type_dog>();
  const [positionImg, setPositionImg] = useState(0);

  const { data, isError, isLoading } = useQuery({
    queryKey: [DOGS_ID],
    queryFn: async () =>
      await axios.get(`/api/dogs/${params.dog_id}`).then((resp) => {
        setDog(resp.data);
        return resp.data;
      }),
  });

  useEffect(() => {
    window.onscroll = () => {
      const a = window.scrollY;
      const b = document.documentElement.scrollHeight - window.innerHeight;
      setPositionImg(Math.floor((a / b) * 100));
    };
  }, []);

  return (
    <div className={s.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Nav />
          <BackButton />
          <h1 className={s.title}>{dog?.breed}</h1>

          <div className={s.wrapper_img}>
            <p className={s.createdInDB}>
              Dog created in{" "}
              <span>{dog?.createdInDB ? "DataBase" : "Api"}</span>
            </p>

            <img
              className={s.img}
              src={dog?.image}
              style={{ objectPosition: `50% ${positionImg}%` }}
            />
          </div>

          <div className={s.wrapper_content}>
            <p className={s.characteristics}>
              Height :{" "}
              <span>
                {dog?.height_min}Cm - {dog?.height_max}Cm
              </span>
            </p>

            <p className={s.characteristics}>
              Weight :{" "}
              <span>
                {dog?.weight_min}Kg - {dog?.weight_max}Kg
              </span>
            </p>

            <p className={s.characteristics}>
              Life Time :{" "}
              <span>
                {dog?.lifeTime_min}Y - {dog?.lifeTime_max}Y
              </span>
            </p>

            <div className={s.wrapper_temperaments}>
              <p>Temperaments :</p>
              <ul className={s.wrapper_ul}>
                {dog?.Temperaments.map((temp, i) => (
                  <li key={i}>
                    &nbsp;{temp}&nbsp;
                    {i !== dog?.Temperaments.length - 1 && "|"}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`https://www.youtube.com/results?search_query=${dog?.breed}`}
              target="_blank"
              className={s.see_more}
            >
              See more about {dog?.breed}
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 53.42 50.02"
              className={s.svg}
            >
              <g id="Capa_2" data-name="Capa 2">
                <g id="Capa_1-2" data-name="Capa 1">
                  <path d="M.05,28.33a9.54,9.54,0,0,1,.74-4.71,14.41,14.41,0,0,1,2.63-4.57c2.42-2.55,5.1-2.69,7.68-.36C15.38,22.56,14.73,32,10,35.24c-2.22,1.52-4.83,1.11-6.93-1-1.3-1.31-1.83-3-2.64-4.62A3.25,3.25,0,0,1,.05,28.33Z" />
                  <path d="M36.46,49.42c-1.68-.26-4.23-.57-6.74-1.09a17.53,17.53,0,0,0-8.89.77,13.63,13.63,0,0,1-7.06.7c-5-1.12-7-7-3.25-10.53S17.6,32.1,21.25,28.62c3.29-3.14,7.24-2.68,10.19.84a28.88,28.88,0,0,1,2.47,3.45,13,13,0,0,0,6.16,5.22c4.15,1.83,5.33,3.64,4.67,6.64S41.57,49.4,36.46,49.42Z" />
                  <path d="M42.73,10a14.8,14.8,0,0,1-2.92,8.58c-3.31,4.15-8.18,3.54-10.32-1.29a18.7,18.7,0,0,1-1.61-8C28,4.19,31.75-.08,36,0,39.78.09,42.8,4.25,42.73,10Z" />
                  <path d="M25.72,9.76a17.08,17.08,0,0,1-1.66,7.42c-1.92,3.55-5.91,4.14-8.56,1.11-3.27-3.76-4.6-8.11-2.79-13C14,1.89,16.68-.15,19.59,0c2.57.14,4.78,2.42,5.77,5.8A14.41,14.41,0,0,1,25.72,9.76Z" />
                  <path d="M53.42,24.2a14.25,14.25,0,0,1-5.56,10.67,5.4,5.4,0,0,1-6,.74,5.51,5.51,0,0,1-3.34-5.3,14.93,14.93,0,0,1,7.18-12.55c2.58-1.68,5.21-.68,6.63,2.08A9.77,9.77,0,0,1,53.42,24.2Z" />
                </g>
              </g>
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
