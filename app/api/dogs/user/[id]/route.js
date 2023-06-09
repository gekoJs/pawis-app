import { NextResponse } from "next/server";
import { connectToDB, Dog, Likes, Temperament } from "../../../../../db/index";
import { getAllDogs } from "@/db/controllers";

const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    const userCreatedDBInfo = await Dog.findAll({
      where: { UserId: id },
      include: { model: Temperament },
    });

    const DogsCreatedByUser = userCreatedDBInfo?.map((e) => {
      return {
        ...e.dataValues,
        Temperaments: e.dataValues.Temperaments.map((e) => e.temperament),
      };
    });

    const userLikesDBInfo = await Likes.findAll({ where: { UserId: id } });

    const allDogs = await getAllDogs();

    const userLikesFiltered = userLikesDBInfo.map((userLike) =>
      allDogs.filter((dog) => dog.id.toString() === userLike.DogId.toString())
    );

    const userLiked = userLikesFiltered.reduce(
      (acc, val) => acc.concat(val),
      []
    );

    return NextResponse.json({
      created: DogsCreatedByUser,
      liked: userLiked,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GET };
