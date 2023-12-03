
const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    return sequelize.define('product', {
        id: {
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull:false
        },
        descr: {
            type: DataTypes.STRING(1234),
            allowNull:false
        },
        weight: {
            type: DataTypes.STRING,
            allowNull:false
        },
        calorie: {
            type: DataTypes.STRING,
            allowNull:false
        },
        proteine: {
            type: DataTypes.STRING,
            allowNull:false
        },
        fats: {
            type: DataTypes.STRING,
            allowNull:false
        },
        carbohydrates: {
            type: DataTypes.STRING,
            allowNull:false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        bestseller: {
            type: DataTypes.BOOLEAN,
            defaultValue: "false",
            allowNull:false
        },
    }, {
        timestamps: false,
        tableName: 'product'
    }
        

    )
}

