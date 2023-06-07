const { connectToDB } = require("../../../../db/index");
const { filterByQuery } = require("../../../../helpers/api/axios");

const GET = async (req) => {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  await connectToDB();

  console.log(query)

  try {
    const allData = await filterByQuery(query);

    return NextResponse.json(allData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
