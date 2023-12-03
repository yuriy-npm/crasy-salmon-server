const { Favourite, Product } = require("../db/index");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {

  const token = req.headers.authorization || "";
  let userId = null;

  if (!token) {
    return res.status(401).json({ message: "Користувач не авторізован!" });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  userId = decoded.data;

  const favouriteItems = await Favourite.findAll({
    raw: true,
    where: { userId },
    attributes: ["productId","product.title","product.descr", "product.imageUrl", "product.price", "product.id"],
    include: [
      {
        model: Product,
        attributes: [],
      },
    ],
  });

  return res.json(favouriteItems);
};

const addItem = async (req, res) => {
  const { productId, userId } = req.body;
  await Favourite.create({
    userId,
    productId,
  });

  const favouriteItem = await Favourite.findOne({
    raw: true,
    where: { userId, productId },
    attributes: ["product.id","product.title", "product.imageUrl", "product.price"],
    include: [
      {
        model: Product,
        attributes: [],
      },
    ],
  });

  return res.json(favouriteItem);
};

const deleteItem = async (req, res) => {

  const { productId, userId } = req.query;

  const removedItem = await Favourite.destroy({
    where: {
      userId,
      productId,
    },
  });

  if (!removedItem) {
    return res
      .status(400)
      .json({ message: "Помилка! Не вдалось видалити продукт!!" });
  }

  return res.json({productId}); 
};

module.exports = {
  getAll,
  addItem,
  deleteItem,
};
