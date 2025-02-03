const seanceService = require("../../services/SeanceServices/SeanceServices");

const createSeance = async (req, res) => {
  try {
    const {
      jour,
      matiere,
      enseignant,
      classe,
      salle,
      heure_fin,
      heure_debut,
      semestre,
      type_seance,
      emploiPeriodique_id,
    } = req.body;
    console.log(req.body);
    const seanceJson = await seanceService.createSeance({
      jour,
      matiere,
      enseignant,
      classe,
      salle,
      heure_fin,
      heure_debut,
      type_seance,
      semestre,
      emploiPeriodique_id,
    });
    res.json(seanceJson);
  } catch (error) {
    console.error(error);
  }
};

const updateSeanceById = async (req, res) => {
  try {
    const seanceId = req.params.id;
    const {
      jour,
      matiere,
      enseignant,
      classe,
      salle,
      heure_fin,
      heure_debut,
      semestre,
      type_seance,
    } = req.body;

    const updatedSeance = await seanceService.updateSeance(seanceId, {
      jour,
      matiere,
      enseignant,
      classe,
      salle,
      heure_fin,
      heure_debut,
      semestre,
      type_seance,
    });

    if (!updatedSeance) {
      return res.status(404).send("Seance not found!");
    }
    res.json(updatedSeance);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSeanceById = async (req, res) => {
  try {
    const seanceId = req.params.id;

    const getSeance = await seanceService.getSeanceById(seanceId);

    if (!getSeance) {
      return res.status(404).send("Seance not found");
    }
    res.json(getSeance);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSeancesByIdTeacher = async (req, res) => {
  try {
    const { teacher_id, jour, emplois_periodiques_ids } = req.body;

    const seances = await seanceService.getSeancesByIdTeacher(
      teacher_id,
      jour,
      emplois_periodiques_ids
    );

    if (!seances) {
      return res.status(404).send("Pas de séances");
    }
    res.json(seances);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPeriodicSessionsByTeacher = async (req, res) => {
  try {
    const { teacher_id, emplois_periodiques_ids } = req.body;

    const seances = await seanceService.getPeriodicSessionsByTeacher(
      teacher_id,
      emplois_periodiques_ids
    );

    if (!seances) {
      return res.status(404).send("Pas de séances");
    }
    res.json(seances);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSessionsByRoomId = async (req, res) => {
  try {
    const roomId = req.params.id;
    console.log(roomId);
    const seances = await seanceService.getSessionsByRoomId(roomId);
    console.log(seances);
    if (!seances) {
      return res.status(404).send("Pas de séances");
    }
    res.json(seances);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllSeances = async (req, res) => {
  try {
    const seances = await seanceService.getAllSeances();
    res.json(seances);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllSeancesByIdEmploi = async (req, res) => {
  try {
    const idEmploi = req.params.id;
    if (idEmploi === undefined || idEmploi === null || idEmploi === "") {
      const error = { message: "Invalid session id" };
      res.json(error);
    } else {
      const seances = await seanceService.getAllSeancesByIdEmploi(idEmploi);
      res.json(seances);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteSeanceById = async (req, res) => {
  try {
    const seance = req.body;

    const deletedSeance = await seanceService.deleteSeance(seance);

    if (!deletedSeance) {
      return res.status(404).send("Seance not found");
    }

    res
      .status(200)
      .json({ message: "Seance deleted successfully", data: deletedSeance });
  } catch (error) {
    console.error("Error in deleteSeanceById controller:", error);
    res.status(500).send(error.message);
  }
};

const fetchSeancesByIdTeacherAndSemestre = async (req, res) => {
  try {
    const { enseignantId, semestre } = req.params;

    const seances = await seanceService.getSeancesByIdTeacherAndSemestre(
      enseignantId,
      semestre
    );
    return res.status(200).json(seances);
  } catch (error) {
    console.error("Error fetching seances:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  deleteSeanceById,
  getAllSeances,
  getSeanceById,
  updateSeanceById,
  createSeance,
  getAllSeancesByIdEmploi,
  getSeancesByIdTeacher,
  getSessionsByRoomId,
  fetchSeancesByIdTeacherAndSemestre,
  getPeriodicSessionsByTeacher,
};