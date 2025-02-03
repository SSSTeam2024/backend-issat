const classeDao = require("../../dao/ClasseDao/ClasseDao");
const Classe = require("../../model/ClasseModels/ClasseModels");
const Matiere = require("../../model/MatiereModel/MatiereModel");
const seanceService = require("../../services/SeanceServices/SeanceServices");

const createClasse = async (classeData) => {
  try {
    const createdClasse = await Classe.create(classeData);
    const populatedClasse = await Classe.findById(createdClasse._id)
      .populate({
        path: "niveau_classe",
        populate: {
          path: "sections",
          model: "SectionClasse",
        },
      })
      .populate("departement")
      .populate("matieres");

    return populatedClasse;
  } catch (error) {
    console.error("Error creating classe:", error);
    throw error;
  }
};

const updateClasse = async (id, updateData) => {
  return await classeDao.updateClasse(id, updateData);
};

const getClasseById = async (id) => {
  return await classeDao.getClasseById(id);
};

const getClasses = async () => {
  const result = await classeDao.getClasses();
  return result;
};

const deleteClasseById = async (id) => {
  try {
    console.log(`Attempting to delete classe with ID: ${id}`);

    // Delete the classe by its ID
    const deletedClasse = await classeDao.deleteClasse(id);

    if (!deletedClasse) {
      console.log(`Classe with ID ${id} not found`);
      throw new Error("Classe not found");
    }

    console.log(`Classe with ID ${id} deleted successfully`);

    // Update the matieres to remove the deleted classe from the classes array
    const updateResult = await Matiere.updateMany(
      { classes: id },
      { $pull: { classes: id } }
    );

    console.log("Update result:", updateResult);
    if (updateResult.modifiedCount === 0) {
      console.warn(
        `No matieres were updated to remove the deleted classe ID ${id}`
      );
    }

    return deletedClasse;
  } catch (error) {
    console.error("Error deleting classe and updating matieres:", error);
    throw error;
  }
};

async function assignMatieresToClasse(classeId, matiereIds) {
  try {
    const updatedClasse = await classeDao.assignMatieresToClasse(
      classeId,
      matiereIds
    );
    const populatedClasse = await Classe.findById(classeId)
      .populate("matieres")
      .exec();

    return populatedClasse;
  } catch (error) {
    throw new Error(`Error assigning matieres to classe: ${error.message}`);
  }
}

async function getAssignedMatieres(classeId) {
  try {
    return await classeDao.getAssignedMatieres(classeId);
  } catch (error) {
    throw new Error(`Error fetching assigned matieres: ${error.message}`);
  }
}

const getClassesByTeacherId = async (idTeacher, semestre) => {
  let sessions = await seanceService.getSeancesByTeacher(idTeacher, semestre);
  let classes = sessions.map((s) => s.classe);

  const uniqueClasses = classes.reduce((accumulator, current) => {
    // If the id is not already in the accumulator Set, add it
    if (!accumulator.some((item) => item._id === current._id)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  return uniqueClasses;
};

module.exports = {
  createClasse,
  updateClasse,
  getClasseById,
  getClasses,
  deleteClasseById,
  assignMatieresToClasse,
  getAssignedMatieres,
  getClassesByTeacherId,
};