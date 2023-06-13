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

  const dispatch = useDispatch();

  const filteredDogs: any = useSelector<StateRedux>(
    (state) => state.dataDogs.filtered_dogs
  );

  const {
    data: dataDogs,
    isLoading: dogsLoading,
    isError,
  } = useQuery({
    queryFn: async () => await axios.get(`api/dogs?page=${page}`),
    queryKey: [DOGS, page],
  });

  useEffect(() => {
    if (!!filteredDogs?.data?.length) {
      setFinalData(filteredDogs);
    } else {
      setFinalData(dataDogs?.data);
    }
  }, [dataDogs, filteredDogs]);

  return (
    <div>
      <Nav data={finalData} />
      <Filters page={page} />
      <AllCards dogs={finalData} loading={dogsLoading} />
      <Paginate length={finalData?.length} page={page} setPage={setPage} />
    </div>
  );
}
