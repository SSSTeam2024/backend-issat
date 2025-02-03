const enseignantService = require("../../services/EnseignantServices/EnseignantServices");
const Enseignant = require("../../model/EnseignantModel/EnseignantModel");
const globalFunctions = require("../../utils/globalFunctions");
const path = require("path");
const fs = require("fs");

const addEnseignant = async (req, res) => {
  try {
    const {
      nom_fr,
      nom_ar,
      prenom_fr,
      matricule,
      mat_cnrps,
      prenom_ar,
      lieu_naissance_fr,
      lieu_naissance_ar,
      date_naissance,
      nationalite,
      etat_civil,
      sexe,
      etat_compte,
      poste,
      grade,
      departements,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
      state,
      dependence,
      code_postale,
      adress_ar,
      adress_fr,
      num_phone1,
      num_phone2,
      email,
      nom_conjoint,
      job_conjoint,
      nombre_fils,
      entreprise1,
      annee_certif1,
      certif1,
      entreprise2,
      annee_certif2,
      certif2,
      entreprise3,
      annee_certif3,
      certif3,
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String,
    } = req.body;

    const PhotoProfilPath = "files/enseignantFiles/PhotoProfil/";
    const PhotoProfilFilePath = path.join(
      PhotoProfilPath,
      globalFunctions.generateUniqueFilename(
        PhotoProfilFileExtension,
        "photo_profil"
      )
    );

    let documents = [
      {
        base64String: PhotoProfilFileBase64String,
        extension: PhotoProfilFileExtension,
        name: path.basename(PhotoProfilFilePath),
        path: PhotoProfilPath,
      },
    ];

    const enseignant = await enseignantService.registerEnseignantDao(
      {
        nom_fr,
        nom_ar,
        prenom_fr,
        prenom_ar,
        lieu_naissance_fr,
        lieu_naissance_ar,
        date_naissance,
        nationalite,
        etat_civil,
        sexe,
        matricule,
        mat_cnrps,
        etat_compte,
        poste,
        grade,
        specilaite,
        date_affectation,
        compte_courant,
        identifinat_unique,
        num_cin,
        date_delivrance,
        state,
        dependence,
        code_postale,
        departements,
        adress_ar,
        adress_fr,
        num_phone1,
        num_phone2,
        email,
        nom_conjoint,
        job_conjoint,
        nombre_fils,
        entreprise1,
        annee_certif1,
        certif1,
        entreprise2,
        annee_certif2,
        certif2,
        entreprise3,
        annee_certif3,
        certif3,
        photo_profil: path.basename(PhotoProfilFilePath),
      },
      documents
    );

    const populatedEnseignant = await Enseignant.findById(enseignant._id)
      .populate("etat_compte")
      .populate("poste")
      .populate("grade")
      .populate("specilaite")
      .populate("departements");

    res.json(populatedEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getEnseignants = async (req, res) => {
  try {
    const enseignants = await enseignantService.getEnseignatsDao();
    res.json(enseignants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// const updateEnseignantById = async (req, res) => {
//   const requestId = new Date().toISOString() + Math.random().toString(36).substring(2, 15); // Unique request identifier
//   try {
//     console.log(`[${requestId}] Received request to update enseignant with ID:`, req.body.id);

//     const enseignantId = req.body._id; // Correctly use the personnel ID from the request body
//     console.log(`[${requestId}] Received request to update enseignant with ID:`, enseignantId);

//     // Validate if ID is provided
//     if (!enseignantId) {
//       return res.status(400).send("enseignant ID is required.");
//     }
//     const {
//       nom_fr,
//       nom_ar,
//       prenom_fr,
//       matricule,
//       files_papier_administratif,
//       mat_cnrps,
//       prenom_ar,
//       lieu_naissance_fr,
//       lieu_naissance_ar,
//       date_naissance,
//       nationalite,
//       etat_civil,
//       sexe,
//       etat_compte,
//       poste,
//       grade,
//       specilaite,
//       date_affectation,
//       compte_courant,
//       identifinat_unique,
//       num_cin,
//       date_delivrance,

//       state,
//       dependence,
//       code_postale,
//       departements,
//       adress_ar,
//       adress_fr,
//       num_phone1,
//       num_phone2,
//       email,
//       nom_conjoint,
//       job_conjoint,
//       nombre_fils,

//       entreprise1,
//       annee_certif1,
//       certif1,

//       entreprise2,
//       annee_certif2,
//       certif2,
//       PhotoProfilFileExtension,
//       PhotoProfilFileBase64String,
//     } = req.body;

//     const photoProfilPath = "files/enseignantFiles/PhotoProfil/";

//     // Function to generate unique filenames
//     const generateUniqueFilename = (extension, name) => {
//       if (!extension) {
//         console.log(`[${requestId}] File extension is missing for ${name}.`);
//         throw new Error(`File extension is missing for ${name}.`);
//       }
//       return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}_${name}.${extension}`;
//     };

//     // Helper function to save files
//     const saveFile = (base64String, filePath, fileName) => {
//       if (base64String) {
//         const buffer = Buffer.from(base64String, "base64");
//         const fullPath = `${filePath}${fileName}`;
//         fs.writeFileSync(fullPath, buffer); // Save the file
//         console.log(`[${requestId}] File saved at: ${fullPath}`);
//         return fullPath; // Return the full path of the saved file
//       }
//       return null;
//     };

//     // Prepare documents array
//     const documents = [];
//     if (PhotoProfilFileBase64String && PhotoProfilFileExtension) {
//       const photoProfilName = generateUniqueFilename(PhotoProfilFileExtension, "photo_profil");
//       saveFile(PhotoProfilFileBase64String, photoProfilPath, photoProfilName);
//       documents.push({ name: photoProfilName });
//     }

//     // Extract file names from documents
//     let photo_profil = null; // Initialize the variable

//     if (documents.length > 0) {
//       documents.forEach((doc) => {
//         if (doc.name.includes("photo_profil")) photo_profil = doc.name;
//       });
//     }

//     // Define update fields
//     const updateFields = {
//       nom_fr,
//       nom_ar,
//       prenom_fr,
//       prenom_ar,
//       lieu_naissance_fr,
//       lieu_naissance_ar,
//       date_naissance,
//       nationalite,
//       etat_civil,
//       files_papier_administratif,
//       sexe,
//       etat_compte,
//       poste,
//       matricule,
//       mat_cnrps,
//       grade,
//       specilaite,
//       date_affectation,
//       compte_courant,
//       identifinat_unique,
//       num_cin,
//       date_delivrance,

//       state,
//       dependence,
//       code_postale,
//       departements,
//       adress_ar,
//       adress_fr,
//       num_phone1,
//       num_phone2,
//       email,
//       nom_conjoint,
//       job_conjoint,
//       nombre_fils,

//       entreprise1,
//       annee_certif1,
//       certif1,

//       entreprise2,
//       annee_certif2,
//       certif2,
//       photo_profil, // Correctly assign the photo profile name
//     };

//     // Call the service to update personnel
//     const updatedEnseignant = await enseignantService.updateEnseignantDao(enseignantId, updateFields);

//     if (!updatedEnseignant) {
//       return res.status(404).send("Enseignant not found!");
//     }
//     res.json(updatedEnseignant);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

// controllers/enseignantController.js

const updateEnseignantById = async (req, res) => {
  const requestId =
    new Date().toISOString() + Math.random().toString(36).substring(2, 15); // Unique request identifier
  try {
    console.log(
      `[${requestId}] Received request to update enseignant with ID:`,
      req.body.id
    );

    const enseignantId = req.body._id; // Correctly use the personnel ID from the request body
    console.log(
      `[${requestId}] Received request to update enseignant with ID:`,
      enseignantId
    );

    // Validate if ID is provided
    if (!enseignantId) {
      return res.status(400).send("enseignant ID is required.");
    }
    const {
      nom_fr,
      nom_ar,
      prenom_fr,
      matricule,
      files_papier_administratif,
      mat_cnrps,
      prenom_ar,
      lieu_naissance_fr,
      lieu_naissance_ar,
      date_naissance,
      nationalite,
      etat_civil,
      sexe,
      etat_compte,
      poste,
      grade,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,

      state,
      dependence,
      code_postale,
      departements,
      adress_ar,
      adress_fr,
      num_phone1,
      num_phone2,
      email,
      nom_conjoint,
      job_conjoint,
      nombre_fils,

      entreprise1,
      annee_certif1,
      certif1,

      entreprise2,
      annee_certif2,
      certif2,
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String,
    } = req.body;

    const photoProfilPath = "files/enseignantFiles/PhotoProfil/";

    // Function to generate unique filenames
    const generateUniqueFilename = (extension, name) => {
      if (!extension) {
        console.log(`[${requestId}] File extension is missing for ${name}.`);
        throw new Error(`File extension is missing for ${name}.`);
      }
      return `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 15)}_${name}.${extension}`;
    };

    // Helper function to save files
    const saveFile = (base64String, filePath, fileName) => {
      if (base64String) {
        const buffer = Buffer.from(base64String, "base64");
        const fullPath = `${filePath}${fileName}`;
        fs.writeFileSync(fullPath, buffer); // Save the file
        console.log(`[${requestId}] File saved at: ${fullPath}`);
        return fullPath; // Return the full path of the saved file
      }
      return null;
    };

    // Prepare documents array
    const documents = [];
    if (PhotoProfilFileBase64String && PhotoProfilFileExtension) {
      const photoProfilName = generateUniqueFilename(
        PhotoProfilFileExtension,
        "photo_profil"
      );
      saveFile(PhotoProfilFileBase64String, photoProfilPath, photoProfilName);
      documents.push({ name: photoProfilName });
    }

    // Extract file names from documents
    let photo_profil = null; // Initialize the variable

    if (documents.length > 0) {
      documents.forEach((doc) => {
        if (doc.name.includes("photo_profil")) photo_profil = doc.name;
      });
    }

    // Define update fields
    const updateFields = {
      nom_fr,
      nom_ar,
      prenom_fr,
      prenom_ar,
      lieu_naissance_fr,
      lieu_naissance_ar,
      date_naissance,
      nationalite,
      etat_civil,
      files_papier_administratif,
      sexe,
      etat_compte,
      poste,
      matricule,
      mat_cnrps,
      grade,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,

      state,
      dependence,
      code_postale,
      departements,
      adress_ar,
      adress_fr,
      num_phone1,
      num_phone2,
      email,
      nom_conjoint,
      job_conjoint,
      nombre_fils,

      entreprise1,
      annee_certif1,
      certif1,

      entreprise2,
      annee_certif2,
      certif2,
      photo_profil, // Correctly assign the photo profile name
    };

    // Call the service to update personnel
    const updatedEnseignant = await enseignantService.updateEnseignantDao(
      enseignantId,
      updateFields
    );

    if (!updatedEnseignant) {
      return res.status(404).send("Enseignant not found!");
    }
    res.json(updatedEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEnseignantById = async (req, res) => {
  try {
    const getEnseignant = await enseignantService.getEnseignantDaoById(req.body._id);

    if (!getEnseignant) {
      return res.status(404).send("Enseignant not found");
    }
    res.json(getEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEnseignantById = async (req, res) => {
  try {
    const enseignantId = req.params.id;

    const deletedEnseignant = await enseignantService.deleteEnseignantDao(
      enseignantId
    );

    if (!deletedEnseignant) {
      return res.status(404).send("Enseignant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const assignPapierToTeacher = async (req, res) => {
  const { enseignantId } = req.params;
  const { papier_administratif } = req.body;
  try {
    const enseignant = await enseignantService.assignPapierToTeacher(
      enseignantId,
      papier_administratif
    );
    return res.status(200).json({ success: true, data: enseignant });
  } catch (error) {
    console.error("Error in assignPapierToTeacher controller:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const fetchAllTeachersPeriods = async (req, res) => {
  try {
    const teachersPeriods = await enseignantService.fetchAllTeachersPeriods();

    res.json(teachersPeriods);
  } catch (error) {
    console.error("Error in controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers' periods.",
    });
  }
};
const getTeachersGroupedByGrade = async (req, res) => {
  try {
    const enseignants = await enseignantService.getTeachersGroupedByGrade();
    res.json(enseignants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addEnseignant,
  getEnseignants,
  deleteEnseignantById,
  getEnseignantById,
  updateEnseignantById,
  assignPapierToTeacher,
  fetchAllTeachersPeriods,
  getTeachersGroupedByGrade,
};