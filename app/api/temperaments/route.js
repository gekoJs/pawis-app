const { connectToDB, Temperament } = require("../../../db/index");
const { NextResponse } = require("next/server");
const { getAllDogs } = require("../../../db/controllers/index");

const GET = async () => {
  await connectToDB();

  try {
    const allData = await getAllDogs();

    const allTemp = allData
      ?.map((e) => e.Temperaments)
      .join()
      .split(",");

    await Promise.all(
      allTemp?.map(async (temp) => {
        const [temperament, created] = await Temperament.findOrCreate({
          where: { temperament: temp },
        });
        return temperament;
      })
    );

    const data = await Temperament.findAll({});

    if (!!!allData || !!!data) throw Error("Couldnt get Temperaments");

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

module.exports = { GET };
