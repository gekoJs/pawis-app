const { connectToDB, Dog, Temperament } = require("../../../../db/index");
const { NextResponse } = require("next/server");
const { getAllDogs } = require("../../../../db/controllers/index");

const GET = async (req, { params }) => {
  await connectToDB();
  const { id } = params;
  try {
    const allData = await getAllDogs();

    const dog = allData.filter((e) => e.id.toString() === id.toString());

    return NextResponse.json(dog[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

const PUT = async (req, { params }) => {
  await connectToDB();

  let {
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

  const { id } = params;

  if (!!!image.length) {
    image =
      "https://media.ambito.com/p/6b8ffa22f75de744016825151b17fe43/adjuntos/239/imagenes/038/976/0038976249/dogejpg.jpg";
  }

  try {
    const dog = await Dog.findByPk(id);
    if (!dog) throw Error("The dog you're trying to update it doesnt exist");

    dog.update({
      breed,
      image,
      height_min,
      height_max,
      weight_min,
      weight_max,
      lifeTime_min,
      lifeTime_max,
    });

    const newTemperaments = await Promise.all(
      temperament.map(async (temp) => {
        const newTemperament = await Temperament.findOne({
          where: { temperament: temp },
        });
        return newTemperament;
      })
    );

    await dog.setTemperaments(newTemperaments);

    return NextResponse.json(dog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    const dogToDelete = await Dog.findByPk(id);
    if (dogToDelete) {
      dogToDelete.destroy();
    } else {
      throw Error("Couldnt find any dog");
    }
    return NextResponse.json("done", { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
module.exports = { GET, PUT, DELETE };
