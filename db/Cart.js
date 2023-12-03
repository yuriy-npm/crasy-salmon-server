
const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    return sequelize.define('cart', {
        id: {
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true
        },
        productQty: {
            type: DataTypes.SMALLINT,
            allowNull:false
        },
       
    }, {
        timestamps: false,
        tableName: 'cart'
    }
        

    )
}

