const Deplacement = require('../../model/Deplacement/Deplacement');

const createDeplacement = async (deplacementData) => {
  const deplacement = new Deplacement(deplacementData);
  return deplacement.save();
};

const getAllDeplacements = async () => {
  return Deplacement.find().populate('personnel').populate('enseignant');
};

const getDeplacementById = async (id) => {
  return Deplacement.findById(id);
};

const updateDeplacement = async (id, updateData) => {
  return Deplacement.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteDeplacement = async (id) => {
  return Deplacement.findByIdAndDelete(id);
};

module.exports = {
  createDeplacement,
  getAllDeplacements,
  getDeplacementById,
  updateDeplacement,
  deleteDeplacement
};