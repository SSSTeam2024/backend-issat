const avisPersonnelService = require('../../services/AvisPersonnelServices/AvisPersonnelServices');
const globalFunctions = require("../../utils/globalFunctions");

const createAvisPersonnel = async (req, res) => {
  try {
    const {
      title,
      description,
      auteurId,
      lien,
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings=[],
      galleryExtensions=[],
      date_avis
    } = req.body;

   
    const pdfPath = "files/avisPersonnelFiles/pdf/";
    const galleryPath = "files/avisPersonnelFiles/photo/";

    const pdfFilename = globalFunctions.generateUniqueFilename(pdfExtension, 'avisPersonnelPDF');
    const galleryFilenames = galleryExtensions.map((ext, index) => 
      globalFunctions.generateUniqueFilename(ext, `avisPersonnelPHOTO_${index}`)
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
    const avisPersonnel = await avisPersonnelService.createAvisPersonnel({
      title,
      description,
      auteurId,
      lien,
      pdf: pdfFilename,
      gallery: galleryFilenames,
      date_avis
    }, documents);

    res.status(201).json(avisPersonnel);
  } catch (error) {
    console.error("Error creating AvisPersonnel:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllAvisPersonnels = async (req, res) => {
  try {
    const avisPersonnels = await avisPersonnelService.getAllAvisPersonnels();
    res.status(200).json(avisPersonnels);
  } catch (error) {
    console.error("Error fetching all AvisPersonnels:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAvisPersonnelById = async (req, res) => {
  try {
    const avisPersonnel = await avisPersonnelService.getAvisPersonnelById(req.body._id);
    if (!avisPersonnel) {
      return res.status(404).json({ message: 'AvisPersonnel not found' });
    }
    res.status(200).json(avisPersonnel);
  } catch (error) {
    console.error("Error fetching AvisPersonnel by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateAvisPersonnel = async (req, res) => {
  try {
      const {
          _id,
          title,
      description,
      auteurId,
      lien,
      pdfBase64String,
      pdfExtension,
      galleryBase64Strings=[],
      galleryExtensions=[],
      date_avis
      } = req.body;

      const pdfPath = "files/avisPersonnelFiles/pdf/";
      const galleryPath = "files/avisPersonnelFiles/photo/";

      let documents = [];
      
      if (pdfBase64String && pdfExtension) {
          const pdfFilename = globalFunctions.generateUniqueFilename(pdfExtension, 'AvisPersonnelPDF');
          documents.push({
              base64String: pdfBase64String,
              name: pdfFilename,
              extension: pdfExtension,
              path: pdfPath
          });
      }

      if (galleryBase64Strings.length > 0 && galleryExtensions.length > 0) {
          const galleryFilenames = galleryExtensions.map((ext, index) => 
              globalFunctions.generateUniqueFilename(ext, `AvisPersonnelPHOTO_${index}`)
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

      const updatedAvisPersonnel = await avisPersonnelService.updateAvisPersonnel(_id, {
          title,
          description,
          category,
          
          auteurId,
          address,
          lien,
          pdf: documents.find(doc => doc.path === pdfPath)?.name,
          gallery: documents.filter(doc => doc.path === galleryPath).map(doc => doc.name),
          date_avis
      }, documents);

      if (!updatedAvisPersonnel) {
          return res.status(404).json({ message: 'Avis Personnel not found' });
      }

      res.status(200).json(updatedAvisPersonnel);
  } catch (error) {
      console.error("Error updating Avis Personnel :", error);
      res.status(500).json({ message: error.message });
  }
};

const deleteAvisPersonnel = async (req, res) => {
  try {
    const deletedAvisPersonnel = await avisPersonnelService.deleteAvisPersonnel(req.body._id);
    if (!deletedAvisPersonnel) {
      return res.status(404).json({ message: 'Avis Personnel not found' });
    }
    res.status(200).json({ message: 'Avis Personnel deleted successfully' });
  } catch (error) {
    console.error("Error deleting Avis Personnel:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAvisPersonnel,
  getAllAvisPersonnels,
  getAvisPersonnelById,
  updateAvisPersonnel,
  deleteAvisPersonnel
};
