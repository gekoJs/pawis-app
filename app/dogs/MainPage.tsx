"use client";
import { useSelector } from "react-redux";
import { StateRedux } from "@/utils/types/types";
import { useState, useEffect } from "react";
import { Nav, Filters, AllCards, Paginate } from "../../components/index";
import { useQuery } from "@tanstack/react-query";
import { DOGS, FILTERED_DOGS } from "@/helpers/react_query/ks";
import { getDogsByQuery } from "../../helpers/react_query/fn";
import axios from "axios";

//-------------------------------------------------------------------------

interface type_toFilter {
  Temperament?: (string | undefined)[];
  Origin?: (string | undefined)[];
  Order?: (string | undefined)[];
  Weight?: (string | undefined)[];
}

export default function MainPage() {
  //states-----------------------------------
  const [allData, setAllData] = useState<any>();
  const [finalData, setFinalData] = useState<any>();
  const [searchedData, setSearchedData] = useState<any>();
  const [searchedDataFinal, setSearchedDataFinal] = useState<any>();
  const [toFilter, setToFilter] = useState<type_toFilter>({});

  const [found, setFound] = useState(true);
  const [page, setPage] = useState(1);
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(8);

  const [clickOnBtnSearch, setClickOnBtnSearch] = useState(false);
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

  const {
    data: dataFiltered,
    isLoading: loadingFiltered,
    refetch: refetchFiltered,
    isFetching: isFetchingFiltered,
  } = useQuery({
    queryKey: [FILTERED_DOGS],
    queryFn: async () => {
      console.log("toFilter", toFilter);
      return await getDogsByQuery({ toFilter });
    },
    enabled: false,
  });
  //first data seeing fetch------------------

  useEffect(() => {
    if (clickOnBtnSearch) {
      refetchFiltered();
      console.log("test");
    }
  }, [Object.keys(toFilter).length === 0]);

  //data to show ----------------------------
  useEffect(() => {
    if (!!dataFiltered?.data?.length) {
      setAllData(dataFiltered);
    } else {
      setAllData(dataDogs?.data);
      setClickOnBtnSearch(false);
    }
  }, [isSuccess, dataFiltered]);
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
  }, [searchedData, dataFiltered]);
  //for paginate-----------------------------

  return (
    <div>
      <Nav
        data={allData}
        loading={dogsLoading}
        setSearchedData={setSearchedData}
        setFound={setFound}
      />
      <Filters
        dataFiltered={dataFiltered}
        loadingFiltered={loadingFiltered}
        refetchFiltered={refetchFiltered}
        isFetchingFiltered={isFetchingFiltered}
        toFilter={toFilter}
        setToFilter={setToFilter}
        clickOnBtnSearch={clickOnBtnSearch}
        setClickOnBtnSearch={setClickOnBtnSearch}
      />
      {found ? (
        <>
          <AllCards
            dogs={!!searchedData?.data?.length ? searchedDataFinal : finalData}
            loading={dogsLoading || isFetchingFiltered}
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
