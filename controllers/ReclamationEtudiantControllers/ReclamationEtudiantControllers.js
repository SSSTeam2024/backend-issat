const reclamationService = require('../../services/ReclamationEtudiantServices/ReclamationEtudiantServices');
const globalFunctions = require("../../utils/globalFunctions");
const createReclamation = async (req, res) => {
  try {
    let {
      studentId,
      title,
      description,
      response,
      status = 'en attente', // Set default status if not provided
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings = [],
      galleryExtensions = [],
      videoBase64String,
      videoExtension,
    } = req.body;
    const validStatuses = ['en attente', 'traité', 'rejeté'];
    if (!validStatuses.includes(status)) {
      status = 'en attente'; // Default to 'en attente' if the provided status is invalid
    }
    const pdfPath = "files/reclamationEtudiantFiles/pdf/";
    const galleryPath = "files/reclamationEtudiantFiles/photo/";
    const videoPath = "files/reclamationEtudiantFiles/video/";

    const pdfFilename = globalFunctions.generateUniqueFilename(pdfExtension, 'reclamationEtudiantPDF');
    const galleryFilenames = galleryExtensions.map((ext, index) => 
      globalFunctions.generateUniqueFilename(ext, `reclamationEtudiantPHOTO_${index}`)
    );
    const videoFilename = globalFunctions.generateUniqueFilename(videoExtension, 'reclamationEtudiantVIDEO');

    let documents = [
      {
        base64String: pdfBase64String,
        name: pdfFilename,
        extension: pdfExtension,
        path: pdfPath,
      },
      ...galleryBase64Strings.map((base64String, index) => ({
        base64String: base64String,
        extension: galleryExtensions[index],
        name: galleryFilenames[index],
        path: galleryPath,
      })),
      {
        base64String: videoBase64String,
        name: videoFilename,
        extension: videoExtension,
        path: videoPath,
      }
    ];

    const reclamationEtudiant = await reclamationService.createReclamation({
      studentId,
      title,
      description,
      response,
      status,
      photos: galleryFilenames,
      pdf: pdfFilename,
      video: videoFilename,
    }, documents);

    res.status(201).json(reclamationEtudiant);
  } catch (error) {
    console.error("Error creating Reclamation etudiant:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllReclamations = async (req, res) => {
  try {
    const reclamations = await reclamationService.getAllReclamations();
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReclamationById = async (req, res) => {
  try {
    const reclamation = await reclamationService.getReclamationById(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }
    res.status(200).json(reclamation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReclamation = async (req, res) => {
  try {
    const updatedReclamation = await reclamationService.updateReclamation(req.body._id, req.body);
    if (!updatedReclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }
    res.status(200).json(updatedReclamation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReclamation = async (req, res) => {
  try {
    const deletedReclamation = await reclamationService.deleteReclamation(req.params.id);
    if (!deletedReclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }
    res.status(200).json({ message: 'Reclamation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReclamation,
  getAllReclamations,
  getReclamationById,
  updateReclamation,
  deleteReclamation
};