const { connectToDB } = require("../../../db/index");
const { NextResponse } = require("next/server");
const { getAllDogs, postDog, getDogsByQuery} = require("../../../db/controllers/index");

const GET = async (req) => {
  const url = new URL(req.url);
  const query = url.searchParams.get("breed");
  const page = url.searchParams.get("page");
  
  // const ord = url.searchParams.getAll("ord");
  // const tmp = url.searchParams.getAll("tmp");
  // const orig = url.searchParams.getAll("orig");
  // const wght = url.searchParams.getAll("wght");
  await connectToDB();
  try {

    const allData = await getAllDogs(query);
    // const allData = await getDogsByQuery({tmp, ord, orig, wght, query})

    let final_data = allData

    if (!!page) {
      const dogsPerPage = 8;
      const startIndex = (page - 1) * dogsPerPage;
      const endIndex = page * dogsPerPage;
      
      final_data = allData.slice(startIndex, endIndex)
    }
    
    return NextResponse.json({length: allData.length, data: final_data}, { status: 200 });
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
