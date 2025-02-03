const matiereModel = require("../../model/MatiereModel/MatiereModel")

const createMatiere = async (matiere) => {
  try {
    return await matiereModel.create(matiere);
  } catch (error) {
    console.error("Error creating matiere:", error);
    throw error;
  }
};

const getMatieres = async () => {
  try {
    return await matiereModel.find().populate('classes');
  } catch (error) {
    console.error("Error fetching matieres:", error);
    throw error;
  }
};

const updateMatiere = async (id, updateData) => {
  try {
    return await matiereModel.findByIdAndUpdate(id, updateData, { new: true }).populate('classes');
  } catch (error) {
    console.error("Error updating matiere:", error);
    throw error;
  }
};

const deleteMatiere = async (id) => {
  try {
    return await matiereModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting matiere:", error);
    throw error;
  }
};

const getMatiereById = async (id) => {
  try {
    return await matiereModel.findById(id).populate('classes');
  } catch (error) {
    console.error("Error fetching matiere by ID:", error);
    throw error;
  }
};


module.exports = {
    createMatiere,
    getMatieres,
    updateMatiere,
    deleteMatiere,
    getMatiereById,

};