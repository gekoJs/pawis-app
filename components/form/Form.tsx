"use client";
import s from "./Form.module.scss";
import { useEffect, useState } from "react";
import { handleFormErrors } from "@/helpers/handleFormErrors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DOGS, TEMPERAMENTS } from "@/helpers/react_query/ks";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { type_DogsData_rq } from "@/utils/types/types";
//--------------------------------

interface type_inpState {
  Breed: string;
  Height_min: string;
  Height_max: string;
  Weight_min: string;
  Weight_max: string;
  LifeTime_min: string;
  LifeTime_max: string;
  Image: string;
  Temperaments: string[];
}

interface type_inpStateErr {
  Breed?: string;
  Height_min?: string;
  Height_max?: string;
  Weight_min?: string;
  Weight_max?: string;
  LifeTime_min?: string;
  LifeTime_max?: string;
  Image?: string;
  Temperaments?: string;
}

export default function Form({
  type,
  FormOpen,
  setFormOpen,
}: {
  type: string;
  FormOpen: boolean;
  setFormOpen: any;
}) {
  const queryClient = useQueryClient();
  const [inpValue, setInpValue] = useState<type_inpState>({
    Breed: "",
    Height_min: "",
    Height_max: "",
    Weight_min: "",
    Weight_max: "",
    LifeTime_min: "",
    LifeTime_max: "",
    Image: "",
    Temperaments: [],
  });
  const [errors, setErrors] = useState<type_inpStateErr>({
    Breed: "",
    Height_min: "",
    Height_max: "",
    Weight_min: "",
    Weight_max: "",
    LifeTime_min: "",
    LifeTime_max: "",
    Image: "",
    Temperaments: "",
  });
  const [success, setSuccess] = useState(false);
  const inputs = [
    {
      name: "Breed",
      input: [{ type: "text", placeHolder: "Whats the breed's dog" }],
      className: s.input,
    },
    {
      name: "Height",
      input: [
        { type: "number", placeHolder: "min" },
        { type: "number", placeHolder: "max" },
      ],
      className: s.inputMinMax,
    },
    {
      name: "Weight",
      input: [
        { type: "number", placeHolder: "min" },
        { type: "number", placeHolder: "max" },
      ],
      className: s.inputMinMax,
    },
    {
      name: "Life Time",
      input: [
        { type: "number", placeHolder: "min" },
        { type: "number", placeHolder: "max" },
      ],
      className: s.inputMinMax,
    },
    {
      name: "Image",
      input: [{ type: "text", placeHolder: "Image" }],
      className: s.input,
    },
  ];

  const {
    data: temperamentsData,
    isLoading: isLoadingTemperaments,
    isError: isErrorTemperaments,
  } = useQuery({
    queryKey: [TEMPERAMENTS],
    queryFn: async () => await axios.get("/api/temperaments"),
  });

  const router = useRouter();

  //AUTH---------------------------------
  const { data: session } = useSession();
  //AUTH---------------------------------

  //CHANGE HANDLERS----------------------
  const handleChange = (e: any) => {
    setInpValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    if (Object.values(inpValue).some((e) => !!e.length)) {
      setErrors(handleFormErrors(inpValue));
    }
  }, [inpValue]);

  const handleChangeSelect = (e: any) => {
    if (inpValue.Temperaments.includes(e.target.value)) return;
    setInpValue((prev) => {
      return { ...prev, Temperaments: [...prev.Temperaments, e.target.value] };
    });
  };
  const handleEraseTemp = (e: any) => {
    const filteredTemps = inpValue.Temperaments.filter(
      (temp) => temp !== e.target.value
    );
    setInpValue((prev) => {
      return {
        ...prev,
        Temperaments: filteredTemps,
      };
    });
  };
  //CHANGE HANDLERS----------------------

  //POST HANDLER-------------------------
  const dataToPost = {
    breed: inpValue.Breed,
    height_min: parseInt(inpValue.Height_min),
    height_max: parseInt(inpValue.Height_max),
    weight_min: parseInt(inpValue.Weight_min),
    weight_max: parseInt(inpValue.Weight_max),
    lifeTime_min: parseInt(inpValue.LifeTime_min),
    lifeTime_max: parseInt(inpValue.LifeTime_max),
    image: inpValue.Image,
    temperament: inpValue.Temperaments,
    userId: session?.user?.email,
  };
  const addDogData = useMutation({
    mutationFn: async () => await axios.post("/api/dogs", dataToPost),
    onSuccess: (data) => {
      setInpValue({
        Breed: "",
        Height_min: "",
        Height_max: "",
        Weight_min: "",
        Weight_max: "",
        LifeTime_min: "",
        LifeTime_max: "",
        Image: "",
        Temperaments: [],
      });
      setErrors({
        Breed: "",
        Height_min: "",
        Height_max: "",
        Weight_min: "",
        Weight_max: "",
        LifeTime_min: "",
        LifeTime_max: "",
        Image: "",
        Temperaments: "",
      });
      queryClient.invalidateQueries([DOGS], { exact: true });
      router.push(`/create/${data?.data.newDog.id}`);
    },
  });
  let { isLoading, isError, isSuccess, error, data } = addDogData;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErrors(handleFormErrors(inpValue));
    if (!!!Object.values(errors).length && !!!isSuccess) {
      addDogData.mutate();
    }
  };
  //POST HANDLER-------------------------

  useEffect(() => {
    setSuccess(isSuccess);
  }, [isSuccess]);
  useEffect(() => {
    setSuccess(false);
  }, [FormOpen]);

  return (
    <div
      className={FormOpen ? `${s.container} ${s.container_open}` : s.container}
    >
      <div className={s.close_button} onClick={() => setFormOpen(false)}>
        <svg viewBox="0 -960 960 960">
          <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
        </svg>
      </div>
      <div className={s.wrapper_content}>
        <h1 className={s.h1}>{type} your dog</h1>
        <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
          {inputs.map((e, i) => (
            <div key={i}>
              <label className={s.label}>{e.name}</label>
              <div className={s.wrapper_input}>
                {e.input.map((inp, i) => (
                  <div key={i} style={{ width: "100%" }}>
                    <input
                      type={inp.type}
                      value={
                        inpValue[
                          e.input.length > 1
                            ? (`${e.name.replace(" ", "")}_${
                                inp.placeHolder
                              }` as keyof type_inpState)
                            : (e.name as keyof type_inpState)
                        ]
                      }
                      name={
                        e.input.length > 1
                          ? `${e.name.replace(" ", "")}_${inp.placeHolder}`
                          : e.name
                      }
                      onChange={(e) => handleChange(e)}
                      placeholder={inp.placeHolder}
                      className={`${e.className} ${s.all_input}`}
                    />
                    {errors[
                      e.input.length > 1
                        ? (`${e.name.replace(" ", "")}_${
                            inp.placeHolder
                          }` as keyof type_inpStateErr)
                        : (e.name as keyof type_inpStateErr)
                    ] && (
                      <span className={s.error}>
                        {
                          errors[
                            e.input.length > 1
                              ? (`${e.name.replace(" ", "")}_${
                                  inp.placeHolder
                                }` as keyof type_inpStateErr)
                              : (e.name as keyof type_inpStateErr)
                          ]
                        }
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <label className={s.label}>Temperaments:</label>
            <select
              className={s.select}
              onChange={(e) => handleChangeSelect(e)}
            >
              {isLoadingTemperaments && <option>Loading...</option>}
              {temperamentsData?.data?.map((e: string, i: number) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
            {errors.Temperaments && (
              <span className={s.error}>{errors.Temperaments}</span>
            )}
            <div className={s.wrapper_temperaments_to_search}>
              {inpValue.Temperaments.map((e, i) => (
                <button
                  key={i}
                  className={s.erase_temp}
                  value={e}
                  onClick={(e) => handleEraseTemp(e)}
                >
                  {e}
                  <svg viewBox="0 -960 960 960">
                    <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <button
            className={
              isLoading
                ? `${s.create} ${s.loading}`
                : success
                ? `${s.create} ${s.successfull}`
                : s.create
            }
            type="submit"
          >
            {isLoading ? "Loading..." : success ? "Dog Created" : type}
          </button>
          {isError && (
            <span className={s.error} style={{ textAlign: "center" }}>
              Something went wrong :c
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
