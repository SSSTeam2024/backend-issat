const departmentDao = require("../../dao/DepartementDao/DepartementDao");
const fs = require('fs'); 
const classeSections = require('../../model/SectionClasseModel/SectionClasseModel');

const registerDepartement = async (userData, documents) => {
  try {
    let saveResult = await saveDocumentToServer(documents);
    console.log("Save result:", saveResult);
    if (saveResult) {
      const newDepartement = await departmentDao.createDepartement(userData);
      return newDepartement;
    } else {
      throw new Error('Failed to save documents.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// function saveDocumentToServer
async function saveDocumentToServer(documents) {
  try {
    let counter = 0;
    for (const file of documents) {
      console.log(file);
      await saveAdministrativeFile(file.base64String, file.name, file.path);
      counter++;
      console.log('File number ' + counter + ' saved');
    }
    return counter === documents.length;
  } catch (error) {
    console.error('Error saving documents:', error);
    return false;
  }
}

async function saveAdministrativeFile(base64String, fileName, filePath) {
  return new Promise((resolve, reject) => {
    const binaryData = Buffer.from(base64String, 'base64');
    const fullFilePath = filePath + fileName;
    fs.writeFile(fullFilePath, binaryData, 'binary', (err) => {
      if (err) {
        console.error('Error saving the file:', err);
        reject(err);
      } else {
        console.log('File saved successfully!');
        resolve();
      }
    });
  });
}


const updateDepartementDao = async (id,updateData, documents) => {
  try {
    let saveResult = await saveDocumentToServer(documents);
    console.log("Save result:", saveResult);
    if (saveResult) {
      const updatedDepartement = await departmentDao.updateDepartement(id,updateData);
      return updatedDepartement;
    } else {
      throw new Error('Failed to save documents.');
    }
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};

const getDepartementDaoById = async (id) => {
  try {
    return await departmentDao.getDepartementById(id);
  } catch (error) {
    console.error("Error fetching department by ID:", error);
    throw error;
  }
};

const getDepartementstDao = async () => {
  try {
    return await departmentDao.getDepartements();
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

// const deleteDepartementDao = async (id) => {
//   try {
//     return await departmentDao.deleteDepartement(id);
//   } catch (error) {
//     console.error("Error deleting department:", error);
//     throw error;
//   }
// };
const deleteDepartementDao = async (id) => {
  try {
    console.log(`Attempting to delete department with ID: ${id}`);
    const deletedDepartment = await departmentDao.deleteDepartement(id);

    if (!deletedDepartment) {
      console.log(`Department with ID ${id} not found`);
      throw new Error("Department not found");
    }

    console.log(`Department with ID ${id} deleted successfully`);
    const updateResult = await classeSections.updateMany(
      { departements: id },
      { $pull: { departements: id } }
    );

    console.log("Update result:", updateResult);
    if (updateResult.nModified === 0) {
      console.warn(`No Section classes were updated to remove the deleted department ID ${id}`);
    }

    return deletedDepartment;
  } catch (error) {
    console.error("Error deleting departement and updating section classe:", error);
    throw error;
  }
};


module.exports = {
    deleteDepartementDao,
    getDepartementstDao,
    getDepartementDaoById,
    registerDepartement,
    updateDepartementDao,

};