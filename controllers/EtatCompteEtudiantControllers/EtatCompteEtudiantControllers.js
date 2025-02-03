const etatEtudiantService = require("../../services/EtatCompteEtudiantServices/EtatCompteEtudiantServices");

const addEtatEtudiant = async (req, res) => {
  try {
    const { value_etat_etudiant, etat_ar, etat_fr } = req.body;

    const etatEtudiant = await etatEtudiantService.registerEtatEtudiantt({
        value_etat_etudiant,
      etat_ar,
      etat_fr,
    });
    res.json(etatEtudiant);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) { 
      res.status(400).send('Value must be unique.');
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updateEtatEtudianttById = async (req, res) => {
  try {
    const etatEtudianttId = req.params.id;
    const { value_etat_etudiant, etat_ar, etat_fr } = req.body;

    const updatedEtatEtudiantt = await etatEtudiantService.updateEtatEtudiantDao(etatEtudianttId, {
        value_etat_etudiant, etat_ar, etat_fr
    });

    if (!updatedEtatEtudiantt) {
      return res.status(404).send("Etat Etudiant not found!");
    }
    res.json(updatedEtatEtudiantt);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtatEtudiantById = async (req, res) => {
  try {
    const etatEtudiantId = req.params.id;

    const getEtatEtudiant= await etatEtudiantService.getEtatEtudianttDaoById(etatEtudiantId);

    if (!getEtatEtudiant) {
      return res.status(404).send("Etat Etudiant not found");
    }
    res.json(getEtatEtudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllEtatEtudiantt = async (req, res) => {
  try {
    const etatEtudiants = await etatEtudiantService.getEtatsEtudianttDao();
    res.json(etatEtudiants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEtatEtudianttById = async (req, res) => {
  try {
    const etatEtudianttId = req.params.id;

    const deletedEtatEtudiant = await etatEtudiantService.deleteEtatEtudianttDao(etatEtudianttId);

    if (!deletedEtatEtudiant) {
      return res.status(404).send("Etat Etudiant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
// 

module.exports = {
    addEtatEtudiant,
    updateEtatEtudianttById,
    getEtatEtudiantById,
    getAllEtatEtudiantt,
    deleteEtatEtudianttById


};