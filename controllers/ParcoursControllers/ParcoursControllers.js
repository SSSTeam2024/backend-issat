const parcoursService = require("../../services/ParcoursServices/ParcoursServices");

const createParcours = async (req, res) => {
  try {
    const {
      code_parcours,
      nom_parcours,
      domaine,
      mention,
      type_parcours,
      modules,
    } = req.body;

    const parcours = await parcoursService.createParcours({
      code_parcours,
      nom_parcours,
      domaine,
      mention,
      type_parcours,
      modules,
    });
    res.json(parcours);
  } catch (error) {
    console.error(error);
  }
};

const updateParcours = async (req, res) => {
  try {
    const parcoursId = req.params.id;
    const {
      code_parcours,
      nom_parcours,
      domaine,
      mention,
      type_parcours,
      modules,
    } = req.body;

    const updatedParcours = await parcoursService.updateParcours(parcoursId, {
      code_parcours,
      nom_parcours,
      domaine,
      mention,
      type_parcours,
      modules,
    });

    if (!updatedParcours) {
      return res.status(404).send("Parcours not found!");
    }
    res.json(updatedParcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllParcours = async (req, res) => {
  try {
    const parcours = await parcoursService.getAllParcours();
    res.json(parcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteParcours = async (req, res) => {
  try {
    const parcoursId = req.params.id;

    const deletedParcoursId = await parcoursService.deleteParcours(parcoursId);

    if (!deletedParcoursId) {
      return res.status(404).send("Parcours not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteParcours,
  getAllParcours,
  updateParcours,
  createParcours,
};
