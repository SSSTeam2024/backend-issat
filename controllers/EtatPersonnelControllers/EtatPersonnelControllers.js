const EtatPersonnelService = require("../../services/EtatPersonnelServices/EtatPersonnelServices");

const addEtatPersonnel = async (req, res) => {
  try {
    const { etat_ar, etat_fr } = req.body;

    const etatPersonnel = await EtatPersonnelService.registerEtatPersonnel({
      etat_ar,
      etat_fr,
    });
    res.json(etatPersonnel);
  } catch (error) {
    console.error(error);
  }
};

const updateEtatPersonnelById = async (req, res) => {
  try {
    const etatPersonnelId = req.params.id;
    const { etat_ar, etat_fr } = req.body;

    const updatedEtatPersonnel =
      await EtatPersonnelService.updateEtatPersonnelDao(etatPersonnelId, {
        etat_ar,
        etat_fr,
      });

    if (!updatedEtatPersonnel) {
      return res.status(404).send("Etat Personnel not found!");
    }
    res.json(updatedEtatPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtatPersonnelById = async (req, res) => {
  try {
    const etatPersonnelId = req.params.id;

    const getEtatPersonnel = await EtatPersonnelService.getEtatPersonnelDaoById(
      etatPersonnelId
    );

    if (!getEtatPersonnel) {
      return res.status(404).send("Etat Personnel not found");
    }
    res.json(getEtatPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllEtatPersonnel = async (req, res) => {
  try {
    const etatPersonnels = await EtatPersonnelService.getEtatsPersonnelDao();
    res.json(etatPersonnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEtatPersonnelById = async (req, res) => {
  try {
    const etatPersonnelId = req.params.id;

    const deletedEtatPersonnel =
      await EtatPersonnelService.deleteEtatPersonnelDao(etatPersonnelId);

    if (!deletedEtatPersonnel) {
      return res.status(404).send("Etat Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
//

module.exports = {
  deleteEtatPersonnelById,
  getAllEtatPersonnel,
  getEtatPersonnelById,
  updateEtatPersonnelById,
  addEtatPersonnel,
};