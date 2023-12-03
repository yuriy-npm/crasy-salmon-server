
const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    return sequelize.define('category', {
        id: {
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
       
    }, {
        timestamps: false,
        tableName: 'category'
    }
        

    )
}

