const shortCodeDao = require("../../dao/ShortCodeDao/shortCodeDao");

const createShortCode = async (shortCodeDataArray) => {
  return await shortCodeDao.createShortCode(shortCodeDataArray);
};

const getShortCodes = async () => {
  const result = await shortCodeDao.getShortCodes();
  return result;
};

module.exports = {
    createShortCode,
    getShortCodes,
};