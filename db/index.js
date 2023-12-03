require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

  {
    dialect: "postgres",

    dialectModule: require('pg'),
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

const Product = require("./Product")(sequelize);
const Category = require("./Category")(sequelize);
const User = require("./User")(sequelize);
const Cart = require("./Cart")(sequelize);
const Favourite = require("./Favourite")(sequelize);
const Order = require("./Order")(sequelize);
const Address = require("./Address")(sequelize);
const Order_Item = require("./Order_Item")(sequelize);

Category.hasMany(Product);
Product.belongsTo(Category);

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Favourite);
Favourite.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Favourite);
Favourite.belongsTo(Product);

User.hasMany(Address);
Address.belongsTo(User);
// ------------------------

Order.hasMany(Order_Item);
Order_Item.belongsTo(Order);

Product.hasMany(Order_Item);
Order_Item.belongsTo(Product);

module.exports = {
  sequelize: sequelize,
  Product,
  Category,
  User,
  Cart,
  Favourite,
  Order,
  Address,
  Order_Item,
};
