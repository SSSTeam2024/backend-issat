const AvisPersonnel = require('../../model/AvisPersonnel/AvisPersonnel');

const createAvisPersonnel = async (avisPersonnelData) => {
  const avisPersonnel = new AvisPersonnel(avisPersonnelData);
  return avisPersonnel.save();
};

const getAllAvisPersonnels = async () => {
  return AvisPersonnel.find().populate('auteurId');
};

const getAvisPersonnelById = async (id) => {
  return AvisPersonnel.findById(id);
};

const updateAvisPersonnel = async (id, updateData) => {
  return AvisPersonnel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAvisPersonnel = async (id) => {
  return AvisPersonnel.findByIdAndDelete(id);
};

module.exports = {
  createAvisPersonnel,
  getAllAvisPersonnels,
  getAvisPersonnelById,
  updateAvisPersonnel,
  deleteAvisPersonnel
};