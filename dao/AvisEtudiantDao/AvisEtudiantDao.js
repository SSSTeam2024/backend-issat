const AvisEtudiant = require('../../model/AvisEtudiant/AvisEtudiantModel');

const createAvisEtudiant = async (avisEtudiantData) => {
  const avisEtudiant = new AvisEtudiant(avisEtudiantData);
  return avisEtudiant.save();
};

const getAllAvisEtudiants = async () => {
  return AvisEtudiant.find().populate('groupe_classe').populate('auteurId');
};

const getAvisEtudiantById = async (id) => {
  return AvisEtudiant.findById(id).populate('groupe_classe');
};

const updateAvisEtudiant = async (id, updateData) => {
  return AvisEtudiant.findByIdAndUpdate(id, updateData, { new: true }).populate('groupe_classe');
};

const deleteAvisEtudiant = async (id) => {
  return AvisEtudiant.findByIdAndDelete(id);
};

module.exports = {
  createAvisEtudiant,
  getAllAvisEtudiants,
  getAvisEtudiantById,
  updateAvisEtudiant,
  deleteAvisEtudiant
};