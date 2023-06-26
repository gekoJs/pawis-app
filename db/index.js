require("dotenv").config();
const pg = require("pg");
const { Sequelize } = require("sequelize");
const {
  DogModel,
  TemperamentModel,
  DogTemperamentModel,
  UserModel,
  LikesModel,
} = require("./models/index");

//-----------------------------------------------------------

const dataBase = new Sequelize(
  // 'postgres://gekoJs:X87ZWPRIJUwx@ep-dawn-term-820368.us-east-2.aws.neon.tech/neondb?sslmode=require',
  `postgres://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_HOST}?sslmode=require`,
  {
    logging: false, //para que no molesten los mensajes en el console.log
    dialectModule: pg,
  }
);

DogModel(dataBase);
TemperamentModel(dataBase);
DogTemperamentModel(dataBase);
UserModel(dataBase);
LikesModel(dataBase);

const { Dog, Temperament, DogTemperament, User } = dataBase.models;

Dog.belongsToMany(Temperament, { through: DogTemperament });
Temperament.belongsToMany(Dog, { through: DogTemperament });

User.hasMany(Dog);
Dog.belongsTo(User);

// User.belongsToMany(Dog, { through: Likes });
// Dog.belongsToMany(User, { through: Likes });

var isConnected = false;

const connectToDB = async () => {
  if (isConnected) {
    console.log("DB is already connected");
    return;
  }
  try {
    await dataBase.sync({ force: false });
    isConnected = true;
    console.log("DB connected");
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = { connectToDB, ...dataBase.models };
