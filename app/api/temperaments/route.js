const { connectToDB, Temperament } = require("../../../db/index");
const { NextResponse } = require("next/server");
const axios = require("axios");

const GET = async () => {
  await connectToDB();

  try {
    const dataApi = await axios
      .get("https://api.thedogapi.com/v1/breeds")
      .then((data) =>
        data.data.map((dog) => ({
          Temperaments: dog.temperament?.split(",").map((e) => e.trim()),
        }))
      )
      .catch((err) => console.log(err.message));

    const apiTemperaments = [
      ...new Set(dataApi.flatMap((obj) => obj.Temperaments)),
    ].filter(Boolean)

    const dataDB = await Promise.all(
      apiTemperaments?.map(async (temp) => {
        const [temperament, created] = await Temperament.findOrCreate({
          where: { temperament: temp },
        });
        return temperament;
      })
    ).catch((err) => console.log(err));

    const dataMixed = [
      ...(apiTemperaments || []),
      ...(dataDB?.flatMap((obj) => obj.temperament) || []),
    ];

    const dataFinal = [...new Set(dataMixed)].filter(Boolean);

    return NextResponse.json(dataFinal, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

module.exports = { GET };
