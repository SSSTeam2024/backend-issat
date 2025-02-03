const avisEnseignantService = require('../../services/AvisEnseignantServices/AvisEnseignantServices');
const globalFunctions = require("../../utils/globalFunctions");

const createAvisEnseignant = async (req, res) => {
  try {
    const {
      title,
      description,
      auteurId,
      departement=[],
      lien,
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings=[],
      galleryExtensions=[],
      date_avis
    } = req.body;

   
    const pdfPath = "files/avisEnseignantFiles/pdf/";
    const galleryPath = "files/avisEnseignantFiles/photo/";

    const pdfFilename = globalFunctions.generateUniqueFilename(pdfExtension, 'avisEnseignantPDF');
    const galleryFilenames = galleryExtensions.map((ext, index) => 
      globalFunctions.generateUniqueFilename(ext, `avisEnseignantPHOTO_${index}`)
    );
   
    let documents = [
      {
        base64String: pdfBase64String,
        name: pdfFilename,
        extension: pdfExtension,
        path: pdfPath
      },
      ...galleryBase64Strings.map((base64String, index) => ({
        base64String: base64String,
        extension: galleryExtensions[index],
        name: galleryFilenames[index],
        path: galleryPath
      }))
    ];
    const avisEnseignant = await avisEnseignantService.createAvisEnseignant({
      title,
      description,
      auteurId,
      departement,
      lien,
      pdf: pdfFilename,
      gallery: galleryFilenames,
      date_avis
    }, documents);

    res.status(201).json(avisEnseignant);
  } catch (error) {
    console.error("Error creating AvisEnseignant:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllAvisEnseignants = async (req, res) => {
  try {
    const avisEnseignants = await avisEnseignantService.getAllAvisEnseignants();
    res.status(200).json(avisEnseignants);
  } catch (error) {
    console.error("Error fetching all AvisEnseignants:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAvisEnseignantById = async (req, res) => {
  try {
    const avisEnseignant = await avisEnseignantService.getAvisEnseignantById(req.body._id);
    if (!avisEnseignant) {
      return res.status(404).json({ message: 'AvisEnseignant not found' });
    }
    res.status(200).json(avisEnseignant);
  } catch (error) {
    console.error("Error fetching AvisEnseignant by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateAvisEnseignant = async (req, res) => {
  try {
      const {
          _id,
          title,
      description,
      auteurId,
      departement=[],
      lien,
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings=[],
      galleryExtensions=[],
      date_avis
      } = req.body;

      const pdfPath = "files/avisEnseignantFiles/pdf/";
      const galleryPath = "files/avisEnseignantFiles/photo/";

      let documents = [];
      
      if (pdfBase64String && pdfExtension) {
          const pdfFilename = globalFunctions.generateUniqueFilename(pdfExtension, 'AvisEnseignantPDF');
          documents.push({
              base64String: pdfBase64String,
              name: pdfFilename,
              extension: pdfExtension,
              path: pdfPath
          });
      }

      if (galleryBase64Strings.length > 0 && galleryExtensions.length > 0) {
          const galleryFilenames = galleryExtensions.map((ext, index) => 
              globalFunctions.generateUniqueFilename(ext, `AvisEnseignantPHOTO_${index}`)
          );

          galleryBase64Strings.forEach((base64String, index) => {
              documents.push({
                  base64String: base64String,
                  extension: galleryExtensions[index],
                  name: galleryFilenames[index],
                  path: galleryPath
              });
          });
      }

      const updatedAvisEnseignant = await avisEnseignantService.updateAvisEnseignant(_id, {
          title,
          description,
          category,
          departement:[],
          auteurId,
          address,
          lien,
          pdf: documents.find(doc => doc.path === pdfPath)?.name,
          gallery: documents.filter(doc => doc.path === galleryPath).map(doc => doc.name),
          date_avis
      }, documents);

      if (!updatedAvisEnseignant) {
          return res.status(404).json({ message: 'Avis Enseignant not found' });
      }

      res.status(200).json(updatedAvisEnseignant);
  } catch (error) {
      console.error("Error updating Avis Enseignant :", error);
      res.status(500).json({ message: error.message });
  }
};

const deleteAvisEnseignant = async (req, res) => {
  try {
    const deletedAvisEnseignant = await avisEnseignantService.deleteAvisEnseignant(req.body._id);
    if (!deletedAvisEnseignant) {
      return res.status(404).json({ message: 'AvisEnseignant not found' });
    }
    res.status(200).json({ message: 'AvisEnseignant deleted successfully' });
  } catch (error) {
    console.error("Error deleting AvisEnseignant:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAvisEnseignant,
  getAllAvisEnseignants,
  getAvisEnseignantById,
  updateAvisEnseignant,
  deleteAvisEnseignant
};
