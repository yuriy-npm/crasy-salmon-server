const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.SMALLINT(),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "user",
    }
  );
};
