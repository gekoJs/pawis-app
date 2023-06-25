import { NextResponse } from "next/server";
import { connectToDB, Likes, Dog, User } from "../../../../db/index";

const GET = async () => {
  try {
    await connectToDB();

    const likes = await Likes.findAll({});

    return NextResponse.json(likes);
  } catch (error) {
    console.log(error);
  }
};

const POST = async (req, res) => {
  const { id_dog, id_user } = await req.json();
  try {
    await connectToDB();

    const liked = await Likes.findOne({
      where: {
        UserId: id_user,
        DogId: id_dog.toString(),
      },
    });

    if (liked) {
      await liked.destroy();
    } else {
      await Likes.create({
        UserId: id_user,
        DogId: id_dog.toString(),
      });
    }

    return NextResponse.json("done");
  } catch (error) {
    console.log(error);
  }
};

const DELETE = async (req, { params }) => {
  const { dog_id } = params;

  try {
    await connectToDB();

    const dogs = await Dog.findAll({ where: { UserId: id } });

    return NextResponse.json(dogs);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GET, POST, DELETE };
