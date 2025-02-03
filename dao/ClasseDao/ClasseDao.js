const classeModel = require("../../model/ClasseModels/ClasseModels");
const MatiereModel = require("../../model/MatiereModel/MatiereModel");
const Classe = require("../../model/ClasseModels/ClasseModels");

const createClasse = async (classe) => {
  try {
    return await classeModel.create(classe);
  } catch (error) {
    console.error("Error creating classe:", error);
    throw error;
  }
};
// const getClasses = async () => {
//   try {
//     const classes = await Classe.find()
//       .populate({
//         path: "niveau_classe",
//         populate: {
//           path: "sections",
//           model: "SectionClasse",
//         },
//       })
//       .populate("departement")
//       .populate("matieres");

//     return classes;
//   } catch (error) {
//     console.error("Error fetching classes:", error);
//     throw error;
//   }
// };

const getClasses = async () => {
  try {
    const classes = await Classe.find()
      .populate({
        path: 'niveau_classe',
        populate: {
          path: 'sections',
          model: 'SectionClasse',
          populate: {
            path: 'departements',
            model: 'Departement',
            populate: {
              path: 'sections',
              model: 'SectionClasse'
            }
          }
        }
      })
      .populate('departement')
      .populate('matieres');

    return classes;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};



const updateClasse = async (id, updateData) => {
  try {
    return await classeModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("departement")
      .populate("niveau_classe")
      .populate("matieres");
  } catch (error) {
    console.error("Error updating classe:", error);
    throw error;
  }
};

const deleteClasse = async (id) => {
  try {
    return await Classe.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting classe:", error);
    throw error;
  }
};

const getClasseById = async (id) => {
  try {
    return await classeModel
      .findById(id)
      .populate("departement")
      .populate("niveau_classe")
      .populate("matieres");
  } catch (error) {
    console.error("Error fetching classe by ID:", error);
    throw error;
  }
};

async function assignMatieresToClasse(classeId, matiereIds) {
  try {
    const classe = await Classe.findById(classeId);

    if (!classe) {
      throw new Error("Classe not found");
    }

    const existingMatieres = new Set(
      classe.matieres.map((matiere) => matiere.toString())
    );
    const uniqueMatiereIds = matiereIds.filter(
      (id) => !existingMatieres.has(id.toString())
    );

    if (uniqueMatiereIds.length === 0) {
      return classe;
    }

    classe.matieres.push(...uniqueMatiereIds);
    await classe.save();

    const matieres = await MatiereModel.find({
      _id: { $in: uniqueMatiereIds },
    });
    for (let matiere of matieres) {
      if (!matiere.classes.includes(classeId)) {
        matiere.classes.push(classeId);
        await matiere.save();
      }
    }

    return classe;
  } catch (error) {
    throw new Error(`Error assigning matieres to classe: ${error.message}`);
  }
}

const deleteAssignedMatiereFromClasse = async (classeId, matiereId) => {
  try {
    const classe = await Classe.findById(classeId);
    if (!classe) {
      throw new Error("Classe not found");
    }

    // Remove matiereId from classe.matieres array ensuring uniqueness
    const updatedMatieres = new Set(classe.matieres.map((m) => m.toString())); // Using a set for uniqueness
    updatedMatieres.delete(matiereId);
    classe.matieres = Array.from(updatedMatieres);

    await classe.save();

    // Update corresponding matiere document
    const matiere = await MatiereModel.findById(matiereId);
    if (matiere) {
      matiere.classes = matiere.classes.filter(
        (c) => c.toString() !== classeId
      );
      await matiere.save();
    }

    return classe; // Return updated classe object
  } catch (error) {
    throw new Error(
      `Error deleting assigned matiere from classe: ${error.message}`
    );
  }
};

async function getAssignedMatieres(classeId) {
  try {
    const classe = await Classe.findById(classeId).populate("matieres");
    if (!classe) {
      throw new Error("Classe not found");
    }
    return classe.matieres;
  } catch (error) {
    throw new Error(`Error fetching assigned matieres: ${error.message}`);
  }
}

module.exports = {
  createClasse,
  getClasses,
  updateClasse,
  deleteClasse,
  getClasseById,
  assignMatieresToClasse,
  deleteAssignedMatiereFromClasse,
  getAssignedMatieres,
};