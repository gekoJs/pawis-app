const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define(
    "Temperament",
    {
      temperament: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
