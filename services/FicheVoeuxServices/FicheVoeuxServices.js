const ficheVoeuxDao = require("../../dao/FicheVoeuxDao/FicheVoeuxDao");

const createficheVoeux = async (data) => {
  try {
    return await ficheVoeuxDao.createficheVoeux(data);
  } catch (error) {
    console.error("Error in fiche de voeux service:", error);
    throw error;
  }
};

const updateFicheVoeux = async (id, updateData) => {
  return await ficheVoeuxDao.updateFicheVoeux(id, updateData);
};

const getSalleById = async (id) => {
  return await salleDao.getSalleById(id)
};

const getFichesVoeux= async () => {
  const result = await ficheVoeuxDao.getFichesVoeux();
  return result;
};

const deleteFicheVoeuxById = async (id) => {
 return await ficheVoeuxDao.deleteFicheVoeuxById(id);

};



module.exports = {
  createficheVoeux,
  getFichesVoeux,
  deleteFicheVoeuxById,
  updateFicheVoeux
};