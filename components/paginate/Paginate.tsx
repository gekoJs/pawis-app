"use client";
import s from "./Paginate.module.scss";
import { useState } from "react";

export default function Paginate({
  length,
  setPage,
  page,
}: {
  length: any;
  setPage: any;
  page: any;
}) {
  const [minLimit, setMinLimit] = useState(0);
  const [maxlimit, setMaxlimit] = useState(8);
  const pagesLimit = 8;

  const buttonsLength = Math.round(length / pagesLimit);

  const handleNext = () => {
    setPage((prev: any) => prev + 1);
    if (page + 1 > maxlimit) {
      setMinLimit(minLimit + pagesLimit);
      setMaxlimit(maxlimit + pagesLimit);
    }
  };
  const handleNextSec = () => {
    if (buttonsLength > maxlimit) {
      setPage(minLimit + 1 + pagesLimit);
    }
    if (maxlimit < buttonsLength) {
      setMinLimit(minLimit + pagesLimit);
      setMaxlimit(maxlimit + pagesLimit);
    }
  };

  const handlePrev = () => {
    setPage((prev: any) => (prev - 1 < 0 ? prev : prev - 1));
    if (page - 1 < maxlimit) {
      setMinLimit(minLimit - pagesLimit);
      setMaxlimit(maxlimit - pagesLimit);
    }
  };
  const handlePrevSec = () => {
    if (minLimit !== 0) {
      setPage(minLimit - pagesLimit + 1);
      setMinLimit(minLimit - pagesLimit);
      setMaxlimit(maxlimit - pagesLimit);
    }
  };
  return (
    <div className={s.container}>
      {minLimit >= 1 && (
        <button className={s.actionButtons} onClick={handlePrevSec}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36"
            viewBox="0 -960 960 960"
            width="36"
          >
            <path d="M453-241 213-481l240-240 42 42-198 198 198 198-42 42Zm253 0L466-481l240-240 42 42-198 198 198 198-42 42Z" />
          </svg>
        </button>
      )}
      {page !== 1 && (
        <button className={s.actionButtons} onClick={handlePrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22"
            viewBox="0 -960 960 960"
            width="22"
          >
            <path d="M400-80 0-480l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </button>
      )}
      {Array.from({ length: buttonsLength }, (e, i) => {
        if (i < maxlimit && i + 1 > minLimit) {
          return (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={
                page === i + 1 ? `${s.active} ${s.pageNumber}` : s.pageNumber
              }
            >
              <p>{i + 1}</p>
            </button>
          );
        }
      })}
      {page !== buttonsLength && (
        <button className={s.actionButtons} onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22"
            viewBox="0 -960 960 960"
            width="22"
          >
            <path d="m304-82-56-57 343-343-343-343 56-57 400 400L304-82Z" />
          </svg>
        </button>
      )}
      {buttonsLength > maxlimit && (
        <button className={s.actionButtons} onClick={handleNextSec}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36"
            viewBox="0 -960 960 960"
            width="36"
          >
            <path d="m255-241-42-42 198-198-198-198 42-42 240 240-240 240Zm253 0-42-42 198-198-198-198 42-42 240 240-240 240Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
