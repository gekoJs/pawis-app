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
  `postgres://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_HOST}/pawis`,
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

const { Dog, Temperament, DogTemperament, User, Likes } = dataBase.models;

Dog.belongsToMany(Temperament, { through: DogTemperament });
Temperament.belongsToMany(Dog, { through: DogTemperament });

User.hasMany(Dog);
Dog.belongsTo(User); 

Dog.belongsToMany(User, {through: Likes})
User.belongsToMany(Dog, {through: Likes})

var isConnected = false;

const connectToDB = async () => {
  if (isConnected) {
    console.log("DB is already connected");
    return;
  }
  try {
    await dataBase.sync({ alter: true });
    isConnected = true;
    console.log("DB connected");
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = { connectToDB, ...dataBase.models };
