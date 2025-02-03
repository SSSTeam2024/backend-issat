const matiereDao = require("../../dao/MatiereDao/MatiereDao");

const registerMatiere = async (userData) => {
 
  return await matiereDao.createMatiere(userData);
};

const updateMatiereDao = async (id, updateData) => {
  return await matiereDao.updateMatiere(id, updateData);
};

const getMatiereDaoById = async (id) => {
  return await matiereDao.getMatiereById(id)
};

const getMatieresDao = async () => {
  const result = await matiereDao.getMatieres();
  return result;
};

const deleteMatiereDao = async (id) => {
  return await matiereDao.deleteMatiere(id)
};



module.exports = {
    deleteMatiereDao,
    getMatieresDao,
    getMatiereDaoById,
    updateMatiereDao,
    registerMatiere,

};