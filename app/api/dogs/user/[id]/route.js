import { NextResponse } from "next/server";
import { connectToDB, Dog } from "../../../../../db/index";

const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    const dogs = await Dog.findAll({ where: { UserId: id } });

    return NextResponse.json(dogs);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GET };
