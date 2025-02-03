const etatEtudiantDao = require("../../dao/EtatCompteEtudiantDao/EtatCompteEtudiantDao");

const registerEtatEtudiantt = async (userData) => {
 
  return await etatEtudiantDao.createEtatEtudiant(userData);
};

const updateEtatEtudiantDao = async (id, updateData) => {
  return await etatEtudiantDao.updateEtatEtudiant(id, updateData);
};

const getEtatEtudianttDaoById = async (id) => {
  return await etatEtudiantDao.getEtatEtudiantById(id)
};

const getEtatsEtudianttDao = async () => {
  const result = await etatEtudiantDao.getEtatsEtudiant();
  return result;
};

const deleteEtatEtudianttDao = async (id) => {
  return await etatEtudiantDao.deleteEtatEtudiant(id)
};



module.exports = {
    deleteEtatEtudianttDao,
    getEtatsEtudianttDao,
    getEtatEtudianttDaoById,
    registerEtatEtudiantt,
    updateEtatEtudiantDao,

};