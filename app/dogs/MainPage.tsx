"use client";
import { Loader } from "@/components";
import { useSelector } from "react-redux";
import { StateRedux } from "@/utils/types/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loader_active_fn } from "@/redux/displayTrigger";
import { Nav, Filters } from "../../components/index";


export default function MainPage() {
  const dispatch = useDispatch();
  
  const isLoading = useSelector(
    (state: StateRedux) => state.display.display_loader
  );

  useEffect(() => {
    dispatch(loader_active_fn(false));
  }, []);

  return (
    <div>
      <Nav />
      <Filters />
    </div>
  );
}
