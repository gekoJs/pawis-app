"use client";
import { useDispatch, useSelector } from "react-redux";
import { StateRedux } from "@/utils/types/types";
import { useState, useEffect } from "react";
import { Nav, Filters, AllCards, Paginate } from "../../components/index";
import { useQuery } from "@tanstack/react-query";
import { DOGS } from "@/helpers/react_query/ks";
import axios from "axios";

export default function MainPage() {
  const [page, setPage] = useState(1);
  const [finalData, setFinalData] = useState<any>();
  const [testData, setTestData] = useState<any>();
  const [searchedData, setSearchedData] = useState<any>();
  const filteredDogs: any = useSelector<StateRedux>(
    (state) => state.dataDogs.filtered_dogs
  );

  const { data: dataDogs, isLoading: dogsLoading } = useQuery({
    queryFn: async () => await axios.get(`api/dogs?page=${page}`),
    queryKey: [DOGS, page],
  });
  const { data: dataAllDogs, isLoading: allDogsLoading } = useQuery({
    queryFn: async () => await axios.get(`api/dogs`),
    queryKey: [DOGS],
  });

  useEffect(() => {
    if (!!searchedData?.data?.length) {
      setFinalData(searchedData);
    } else {
      if (!!filteredDogs?.data?.length) {
        setFinalData(filteredDogs);
        setTestData(filteredDogs);
      } else {
        setFinalData(dataDogs?.data);
        setTestData(dataDogs?.data);
      }
    }
  }, [dataDogs, filteredDogs, searchedData]);

  console.log("dataAllDogs", dataAllDogs);
  return (
    <div>
      <Nav
        data={!!filteredDogs?.data?.length ? testData : dataAllDogs?.data}
        loading={allDogsLoading}
        setSearchedData={setSearchedData}
      />
      <Filters page={page} />
      <AllCards dogs={finalData} loading={dogsLoading} />
      <Paginate length={finalData?.length} page={page} setPage={setPage} />
    </div>
  );
}
