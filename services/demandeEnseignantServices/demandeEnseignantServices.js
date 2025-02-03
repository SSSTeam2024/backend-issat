const demandeEnseignantDao = require('../../dao/DemandeEnseignantDao/DemandeEnseignantDao');


const createDemandeEnseignant = async (demandeEnseignantData) => {
  return demandeEnseignantDao.createDemandeEnseignant(demandeEnseignantData);
};

const getAllDemandeEnseignants = async () => {
  return demandeEnseignantDao.getAllDemandeEnseignants();
};

const getDemandeEnseignantById = async (id) => {
  return demandeEnseignantDao.getDemandeEnseignantById(id);
};

const updateDemandeEnseignant = async (id, updateData) => {
  return demandeEnseignantDao.updateDemandeEnseignant(id, updateData);
};

const deleteDemandeEnseignant = async (id) => {
  return demandeEnseignantDao.deleteDemandeEnseignant(id);
};

module.exports = {
  createDemandeEnseignant,
  getAllDemandeEnseignants,
  getDemandeEnseignantById,
  updateDemandeEnseignant,
  deleteDemandeEnseignant
};