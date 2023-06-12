import Image from "next/image";
import s from "./Card.module.scss";

interface type_card {
  img: string;
  breed: string;
  temperaments: string[];
  weight: number;
}

export default function Card({ img, breed, temperaments, weight }: type_card) {
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
        <h3 className={s.breed}>{breed}</h3>
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
