const moduleParcoursService = require("../../services/ModulesParcoursServices/ModulesParcoursServices");

const createModuleParcours = async (req, res) => {
  try {
    const {
      code_Ue,
      libelle,
      credit,
      coef,
      nature,
      regime,
      parcours,
      semestre,
    } = req.body;

    const moduleParcours = await moduleParcoursService.createModulesParcours({
      code_Ue,
      libelle,
      credit,
      coef,
      nature,
      regime,
      parcours,
      semestre,
    });
    res.json(moduleParcours);
  } catch (error) {
    console.error(error);
  }
};

const updateModuleParcours = async (req, res) => {
  try {
    const moduleParcoursId = req.params.id;
    const {
      code_Ue,
      libelle,
      credit,
      coef,
      nature,
      regime,
      parcours,
      matiere,
      semestre,
    } = req.body;

    const updatedModuleParcours =
      await moduleParcoursService.updateModuleParcours(moduleParcoursId, {
        code_Ue,
        libelle,
        credit,
        coef,
        nature,
        regime,
        parcours,
        matiere,
        semestre,
      });

    if (!updatedModuleParcours) {
      return res.status(404).send("Module Parcours not found!");
    }
    res.json(updatedModuleParcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllModulesParcours = async (req, res) => {
  try {
    const moduleParcours = await moduleParcoursService.getAllModulesParcours();
    res.json(moduleParcours);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteModuleParcours = async (req, res) => {
  try {
    const moduleParcoursId = req.params.id;

    const deletedModuleParcoursId =
      await moduleParcoursService.deleteModulesParcours(moduleParcoursId);

    if (!deletedModuleParcoursId) {
      return res.status(404).send("Module Parcours not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllModulesParcours,
  deleteModuleParcours,
  updateModuleParcours,
  createModuleParcours,
};
