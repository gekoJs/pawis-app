const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define(
    "Likes",
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
