const postePersonnelService = require("../../services/PostePersonnelServices/PostePersonnelServices");

const createPostePersonnel = async (req, res) => {
  try {
    const { poste_ar, poste_fr } = req.body;

    const postetPersonnel = await postePersonnelService.createPostePersonnel({
      poste_ar,
      poste_fr,
    });
    res.json(postetPersonnel);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).send("Value must be unique.");
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updatePostePersonnelById = async (req, res) => {
  try {
    const postePersonnelId = req.params.id;
    const { poste_ar, poste_fr } = req.body;

    const updatedPostePersonnel =
      await postePersonnelService.updatePostePersonnelDao(postePersonnelId, {
        poste_ar,
        poste_fr,
      });

    if (!updatedPostePersonnel) {
      return res.status(404).send("Poste Personnel not found!");
    }
    res.json(updatedPostePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPostePersonnelById = async (req, res) => {
  try {
    const postePersonnelId = req.params.id;

    const getPostePersonnel =
      await postePersonnelService.getPostePersonnelDaoById(postePersonnelId);

    if (!getPostePersonnel) {
      return res.status(404).send("Poste Personnel not found");
    }
    res.json(getPostePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllPostesPersonnel = async (req, res) => {
  try {
    const postePersonnels = await postePersonnelService.getPostesPersonnelDao();
    res.json(postePersonnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deletePostePersonnelById = async (req, res) => {
  try {
    const postePersonnelId = req.params.id;

    const deletedPostePersonnel =
      await postePersonnelService.deletePostePersonnelDao(postePersonnelId);

    if (!deletedPostePersonnel) {
      return res.status(404).send("Poste Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
//

module.exports = {
  deletePostePersonnelById,
  getAllPostesPersonnel,
  getPostePersonnelById,
  createPostePersonnel,
  updatePostePersonnelById,
};