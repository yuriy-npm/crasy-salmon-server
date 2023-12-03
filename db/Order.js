
const { DataTypes } = require("sequelize");
const { Order_Product } = require("./index");


module.exports = (sequelize) => {
    return sequelize.define('order', {
        id: {
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true,
        },
        orderNumber: {
            type: DataTypes.STRING,
            allowNull:false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull:false,
            defaultValue: new Date(),
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false
        },
        address: {
            type: DataTypes.STRING,
            allowNull:false
        },
        sum: {
            type: DataTypes.STRING,
            allowNull:false
        },     
        payMethod: {
            type: DataTypes.STRING,
            allowNull:false
        },     
        toPhone: {
            type: DataTypes.STRING,
            allowNull:false
        },     
        personCount: {
            type: DataTypes.STRING,
            allowNull:false
        },     
        comment: {
            type: DataTypes.STRING,
            allowNull:true
        },     
    }, {
        timestamps: false,
        tableName: 'order'
    }
        

    )
}
// module.exports = (sequelize) => {
//     return sequelize.define('order', {
//         id: {
//             type: DataTypes.SMALLINT(),
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         orderNumber: {
//             type: DataTypes.STRING,
//             allowNull:false
//         },
//         date: {
//             type: DataTypes.DATEONLY,
//             allowNull:false,
//             defaultValue: new Date(),
//         },
//         productData: {
//             type: DataTypes.ARRAY(DataTypes.JSONB),
//             allowNull:false
//         },
//         address: {
//             type: DataTypes.STRING,
//             allowNull:false
//         },
//         sum: {
//             type: DataTypes.STRING,
//             allowNull:false
//         },
       
//     }, {
//         timestamps: false,
//         tableName: 'order'
//     }
        

//     )
// }

