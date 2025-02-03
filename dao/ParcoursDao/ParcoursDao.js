const Parcours = require("../../model/ParcoursModel/ParcoursModel");

const createParcours = async (parcours) => {
  try {
    return await Parcours.create(parcours);
  } catch (error) {
    throw error;
  }
};

const getAllParcours = async () => {
  try {
    return await Parcours.find()
      .populate("domaine")
      .populate("type_parcours")
      .populate("mention")
      .populate("modules");
  } catch (error) {
    console.error("Error fetching parcours:", error);
    throw error;
  }
};
const updateParcours = async (id, updateData) => {
  try {
    return await Parcours.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating parcours:", error);
    throw error;
  }
};

const deleteParcours = async (id) => {
  return await Parcours.findByIdAndDelete(id);
};

const addModuleToParcours = async (parcoursId, moduleId) => {
  try {
    return await Parcours.findByIdAndUpdate(
      parcoursId,
      { $push: { modules: moduleId } },
      { new: true } // Return the updated document
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createParcours,
  getAllParcours,
  updateParcours,
  deleteParcours,
  addModuleToParcours,
};
