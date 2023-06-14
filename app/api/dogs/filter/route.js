const { getDogsByQuery } = require("../../../../db/controllers/index");

const { NextResponse } = require("next/server");

const GET = async (req) => {
  const url = new URL(req.url);
  const ord = url.searchParams.getAll("ord");
  const tmp = url.searchParams.getAll("tmp");
  const orig = url.searchParams.getAll("orig");
  const wght = url.searchParams.getAll("wght");
  try {
    const allData = await getDogsByQuery({ tmp, ord, orig, wght });

    return NextResponse.json(
      { length: allData.length, data: allData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

module.exports = { GET };
