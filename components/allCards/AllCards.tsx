// "use client";
import { Card, CardSkeleton } from "../index";
import s from "./AllCards.module.scss";
import Link from "next/link";
/*---------------------------------------------*/

export default function AllCards({ dogs, loading }: any) {
  return (
    <div className={s.container}>
      {loading
        ? Array.from({ length: 8 }, (e, i) => <CardSkeleton key={i} />)
        : dogs?.map((e: any, i: any) => (
            <Link href={`/dogs/${e.id}`} key={e.id} className={s.link}>
              <Card
                img={e.image}
                breed={e.breed}
                temperaments={e.Temperaments}
                weight={
                  e.weight_min && e.weight_max
                    ? (e.weight_min + e.weight_max) / 2
                    : e.weight_min || e.weight_max
                }
              />
            </Link>
          ))}
    </div>
  );
}
