const posteEnseignantService = require("../../services/PosteEnseignantServices/PosteEnseignantServices");

const createPosteEnseignant = async (req, res) => {
  try {
    const { poste_ar, poste_fr } = req.body;

    const postetEnseignant = await posteEnseignantService.createPosteEnseignant(
      {
        poste_ar,
        poste_fr,
      }
    );
    res.json(postetEnseignant);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).send("Value must be unique.");
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updatePosteEnseignantById = async (req, res) => {
  try {
    const posteEnseignantId = req.params.id;
    const { poste_ar, poste_fr } = req.body;

    const updatedPosteEnseignant =
      await posteEnseignantService.updatePosteEnseignantDao(posteEnseignantId, {
        poste_ar,
        poste_fr,
      });

    if (!updatedPosteEnseignant) {
      return res.status(404).send("Poste Enseignant not found!");
    }
    res.json(updatedPosteEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPosteEnseignantById = async (req, res) => {
  try {
    const posteEnseignantId = req.params.id;

    const getPosteEnseignant =
      await posteEnseignantService.getPosteEnseignantDaoById(posteEnseignantId);

    if (!getPosteEnseignant) {
      return res.status(404).send("Poste Enseignant not found");
    }
    res.json(getPosteEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllPostesEnseignant = async (req, res) => {
  try {
    const posteEnseignants =
      await posteEnseignantService.getPostesEnseignantDao();
    res.json(posteEnseignants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deletePosteEnseignantById = async (req, res) => {
  try {
    const posteEnseignantId = req.params.id;

    const deletedPosteEnseignant =
      await posteEnseignantService.deletePosteEnseignantDao(posteEnseignantId);

    if (!deletedPosteEnseignant) {
      return res.status(404).send("Poste Enseignant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deletePosteEnseignantById,
  getAllPostesEnseignant,
  getPosteEnseignantById,
  createPosteEnseignant,
  updatePosteEnseignantById,
};