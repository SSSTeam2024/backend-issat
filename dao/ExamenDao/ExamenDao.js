const examenModel = require("../../model/ExamenModel/ExamenModel");

const createExamen = async (examen) => {
  try {
    return await examenModel.create(examen);
  } catch (error) {
    console.error("Error creating Examen:", error);
    throw error;
  }
};
const getExamens = async () => {
  try {
    return await examenModel
      .find()
      .populate("group_enseignant.enseignant") // Populate group_enseignant
      .populate("epreuve.salle") // Populate salle
      .populate("epreuve.matiere") // Populate matiere
      .populate("epreuve.classe") // Populate classe
      .populate({
        path: "epreuve.group_surveillants", // Correctly populate group_surveillants
      })
      .populate({
        path: "epreuve.group_responsables", // Correctly populate group_responsables
      });
  } catch (error) {
    console.error("Error fetching Examens:", error);
    throw error;
  }
};

const updateExamen = async (id, updateData) => {
  try {
    return await examenModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("group_enseignant.enseignant")
      .populate({
        path: "epreuve.salle",
      })
      .populate("epreuve.matiere")
      .populate("epreuve.classe")
      .populate({
        path: "epreuve.group_surveillants",
        path: "epreuve.group_responsables",
      });
  } catch (error) {
    console.error("Error updating Examen:", error);
    throw error;
  }
};

const deleteExamen = async (id) => {
  try {
    return await examenModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting Examen:", error);
    throw error;
  }
};

const getExamenById = async (id) => {
  try {
    return await examenModel
      .findById(id)
      .populate("group_enseignant.enseignant")
      .populate({
        path: "epreuve.salle",
      })
      .populate("epreuve.matiere")
      .populate("epreuve.classe")
      .populate({
        path: "epreuve.group_surveillants",
        path: "epreuve.group_responsables",
      });
  } catch (error) {
    console.error("Error fetching Examen by ID:", error);
    throw error;
  }
};

const getExamensBySemesterAndRegime = async (semester, regime) => {
  try {
    const examens = await examenModel
      .find({ semestre: semester })
      .populate({
        path: "epreuve.matiere",
        match: { regime_matiere: regime },
        populate: { path: "classes", model: "Classe" },
      })
      .populate("epreuve.salle")
      .populate("epreuve.classe")
      .populate("group_enseignant.enseignant");
    console.log("Examens after population:", examens);

    const filteredExamens = examens.filter((examen) =>
      examen.epreuve.some(
        (e) => e.matiere && e.matiere.regime_matiere === regime
      )
    );

    console.log("Filtered Examens:", filteredExamens);

    return filteredExamens;
  } catch (error) {
    throw new Error(`Failed to fetch examens: ${error.message}`);
  }
};

const editCalendrierExamens = async (
  id_Calendrier,
  epreuveId,
  epreuve_status,
  nbre_present,
  nbre_absent,
  nbre_exclus,
  notes
) => {
  try {
    const document = await examenModel.findOne({
      _id: id_Calendrier,
      "epreuve._id": epreuveId,
    });

    if (!document) {
      console.error(
        "No document found with the given id_Calendrier and epreuveId"
      );
      return null;
    }

    const updatedCalendar = await examenModel.findOneAndUpdate(
      { _id: id_Calendrier, "epreuve._id": epreuveId },
      {
        $set: {
          "epreuve.$.epreuveStatus": epreuve_status,
          "epreuve.$.nbrePresent": nbre_present,
          "epreuve.$.nbreAbsent": nbre_absent,
          "epreuve.$.nbreExclus": nbre_exclus,
          "epreuve.$.epreuveNotes": notes,
        },
      },
      { new: true }
    );

    return updatedCalendar;
  } catch (error) {
    throw new Error("Failed to update calendar: " + error.message);
  }
};

module.exports = {
  createExamen,
  getExamens,
  updateExamen,
  deleteExamen,
  getExamenById,
  getExamensBySemesterAndRegime,
  editCalendrierExamens,
};
