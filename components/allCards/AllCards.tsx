"use client";
import { useSession } from "next-auth/react";
import { Card, CardSkeleton } from "../index";
import s from "./AllCards.module.scss";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/*---------------------------------------------*/

export default function AllCards({ dogs, loading }: any) {
  const { data: session }: any = useSession();

  const { data: allLikes, refetch } = useQuery({
    queryFn: async () => await axios.get("/api/dogs/like"),
    queryKey: ["LIKES", session?.user?.id],
  });

  const userLikes = allLikes?.data.filter(
    (e: any) => e.UserId === session?.user?.id
  );
  return (
    <div className={s.container}>
      {loading
        ? Array.from({ length: 8 }, (e, i) => <CardSkeleton key={i} />)
        : dogs?.map((e: any, i: any) => (
            <Link href={`/dogs/${e.id}`} key={e.id} className={s.link}>
              <Card
                id_dog={e.id}
                id_user={session?.user?.id}
                img={e.image}
                breed={e.breed}
                temperaments={e.Temperaments}
                weight={
                  e.weight_min && e.weight_max
                    ? (e.weight_min + e.weight_max) / 2
                    : e.weight_min || e.weight_max
                }
                like={userLikes?.some((j: any) => j.DogId === e.id.toString())}
                refetch={refetch}
                likesLength={allLikes?.data.filter(
                  (j: any) => j.DogId === e.id.toString()
                )}
              />
            </Link>
          ))}
    </div>
  );
}
