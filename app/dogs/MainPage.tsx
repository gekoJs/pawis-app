"use client";
import { useSelector } from "react-redux";
import { StateRedux } from "@/utils/types/types";
import { useState, useEffect } from "react";
import { Nav, Filters, AllCards, Paginate } from "../../components/index";
import { useQuery } from "@tanstack/react-query";
import { DOGS } from "@/helpers/react_query/ks";
import axios from "axios";

//-------------------------------------------------------------------------

export default function MainPage() {
  //states-----------------------------------
  const [allData, setAllData] = useState<any>();
  const [finalData, setFinalData] = useState<any>();
  const [searchedData, setSearchedData] = useState<any>();
  const [searchedDataFinal, setSearchedDataFinal] = useState<any>();
  const filteredDogs: any = useSelector<StateRedux>(
    (state) => state.dataDogs.filtered_dogs
  );
  const [found, setFound] = useState(true);
  const [page, setPage] = useState(1);
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(8);
  //states-----------------------------------

  //first data seeing fetch------------------
  const {
    data: dataDogs,
    isLoading: dogsLoading,
    isSuccess,
  } = useQuery({
    queryKey: [DOGS],
    queryFn: async () => await axios.get(`api/dogs`),
  });
  //first data seeing fetch------------------

  //data to show ----------------------------
  useEffect(() => {
    if (!!filteredDogs?.data?.length) {
      setAllData(filteredDogs);
    } else {
      setAllData(dataDogs?.data);
    }
  }, [isSuccess, filteredDogs]);
  //data to show ----------------------------

  //for paginate-----------------------------
  const dogsPerPage = 8;
  const startIndex = (page - 1) * dogsPerPage;
  const endIndex = page * dogsPerPage;
  useEffect(() => {
    setFinalData(allData?.data.slice(startIndex, endIndex));
  }, [allData, page]);

  useEffect(() => {
    setSearchedDataFinal(searchedData?.data.slice(startIndex, endIndex));
  }, [searchedData, page]);

  useEffect(() => {
    setPage(1);
    setMinLimit(0);
    setMaxLimit(8);
  }, [searchedData, filteredDogs]);
  //for paginate-----------------------------

  return (
    <div>
      <Nav
        data={allData}
        loading={dogsLoading}
        setSearchedData={setSearchedData}
        setFound={setFound}
      />
      <Filters />
      {found ? (
        <>
          <AllCards
            dogs={!!searchedData?.data?.length ? searchedDataFinal : finalData}
            loading={dogsLoading}
          />
          <Paginate
            length={
              !!searchedData?.data?.length
                ? searchedData.length
                : allData?.length
            }
            page={page}
            setPage={setPage}
            minLimit={minLimit}
            maxLimit={maxLimit}
            setMinLimit={setMinLimit}
            setMaxLimit={setMaxLimit}
          />
        </>
      ) : (
        <div>The dog you are trying to reach is not here</div>
      )}
    </div>
  );
}
