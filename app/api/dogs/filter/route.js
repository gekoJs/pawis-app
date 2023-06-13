const { getDogsByQuery } = require("../../../../db/controllers/index");

const { NextResponse } = require("next/server");

const GET = async (req) => {
  const url = new URL(req.url);
  const ord = url.searchParams.getAll("ord");
  const tmp = url.searchParams.getAll("tmp");
  const orig = url.searchParams.getAll("orig");
  const wght = url.searchParams.getAll("wght");
  const page = url.searchParams.get("page");
  try {
    const allData = await getDogsByQuery({ tmp, ord, orig, wght });

    let final_data = allData;
    if (!!page) {
      const dogsPerPage = 8;
      const startIndex = (page - 1) * dogsPerPage;
      const endIndex = page * dogsPerPage;

      final_data = allData.slice(startIndex, endIndex);
    }

    return NextResponse.json(
      { length: allData.length, data: final_data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

module.exports = { GET };
