const personnelService = require("../../services/PersonnelServices/PersonnelServices");
const Personnel = require("../../model/PersonnelModel/PersonnelModel");
const globalFunctions = require("../../utils/globalFunctions");
const path = require("path");
const fs = require("fs");
const addPersonnel = async (req, res) => {
  try {
    const {
      nom_fr,
      category,
      files_papier_administratif,
      nom_ar,
      prenom_fr,
      mat_cnrps,
      matricule,
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
      categorie,
      service,
      date_designation,
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
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String,
    } = req.body;
    const PhotoProfilPath = "files/personnelFiles/PhotoProfil/";
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
    const personnel = await personnelService.registerPersonnelDao(
      {
        nom_fr,
        nom_ar,
        category,
        prenom_fr,
        files_papier_administratif,
        prenom_ar,
        lieu_naissance_fr,
        lieu_naissance_ar,
        date_naissance,
        mat_cnrps,
        matricule,
        nationalite,
        etat_civil,
        sexe,
        etat_compte,
        poste,
        grade,
        specilaite,
        date_designation,
        date_affectation,
        compte_courant,
        identifinat_unique,
        num_cin,
        date_delivrance,
        categorie,
        service,
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
        photo_profil: path.basename(PhotoProfilFilePath),
      },
      documents
    );

    const populatedPersonnel = await Personnel.findById(personnel._id)
      .populate("etat_compte")
      .populate("categorie")
      .populate("grade")
      .populate("poste")
      .populate("service");

    res.json(populatedPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getPersonnels = async (req, res) => {
  try {
    const personnels = await personnelService.getPersonnelsDao();
    res.json(personnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updatePersonnelById = async (req, res) => {
  const requestId = new Date().toISOString() + Math.random().toString(36).substring(2, 15); // Unique request identifier
  try {
    console.log(`[${requestId}] Received request to update personnel with ID:`, req.body.id);

    const personnelId = req.body._id; // Correctly use the personnel ID from the request body
    console.log(`[${requestId}] Received request to update personnel with ID:`, personnelId);

    // Validate if ID is provided
    if (!personnelId) {
      return res.status(400).send("Personnel ID is required.");
    }
    const {
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
      etat_compte,
      date_designation,
      mat_cnrps,
      matricule,
      poste,
      grade,
      departements,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
      categorie,
      service,
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
      PhotoProfilFileExtension,
      PhotoProfilFileBase64String,
    } = req.body;

    const photoProfilPath = "files/personnelFiles/PhotoProfil/";

    // Function to generate unique filenames
    const generateUniqueFilename = (extension, name) => {
      if (!extension) {
        console.log(`[${requestId}] File extension is missing for ${name}.`);
        throw new Error(`File extension is missing for ${name}.`);
      }
      return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}_${name}.${extension}`;
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
      const photoProfilName = generateUniqueFilename(PhotoProfilFileExtension, "photo_profil");
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
      mat_cnrps,
      matricule,
      nationalite,
      etat_civil,
      sexe,
      etat_compte,
      poste,
      grade,
      departements,
      date_designation,
      specilaite,
      date_affectation,
      compte_courant,
      identifinat_unique,
      num_cin,
      date_delivrance,
      categorie,
      service,
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
      photo_profil, // Correctly assign the photo profile name
    };

    // Call the service to update personnel
    const updatedPersonnel = await personnelService.updatePersonnelDao(personnelId, updateFields);

    if (!updatedPersonnel) {
      return res.status(404).send("Personnel not found!");
    }
    res.json(updatedPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// controller
const getPersonnelById = async (req, res) => {
  try {
    const personnelId = req.body.personnelId; // Corrected to match your request body

    const getPersonnel = await personnelService.getPersonnelDaoById(personnelId);

    if (!getPersonnel) {
      return res.status(404).send("Personnel not found");
    }
    res.json(getPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


const deletePersonnelById = async (req, res) => {
  try {
    const personnelId = req.params.id;

    const deletedPersonnel = await personnelService.deletePersonnelDao(
      personnelId
    );

    if (!deletedPersonnel) {
      return res.status(404).send("Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addPersonnel,
  getPersonnels,
  getPersonnelById,
  updatePersonnelById,
  deletePersonnelById,
};