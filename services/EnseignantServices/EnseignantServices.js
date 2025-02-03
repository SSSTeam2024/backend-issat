const enseignantDao = require("../../dao/EnseignantDao/EnseignantDao");
const Enseignant = require("../../model/EnseignantModel/EnseignantModel");
const fs = require("fs");
const path = require("path");

const registerEnseignantDao = async (userData, documents) => {
  try {
    // Save the documents and get their IDs
    const saveResult = await saveDocumentToServer(documents);
    const newEnseignant = await enseignantDao.createEnseignant(userData);
    return newEnseignant;
  } catch (error) {
    console.error("Error registering enseignant:", error);
    throw error;
  }
};

// Function to save documents
async function saveDocumentToServer(documents) {
  let counter = 0;
  for (const file of documents) {
    await saveAdministrativeFile(file.base64String, file.name, file.path);
    counter++;
    console.log("File number " + counter + " saved");
  }
  return counter === documents.length;
}

async function saveAdministrativeFile(base64String, fileName, filePath) {
  const binaryData = Buffer.from(base64String, "base64");
  const fullFilePath = path.join(filePath, fileName);

  // Ensure the directory exists
  await fs.promises.mkdir(filePath, { recursive: true });

  await fs.promises.writeFile(fullFilePath, binaryData, "binary");
  console.log("File saved successfully at:", fullFilePath);
}

const getEnseignatsDao = async () => {
  const result = await enseignantDao.getEnseignants();
  return result;
};

const deleteEnseignantDao = async (id) => {
  return await enseignantDao.deleteEnseignant(id);
};
const updateEnseignantDao = async (id, updateData) => {
  return await enseignantDao.updateEnseignant(id, updateData);
};

const getEnseignantDaoById = async (id) => {
  return await enseignantDao.getEnseignantById(id);
};

const assignPapierToTeacher = async (enseignantId, papierIds) => {
  try {
    const enseignant = await Enseignant.findById(enseignantId);
    if (!enseignant) {
      throw new Error("Enseignant not found");
    }
    for (const paperId of papierIds) {
      enseignant.papers.push(paperId);
    }

    await enseignant.save();
    return enseignant;
  } catch (error) {
    console.error("Error in assignPapierToTeacher:", error);
    throw new Error(`Service Error: DAO Error: ${error.message}`);
  }
};

const fetchAllTeachersPeriods = async () => {
  try {
    const teachersPeriods = await enseignantDao.fetchAllTeachersPeriods();

    return teachersPeriods;
  } catch (error) {
    throw new Error("Error processing teachers' periods: " + error.message);
  }
};
const getTeachersGroupedByGrade = async () => {
  const result = await enseignantDao.getTeachersGroupedByGrade();
  return result;
};

module.exports = {
  registerEnseignantDao,
  getEnseignatsDao,
  deleteEnseignantDao,
  updateEnseignantDao,
  getEnseignantDaoById,
  assignPapierToTeacher,
  fetchAllTeachersPeriods,
  getTeachersGroupedByGrade,
 
};