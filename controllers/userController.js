const { User } = require("../db/index");
const { Address } = require("../db/index");

const addAddress = async (req, res) => {
  const { userId, userData } = req.body;
  console.log("userData = ", userData);
  console.log("userId = ", userId);

  try {
    const newAddress = await Address.create({
      userId,
      street: userData.street,
      house: userData.house,
      flat: userData.flat,
    });
    return res.json(newAddress);
  } catch (error) {
    console.log("error = ", error);
  }
};

// ===========================================================

const changeAddress = async (req, res) => {
  const { userId, userData } = req.body;
 

  try {
    const findItem = await Address.findByPk(userData.addressId);

    if (findItem) {
      await Address.update(
        {
          street: userData.street,
          house: userData.house,
          flat: userData.flat,
        },
        {
          where: {
            id: userData.addressId,
          },
        }
      );
      const updatedItem = await Address.findByPk(userData.addressId);
      return res.json(updatedItem);
    } else {
      return res.status(400).json({ message: "Помилка в оновленні даних!!" });
    }
  } catch (error) {
    console.log("error = ", error);
    return res.status(400).json({ message: "Помилка в оновленні даних!!" });
  }
};
// ===========================================================

const changeUserData = async (req, res) => {
  const { userId, name, mail, phone } = req.body.userData;
  

  try {
    const findUser = await User.findByPk(userId);
    if (findUser) {
      await User.update(
        {
          name,
          phone,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      let updatedUser = await User.findByPk(userId, {
        raw: true
      });
      const address = await Address.findAll({
        raw: true,
        where: { userId},
      });
      console.log('address = ', address);
      updatedUser.address = address 
      console.log('updatedUser = ', updatedUser);

      return res.status(200).json({message: 'Дані успішно оновлено!', data: updatedUser});
    } else {
      return res.status(400).json({ message: "Помилка в оновленні даних!!" });
    }
  } catch (error) {
    console.log("error = ", error);
    return res.status(400).json({ message: "Помилка в оновленні даних!!" });
  }
};

// ==========================================================================


const deleteAddress = async (req, res) => {
  const { addressId, userId } = req.query;
  const removedItem = await Address.destroy({
    where: {
      userId,
      id: addressId,
    },
  });

  if (!removedItem) {
    return res
      .status(400)
      .json({ message: "Помилка! Не вдалось видалити адресу!!" });
  }

  return res.json(addressId); 
};

// ===============================================================================

const getAll = async (req, res) => {
  const categories = await Category.findAll(
    // { raw: true },
    {}
  );
  return res.json(categories);
};

module.exports = {
  addAddress,
  changeAddress,
  deleteAddress,
  changeUserData,
};
