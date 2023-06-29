import { NextResponse } from "next/server";
import {
  connectToDB,
  Dog,
  Likes,
  Temperament,
  User,
} from "../../../../db/index";
import { getAllDogs } from "@/db/controllers";

const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDB();
    const userInfoDB = await User.findByPk(id);
    const dogCreatedDBInfo = await Dog.findAll({
      where: { UserId: id },
      include: { model: Temperament },
    });

    const DogsCreatedByUser = dogCreatedDBInfo?.map((e) => {
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
      user: userInfoDB,
      created: DogsCreatedByUser,
      liked: userLiked,
    });
  } catch (error) {
    console.log(error);
  }
};

const PUT = async (req, { params }) => {
  const { img, name, email } = await req.json();
  const { id } = params;

  try {
    const userInfoDB = await User.findByPk(id);

    name && (userInfoDB.name = name);
    img && (userInfoDB.image = img);
    email && (userInfoDB.email = email);

    await userInfoDB.save();

    if (!userInfoDB) return new Response("Prompt not found", { status: 404 });
    return NextResponse.json("Done");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GET, PUT };
