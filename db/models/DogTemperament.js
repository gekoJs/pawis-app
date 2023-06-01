const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define(
    "DogTemperament",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
};
