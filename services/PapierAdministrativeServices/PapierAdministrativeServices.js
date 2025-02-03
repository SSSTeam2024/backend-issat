const papierAdministratifDao = require("../../dao/PapierAdministratifDao/PapierAdministratifDao");

const addPapierAdministratif= async (userData) => {
 
  return await papierAdministratifDao.addPapierAdministratif(userData);
};

const updatePapierAdministratif = async (id, updateData) => {
  return await papierAdministratifDao.updatePapierAdministratif(id, updateData);
};

const getPapierAdministratifById = async (id) => {
  return await papierAdministratifDao.getPapierAdministratifById(id)
};

const gePapierAdministratifs = async () => {
  const result = await papierAdministratifDao.getPapierAdministratifs();
  return result;
};

const deletePapierAdministratif = async (id) => {
  return await papierAdministratifDao.deletePapierAdministratif(id)
};


module.exports = {
    addPapierAdministratif,
    deletePapierAdministratif,
    gePapierAdministratifs,
    updatePapierAdministratif,
    getPapierAdministratifById
};