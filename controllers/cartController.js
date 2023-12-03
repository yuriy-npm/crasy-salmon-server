const jwt = require("jsonwebtoken");
const { Cart, Product } = require("../db/index");

const getAll = async (req, res) => {
  
  const token = req.headers.authorization || "";
  let userId = null;

  if (!token) {
    return res.status(401).json({ message: "Користувач не авторізован!" });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  userId = decoded.data;


  const cartItems = await Cart.findAll({
    raw: true,

    where: { userId },
    attributes: [
      "productQty",
      "productId",
      "product.title",
      "product.imageUrl",
      "product.descr",
      "product.price",
    ],

    include: {
      model: Product,
      attributes: [],
    },
  });

  return res.json(cartItems);
};

// ==============================================================

const syncCart = async (req, res) => {
  const token = req.headers.authorization || "";
  let userId = null;

  if (!token) {
    return res.status(401).json({ message: "Користувач не авторізован!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    userId = decoded.data;
  } catch (e) {
    res.status(401).json({ message: "Користувач не авторізован!" });
  }

  let localItems = req.body;

  let cartItems = await Cart.findAll({
    raw: true,
    attributes: ["productQty", "userId", "productId"],
    where: {
      userId,
    },
  });

  // -----------------------------------------------

  if (!localItems?.length) {
    const newCartItems = await Cart.findAll({
      raw: true,
      include: [
        {
          model: Product,
          // as: "product",
          attributes: ["title", "imageUrl", "price"],
        },
      ],
      where: { userId },
    });
    return res.json(newCartItems);
  }

  // ------------------------------------------------

  if (localItems?.length && !cartItems?.length) {
    for (let i = 0; i < localItems.length; i++) {
      localItems[i] = { ...localItems[i], userId };
    }
    await Cart.bulkCreate(localItems);
    const newCartItems = await Cart.findAll({
      raw: true,
      attributes: [
        "productId",
        "productQty",
        "product.title",
        "product.imageUrl",
        "product.price",
      ],
      include: [
        {
          model: Product,
          // as: "product",
          attributes: [],
        },
      ],
      where: { userId },
    });

    return res.json(newCartItems);
  }

  // if (cartItems?.length && localItems?.length) {
  //   for (let i = 0; i < localItems.length; i++) {
  //     if (
  //       !cartItems.find((item) => item.productId === localItems[i].productId)
  //     ) {
  //       cartItems.push(localItems[i]);
  //     }
  //   }
  //   await Cart.destroy({
  //     where: {
  //       userId,
  //     },
  //   });
  //   await Cart.bulkCreate(cartItems);
  //   const newCartItems = await Cart.findAll({
  //     raw: true,
  //     attributes: ["productQty"],
  //     include: [
  //       {
  //         model: Product,
  //         attributes: ["title", "imageUrl", "price", "id"],
  //       },
  //     ],
  //     where: { userId },
  //   });
  //   console.log('newCartItems = ', newCartItems);
  //   const newCartItemsModified = [];

  //   newCartItems.forEach((element) => {
  //     newCartItemsModified.push({
  //       productId: element["product.id"],
  //       title: element["product.title"],
  //       imageUrl: element["product.imageUrl"],
  //       price: element["product.price"],
  //       count: element.productQty,
  //     });
  //   });

  //   return res.json(newCartItemsModified);
  // }
  // if (!cartItems.length && !localItems.length) {
  //   return res.json([]);
  // }
};

// ============================================================

const addItem = async (req, res) => {
  const token = req.headers.authorization || "";
  let userId = null;

  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    userId = decoded.data;
  }
  const { productId } = req.body;

  const findItem = await Cart.findOne({
    raw: true,
    where: { userId, productId },
  });

  if (findItem) {
    const result  = await Cart.update(
      {
        productQty: findItem.productQty + 1,
      },
      {
        raw: true,
        where: {
          userId,
          productId,
        },
        returning: true,
          plain: true,
      }
    );
    // const newItem = await Cart.findOne({
    //   raw: true,

    //   where: { userId, productId },
    //   attributes: [
    //     "productQty",
    //     "productId",
    //     "product.title",
    //     "product.imageUrl",
    //     "product.descr",
    //     "product.price",
    //   ],

    //   include: {
    //     model: Product,
    //     where: { id: productId },
    //     attributes: [],
    //   },
    // });

    return res.json(result[1]);
  } else {
    await Cart.create({
      userId,
      productId,
      productQty: 1,
    });

    const newItem = await Cart.findOne({
      raw: true,

      where: { userId, productId },
      attributes: [
        "productQty",
        "productId",
        "product.title",
        "product.imageUrl",
        "product.descr",
        "product.price",
      ],

      include: {
        model: Product,
        where: { id: productId },
        attributes: [],
      },
    });

    return res.json(newItem);
  }
};

// =============================================================

const minusItem = async (req, res) => {
  const token = req.headers.authorization || "";
  let userId = null;

  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    userId = decoded.data;
  }
  const { productId } = req.body;

  const findItem = await Cart.findOne({
    raw: true,
    where: { userId, productId },
  });

  if (findItem) {
    if (findItem.productQty > 1) {
      const result = await Cart.update(
        {
          productQty: findItem.productQty - 1,
        },
        {
          raw: true,
          where: {
            userId,
            productId,
          },
          returning: true,
          plain: true,
        }
      );
      return res.json(result[1]);
    } else {
      const result = await Cart.destroy({
        where: {
          userId,
          productId,
        },
        returning: true,
          plain: true,
      });
      return res.json({result, productId});
      
    }
  }
};

// =============================================================

const deleteItem = async (req, res) => {
  const { productId, userId } = req.query;
  const removedItem = await Cart.destroy({
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

  return res.json({ productId });
};

// =============================================================

const deleteAllItems = async (req, res) => {
  const { userId } = req.query;
  try {
    await Cart.destroy({
      where: {
        userId,
      },
    });

    return res.status(200).json({ message: "Корзину видалено!!" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Помилка! Не вдалось видалити корзину!!" });
  }
};

module.exports = {
  getAll,
  syncCart,
  addItem,
  minusItem,
  deleteItem,
  deleteAllItems,
};
