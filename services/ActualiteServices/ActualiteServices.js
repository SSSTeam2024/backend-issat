const ActualiteDao = require('../../dao/ActualiteDao/ActualiteDao');
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

const createActualite = async (ActualiteData, documents) => {
  try {
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await ActualiteDao.createActualite(ActualiteData);
  } catch (error) {
    console.error("Error creating Actualite:", error);
    throw error;
  }
};

const getAllActualites = async () => {
  return ActualiteDao.getAllActualites();
};

const getActualiteById = async (id) => {
  return ActualiteDao.getActualiteById(id);
};

const updateActualite = async (id, updateData, documents) => {
  try {
    // Save the new media files to the server
    if (documents && documents.length > 0) {
      const saveResult = await saveMediaToServer(documents);
      if (!saveResult) {
        throw new Error("Not all files were saved successfully.");
      }
    }

    // Update the Actualite in the database with new data
    return await ActualiteDao.updateActualite(id, updateData);
  } catch (error) {
    console.error("Error updating Actualite:", error);
    throw error;
  }
};

const deleteActualite = async (id) => {
  return ActualiteDao.deleteActualite(id);
};

module.exports = {
  createActualite,
  getAllActualites,
  getActualiteById,
  updateActualite,
  deleteActualite
};