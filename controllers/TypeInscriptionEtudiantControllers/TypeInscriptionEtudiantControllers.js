const typeInscriptionEtudiantService = require("../../services/TypeInscriptionEtudiantServices/TypeInscriptionEtudiantServices");

const addTypeInscriptionEtudiant = async (req, res) => {
  try {
    const { value_type_inscription, type_ar, type_fr,files_type_inscription } = req.body;

    const typeInscriptionEtudiant = await typeInscriptionEtudiantService.registerTypeInscriptionEtudiantt({
        value_type_inscription, type_ar, type_fr,files_type_inscription
    });
    res.json(typeInscriptionEtudiant);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) { 
      res.status(400).send('Value must be unique.');
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updateTypeInscriptionEtudiantById = async (req, res) => {
  try {
    const typeInscriptionEtudianttId = req.params.id;
    const { value_type_inscription, type_ar, type_fr, files_type_inscription } = req.body;

    const updatedTypeInscriptionEtudiant = await typeInscriptionEtudiantService.updateTypeInscriptionEtudiantDao(typeInscriptionEtudianttId, {
        value_type_inscription, type_ar, type_fr, files_type_inscription
    });

    if (!updatedTypeInscriptionEtudiant) {
      return res.status(404).send("Type Inscription Etudiant not found!");
    }
    res.json(updatedTypeInscriptionEtudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTypeInscriptionEtudiantById = async (req, res) => {
  try {
    const typeInscriptionEtudiantId = req.params.id;

    const gettypeInscriptionEtudiant= await typeInscriptionEtudiantService.getTypeInscriptionEtudianttDaoById(typeInscriptionEtudiantId);

    if (!gettypeInscriptionEtudiant) {
      return res.status(404).send("Type Inscription Etudiant not found");
    }
    res.json(gettypeInscriptionEtudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllTypeInscriptionEtudiantt = async (req, res) => {
  try {
    const typeInscriptionEtudiants = await typeInscriptionEtudiantService.getTypeInscriptionsEtudianttDao();
    res.json(typeInscriptionEtudiants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteTypeInscriptionEtudianttById = async (req, res) => {
  try {
    const typeInscriptionEtudianttId = req.params.id;

    const deletedTypeInscriptionEtudiant = await typeInscriptionEtudiantService.deleteTypeInscriptionEtudianttDao(typeInscriptionEtudianttId);

    if (!typeInscriptionEtudianttId) {
      return res.status(404).send("Type Inscription Etudiant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
// 

module.exports = {
    deleteTypeInscriptionEtudianttById,
    getAllTypeInscriptionEtudiantt,
    getTypeInscriptionEtudiantById,
    updateTypeInscriptionEtudiantById,
    addTypeInscriptionEtudiant


};