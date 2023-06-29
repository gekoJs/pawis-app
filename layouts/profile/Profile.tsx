"use client";
import { useQuery } from "@tanstack/react-query";
import s from "./Profile.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { AllCards } from "@/components";
import { Upload_image } from "@/components";
import { USER } from "@/helpers/react_query/ks";
import { type_user } from "@/utils/types/types";

//---------------------------------------------

export default function Profile({ id_user }: { id_user: string | number }) {
  const [userData, setUserData] = useState<type_user>({});

  const { data, isLoading } = useQuery({
    queryKey: [USER, id_user],
    queryFn: async () => await axios.get(`/api/profile/${id_user}`),
    enabled: id_user !== null,
  });

  useEffect(() => {
    setUserData(data?.data);
  }, [data]);

  return (
    <div className={s.container}>
      <div className={s.w_user_info}>
        <Upload_image
          image={userData?.user?.image}
          isLoading={isLoading}
          setUserData={setUserData}
          userData={userData}
        />
        <h1>{userData?.user?.name}</h1>
        <p>{userData?.user?.email}</p>
      </div>

      <h2>Created by you:</h2>
      <AllCards dogs={userData?.created} loading={isLoading} />
      <h2>liked by you:</h2>
      <AllCards dogs={userData?.liked} loading={isLoading} />
    </div>
  );
}
