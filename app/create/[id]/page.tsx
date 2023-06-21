"use client";
import { TEMPERAMENTS } from "@/helpers/react_query/ks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, Loader, Nav } from "@/components";
import Link from "next/link";
import s from "./page.module.scss";
import { useRouter } from "next/navigation";

//------------------------------------------

export default function IsSuccess({ params }: { params: { id: string } }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [TEMPERAMENTS, params.id],
    queryFn: async () => await axios.get(`/api/dogs/${params.id}`),
  });

  const router = useRouter();
  // if (isError || data?.data.createdInDB === false) {
  if (isError) {
    router.push("/dogs");
  }

  return (
    <>
      <Nav />
      <div className={s.container}>
        {isLoading && <Loader />}
        {data && (
            <div className={s.wrapper_content}>
              <h1 className={s.h1}>Dog Created Successfully!</h1>
              <Link
                href={`/dogs/${params.id}`}
                key={params.id}
                className={s.link}
              >
                <Card
                  img={data?.data.image}
                  breed={data?.data.breed}
                  temperaments={data?.data.Temperaments}
                  weight={
                    data?.data.weight_min && data?.data.weight_max
                      ? (data?.data.weight_min + data?.data.weight_max) / 2
                      : data?.data.weight_min || data?.data.weight_max
                  }
                />
              </Link>
              <Link href={"/dogs"} className={s.button_home}>
                <button>Go Home</button>
              </Link>
            </div>
        )}
      </div>
    </>
  );
}
