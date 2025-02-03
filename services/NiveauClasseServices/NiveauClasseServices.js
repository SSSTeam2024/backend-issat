const niveauClasseDao = require("../../dao/NiveauClasseDao/NiveauClasseDao");
const niveauModel = require ("../../model/NiveauClasseModel/NiveauClasseModel")
const SectionClasse =require ("../../model/SectionClasseModel/SectionClasseModel")

const registerNiveauClasse = async (userData) => {
  console.log(userData);
  try {
    const niveauClasse = await niveauClasseDao.createNiveauClasse(userData);
    await Promise.all(userData.sections.map(async (sectionId) => {
      await SectionClasse.findByIdAndUpdate(sectionId, { $push: { niveau_classe: niveauClasse._id } });
    }));

    await niveauClasse.populate('sections')

    return niveauClasse;
  } catch (error) {
    console.error("Error in registering niveau classe:", error);
    throw error;
  }
};


const updateNiveauClasseDao = async (id, updateData) => {
  return await niveauClasseDao.updateNiveauClasse(id, updateData);
};

const getNiveauClasseDaoById = async (id) => {
  return await niveauClasseDao.getNiveauClasseById(id)
};

const getNiveauxClasseDao = async () => {
  const result = await niveauClasseDao.getNiveauxClasse();
  return result;
};

const deleteNiveauClasse = async (id) => {
  try {
    console.log(`Attempting to delete niveau classe with ID: ${id}`);
    const deletedNiveauClasse = await niveauClasseDao.deleteNiveauClasse(id);

    if (!deletedNiveauClasse) {
      console.log(`Niveau Classe with ID ${id} not found`);
      throw new Error("Niveau Classe not found");
    }

    console.log(`Niveau Classe with ID ${id} deleted successfully`);
    const updateResult = await SectionClasse.updateMany(
      { niveau_classe: id },
      { $pull: { niveau_classe: id } }
    );

    console.log("Update result:", updateResult);
    if (updateResult.nModified === 0) {
      console.warn(`No sections were updated to remove the deleted niveau classe ID ${id}`);
    }

    return deletedNiveauClasse;
  } catch (error) {
    console.error("Error deleting niveau classe and updating sections:", error);
    throw error;
  }
};
// getSectionsByIdNiveau 

async function getSectionsByIdNiveau(niveauClasseId) {
  try{
    return await niveauClasseDao.getSectionsByIdNiveau(niveauClasseId);
  }
  catch(error){
throw error
  }
}


module.exports = {
  deleteNiveauClasse,
    getNiveauxClasseDao,
    getNiveauClasseDaoById,
    registerNiveauClasse,
    updateNiveauClasseDao,
    getSectionsByIdNiveau

};