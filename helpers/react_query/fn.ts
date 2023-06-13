import axios from "axios";

interface type_props {
  Temperament?: (string | undefined)[];
  Order?: (string | undefined)[];
  Origin?: (string | undefined)[];
  Weight?: (string | undefined)[];
}

export async function getDogsByQuery({
  toFilter,
  page,
}: {
  toFilter: type_props;
  page: number;
}) {
  const { Temperament, Order, Origin, Weight } = toFilter;

  let temperament_str = null;
  if ((Temperament || []).length > 1)
    temperament_str = Temperament?.join("&tmp=");
  else temperament_str = !!Temperament?.length ? Temperament?.toString() : null;

  let order_str = !!(Order || []).length ? Order?.toString() : null;

  let origin_str = !!(Origin || []).length ? Origin?.toString() : null;

  let weight_str = !!(Weight || []).length ? Weight?.toString() : null;
  console.log("page", page);
  const filterDogs = await axios
    .get(
      `/api/dogs/filter?tmp=${temperament_str}&ord=${order_str}&orig=${origin_str}&wght=${weight_str}&page=${page}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return filterDogs;
}
