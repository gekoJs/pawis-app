"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import s from "./Profile.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { AllCards } from "@/components";
import { Upload_image } from "@/components";
import { USER, DOGS } from "@/helpers/react_query/ks";
import { type_user } from "@/utils/types/types";
import { Nav, BackButton } from "@/components";
import { useSession } from "next-auth/react";
import { Form } from "@/components";
import {
  type_formComponentInput,
  type_formComponentInputError,
} from "@/utils/types/types";
import { handleFormErrors } from "@/helpers/handleFormErrors";
//---------------------------------------------

export default function Profile({ id_user }: { id_user: string | number }) {
  const { data: session }: any = useSession();
  const [userData, setUserData] = useState<type_user>({});
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [USER, id_user],
    queryFn: async () => await axios.get(`/api/profile/${id_user}`),
    enabled: session?.user.id === id_user,
  });

  useEffect(() => {
    setUserData(data?.data);
  }, [data]);

  //EDIT DOG--------------------------------------------
  const [FormOpen, setFormOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [idDog, setIdDog] = useState("");
  const [inpValue, setInpValue] = useState<type_formComponentInput>({
    breed: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    lifeTime_min: "",
    lifeTime_max: "",
    image: "",
    temperament: [],
  });
  const [errors, setErrors] = useState<type_formComponentInputError>({
    breed: "",
  });

  const dogFetched = useQuery({
    queryFn: async () => await axios.get(`/api/dogs/${idDog}`),
    queryKey: [DOGS, idDog],
    enabled: false,
    onSuccess: (data) => {
      setInpValue({
        breed: data.data.breed,
        height_min: data?.data?.height_min,
        height_max: data?.data?.height_max,
        weight_min: data?.data?.weight_min,
        weight_max: data?.data?.weight_max,
        lifeTime_min: data?.data?.lifeTime_min,
        lifeTime_max: data?.data?.lifeTime_max,
        image: data?.data?.image,
        temperament: [...data?.data?.Temperaments],
      });
    },
  });

  useEffect(() => {
    if (!!idDog && FormOpen) {
      dogFetched.refetch();
    }
  }, [idDog, FormOpen]);

  const dataToPut = {
    breed: inpValue.breed,
    image: inpValue.image,
    height_min: parseInt(inpValue.height_min),
    height_max: parseInt(inpValue.height_max),
    weight_min: parseInt(inpValue.weight_min),
    weight_max: parseInt(inpValue.weight_max),
    lifeTime_min: parseInt(inpValue.lifeTime_min),
    lifeTime_max: parseInt(inpValue.lifeTime_max),
    temperament: inpValue.temperament,
  };

  const addDogData = useMutation({
    mutationFn: async () => await axios.put(`/api/dogs/${idDog}`, dataToPut),
    onSuccess: (data) => {
      setInpValue({
        breed: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        lifeTime_min: "",
        lifeTime_max: "",
        image: "",
        temperament: [],
      });
      setErrors({
        breed: "",
      });
      //   setFormOpen(false);
      setSuccess(true);
      queryClient.invalidateQueries([DOGS], { exact: true });
      queryClient.invalidateQueries([USER]);
    },
  });
  let {
    isLoading: mutateLoading,
    isError: mutateError,
    isSuccess: mutateSuccess,
  } = addDogData;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setErrors(handleFormErrors(inpValue));
    if (!!!Object.values(errors).length && !!!mutateSuccess) {
      addDogData.mutate();
    }
  };
  //   useEffect(() => {
  //     setSuccess(mutateSuccess);
  //   }, [mutateSuccess]);

  useEffect(() => {
    if (!FormOpen) setSuccess(false);
  }, [FormOpen]);
  //EDIT DOG--------------------------------------------
  return (
    <div className={s.container}>
      <Nav />
      <BackButton />

      <section className={s.w_user_info}>
        <Upload_image
          image={userData?.user?.image}
          isLoading={isLoading}
          setUserData={setUserData}
          userData={userData}
        />
        <div className={s.w_nam_email}>
          <h3 className={s.name}>{userData?.user?.name}</h3>
          <p className={s.email}>{userData?.user?.email}</p>
        </div>
      </section>

      <div className={s.w_dogs_by}>
        <section>
          <h4 className={s.dog_by}>
            Created by you: <span>{userData?.created?.length} Dogs</span>
          </h4>
          {!!userData?.created?.length ? (
            <AllCards
              dogs={userData?.created}
              loading={isLoading}
              setFormOpen={setFormOpen}
              setIdDog={setIdDog}
            />
          ) : (
            <div className={s.nothingToSee}>
              <p>You have not created any dog</p>
            </div>
          )}
        </section>

        <section>
          <h4 className={s.dog_by}>
            liked by you: <span>{userData?.liked?.length} Dogs</span>
          </h4>
          {!!userData?.liked?.length ? (
            <AllCards
              dogs={userData?.liked}
              loading={isLoading}
              setFormOpen={setFormOpen}
              setIdDog={setIdDog}
            />
          ) : (
            <div className={s.nothingToSee}>
              <p>You have not liked any dog</p>
            </div>
          )}
        </section>
      </div>
      <Form
        type="Edit"
        FormOpen={FormOpen}
        setFormOpen={setFormOpen}
        inpValue={inpValue}
        setInpValue={setInpValue}
        errors={errors}
        setErrors={setErrors}
        handleSubmit={handleSubmit}
        isError={mutateError}
        isLoading={
          mutateLoading ||
          dogFetched.isLoading ||
          dogFetched.isFetching ||
          dogFetched.isRefetching
        }
        success={success}
      />
    </div>
  );
}
