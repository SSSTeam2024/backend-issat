const sectionClasseDao = require("../../dao/SectionClasseDao/SectionClasseDao");
const niveauClasse = require ("../../model/NiveauClasseModel/NiveauClasseModel");
const DepartementClasse = require ("../../model/departementModel/DepartementModel")
const SectionClasse =require ("../../model/SectionClasseModel/SectionClasseModel")
// const registerSectionClasse = async (userData) => {
 
//   return await sectionClasseDao.createSectionClasse(userData);
// };

const registerSectionClasse = async (userData) => {
  try {
    const sectionClasse = await sectionClasseDao.createSectionClasse(userData);
    await sectionClasseDao.updateDepartmentsWithSection(sectionClasse._id, userData.departements);
    await sectionClasse.populate('departements');
    return sectionClasse;
  } catch (error) {
    console.error("Error in registering section classe:", error);
    throw error;
  }
};

const updateSetionClasseDao = async (sectionClasseId, updateData) => {
  try {
    const updatedSectionClasse = await SectionClasse.findByIdAndUpdate(sectionClasseId, updateData, { new: true });
    
    // Clear old section references from departments
    const oldSection = await SectionClasse.findById(sectionClasseId);
    if (oldSection) {
      await Promise.all(oldSection.departements.map(async (departmentId) => {
        await DepartementClasse.findByIdAndUpdate(departmentId, { $pull: { sections: sectionClasseId } });
      }));
    }
    
    // Add new section references to departments
    await sectionClasseDao.updateDepartmentsWithSection(sectionClasseId, updateData.departements);

    return updatedSectionClasse;
  } catch (error) {
    console.error("Error in updating section classe:", error);
    throw error;
  }
};
const getSectionClasseDaoById = async (id) => {
  return await sectionClasseDao.getSectionClasseById(id)
};

const getSectionsClasseDao = async () => {
  const result = await sectionClasseDao.getSectionsClasse();
  return result;
};

const deleteSectionClassetDao = async (id) => {
  try {
    console.log(`Attempting to delete section with ID: ${id}`);
    const deletedSection = await sectionClasseDao.deleteSectionClasse(id);

    if (!deletedSection) {
      console.log(`Section with ID ${id} not found`);
      throw new Error("Section not found");
    }

    console.log(`Section with ID ${id} deleted successfully`);
    const updateResult = await niveauClasse.updateMany(
      { sections: id },
      { $pull: { sections: id } }
    );

    console.log("Update result:", updateResult);
    if (updateResult.nModified === 0) {
      console.warn(`No niveau classes were updated to remove the deleted section ID ${id}`);
    }

    return deletedSection;
  } catch (error) {
    console.error("Error deleting section and updating niveau classes:", error);
    throw error;
  }
};





module.exports = {
    deleteSectionClassetDao,
    getSectionsClasseDao,
    getSectionClasseDaoById,
    updateSetionClasseDao,
    registerSectionClasse,


};