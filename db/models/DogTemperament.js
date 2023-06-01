const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define(
    "DogTemperament",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { timestamps: false }
  );
};
