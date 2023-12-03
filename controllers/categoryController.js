const { Category } = require("../db/index");

const getAll = async (req, res) => {
  

    const categories = await Category.findAll(
      // { raw: true },
      {  }
    );
    return res.json(categories);
};



module.exports = {
  getAll,
};
