const papierAdministratifService = require("../../services/PapierAdministrativeServices/PapierAdministrativeServices");

const addPapierAdministratif = async (req, res) => {
  try {
   
    const { nom_ar, nom_fr, category } = req.body;
    const papierAdministratif = await papierAdministratifService.addPapierAdministratif({
      nom_ar, nom_fr, category
    });

    res.json(papierAdministratif);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding Papier Administratif.' });
  }
};

const updatePapierAdministratiftById = async (req, res) => {
  console.log("body request",req.body)
  try {
    const { _id, files_papier_administratif } = req.body;

    // Validate that files_papier_administratif is defined and is an array
    if (!Array.isArray(files_papier_administratif) || files_papier_administratif.length === 0) {
      return res.status(400).send("files_papier_administratif must be a non-empty array.");
    }

    // Update only the relevant fields from 'files_papier_administratif'
    const updateData = {
      nom_ar: files_papier_administratif[0].nom_ar, // Access safely after the check
      nom_fr: files_papier_administratif[0].nom_fr,
      category: files_papier_administratif[0].category,
    };

    const updatedPapierAdministratif = await papierAdministratifService.updatePapierAdministratif(_id, updateData);

    if (!updatedPapierAdministratif) {
      return res.status(404).send("Papier Administratif not found!");
    }
    
    res.json(updatedPapierAdministratif);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};



const getPapierAdministratifById = async (req, res) => {
  try {
    const papierAdministratifId = req.params.id;

    const papierAdministratif= await papierAdministratifService.getPapierAdministratifById(papierAdministratifId);

    if (!papierAdministratif) {
      return res.status(404).send("Papier Administratif not found");
    }
    res.json(papierAdministratif);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getPapierAdministratifs = async (req, res) => {
  try {
    const papierAdministratifs = await papierAdministratifService.gePapierAdministratifs();
    res.json(papierAdministratifs);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deletePapierAdministratif = async (req, res) => {
  try {
    const papierAdministratifId = req.params.id;

    const papierAdministratif = await papierAdministratifService.deletePapierAdministratif(papierAdministratifId);

    if (!papierAdministratif) {
      return res.status(404).send("Papier Administratif not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


module.exports = {
    addPapierAdministratif,
    deletePapierAdministratif,
    getPapierAdministratifs,
    getPapierAdministratifById,
    updatePapierAdministratiftById
};