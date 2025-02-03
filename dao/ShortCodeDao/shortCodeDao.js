const ShortCode = require("../../model/ShortCodeModel/shortCodeModel")

const createShortCode = async (shortCodes) => {
  return await ShortCode.insertMany(shortCodes);
};


const getShortCodes = async () => {
  return await ShortCode.find()
};

module.exports = {
    createShortCode,
    getShortCodes
};