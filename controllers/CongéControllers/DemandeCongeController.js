const DemandeCongeService = require('../../services/CongéServices/DemandeCongeService');
const globalFunctions = require("../../utils/globalFunctions");

const createDemandeConge = async (req, res) => {
  try {
    const {
      personnelId,
      leaveType,
      subcategory,
      requestedDays,
      startDay,
      endDay,
      status,
      dateInterruption,
      reponse,
      dateReponse,
      year,
      lastUpdated,
      adresse_conge,
      nature_fichier,
      fileBase64String,
      fileExtension,
      fileInterruptionBase64String,
      fileInterruptionExtension,
      fileReponseBase64String,
      fileReponseExtension
    } = req.body;


    const filePath = "files/congeFiles/demandeCongeFiles/";
    const fileInterruptionPath = "files/congeFiles/demandeCongeInterruptionFiles"
    const fileReponsePath = "files/congeFiles/demandeCongeReponseFiles"
    const file = globalFunctions.generateUniqueFilename(fileExtension, 'demandeCongeFile');
    const fileInterruptionName = globalFunctions.generateUniqueFilename(fileExtension, 'demandeCongeInterruptionFile');
    const fileResponseName = globalFunctions.generateUniqueFilename(fileExtension, 'demandeCongeReponseFile');

    let documents = [ 
      {
      base64String: fileBase64String,
      name: file,
      extension: fileExtension,
      path: filePath
    },
    {
      base64String: fileInterruptionBase64String,
      name: fileInterruptionName,
      extension: fileInterruptionExtension,
      path: fileInterruptionPath
    },
    {
      base64String: fileReponseBase64String,
      name: fileResponseName,
      extension: fileReponseExtension,
      path: fileReponsePath
    }]

    for (let i = documents.length - 1; i >= 0; i--) {
      if (documents[i]?.base64String === undefined) {
        documents.splice(i, 1);
      }
    }

console.log("docs ctrl",documents )
    const demandeConge = await DemandeCongeService.createDemandeConge({
        personnelId,
        leaveType,
        subcategory,
        requestedDays,
        startDay,
        endDay,
        status,
        dateInterruption,
        file,
        year,
        lastUpdated,
        adresse_conge,
        nature_fichier,
        reponse,
        dateReponse,
        fileReponse: fileResponseName,
        fileInterruption: fileInterruptionName
     
    }, documents);
    
    res.status(201).json(demandeConge);
  } catch (error) {
    console.error("Error creating demande Conge:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllDemandeConges = async (req, res) => {
  try {
    const demandeConges = await DemandeCongeService.getAllDemandeConges();
    res.status(200).json(demandeConges);
  } catch (error) {
    console.error("Error fetching all demande Conge:", error);
    res.status(500).json({ message: error.message });
  }
};

const getDemandeCongeById = async (req, res) => {
  try {
    const demandeConge = await DemandeCongeService.getDemandeCongeById(req.params.id);
    if (!demandeConge) {
      return res.status(404).json({ message: 'demandeConges not found' });
    }
    res.status(200).json(demandeConge);
  } catch (error) {
    console.error("Error fetching demande Conge by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// const updateDemandeConge = async (req, res) => {

//   try {
//     const {
//       _id,
//       personnelId,
//       leaveType,
//       subcategory,
//       requestedDays,
//       startDay,
//       endDay,
//       status,
//       dateInterruption,
//       reponse,
//       dateReponse,
//       year,
//       lastUpdated,
//       adresse_conge,
//       nature_fichier,
//       fileBase64String,
//       fileExtension,
//       fileInterruptionBase64String,
//       fileInterruptionExtension,
//       fileReponseBase64String,
//       fileReponseExtension

//     } = req.body;
// console.log("req", req.body)
   
//     const filePath = "files/congeFiles/demandeCongeFiles/";
//     const fileInterruptionPath = "files/congeFiles/demandeCongeInterruptionFiles"
//     const fileReponsePath = "files/congeFiles/demandeCongeReponseFiles"

//     const filename = globalFunctions.generateUniqueFilename(fileExtension, 'demandeCongeFile');
//     const fileInterruptionName = globalFunctions.generateUniqueFilename(fileExtension, 'demandeCongeInterruptionFile');
//     const fileResponseName = globalFunctions.generateUniqueFilename(fileExtension, 'demandeCongeReponseFile');
//     let documents = [];
//     if (fileInterruptionBase64String && fileInterruptionExtension) {
//       const fileInterruptionName = globalFunctions.generateUniqueFilename(fileInterruptionExtension, 'demandeCongeFile');
//       documents.push({
//           base64String: fileInterruptionBase64String,
//           name: fileInterruptionName,
//           extension: fileInterruptionExtension,
//           path: fileInterruptionPath
//       });
//   }
//   if (fileBase64String && fileExtension) {
//     const filename = globalFunctions.generateUniqueFilename(fileExtension, 'demandeCongeInterruptionFile');
//     documents.push({
//         base64String: fileBase64String,
//         name: filename,
//         extension: fileExtension,
//         path: filePath
//     });
// }
// if (fileReponseBase64String && fileReponseExtension) {
//   const fileResponseName = globalFunctions.generateUniqueFilename(fileReponseExtension, 'demandeCongeReponseFile');
//   documents.push({
//       base64String: fileReponseBase64String,
//       name: fileResponseName,
//       extension: fileReponseExtension,
//       path: fileReponsePath
//   });
// }

//     const updateDemandeConge = await DemandeCongeService.updateDemandeConge(req.body._id,{
//         personnelId,
//         leaveType,
//         subcategory,
//         requestedDays,
//         startDay,
//         endDay,
//         status,
//         dateInterruption,
//         file:documents.find(doc => doc.path === filePath)?.name,
//         year,
//         lastUpdated,
//         adresse_conge,
//         nature_fichier,
//         reponse,
//         dateReponse,
//         fileReponse: documents.find(doc => doc.path === fileReponsePath)?.name,
//         fileInterruption: documents.find(doc => doc.path === fileInterruptionPath)?.name,
     
//     }, documents);
//     if (!updateDemandeConge) {
//       return res.status(404).json({ message: 'demande Conge not found' });
//   }

//     res.status(201).json(updateDemandeConge);
//   } catch (error) {
//     console.error("Error creating demande Conge:", error);
//     res.status(500).send({ message: error.message });
//   }
// };

const updateDemandeConge = async (req, res) => {
  try {
    const { _id, status, ...rest } = req.body;

    const filePaths = {
      demandeConge: 'files/congeFiles/demandeCongeFiles/',
      interruption: 'files/congeFiles/demandeCongeInterruptionFiles/',
      response: 'files/congeFiles/demandeCongeReponseFiles/',
    };

    const documents = [];

    // Add file uploads logic (reuse existing logic)
    if (req.body.fileBase64String && req.body.fileExtension) {
      const fileName = globalFunctions.generateUniqueFilename(req.body.fileExtension, 'demandeCongeFile');
      documents.push({ base64String: req.body.fileBase64String, name: fileName, path: filePaths.demandeConge });
    }
    if (req.body.fileInterruptionBase64String && req.body.fileInterruptionExtension) {
      const fileName = globalFunctions.generateUniqueFilename(req.body.fileInterruptionExtension, 'interruptionFile');
      documents.push({ base64String: req.body.fileInterruptionBase64String, name: fileName, path: filePaths.interruption });
    }
    if (req.body.fileReponseBase64String && req.body.fileReponseExtension) {
      const fileName = globalFunctions.generateUniqueFilename(req.body.fileReponseExtension, 'responseFile');
      documents.push({ base64String: req.body.fileReponseBase64String, name: fileName, path: filePaths.response });
    }

    const updateData = {
      ...rest,
      status,
      file: documents.find(doc => doc.path === filePaths.demandeConge)?.name,
      fileInterruption: documents.find(doc => doc.path === filePaths.interruption)?.name,
      fileReponse: documents.find(doc => doc.path === filePaths.response)?.name,
    };

    const updatedDemande = await DemandeCongeService.updateDemandeConge(_id, updateData, documents);

    if (!updatedDemande) {
      return res.status(404).json({ message: 'Demande Conge not found' });
    }

    res.status(200).json(updatedDemande);
  } catch (error) {
    console.error('Error updating Demande Conge:', error);
    res.status(500).send({ message: error.message });
  }
};
const deleteDemandeConge = async (req, res) => {
  try {
    const deleteDemandeConge = await DemandeCongeService.deleteDemandeConge(req.params.id);
    if (!deleteDemandeConge) {
      return res.status(404).json({ message: 'DemandeConge not found' });
    }
    res.status(200).json({ message: 'DemandeConge deleted successfully' });
  } catch (error) {
    console.error("Error deleting DemandeConge:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createDemandeConge,
    getAllDemandeConges,
    getDemandeCongeById,
    updateDemandeConge,
    deleteDemandeConge


};
