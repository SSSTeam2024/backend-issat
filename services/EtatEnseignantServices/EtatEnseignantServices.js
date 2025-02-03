const EtatEnseignantDao = require("../../dao/EtatCompteEnseignantDao/EtatCompteEnseignantDao");

const registerEtatEnseignant = async (userData) => {
 
  return await EtatEnseignantDao.createEtatEnseignant(userData);
};

const updateEtatEnseignantDao = async (id, updateData) => {
  return await EtatEnseignantDao.updateEtatEnseignant(id, updateData);
};

const getEtatEnseignantDaoById = async (id) => {
  return await EtatEnseignantDao.getEtatEnseignantById(id)
};

const getEtatsEnseignantDao = async () => {
  const result = await EtatEnseignantDao.getEtatsEnseignant();
  return result;
};

const deleteEtatEnseignantDao = async (id) => {
  return await EtatEnseignantDao.deleteEtatEnseignant(id)
};



module.exports = {
    registerEtatEnseignant,
    deleteEtatEnseignantDao,
    getEtatsEnseignantDao,
    getEtatEnseignantDaoById,
    updateEtatEnseignantDao,

};
