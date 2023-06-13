const { getAllDogs } = require("../controllers/getAllDogs");

const getDogsByQuery = async ({ tmp, ord, orig, wght }) => {
  try {
    const data = await getAllDogs();
    let final_data = data;
    let filtered = false;

    if (tmp[0] !== "null" && !!tmp.length) {
      final_data = final_data.filter((e) =>
        e.Temperaments?.some((e) => tmp.includes(e))
      );
      filtered = true;
    }

    if (orig[0] !== "null" && !!orig.length) {
      final_data =
        orig[0] === "DataBase"
          ? final_data.filter((e) => e.createdInDB)
          : final_data.filter((e) => !e.createdInDB);
      filtered = true;
    }

    if (ord[0] !== "null" && !!ord.length) {
      final_data =
        ord[0] === "A-Z"
          ? final_data.sort((a, b) => a.breed.localeCompare(b.breed))
          : final_data.sort((a, b) => b.breed.localeCompare(a.breed));
      filtered = true;
    }
    if (wght[0] !== "null" && !!wght.length) {
      final_data =
        wght[0] === "Light-Heavy"
          ? final_data.sort(
              (a, b) =>
                a.weight_min +
                a.weight_max / 2 -
                (b.weight_min + b.weight_max / 2)
            )
          : final_data.sort(
              (a, b) =>
                b.weight_min +
                b.weight_max / 2 -
                (a.weight_min + a.weight_max / 2)
            );
      filtered = true;
    }

    console.log(final_data.length);

    return filtered ? final_data : [];
  } catch (error) {
    return { message: error.message };
  }
};
module.exports = { getDogsByQuery };
