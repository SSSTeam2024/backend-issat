const moduleParcours = require("../../model/ModulesParcoursModel/ModulesParcoursModel");

const createModuleParcours = async (userData) => {
  try {
    return await moduleParcours.create(userData);
  } catch (error) {
    throw error;
  }
};

const getAllModulesParcours = async () => {
  try {
    return await moduleParcours
      .find()
      .populate("parcours")
      .populate("matiere")
      .populate("parcours");
  } catch (error) {
    console.error("Error fetching module parcours:", error);
    throw error;
  }
};
const updateModuleParcours = async (id, updateData) => {
  try {
    return await moduleParcours.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  } catch (error) {
    console.error("Error updating module parcours:", error);
    throw error;
  }
};

const deleteModuleParcours = async (id) => {
  return await moduleParcours.findByIdAndDelete(id);
};

module.exports = {
  deleteModuleParcours,
  updateModuleParcours,
  getAllModulesParcours,
  createModuleParcours,
};
