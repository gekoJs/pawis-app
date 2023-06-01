const { connectToDB } = require("../../../db/index");
const { NextResponse } = require("next/server");
const { postDog } = require("../../../db/controllers/index");
const { getData } = require("../../../helpers/api_helpers/getAllData");

const GET = async (req) => {

  const url = new URL(req.url);
  const query = url.searchParams.get("query");

  await connectToDB();

  try {
    const allData = await getData(query);

    return NextResponse.json(allData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

const POST = async (req, res) => {
  const {
    breed,
    image,
    height_min,
    height_max,
    weight_min,
    weight_max,
    lifeTime_min,
    lifeTime_max,
    temperament,
  } = await req.json();

  await connectToDB();

  try {
    if (
      !breed ||
      !height_min ||
      !height_max ||
      !weight_min ||
      !weight_max ||
      !lifeTime_min ||
      !lifeTime_max ||
      !temperament
    )
      throw Error("Missing info");
    else {
      const newDog = await postDog(
        breed,
        image,
        height_min,
        height_max,
        weight_min,
        weight_max,
        lifeTime_min,
        lifeTime_max,
        temperament
      );
      return NextResponse.json(newDog, {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
};

module.exports = { GET, POST };
