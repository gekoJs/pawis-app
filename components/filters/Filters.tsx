"use client";
import style from "./Filter.module.scss";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TEMPERAMENTS } from "../../helpers/react_query/ks";

/*---------------------------------------------------------------*/

interface type_temp {
  id: number;
  temperament: string;
}
interface type_content {
  id: number;
  title: string;
  options?: string[];
  svg: string;
}
interface type_stateToggleTitle {
  title_index: number;
  is_open: boolean;
}
interface type_toFilter {
  Temperament?: (string | undefined)[];
  Origin?: (string | undefined)[];
  Order?: (string | undefined)[];
  Weight?: (string | undefined)[];
}

/*---------------------------------------------------------------*/

export default function Filters({
  refetchFiltered,
  isFetchingFiltered,
  toFilter,
  setToFilter,
  clickOnBtnSearch,
  setClickOnBtnSearch,
}: any) {
  const [allContent, setAllContent] = useState<type_content[]>([
    {
      id: 0,
      title: "Temperament",
      options: [],
      svg: "fire.svg"
    },
    {
      id: 1,
      title: "Origin",
      options: ["DataBase", "API"],
      svg: "stork.svg"
    },
    {
      id: 2,
      title: "Order",
      options: ["A-Z", "Z-A"],
      svg: "abc.svg"
    },
    {
      id: 3,
      title: "Weight",
      options: ["Light-Heavy", "Heavy-Light"],
      svg: "weight_scale.svg"
    },
  ]);
  const [toggleTitle, setToggleTitle] = useState<type_stateToggleTitle>({
    title_index: 0,
    is_open: false,
  });
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [optionsSearched, setOptionsSearched] = useState<
    (string | undefined)[]
  >([]);

  const {
    isError: tempIsError,
    isLoading: tempLoading,
    data: tempData,
  } = useQuery({
    queryKey: [TEMPERAMENTS],
    queryFn: async () => await axios.get("api/temperaments"),
  });

  useEffect(() => {
    setAllContent((prev) => {
      const newContent = [...prev];
      newContent[0].options = tempData?.data.map((e: type_temp) => e);
      return newContent;
    });
  }, [tempData]);

  const handleAddToFilter = (title: keyof type_toFilter, value: string) => {
    if (toFilter[title]?.includes(value)) {
      handleRemoveToFilter(title, value);
      return;
    }
    setToFilter((prev: any) => ({
      ...prev,
      [title]:
        title === "Temperament"
          ? [...(prev?.Temperament || []), value]
          : [value],
    }));
  };

  const handleRemoveToFilter = (title: keyof type_toFilter, value: string) => {
    setToFilter((prev: any) => ({
      ...prev,
      [title]:
        title === "Temperament"
          ? (prev?.Temperament || []).filter((e: any) => e !== value)
          : [],
    }));
  };

  const handleChangeSeacrh = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputSearchValue(value);
    const filtered = allContent[0].options?.filter((e) =>
      e.toLowerCase().includes(value)
    );
    const data = !!filtered?.length ? filtered : [];
    setOptionsSearched(data);
  };

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return (
    <div className={style.container}>
      {/* //TITLE ----------------------------------- */}
      <div className={style.titles_wrapper}>
        {allContent?.map((e, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === toggleTitle?.title_index)
                setToggleTitle((prev) => ({
                  ...prev,
                  is_open: !prev.is_open,
                }));
              if (i !== toggleTitle.title_index)
                setToggleTitle((prev) => ({
                  ...prev,
                  is_open: true,
                }));
              setToggleTitle((prev) => ({
                ...prev,
                title_index: i,
              }));
            }}
            className={
              toggleTitle.title_index === i && toggleTitle.is_open
                ? `${style.title} ${style.active} ${style.active_open}`
                : toggleTitle.title_index === i
                ? `${style.title} ${style.active}`
                : `${style.title} ${style.hover}`
            }
          >
            {width < 650 ? (
              <>
                <img
                  src={`./assets/icons/${e.svg}`}
                  className={style.title_resp}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  viewBox="0 -960 960 960"
                >
                  <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
                </svg>
              </>
            ) : (
              <>
                <h3>{e.title}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  viewBox="0 -960 960 960"
                  width="28"
                >
                  <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
                </svg>
              </>
            )}
          </button>
        ))}
      </div>
      {/* //TITLE ----------------------------------- */}

      {/* BUTTONS ----------------------------------- */}
      <div
        className={
          !toggleTitle.is_open
            ? `${style.content_wrapper} ${style.content_wrapper_open}`
            : style.content_wrapper
        }
        style={{
          padding: toggleTitle.is_open ? "1em" : 0,
        }}
      >
        {/*SEARCH INPUT TEMPERAMENT-------------------*/}
        {toggleTitle.title_index === 0 && (
          <>
            {tempLoading ? (
              <div>Loading...</div>
            ) : tempIsError ? (
              <div>error</div>
            ) : (
              <form className={style.form} onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="What Temperament are you looking for?"
                  value={inputSearchValue}
                  onChange={(e) => handleChangeSeacrh(e)}
                />
              </form>
            )}
          </>
        )}
        {/*SEARCH INPUT TEMPERAMENT-------------------*/}

        <div className={style.buttons_wrapper}>
          <Button
            data={
              !!optionsSearched.length &&
              allContent[toggleTitle.title_index]?.id === 0
                ? optionsSearched
                : toggleTitle.title_index ===
                    allContent[toggleTitle.title_index]?.id &&
                  (allContent[toggleTitle.title_index]?.options || [])
            }
            title={allContent[toggleTitle.title_index]?.title}
            handleAddToFilter={handleAddToFilter}
            toFilter={toFilter}
          />
        </div>
      </div>
      {/* BUTTONS ----------------------------------- */}

      {/* FILTERS SELECTED -------------------------- */}
      {Object.keys(toFilter)
        ?.map((title) => !!toFilter[title as keyof type_toFilter]?.length)
        .some((e) => e !== false) && (
        <>
          <div className={style.dogsToFilter}>
            {Object.keys(toFilter)?.map((title) =>
              toFilter[title as keyof type_toFilter]?.map(
                (option: any, i: any) => (
                  <button
                    onClick={() =>
                      handleRemoveToFilter(
                        title as keyof type_toFilter,
                        option as string
                      )
                    }
                    key={i}
                  >
                    {option}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48"
                      viewBox="0 -960 960 960"
                    >
                      <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                    </svg>
                  </button>
                )
              )
            )}
          </div>
          <button
            className={style.search}
            onClick={() => (
              refetchFiltered(),
              setClickOnBtnSearch((prev: any) => (!!prev ? true : !prev))
            )}
          >
            {isFetchingFiltered ? "Loading..." : "Search"}
          </button>
        </>
      )}
      {clickOnBtnSearch && (
        <button className={style.resetFilters} onClick={() => setToFilter({})}>
          Reset Filters
        </button>
      )}
      {/* FILTERS SELECTED -------------------------- */}
    </div>
  );
}

export function Button({
  data,
  handleAddToFilter,
  title,
  toFilter,
}: {
  data: any;
  handleAddToFilter: any;
  title: any;
  toFilter: any;
}) {
  return data?.map((element: any, i: number) => (
    <input
      key={i}
      type={"button"}
      value={element}
      onClick={() => handleAddToFilter(title, element)}
      className={
        toFilter[title]?.includes(element)
          ? `${style.content_button} ${style.button_hover}`
          : style.content_button
      }
    />
  ));
}
