const avisEtudiantDao = require('../../dao/AvisEtudiantDao/AvisEtudiantDao');
const fs = require("fs").promises;

async function saveMediaToServer(documents) {
  try {
    let counter = 0;
    for (const file of documents) {
      await saveFile(file.base64String, file.name, file.path);
      counter++;
      console.log(`File number ${counter} saved`);
    }
    if (counter === documents.length) return true;
  } catch (error) {
    console.error("Error saving media files:", error);
    throw error;
  }
}

async function saveFile(base64String, fileName, filePath) {
  const binaryData = Buffer.from(base64String, "base64");
  const fullFilePath = filePath + fileName;
  try {
    await fs.writeFile(fullFilePath, binaryData, "binary");
    console.log("File saved successfully!");
  } catch (err) {
    console.error("Error saving the file:", err);
    throw err;
  }
}

const createAvisEtudiant = async (avisEtudiantData, documents) => {
  try {
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await avisEtudiantDao.createAvisEtudiant(avisEtudiantData);
  } catch (error) {
    console.error("Error creating AvisEtudiant:", error);
    throw error;
  }
};

const getAllAvisEtudiants = async () => {
  return avisEtudiantDao.getAllAvisEtudiants();
};

const getAvisEtudiantById = async (id) => {
  return avisEtudiantDao.getAvisEtudiantById(id);
};


const updateAvisEtudiant = async (id, updateData, documents) => {
  try {
    // Save the new media files to the server
 
    if (documents.length > 0) {
    
      const saveResult = await saveMediaToServer(documents);
      if (!saveResult) {
        throw new Error("Not all files were saved successfully.");
      }
    }

    // Update the Actualite in the database with new data
    return await avisEtudiantDao.updateAvisEtudiant(id, updateData);
  } catch (error) {
    console.error("Error updating Avis Etudiant :", error);
    throw error;
  }
};

const deleteAvisEtudiant = async (id) => {
  return avisEtudiantDao.deleteAvisEtudiant(id);
};

module.exports = {
  createAvisEtudiant,
  getAllAvisEtudiants,
  getAvisEtudiantById,
  updateAvisEtudiant,
  deleteAvisEtudiant
};