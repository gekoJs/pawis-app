"use client";
import { useSelector } from "react-redux";
import { StateRedux } from "@/utils/types/types";
import { useState } from "react";
import { Nav, Filters, AllCards, Paginate } from "../../components/index";
import { useQuery } from "@tanstack/react-query";
import { DOGS } from "@/helpers/react_query/ks";
import axios from "axios";

export default function MainPage() {
  const [page, setPage] = useState(1);

  const filteredDogs: any = useSelector<StateRedux>(
    (state) => state.dataDogs.filtered_dogs
  );

  const {
    data,
    isLoading: dogsLoading,
    isError,
  } = useQuery({
    queryFn: async () => await axios.get(`api/dogs?page=${page}`),
    queryKey: [DOGS, page],
  });

  return (
    <div>
      <Nav />
      <Filters />
      <AllCards
        dogs={data?.data || []}
        // dogs={!!filteredDogs?.length ? filteredDogs : data?.data || []}
        loading={dogsLoading}
      />
      <Paginate length={data?.data.length} page={page} setPage={setPage} />
    </div>
  );
}
