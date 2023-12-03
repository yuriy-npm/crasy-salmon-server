const { Product } = require("../db/index");
const { Op } = require('sequelize')

const getAll = async (req, res) => {
  const { category, sort = "bestseller", order = "desc", search } = req.query;
  if (!category) {
    const products = await Product.findAll(
      // { raw: true },
      { where: { bestseller: true } }
    );
    return res.json(products);
  }
  if (category && !search) {
    const products = await Product.findAll(
      // { raw: true },
      { where: { categoryId: category }, order: [[sort, order]] }
    );
    return res.json(products);
  }
  if (category && search) {
    const products = await Product.findAll(
      // { raw: true },
      { where:
         { categoryId: category, 
          title: { [Op.iLike]: '%' + search + '%' }
         
  }, order: [[sort, order]] }
    );
    console.log('products = ', products);
    return res.json(products);
  }
};


// =====================================================


const getOne = async (req, res) => {
  
  const {id} = req.params
  console.log('id = ', id);
  
  const product = await Product.findOne(
    // { raw: true },
    { where: { id }}
  );
  return res.json(product);
  
}



// =====================================================
const addProduct = async (req, res) => {
  //  console.log('req.body = ', req.body);
  const {
    title,
    imageUrl,
    descr,
    weight,
    calorie,
    proteine,
    fats,
    carbohydrates,
    price,
    bestseller,
    categoryId,
  } = req.body;

  try {
    const product = await Product.create({
      title,
      imageUrl,
      descr,
      weight,
      calorie,
      proteine,
      fats,
      carbohydrates,
      price,
      bestseller,
      categoryId,
    });
    return res.json(product);
  } catch (error) {
    console.log("error = ", error);
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  addProduct,
  getOne,
};
