const typeParcoursService = require("../../services/TypeParcoursServices/TypeParcoursServices");

const createTypeParcours = async (req, res) => {
  try {
    const { name_type_parcours_fr, name_type_parcours_ar, abreviation } =
      req.body;

    const typeParcours = await typeParcoursService.createTypeParcours({
      name_type_parcours_fr,
      name_type_parcours_ar,
      abreviation,
    });
    res.json(typeParcours);
  } catch (error) {
    console.error(error);
  }
};

const updateTypeParcours = async (req, res) => {
  try {
    const typeParcoursId = req.params.id;
    const { name_type_parcours_fr, name_type_parcours_ar, abreviation } =
      req.body;

    const updatedTypeParcours = await typeParcoursService.updateTypeParcours(
      typeParcoursId,
      {
        name_type_parcours_fr,
        name_type_parcours_ar,
        abreviation,
      }
    );

    if (!updatedTypeParcours) {
      return res.status(404).send("Type Parcours not found!");
    }
    res.json(updatedTypeParcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTypesParcours = async (req, res) => {
  try {
    const typeParcours = await typeParcoursService.getTypeParcours();
    res.json(typeParcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteTypeParcours = async (req, res) => {
  try {
    const typeParcoursId = req.params.id;

    const deletedTypeParcours = await typeParcoursService.deleteTypeParcours(
      typeParcoursId
    );

    if (!deletedTypeParcours) {
      return res.status(404).send("Type Parcours not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteTypeParcours,
  getTypesParcours,
  updateTypeParcours,
  createTypeParcours,
};
