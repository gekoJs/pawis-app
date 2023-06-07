const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define(
    "Temperament",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      temperament: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
    },
    { timestamps: false }
  );
};
