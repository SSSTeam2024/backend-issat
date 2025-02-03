const typeSeanceService = require("../../services/TypeSeanceServices/TypeSeanceServices");

const createTypeSeance = async (req, res) => {
  try {
    const { seance_ar, seance_fr, abreviation, charge } = req.body;
    console.log(req.body);
    const typeSeanceJson = await typeSeanceService.createTypeSeance({
      seance_ar,
      seance_fr,
      abreviation,
      charge,
    });
    res.json(typeSeanceJson);
  } catch (error) {
    console.error(error);
  }
};
const updateTypeSeance = async (req, res) => {
  try {
    const { _id, seance_ar, seance_fr, abreviation, charge } = req.body;
    const updatedTypeSeance = await typeSeanceService.updateTypeSeance(_id, {
      seance_ar,
      seance_fr,
      abreviation,
      charge,
    });

    if (!updatedTypeSeance) {
      return res.status(404).send("Type Seance not found!");
    }

    res.json(updatedTypeSeance);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTypeSeances = async (req, res) => {
  try {
    const typeSeances = await typeSeanceService.getTypeSeances();
    res.json(typeSeances);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteTypeSeance = async (req, res) => {
  try {
    const typeSeanceId = req.params.id;

    const deletedTypeSeance = await typeSeanceService.deleteTypeSeance(
      typeSeanceId
    );

    if (!deletedTypeSeance) {
      return res.status(404).send("Type Seance not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createTypeSeance,
  deleteTypeSeance,
  getTypeSeances,
  updateTypeSeance,
};