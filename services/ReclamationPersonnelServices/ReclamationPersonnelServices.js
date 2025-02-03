const reclamationDao = require('../../dao/ReclamationPersonnelDao/ReclamationPersonnelDao');
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

const createReclamation= async (reclamationData, documents) => {
  try {
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await reclamationDao.createReclamation(reclamationData);
  } catch (error) {
    console.error("Error creating recalamation personnel:", error);
    throw error;
  }
};

// const createReclamation = async (reclamationData) => {
//   return reclamationDao.createReclamation(reclamationData);
// };

const getAllReclamations = async () => {
  return reclamationDao.getAllReclamations();
};

const getReclamationById = async (id) => {
  return reclamationDao.getReclamationById(id);
};

const updateReclamation = async (id, updateData) => {
  return reclamationDao.updateReclamation(id, updateData);
};

const deleteReclamation = async (id) => {
  return reclamationDao.deleteReclamation(id);
};

module.exports = {
  createReclamation,
  getAllReclamations,
  getReclamationById,
  updateReclamation,
  deleteReclamation
};