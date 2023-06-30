"use client";
import s from "./Form.module.scss";
import { useEffect } from "react";
import { handleFormErrors } from "@/helpers/handleFormErrors";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TEMPERAMENTS } from "@/helpers/react_query/ks";
import { usePathname } from "next/navigation";
import {
  type_formComponentInput,
  type_formComponentInputError,
} from "@/utils/types/types";
import { SetStateAction, Dispatch } from "react";
import { useSession } from "next-auth/react";
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

interface type_component {
  type: string;
  FormOpen: boolean;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  inpValue: type_formComponentInput;
  setInpValue: Dispatch<SetStateAction<type_formComponentInput>>;
  errors: type_formComponentInputError;
  setErrors: Dispatch<SetStateAction<type_formComponentInputError>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isError: boolean;
  success: boolean;
}

export default function Form({
  type,
  FormOpen,
  setFormOpen,
  inpValue,
  setInpValue,
  handleSubmit,
  errors,
  setErrors,
  isLoading,
  isError,
  success,
}: type_component) {
  const pathname = usePathname();
  const { data: session }: any = useSession();
  const inputs = [
    {
      name: "breed",
      input: [{ type: "text", placeHolder: "Whats the breed's dog" }],
      className: s.input,
    },
    {
      name: "height",
      input: [
        { type: "number", placeHolder: "min" },
        { type: "number", placeHolder: "max" },
      ],
      className: s.inputMinMax,
    },
    {
      name: "weight",
      input: [
        { type: "number", placeHolder: "min" },
        { type: "number", placeHolder: "max" },
      ],
      className: s.inputMinMax,
    },
    {
      name: "life Time",
      input: [
        { type: "number", placeHolder: "min" },
        { type: "number", placeHolder: "max" },
      ],
      className: s.inputMinMax,
    },
    {
      name: "image",
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

  const handleChange = (e: any) => {
    setInpValue((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (Object.values(inpValue).some((e) => !!e.length)) {
      setErrors(handleFormErrors(inpValue));
    }
  }, [inpValue]);

  const handleChangeSelect = (e: any) => {
    if (inpValue.temperament.includes(e.target.value)) return;
    setInpValue((prev: any) => {
      return { ...prev, temperament: [...prev.temperament, e.target.value] };
    });
  };
  const handleEraseTemp = (e: any) => {
    e.preventDefault();
    const filteredTemps = inpValue.temperament.filter(
      (temp) => temp !== e.target.value
    );
    console.log("e.target.value", e.target.value);
    console.log("inpValue.temperament", inpValue.temperament);

    setInpValue((prev: any) => {
      return {
        ...prev,
        temperament: filteredTemps,
      };
    });
  };
  return (
    <div
      className={FormOpen ? `${s.container} ${s.container_open}` : s.container}
    >
      <div
        className={s.close_button}
        onClick={() => {
          setFormOpen(false);
          if (pathname === `/profile/${session?.user?.id}`)
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
        }}
      >
        <svg viewBox="0 -960 960 960">
          <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
        </svg>
      </div>
      <div className={s.wrapper_content}>
        <h1 className={s.h1}>{type} your dog</h1>
        <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
          {inputs.map((e, i) => (
            <div key={i}>
              <label className={s.label}>
                {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
              </label>
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
                              }` as keyof type_formComponentInput)
                            : (e.name as keyof type_formComponentInput)
                        ]
                      }
                      name={
                        e.input.length > 1
                          ? `${e.name.replace(" ", "")}_${inp.placeHolder}`
                          : e.name
                      }
                      onChange={(e) => handleChange(e)}
                      placeholder={isLoading ? "Loading..." : inp.placeHolder}
                      className={`${e.className} ${s.all_input}`}
                    />
                    {errors[
                      e.input.length > 1
                        ? (`${e.name.replace(" ", "")}_${
                            inp.placeHolder
                          }` as keyof type_formComponentInputError)
                        : (e.name as keyof type_formComponentInputError)
                    ] && (
                      <span className={s.error}>
                        {
                          errors[
                            e.input.length > 1
                              ? (`${e.name.replace(" ", "")}_${
                                  inp.placeHolder
                                }` as keyof type_formComponentInputError)
                              : (e.name as keyof type_formComponentInputError)
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
            {errors.temperament && (
              <span className={s.error}>{errors.temperament}</span>
            )}
            <div className={s.wrapper_temperaments_to_search}>
              {inpValue.temperament.map((e, i) => (
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
            {isLoading ? "Loading..." : success ? `Dog ${type}ed` : type}
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
