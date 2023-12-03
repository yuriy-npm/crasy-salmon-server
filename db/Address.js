const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "address",
    {
      id: {
        type: DataTypes.SMALLINT(),
        primaryKey: true,
        autoIncrement: true,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      house: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "address",
    }
  );
};
