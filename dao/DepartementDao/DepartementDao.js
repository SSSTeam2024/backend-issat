const departementModel = require("../../model/departementModel/DepartementModel")

const createDepartement = async (departement) => {
  try {
    return await departementModel.create(departement);
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};
const getDepartements = async () => {
  try {
    return await departementModel.find().populate('salles').populate("sections");
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

const updateDepartement = async (id, updateData) => {
  try {
    return await departementModel.findByIdAndUpdate(id, updateData, { new: true }).populate('salles');
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};

const deleteDepartement = async (id) => {
  try {
    return await departementModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting department:", error);
    throw error;
  }
};

const getDepartementById = async (id) => {
  try {
    return await departementModel.findById(id).populate('salles').populate("sections");
  } catch (error) {
    console.error("Error fetching department by ID:", error);
    throw error;
  }
};

module.exports = {
    createDepartement,
    getDepartements,
    updateDepartement,
    deleteDepartement,
    getDepartementById,

};