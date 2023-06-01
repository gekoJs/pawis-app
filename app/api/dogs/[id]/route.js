const { connectToDB } = require("../../../../db/index");
const { NextResponse } = require("next/server");
const { getData } = require("../../../../helpers/api_helpers/getAllData");

const GET = async (req, { params }) => {
  await connectToDB();
  const { id } = params;
  try {
    const allData = await getData();
    
    const dog = allData.filter((e) => e.id === parseInt(id));

    return NextResponse.json(dog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

module.exports = { GET };
