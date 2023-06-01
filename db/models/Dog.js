const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define(
    "Dog",
    {
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://media.ambito.com/p/6b8ffa22f75de744016825151b17fe43/adjuntos/239/imagenes/038/976/0038976249/dogejpg.jpg",
        allowNull: false,
      },
      height_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lifeTime_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lifeTime_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdInDB: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
