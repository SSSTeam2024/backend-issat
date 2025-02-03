const deplacementService = require('../../services/DeplacementServices/DeplacementServices');
const globalFunctions = require("../../utils/globalFunctions");

const createDeplacement = async (req, res) => {
  try {
    const {
      title,
      enseignant,
      personnel,
      date_depart,
      date_retour,
      lieu_depart,
      lieu_arrive,
      accompagnants,
      info_voiture,
      pdfBase64String,
      pdfExtension,
      etat
    } = req.body;

    const pdfPath = "files/deplacementFiles/pdf/";

    const pdfFilename = globalFunctions.generateUniqueFilename(pdfExtension, 'deplacementPDF');
   
    let documents = [
      {
        base64String: pdfBase64String,
        name: pdfFilename,
        extension: pdfExtension,
        path: pdfPath
      },
    ];
    let deplacement;
    
    if(personnel === ""){
      deplacement = await deplacementService.createDeplacement({
        title,
        enseignant,
        date_depart,
        date_retour,
        lieu_depart,
        lieu_arrive,
        accompagnants,
        info_voiture,
        fichier: pdfFilename,
        etat
      }, documents);
    }else{
      deplacement = await deplacementService.createDeplacement({
        title,
        personnel,
        date_depart,
        date_retour,
        lieu_depart,
        lieu_arrive,
        accompagnants,
        info_voiture,
        fichier: pdfFilename,
        etat
      }, documents);
    }

    res.status(201).json(deplacement);
  } catch (error) {
    console.error("Error creating deplacement:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllDeplacements = async (req, res) => {
  try {
    const deplacements = await deplacementService.getAllDeplacements();
    res.status(200).json(deplacements);
  } catch (error) {
    console.error("Error fetching all deplacements:", error);
    res.status(500).json({ message: error.message });
  }
};

const getDeplacementById = async (req, res) => {
  try {
    const deplacement = await deplacementService.getDeplacementById(req.body._id);
    if (!deplacement) {
      return res.status(404).json({ message: 'deplacement not found' });
    }
    res.status(200).json(deplacement);
  } catch (error) {
    console.error("Error fetching deplacement by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateDeplacement = async (req, res) => {
  try {
      const {
          _id,
          title,
          enseignant,
          personnel,
          date_depart,
          date_retour,
          lieu_depart,
          lieu_arrive,
          accompagnants,
          info_voiture,
          pdfBase64String,
          pdfExtension,
          etat
      } = req.body;

      const pdfPath = "files/deplacementFiles/pdf/";
    

      let documents = [];
      
      if (pdfBase64String && pdfExtension) {
          const pdfFilename = globalFunctions.generateUniqueFilename(pdfExtension, 'deplacementPDF');
          documents.push({
              base64String: pdfBase64String,
              name: pdfFilename,
              extension: pdfExtension,
              path: pdfPath
          });
      }

      const updatedDeplacement = await deplacementService.updateDeplacement(_id, {
        title,
        enseignant,
        personnel,
        date_depart,
        date_retour,
        lieu_depart,
        lieu_arrive,
        accompagnants,
        info_voiture,
          fichier: documents.find(doc => doc.path === pdfPath)?.name,
          etat
        
      }, documents);

      if (!updatedDeplacement) {
          return res.status(404).json({ message: 'deplacement not found' });
      }

      res.status(200).json(updatedDeplacement);
  } catch (error) {
      console.error("Error updating Deplacement :", error);
      res.status(500).json({ message: error.message });
  }
};

const deleteDeplacement = async (req, res) => {
  try {
    const deletedDeplacement = await deplacementService.deleteDeplacement(req.body._id);
    if (!deletedDeplacement) {
      return res.status(404).json({ message: 'deplacement not found' });
    }
    res.status(200).json({ message: 'deplacement deleted successfully' });
  } catch (error) {
    console.error("Error deleting deplacement", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDeplacement,
  getAllDeplacements,
  getDeplacementById,
  updateDeplacement,
  deleteDeplacement
};
