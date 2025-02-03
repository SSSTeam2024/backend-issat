const Reclamation = require('../../model/ReclamationPersonnelModel/ReclamationPersonnelModel');


const createReclamation = async (reclamationData) => {
  const reclamation = new Reclamation(reclamationData);
  return reclamation.save();
};

const getAllReclamations = async () => {
  return Reclamation.find().populate('personnelId');
};

const getReclamationById = async (id) => {
  return Reclamation.findById(id).populate('personnelId');
};

const updateReclamation = async (id, updateData) => {
  updateData.updatedAt = Date.now(); // Ensure updatedAt is updated

  return Reclamation.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .populate('personnelId')
    .exec();
};

const deleteReclamation = async (id) => {
  return Reclamation.findByIdAndDelete(id).populate('personnelId');
};

module.exports = {
  createReclamation,
  getAllReclamations,
  getReclamationById,
  updateReclamation,
  deleteReclamation
};