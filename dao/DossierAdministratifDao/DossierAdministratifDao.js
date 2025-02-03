const DossierAdministratif = require("../../model/DossierAdministratifModel/DossierAdministratifModel");
const addDossierAdministratif = async (dossierData) => {
  try {
    return await DossierAdministratif.create(dossierData);
  } catch (error) {
    console.error("Error creating dossier:", error);
    throw error;
  }
};

const getDossiersAdministratifs = async () => {
  try {
    return await DossierAdministratif.find()
      .populate("enseignant")
      .populate("personnel")
      .populate({
        path: "papers.papier_administratif",
        model: "PapierAdministratif",
      })
      .exec();
  } catch (error) {
    console.error("Error fetching dossiers:", error);
    throw error;
  }
};




const updateDossiersAdministratif = async (id, updateData) => {
  try {
    return await DossierAdministratif.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("enseignant")
      .populate("personnel")
      .populate({
        path: "papers.papier_administratif",
        model: "PapierAdministratif",
      });
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};


const removeSpecificPaperFromDossier= async (dossierId, userId, userType, paperDetails) =>{
  const query = {
      _id: dossierId,
      [userType]: userId,
  };
  const update = {
      $pull: {
          papers: {
           'papier_administratif': paperDetails.papier_administratif,
              annee: paperDetails.annee,  
              remarques: paperDetails.remarques,
              file: paperDetails.file
          }
      }
  };
  return await DossierAdministratif.findOneAndUpdate(query, update, { new: true });
}

const getDossierById = async (dossierId) => {
  try {
    return await DossierAdministratif.findById(dossierId)
      .populate('enseignant')
      .populate('personnel');
  } catch (error) {
    console.error("Error fetching dossier by ID:", error);
    throw error;
  }
};

const archiveDossierAdministratif = async (dossierId) => {
  try {
    const archivedDossier = await DossierAdministratif.findByIdAndUpdate(
      dossierId,
      { isArchived: true },
      { new: true }
    );
    return archivedDossier;
  } catch (error) {
    console.error("Error archiving dossier:", error);
    throw error;
  }
};


const restoreDossierAdministratif = async (dossierId) => {
  try {
    const restoredDossier = await DossierAdministratif.findByIdAndUpdate(
      dossierId,
      { isArchived: false },
      { new: true }
    );
    return restoredDossier;
  } catch (error) {
    console.error("Error restoring dossier:", error);
    throw error;
  }
};


module.exports = {
  addDossierAdministratif,
  getDossiersAdministratifs,
  removeSpecificPaperFromDossier,
  updateDossiersAdministratif,
  archiveDossierAdministratif,
  getDossierById,
  restoreDossierAdministratif
};