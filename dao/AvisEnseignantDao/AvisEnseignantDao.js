const AvisEnseignant = require('../../model/AvisEnseignant/AvisEnseignant');

const createAvisEnseignant = async (avisEnseignantData) => {
  const avisEnseignant = new AvisEnseignant(avisEnseignantData);
  return avisEnseignant.save();
};

const getAllAvisEnseignants = async () => {
  return AvisEnseignant.find().populate('auteurId').populate('departement');
};

const getAvisEnseignantById = async (id) => {
  return AvisEnseignant.findById(id);
};

const updateAvisEnseignant = async (id, updateData) => {
  return AvisEnseignant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAvisEnseignant = async (id) => {
  return AvisEnseignant.findByIdAndDelete(id);
};

module.exports = {
  createAvisEnseignant,
  getAllAvisEnseignants,
  getAvisEnseignantById,
  updateAvisEnseignant,
  deleteAvisEnseignant
};