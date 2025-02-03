const demandeEtudiantDao = require('../../dao/DemandeEtudiantDao/DemandeEtudiantDao');


const createDemandeEtudiant = async (demandeEtudiantData) => {
  return await demandeEtudiantDao.createDemandeEtudiant(demandeEtudiantData);
};

const getAllDemandeEtudiants = async () => {
  return demandeEtudiantDao.getAllDemandeEtudiants();
};

const getDemandeEtudiantById = async (id) => {
  return demandeEtudiantDao.getDemandeEtudiantById(id);
};

const updateDemandeEtudiant = async (id, updateData) => {
  return demandeEtudiantDao.updateDemandeEtudiant(id, updateData);
};

const deleteDemandeEtudiant = async (id) => {
  return demandeEtudiantDao.deleteDemandeEtudiant(id);
};

module.exports = {
  createDemandeEtudiant,
  getAllDemandeEtudiants,
  getDemandeEtudiantById,
  updateDemandeEtudiant,
  deleteDemandeEtudiant
};