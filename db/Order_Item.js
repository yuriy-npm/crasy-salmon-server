
const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    return sequelize.define('order_item', {
        id: {
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true,
        },
        price: {
            type: DataTypes.SMALLINT(),
            allowNull:false,
        },
        amount: {
            type: DataTypes.SMALLINT(),
            allowNull:false,
        },
    }, {
        timestamps: false,
        tableName: 'order_item'
    }
        

    )
}


