const demandePersonnelDao = require('../../dao/DemandePersonnelDao/DemandePersonnelDao');


const createDemandePersonnel = async (demandePersonnelData) => {
  return demandePersonnelDao.createDemandePersonnel(demandePersonnelData);
};

const getAllDemandePersonnels = async () => {
  return demandePersonnelDao.getAllDemandePersonnels();
};

const getDemandePersonnelById = async (id) => {
  return demandePersonnelDao.getDemandePersonnelById(id);
};

const updateDemandePersonnel = async (id, updateData) => {
  return demandePersonnelDao.updateDemandePersonnel(id, updateData);
};

const deleteDemandePersonnel = async (id) => {
  return demandePersonnelDao.deleteDemandePersonnel(id);
};

module.exports = {
  createDemandePersonnel,
  getAllDemandePersonnels,
  getDemandePersonnelById,
  updateDemandePersonnel,
  deleteDemandePersonnel
};