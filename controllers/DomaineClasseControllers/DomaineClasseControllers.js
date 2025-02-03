const domaineService = require("../../services/DomaineClasseServices/DomaineClasseServices");

const createDomaineClasse = async (req, res) => {
  try {
    const { abreviation, name_domaine_fr, name_domaine_ar } = req.body;

    const domaineClasse = await domaineService.createDomaineClasse({
      abreviation,
      name_domaine_fr,
      name_domaine_ar,
    });
    res.json(domaineClasse);
  } catch (error) {
    console.error(error);
  }
};

const updateDoamineClasseById = async (req, res) => {
  try {
    const domaineClasseId = req.params.id;
    const { abreviation, name_domaine_fr, name_domaine_ar } = req.body;

    const updatedDomaineClasse = await domaineService.updateDomaineClasse(
      domaineClasseId,
      {
        abreviation,
        name_domaine_fr,
        name_domaine_ar,
      }
    );

    if (!updatedDomaineClasse) {
      return res.status(404).send("Domaine Classe not found!");
    }
    res.json(updatedDomaineClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllDomaineClasse = async (req, res) => {
  try {
    const domaineClasses = await domaineService.getDomainesClasse();
    res.json(domaineClasses);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteDomaineClasseById = async (req, res) => {
  try {
    const doamineClasseId = req.params.id;

    const deletedDoamineClasseId = await domaineService.deleteDomaineClasse(
      doamineClasseId
    );

    if (!deletedDoamineClasseId) {
      return res.status(404).send("Domaine Classe not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createDomaineClasse,
  updateDoamineClasseById,
  getAllDomaineClasse,
  deleteDomaineClasseById,
};
