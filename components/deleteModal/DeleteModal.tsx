import { useMutation } from "@tanstack/react-query";
import s from "./DeleteModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { DOGS, USER } from "@/helpers/react_query/ks";

interface type_dogToDelete {
  id: string;
  breed: string;
  open: boolean;
  success: boolean;
}

interface type_deleteModal {
  DogToDelete: type_dogToDelete;
  setDogToDelete: Dispatch<
    SetStateAction<{
      id: string;
      breed: string;
      open: boolean;
      success: boolean;
    }>
  >;
}

export default function DeleteModal({
  DogToDelete,
  setDogToDelete,
}: type_deleteModal) {
  //------------------------------------
  const queryClient = useQueryClient();
  const dogMutate = useMutation({
    mutationFn: async () => await axios.delete(`/api/dogs/${DogToDelete.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries([USER]);
      queryClient.invalidateQueries([DOGS]);
      setDogToDelete((prev) => {
        return {
          ...prev,
          success: true,
        };
      });
      setTimeout(() => {
        setDogToDelete((prev) => {
          return {
            ...prev,
            open: false,
            success: false,
          };
        });
      }, 2000);
    },
  });

  //------------------------------------
  const handleYes = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (DogToDelete.id) {
      dogMutate.mutate();
    }
  };
  const handleNo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (DogToDelete.id) {
      setDogToDelete((prev) => {
        return {
          ...prev,
          open: false,
        };
      });
    }
  };
  return (
    <div
      className={s.container}
      style={{
        opacity: DogToDelete.open ? 1 : 0,
        pointerEvents: DogToDelete.open ? "all" : "none",
      }}
    >
      <div className={s.w_content}>
        <h4 className={s.init_text}>
          Are you sure you want to Delete this breed?
        </h4>
        <h4 className={s.dog_to_delete}>{DogToDelete.breed}</h4>

        <div className={s.w_btns}>
          {dogMutate.isLoading ? (
          <div className={s.lds_ellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          ) : DogToDelete.success ? (
            <p>dog deleted succedfully</p>
          ) : (
            <>
              <button className={s.btn} onClick={(e) => handleYes(e)}>
                yes
              </button>
              <button
                className={`${s.btn} ${s.btn_no}`}
                onClick={(e) => handleNo(e)}
              >
                no
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
