const jwt = require("jsonwebtoken");
const { Order, Order_Item, Product } = require("../db/index");

const getAll = async (req, res) => {

  const token = req.headers.authorization || ''
  let userId = null
    
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      userId = decoded.data
    } 



  const query = await Order.findAll({
    raw: true,
    where: { userId },
    attributes: ["orderNumber",
    "date", 
    "order_items.price", 
    "order_items.amount",
    "order_items.product.title", 
    "order_items.product.imageUrl",
  ],
    include: [
      {
        model: Order_Item,
        attributes: [],
        // where: {id: orderId  },
        
        include: [
          {
            model: Product,
            // where: {product_id: id },
            attributes: [],
          },
        ],
      },
    ],
  });
  const orderData = []

  if (query) {
    const orderObject = query.reduce((acc, item) => {
      let findItem = acc.find((el) => parseInt(el.orderNumber) === parseInt(item.orderNumber))
      if(findItem) {
        findItem.totalSum = findItem.totalSum + (parseInt(item.price) * parseInt(item.amount))
        findItem.items = [...findItem.items, item]
      } else {
        acc.push(
          {orderNumber: item.orderNumber, 
            date: item.date,
            totalSum: (parseInt(item.price) * parseInt(item.amount)), 
            items: [item]}) 
        // acc[item.orderNumber] = [item]
      }
      return acc
    }, [])
    // const orderObject = query.reduce((acc, item) => {
    //   if(acc[item.orderNumber]) {
    //     acc[item.orderNumber].push(item)
    //   } else {
    //     acc[item.orderNumber] = [item]
    //   }
    //   return acc
    // }, {})
    // for (let key in orderObject) {
    //   orderData.push(orderObject[key]);
    // }



    return res.json(orderObject);
  } else {
    return res.status(400).json({message: 'Замовленнь нема'});
  }
  // const ordersData = await Order.findAll({
  //   raw: true,
  //   where: { userId },
  //   attributes: ["orderNumber",
  //   "date", 
  //   "order_items.price", 
  //   "order_items.amount",
  //   "order_items.product.title", 
  //   "order_items.product.imageUrl",
  // ],
  //   include: [
  //     {
  //       model: Order_Item,
  //       attributes: [],
  //       where: { },
        
  //       include: [
  //         {
  //           model: Product,
  //           where: { },
  //           attributes: [],
  //         },
  //       ],
  //     },
  //   ],
  // });

  return res.json(orderData);
};

// =============================================

const addOrder = async (req, res) => {
  const { productData, address, sum, name, phone, email, toPhone, payMethod, comment, personCount } = req.body;

  const token = req.headers.authorization || ''
  let userId = null
    
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      userId = decoded.data
    } 

  const orders = await Order.findAll();
  const ordersQty = orders.length;
  console.log("req.body = ", req.body);
  try {
    const newOrder = await Order.create({
      userId,
      name, 
      phone, 
      email,
      address,
      sum,
      orderNumber:
        new Date().getMonth().toString() +
        ordersQty.toString() +
        new Date().getDate().toString(),
        payMethod,
        personCount,
        toPhone,
        comment,

    });
    const orderId = newOrder.id
    const order_number = newOrder.orderNumber
    const orderData = productData.map((item) => {
      return (
        {
          price: item.productPrice,
          amount: item.productQty,
          orderId,
          productId: item.productId,
        }
      )
    })

      await Order_Item.bulkCreate(orderData)

    return res.json(order_number);
  } catch (error) {
    console.log("error = ", error);
    return res
      .status(400)
      .json({ error: "Помилка! Не вдалось створити замовлення!" });
  }
};
// const addOrder = async (req, res) => {
//   const {userId, productData, address, sumValue} = req.body
//   const orders = await Order.findAll(
//     );
//     const ordersQty = orders.length
//     console.log('req.body = ', req.body);
//   try {
//     const newOrder = await Order.create({
//       userId,
//       productData,
//       address,
//       sum: sumValue,
//       orderNumber: new Date().getMonth().toString() + ordersQty.toString() + new Date().getDate().toString()
//     });
//     console.log('newOrder = ', newOrder);
//     return res.json(newOrder.orderNumber);
//   } catch (error) {
//     console.log('error = ', error);
//     return res.status(400).json({error: 'Помилка! Не вдалось створити замовлення!'});
//   }
// }

module.exports = {
  getAll,
  addOrder,
};
