const personnelDao = require("../../dao/PersonnelDao/PersonnelDao");
const fs = require("fs");
const path = require('path');

const registerPersonnelDao = async (userData, documents) => {
  try {
    const saveResult = await saveDocumentToServer(documents);
    if (saveResult) {
      const newPersonnel = await personnelDao.createPersonnel(userData);
      return newPersonnel;
    } else {
      throw new Error('Failed to save documents.');
    }
  } catch (error) {
    console.error('Error registering personnel:', error);
    throw error;
  }
};
// Function to save documents
async function saveDocumentToServer(documents) {
  let counter = 0;
  for (const file of documents) {
    await saveAdministrativeFile(file.base64String, file.name, file.path);
    counter++;
    console.log('File number ' + counter + ' saved');
  }
  return counter === documents.length;
}

async function saveAdministrativeFile(base64String, fileName, filePath) {
  const binaryData = Buffer.from(base64String, 'base64');
  const fullFilePath = path.join(filePath, fileName);

  // Ensure the directory exists
  await fs.promises.mkdir(filePath, { recursive: true });

  await fs.promises.writeFile(fullFilePath, binaryData, 'binary');
  console.log('File saved successfully at:', fullFilePath);
}


const getPersonnelsDao = async () => {
  const result = await personnelDao.getPersonnels();
  return result;
};

const deletePersonnelDao = async (id) => {
  return await personnelDao.deletePersonnel(id);
};
const updatePersonnelDao = async (id, updateData) => {
  return await personnelDao.updatePersonnel(id, updateData);
};

const getPersonnelDaoById = async (id) => {
  return await personnelDao.getPersonnelById(id);
};
module.exports = {
  registerPersonnelDao,
  getPersonnelsDao,
  deletePersonnelDao,
  updatePersonnelDao,
  getPersonnelDaoById,
};