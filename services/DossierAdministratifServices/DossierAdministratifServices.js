const dossierAdministratifDao = require("../../dao/DossierAdministratifDao/DossierAdministratifDao");
const fs = require("fs");
const path = require('path');

const addDossierAdministratif = async ( dossierData, documents) => {
  try {
    let saveResult = await saveDocumentToServer(documents);
    console.log("Save result:", saveResult);
    if (saveResult) {
      const newDossier = await dossierAdministratifDao.addDossierAdministratif(dossierData);
      return newDossier;
    } else {
      throw new Error('Failed to save documents.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function saveDocumentToServer(documents) {
  try {
    let counter = 0;
    for (const file of documents) {
   
      await saveAdministrativeFile(file.base64String, file.name, file.path);
      counter++;
      console.log("File number " + counter + " saved");
    }
    return counter === documents.length;
  } catch (error) {
    console.error("Error saving documents:", error);
    return false;
  }
}
async function saveAdministrativeFile(base64String, fileName, filePath) {
  return new Promise((resolve, reject) => {
    const binaryData = Buffer.from(base64String, "base64");
    const fullFilePath = path.join(filePath, fileName);
    fs.mkdirSync(filePath, { recursive: true });

    fs.writeFile(fullFilePath, binaryData, "binary", (err) => {
      if (err) {
        console.error("Error saving the file:", err);
        reject(err);
      } else {
        console.log("File saved successfully!");
        resolve();
      }
    });
  });
}



// const updateDossierAdministratif = async (id,updateData, documents) => {
//   try {
//     let saveResult = await saveDocumentToServer(documents);
    
//     if (saveResult) {
//       const updatedDossierAdministratif = await dossierAdministratifDao.updateDossiersAdministratif(id,updateData);
//       return updatedDossierAdministratif;
//     } else {
//       throw new Error('Failed to save documents.');
//     }
//   } catch (error) {
//     console.error("Error updating Dossier Administratif:", error);
//     throw error;
//   }
// };

const updateDossierAdministratif = async (id, updateData, documents) => {
  try {
    // Save only new documents that are provided
    let saveResult = documents.length > 0 ? await saveDocumentToServer(documents) : true;

    if (saveResult) {
      // Proceed with updating the Dossier if document save is successful or no documents were uploaded
      const updatedDossierAdministratif = await dossierAdministratifDao.updateDossiersAdministratif(id, updateData);
      return updatedDossierAdministratif;
    } else {
      throw new Error('Failed to save documents.');
    }
  } catch (error) {
    console.error("Error updating Dossier Administratif:", error);
    throw error;
  }
};


const getDossierAdministratifsDao = async () => {
  try {
    return await dossierAdministratifDao.getDossiersAdministratifs();
  } catch (error) {
    console.error("Error fetching dossiers:", error);
    throw error;
  }
};
const removeSpecificPaperFromDossierService=async (dossierId, userId, userType, paperDetails) =>{

  if (userType !== 'enseignant' && userType !== 'personnel') {
      throw new Error('Invalid user type');
  }
  const updatedDossier = await dossierAdministratifDao.removeSpecificPaperFromDossier(dossierId, userId, userType, paperDetails);

  if (!updatedDossier) {
      throw new Error('Dossier not found or unable to remove the specified paper');
  }

  return updatedDossier;
}

const archiveDossierAdministratif = async (dossierId) => {
  try {
    const dossier = await dossierAdministratifDao.getDossierById(dossierId);

    if (!dossier) {
      throw new Error("Dossier not found");
    }
    let type;
    if (dossier.enseignant) {
      type = 'enseignant';
    } else if (dossier.personnel) {
      type = 'personnel';
    } else {
      throw new Error("Invalid dossier type");
    }
    const archivedDossier = await dossierAdministratifDao.archiveDossierAdministratif(dossierId);

    return {
      archivedDossier,
      type,
    };
  } catch (error) {
    console.error("Error in archiving dossier service:", error);
    throw error;
  }
};
const restoreDossierAdministratifService = async (dossierId) => {
  try {
    const restoredDossier = await dossierAdministratifDao.restoreDossierAdministratif(dossierId);
    if (!restoredDossier) {
      throw new Error('Dossier not found');
    }
    return restoredDossier;
  } catch (error) {
    console.error("Error in service restoring dossier:", error);
    throw error;
  }
};

module.exports = {
  addDossierAdministratif,
  getDossierAdministratifsDao,
  removeSpecificPaperFromDossierService,
  updateDossierAdministratif,
  restoreDossierAdministratifService,
  archiveDossierAdministratif
};