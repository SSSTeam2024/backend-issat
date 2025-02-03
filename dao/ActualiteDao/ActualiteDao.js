const Actualite = require('../../model/ActualiteModel/ActualiteModel');

const createActualite = async (ActualiteData) => {
  const actualite = new Actualite(ActualiteData);
  return actualite.save();
};

const getAllActualites = async () => {
  return Actualite.find().populate('auteurId')
};

const getActualiteById = async (id) => {
  return Actualite.findById(id).populate('auteurId');
};

const updateActualite = async (id, updateData) => {
  return Actualite.findByIdAndUpdate(id, updateData, { new: true }).populate('auteurId');
};

const deleteActualite = async (id) => {
  return Actualite.findByIdAndDelete(id);
};

module.exports = {
  createActualite,
  getAllActualites,
  getActualiteById,
  updateActualite,
  deleteActualite
};