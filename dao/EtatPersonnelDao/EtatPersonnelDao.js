const etatPersonnel = require("../../model/etatPersonnelModel/EtatPersonnel");

const createEtatPersonnel = async (etat_personnel) => {
  return await etatPersonnel.create(etat_personnel);
};

const getEtatsPersonnel = async () => {
  return await etatPersonnel.find();
};

const updateEtatPersonnel = async (id, updateData) => {
  return await etatPersonnel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEtatPersonnel = async (id) => {
  return await etatPersonnel.findByIdAndDelete(id);
};

const getEtatPersonnelById = async (id) => {
  return await etatPersonnel.findById(id);
};

module.exports = {
  createEtatPersonnel,
  getEtatsPersonnel,
  updateEtatPersonnel,
  deleteEtatPersonnel,
  getEtatPersonnelById,
};
