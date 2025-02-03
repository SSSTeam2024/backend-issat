const NiveauClasseModel = require("../../model/NiveauClasseModel/NiveauClasseModel");
const sectionClasse = require("../../model/SectionClasseModel/SectionClasseModel");
const DepartementClasse = require("../../model/departementModel/DepartementModel");
const createSectionClasse = async (section) => {
  try {
    return await sectionClasse.create(section);
  } catch (error) {
    throw error;
  }
};

const getSectionsClasse = async () => {
  try {
    return await sectionClasse
      .find()
      .populate("niveau_classe")
      .populate("departements")
      .populate("mention_classe");
  } catch (error) {
    console.error("Error fetching niveaux classe:", error);
    throw error;
  }
};
const updateSectionClasse = async (id, updateData) => {
  try {
    return await sectionClasse
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("niveau_classe")
      .populate("departements")
      .populate("mention_classe");
  } catch (error) {
    console.error("Error updating niveau classe:", error);
    throw error;
  }
};

const updateDepartmentsWithSection = async (sectionId, departmentIds) => {
  try {
    await Promise.all(
      departmentIds.map(async (departmentId) => {
        await DepartementClasse.findByIdAndUpdate(departmentId, {
          $push: { sections: sectionId },
        });
      })
    );
  } catch (error) {
    throw error;
  }
};
const deleteSectionClasse = async (id) => {
  return await sectionClasse.findByIdAndDelete(id);
};

const getSectionClasseById = async (id) => {
  try {
    return await sectionClasse
      .findById(id)
      .populate("niveau_classe")
      .populate("departements")
      .populate("mention_classe");
  } catch (error) {
    console.error("Error fetching niveau classe by ID:", error);
    throw error;
  }
};

module.exports = {
  createSectionClasse,
  getSectionsClasse,
  updateSectionClasse,
  deleteSectionClasse,
  getSectionClasseById,
  updateDepartmentsWithSection,
};
