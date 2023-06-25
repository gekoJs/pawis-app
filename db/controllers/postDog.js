const { Dog, Temperament, User } = require("../index");

const postDog = async (
  breed,
  image,
  height_min,
  height_max,
  weight_min,
  weight_max,
  lifeTime_min,
  lifeTime_max,
  temperament,
  userId
) => {
  if (!!!image.length) {
    image =
      "https://media.ambito.com/p/6b8ffa22f75de744016825151b17fe43/adjuntos/239/imagenes/038/976/0038976249/dogejpg.jpg";
  }
  const [newDog, createdDog] = await Dog.findOrCreate({
    where: {
      breed,
    },
    defaults: {
      image,
      height_min,
      height_max,
      weight_min,
      weight_max,
      lifeTime_min,
      lifeTime_max,
    },
  });
  
  const dogTemperaments = await Promise.all(
    temperament?.map(async (temp) => {
      const [temperament, created] = await Temperament.findOrCreate({
        where: { temperament: temp },
      });
      return temperament;
    })
  );

  const user = await User.findOne({
    where: {
      email: userId,
    },
  });

  await user.addDog(newDog) 
  await newDog.addTemperaments(dogTemperaments);

  return { newDog, createdDog };
};

module.exports = { postDog };
