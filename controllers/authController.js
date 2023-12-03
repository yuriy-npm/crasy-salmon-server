const { User, Address } = require("../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    const userExist = await User.findOne({ where: { phone } });

    if (userExist) {
      return res
        .status(402)
        .json({ message: "Користувач з таким номером телефона вже існує" });
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ name, phone, password: hashPassword });
    const token = jwt.sign({ data: user.id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    return res
      .status(201)
      .json({ user, token, message: "Нового користувача створено!" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Помилка! Не вдалось створити користувача!!" });
  }
};

// ----------------------------------------------

const login = async (req, res) => {
  const { phone, password } = req.body;
  console.log(phone, password);
  if (!phone || !password) {
    return res
      .status(400)
      .json({ message: "Будь ласка, заповніть необхідні поля!" });
  }
  const user = await User.findOne({ where: { phone } });
  if (!user) {
    return res.status(400).json({ message: "Такого користувача не існує!!" });
  }
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (comparePassword) {
    const token = jwt.sign({ data: user.id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    return res
      .status(200)
      .json({ token, user, message: "Ви успішно увійшли в систему!" });
  }
  return res.status(400).json({ message: "пароль не вірний!!" });
};

// -----------------------------------------------------------

const getMe = async (req, res) => {
  try {
    let user = await User.findByPk(req.userId, {
      raw: true
    })
    const address = await Address.findAll({
      raw: true,
      where: { userId: req.userId },
    });
    // const address = addressInfo?.map((item) => {
    //   return (
    //     {
    //       addressId: item.id,
    //       address: `м.Київ, ${item.street}, буд. ${item.house} ${item.flat && 'кв. ' + item.flat}`,
    //       userId: item.userId
    //     }
    //   )
    // })
    user.address = address 
    if (!user) {
      return res.status(400).json({ message: "Такого користувача не існує!!" });
    }

    const token = jwt.sign({ data: user.id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    return res
      .status(200)
      .json({ token, user, message: "Ви успішно увійшли в систему!" });

  } catch (error) {
    return res.status(400).json({ message: "Помилка авторізації" });
  }
};

module.exports = {
  register,
  login,
  getMe
};
