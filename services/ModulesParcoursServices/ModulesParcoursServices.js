const modulesParcoursDao = require("../../dao/ModulesParcoursDao/ModulesParcoursDao");
const parcoursDao = require("../../dao/ParcoursDao/ParcoursDao");

// const createModulesParcours = async (userData) => {
//   try {
//     const moduleParcours = await modulesParcoursDao.createModuleParcours(
//       userData
//     );

//     return moduleParcours;
//   } catch (error) {
//     console.error("Error in creating module parcours:", error);
//     throw error;
//   }
// };

const createModulesParcours = async (userData) => {
  try {
    const moduleParcours = await modulesParcoursDao.createModuleParcours(
      userData
    );

    // Update the related Parcours with the created module ID
    const parcours = await parcoursDao.addModuleToParcours(
      userData.parcours,
      moduleParcours._id
    );

    if (!parcours) {
      throw new Error("Failed to update Parcours with the new module.");
    }

    return moduleParcours;
  } catch (error) {
    console.error("Error in creating module parcours:", error);
    throw error;
  }
};

const updateModuleParcours = async (id, updateData) => {
  return await modulesParcoursDao.updateModuleParcours(id, updateData);
};

const getAllModulesParcours = async () => {
  return await modulesParcoursDao.getAllModulesParcours();
};

const deleteModulesParcours = async (id) => {
  return await modulesParcoursDao.deleteModuleParcours(id);
};

module.exports = {
  deleteModulesParcours,
  getAllModulesParcours,
  updateModuleParcours,
  createModulesParcours,
};
