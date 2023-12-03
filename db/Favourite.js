
const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    return sequelize.define('favourite', {
        id: {
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true
        },  
    }, {
        timestamps: false,
        tableName: 'favourite'
    }
        

    )
}

