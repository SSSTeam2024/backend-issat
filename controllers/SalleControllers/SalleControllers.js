const salleService = require("../../services/SalleServices/SalleServices");

const addSalle = async (req, res) => {
  try {
    const { salle, emplacement, type_salle, departement } = req.body;

    const salleJson = await salleService.createSalle({
      salle,
      emplacement,
      type_salle,
      departement,
    });
    res.json(salleJson);
  } catch (error) {
    console.error(error);
  }
};

const updateSalleById = async (req, res) => {
  try {
    const salleId = req.params.id;
    const { salle, emplacement, type_salle, departement } = req.body;

    const updatedSalle = await salleService.updateSalle(salleId, {
      salle,
      emplacement,
      type_salle,
      departement,
    });

    if (!updatedSalle) {
      return res.status(404).send("Salle not found!");
    }
    res.json(updatedSalle);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSalleById = async (req, res) => {
  try {
    const salleId = req.params.id;

    const getSalle = await salleService.getSalleById(salleId);

    if (!getSalle) {
      return res.status(404).send("Salle not found");
    }
    res.json(getSalle);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllSalles = async (req, res) => {
  try {
    const salles = await salleService.getSalles();
    res.json(salles);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteSalleById = async (req, res) => {
  try {
    const salleId = req.params.id;

    const deletedSalle = await salleService.deleteSalleById(salleId);

    if (!deletedSalle) {
      return res.status(404).send("Salle not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
//get salle by day and time

const getSallesByDayAndTime = async (req, res) => {
  try {
    const {
      day,
      start_time,
      end_time,
      session_type,
      date_fin_emploi_period,
      date_debut_emploi_period,
      semestre,
    } = req.body;

    const rooms = await salleService.getSallesByDayAndTime(
      day,
      start_time,
      end_time,
      session_type,
      date_fin_emploi_period,
      date_debut_emploi_period,
      semestre
    );

    if (!rooms) {
      return res.status(404).send("No rooms");
    }
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSallesDispoRattrapage = async (req, res) => {
  try {
    const {
      day,
      date_rattrapage,
      start_time,
      end_time,
      date_fin_emploi_period,
      date_debut_emploi_period,
      semestre,
    } = req.body;

    const rooms = await salleService.getSallesDispoRattrapage(
      day,
      date_rattrapage,
      start_time,
      end_time,
      date_fin_emploi_period,
      date_debut_emploi_period,
      semestre
    );

    if (!rooms) {
      return res.status(404).send("No rooms");
    }
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  deleteSalleById,
  getAllSalles,
  updateSalleById,
  getSalleById,
  addSalle,
  getSallesByDayAndTime,
  getSallesDispoRattrapage,
};