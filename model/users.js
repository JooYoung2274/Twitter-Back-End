const { Users } = require("../models/index");

const creatUser = async (loginId, nickname, hashedPass) => {
  try {
    await Users.create({ loginId, nickname, password: hashedPass });
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findDb = async (id) => {
  return Users.findOne({ where: id });
};

module.exports = { creatUser, findDb };
