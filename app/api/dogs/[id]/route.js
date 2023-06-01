const { connectToDB } = require("../../../../db/index");
const { NextResponse } = require("next/server");
const { getAllDogs } = require("../../../../db/controllers/index");

const GET = async (req, { params }) => {
  await connectToDB();
  const { id } = params;
  try {
    const allData = await getAllDogs();

    const dog = allData.filter((e) => e.id === parseInt(id));

    return NextResponse.json(dog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

module.exports = { GET };
