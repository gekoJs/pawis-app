const axios = require("axios");
const { Dog, Temperament, User } = require("../../db/index");

const getAllDogs = async (query) => {
  try {
    const dbData = await Dog.findAll({
      // include: { all: true },
      include: [{ model: Temperament }, { model: User }],
    }).catch((err) => console.log(err.message));
    const dbInfo = dbData?.map((e) => {
      return {
        ...e.dataValues,
        Temperaments: e.dataValues.Temperaments.map((e) => e.temperament),
      };
    });

    const apiData = await axios
      .get("https://api.thedogapi.com/v1/breeds")
      .catch((err) => console.log(err.message));
    const apiInfo = apiData?.data.map((e) => {
      return {
        id: e.id,
        breed: e.name,
        image: e.image?.url,
        height_min: e.height?.metric.split("-").map((e) => parseInt(e))[0],
        height_max: e.height?.metric.split("-").map((e) => parseInt(e))[1],
        weight_min: e.weight?.metric.split("-").map((e) => parseInt(e))[0],
        weight_max: e.weight?.metric.split("-").map((e) => parseInt(e))[1],
        lifeTime_min: e.life_span?.match(/\d+/g).map(Number)[0],
        lifeTime_max: e.life_span?.match(/\d+/g).map(Number)[1],
        Temperaments: e.temperament?.split(",").map((e) => e.trim()),
        createdInDB: false,
      };
    });

    const data =
      !!!dbData && !!apiData
        ? [...apiInfo]
        : !!dbData && !!!apiData
        ? [...dbInfo]
        : [...dbInfo, ...apiInfo];

    if (query) {
      const regex = new RegExp(query, "i");
      return data.filter((e) => regex.test(e.breed));
    }

    if (!!!dbData && !!!apiData) throw Error("Couldn't get any data");

    return data;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = { getAllDogs };
