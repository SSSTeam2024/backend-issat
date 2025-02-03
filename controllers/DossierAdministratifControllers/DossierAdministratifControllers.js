const dossierAdministratifService = require("../../services/DossierAdministratifServices/DossierAdministratifServices");
const enseignantService = require("../../services/EnseignantServices/EnseignantServices");
const globalFunctions = require("../../utils/globalFunctions");
const PapierAdministratifModel = require("../../model/PapierAdministratif/PapierAdministratifModel");
const DossierAdministratifModel = require("../../model/DossierAdministratifModel/DossierAdministratifModel");
const personnelDao = require("../../dao/PersonnelDao/PersonnelDao");

const addDossierAdministratif = async (req, res) => {
  try {
    const { enseignant, personnel, papers } = req.body;

    const filePath = "files/dossierFiles/";
    const documents = [];
    const papersToSave = [];
    if (!enseignant && !personnel) {
      return res.status(400).json({
        message: "At least one of enseignant or personnel must be provided.",
      });
    }

    for (const paper of papers) {
      let paperId;
      if (!paper.papier_administratif) {
        const newPapier = new PapierAdministratifModel({
          nom_ar: paper.nom_ar,
          nom_fr: paper.nom_fr,
          category: paper.category || [],
        });
        const savedPapier = await newPapier.save();
        paperId = savedPapier._id;
        console.log(
          `Created new papier_administratif with ID: ${savedPapier._id}`
        );
      } else {
        paperId = paper.papier_administratif;
      }
      let file = globalFunctions.generateUniqueFilename(
        paper.FileExtension,
        "file"
      );
      let document = {
        base64String: paper.FileBase64String,
        extension: paper.FileExtension,
        name: file,
        path: filePath,
      };
      documents.push(document);
      papersToSave.push({
        papier_administratif: paperId,
        annee: paper.annee,
        remarques: paper.remarques,
        file: file,
      });
    }
    const existingDossierEnseignant = enseignant
      ? await DossierAdministratifModel.findOne({ enseignant })
      : null;
    const existingDossierPersonnel = personnel
      ? await DossierAdministratifModel.findOne({ personnel })
      : null;

    let dossierAdministratif;
    if (existingDossierEnseignant) {
      existingDossierEnseignant.papers.push(...papersToSave);
      dossierAdministratif = await existingDossierEnseignant.save();
      console.log("Updated Dossier Enseignant:", dossierAdministratif);
    } else if (existingDossierPersonnel) {
      existingDossierPersonnel.papers.push(...papersToSave);
      dossierAdministratif = await existingDossierPersonnel.save();
      console.log("Updated Dossier Personnel:", dossierAdministratif);
    } else {
      const dossierData = {
        enseignant: enseignant || undefined,
        personnel: personnel || undefined,
        papers: papersToSave,
      };
      dossierAdministratif =
        await dossierAdministratifService.addDossierAdministratif(
          dossierData,
          documents
        );
      console.log("Created New Dossier:", dossierAdministratif);
    }
    const papierIds = papersToSave.map((paper) => paper.papier_administratif);

    if (enseignant) {
      await enseignantService.assignPapierToTeacher(enseignant, papierIds);
    }

    if (personnel) {
      await personnelDao.assignPapierToPersonnel(personnel, papierIds);
    }

    res.status(201).json(dossierAdministratif);
  } catch (error) {
    console.error("Error saving DossierAdministratif:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllDossierAdmnistratifs = async (req, res) => {
  try {
    const dossierAdministratif =
      await dossierAdministratifService.getDossierAdministratifsDao();
    res.json(dossierAdministratif);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateDossierAdministratif = async (req, res) => {
  try {
    const DossierAdministratifId = req.body.dossierId;
    const { enseignant, personnel, papers } = req.body;

    const DossierFilesPath = "files/dossierFiles/";
    let documents = [];
    let updatedPapers = papers.map((paper) => {
      let { FileBase64String, FileExtension, file, ...restOfPaper } = paper;

      if (FileBase64String && FileExtension) {
        // New file provided, update and save
        let newFile = globalFunctions.generateUniqueFilename(FileExtension, "Dossier");
        documents.push({
          base64String: FileBase64String,
          extension: FileExtension,
          name: newFile,
          path: DossierFilesPath,
        });
        restOfPaper.file = newFile;
      } else {
        // No new file, retain the old one
        restOfPaper.file = file; // Keep the old file if no new file provided
      }
      return restOfPaper;
    });

    let dossierBody = {
      enseignant,
      personnel,
      papers: updatedPapers,
    };

    const dossier = await dossierAdministratifService.updateDossierAdministratif(
      DossierAdministratifId,
      dossierBody,
      documents
    );

    res.status(200).json(dossier);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const removeSpecificPaperFromDossier= async(req, res)=> {
  const { dossierId, userId, userType, paperId, annee, remarques, file } = req.body;
  console.log("Request Body:", req.body); 
  console.log("Dossier ID:", dossierId);

  try {
      const paperDetails = {
          papier_administratif: paperId,
          annee,
          remarques,
          file
      };

      const updatedDossier = await dossierAdministratifService.removeSpecificPaperFromDossierService(dossierId, userId, userType, paperDetails);

      res.status(200).json({ success: true, message: 'Paper removed successfully', updatedDossier });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
}

const archiveDossierAdministratif = async (req, res) => {
  try {
    const { dossierId } = req.body;

    const { archivedDossier, type } = await dossierAdministratifService.archiveDossierAdministratif(dossierId);

    if (archivedDossier) {
      return res.status(200).json({
        success: true,
        message: `Dossier archived successfully for ${type}`,
        dossier: archivedDossier,
        type, // Return the type of dossier archived (enseignant or personnel)
      });
    } else {
      return res.status(404).json({ success: false, message: 'Dossier not found' });
    }
  } catch (error) {
    console.error("Error archiving dossier:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const restoreDossierAdministratifController = async (req, res) => {
  const { dossierId } = req.body;

  if (!dossierId) {
    return res.status(400).json({ message: 'Dossier ID is required' });
  }

  try {
    const restoredDossier = await dossierAdministratifService.restoreDossierAdministratifService(dossierId);
    if (!restoredDossier) {
      return res.status(404).json({ message: 'Dossier not found' });
    }
    return res.status(200).json({
      message: 'Dossier restored successfully',
      dossier: restoredDossier,
    });
  } catch (error) {
    console.error("Error in controller restoring dossier:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  addDossierAdministratif,
  getAllDossierAdmnistratifs,
  removeSpecificPaperFromDossier,
  updateDossierAdministratif,
  archiveDossierAdministratif,
  restoreDossierAdministratifController

};