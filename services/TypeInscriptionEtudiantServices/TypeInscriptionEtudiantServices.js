const typeInscriptionEtudiantDao = require("../../dao/TypeInscriptionEtudiantDao/TypeInscriptionEtudiantDao");

const registerTypeInscriptionEtudiantt = async (userData) => {
 
  return await typeInscriptionEtudiantDao.createTypeInscriptionEtudiant(userData);
};

const updateTypeInscriptionEtudiantDao = async (id, updateData) => {
  return await typeInscriptionEtudiantDao.updateTypeInscriptionEtudiant(id, updateData);
};

const getTypeInscriptionEtudianttDaoById = async (id) => {
  return await typeInscriptionEtudiantDao.getTypeInscriptionEtudiantById(id)
};

const getTypeInscriptionsEtudianttDao = async () => {
  const result = await typeInscriptionEtudiantDao.getTypeInscriptionsEtudiant();
  return result;
};

const deleteTypeInscriptionEtudianttDao = async (id) => {
  return await typeInscriptionEtudiantDao.deleteTypeInscriptionEtudiant(id)
};



module.exports = {
    deleteTypeInscriptionEtudianttDao,
    getTypeInscriptionsEtudianttDao,
    getTypeInscriptionEtudianttDaoById,
    updateTypeInscriptionEtudiantDao,
    registerTypeInscriptionEtudiantt,

};