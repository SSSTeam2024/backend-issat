const avisEnseignantDao = require('../../dao/AvisEnseignantDao/AvisEnseignantDao');
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

const createAvisEnseignant = async (avisEnseignantData, documents) => {
  try {
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await avisEnseignantDao.createAvisEnseignant(avisEnseignantData);
  } catch (error) {
    console.error("Error creating AvisEnseignant:", error);
    throw error;
  }
};

const getAllAvisEnseignants = async () => {
  return avisEnseignantDao.getAllAvisEnseignants();
};

const getAvisEnseignantById = async (id) => {
  return avisEnseignantDao.getAvisEnseignantById(id);
};

const updateAvisEnseignant = async (id, updateData, documents) => {
  try {
    // Save the new media files to the server
    if (documents && documents.length > 0) {
      const saveResult = await saveMediaToServer(documents);
      if (!saveResult) {
        throw new Error("Not all files were saved successfully.");
      }
    }

    // Update the Actualite in the database with new data
    return await avisEnseignantDao.updateAvisEnseignant(id, updateData);
  } catch (error) {
    console.error("Error updating Avis Enseignant ", error);
    throw error;
  }
};

const deleteAvisEnseignant = async (id) => {
  return avisEnseignantDao.deleteAvisEnseignant(id);
};

module.exports = {
  createAvisEnseignant,
  getAllAvisEnseignants,
  getAvisEnseignantById,
  updateAvisEnseignant,
  deleteAvisEnseignant
};