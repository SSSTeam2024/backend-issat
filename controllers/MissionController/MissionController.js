const missionService = require('../../services/MissionServices/MissionServices');


const createMission = async (req, res) => {
  try {
    const {
      motif,
      enseignant,
      personnel,
      date_affectation,
      date_fin,
      objectif,
      etat
    } = req.body;

    
    if(personnel === ""){
      mission = await missionService.createMission({
        motif,
        enseignant,
        date_affectation,
        date_fin,
        objectif,
        etat
      });
    }else{
      mission = await missionService.createMission({
        motif,
      personnel,
      date_affectation,
      date_fin,
      objectif,
      etat
      });
    }

    res.status(201).json(mission);
  } catch (error) {
    console.error("Error creating mission:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllMissions = async (req, res) => {
  try {
    const missions = await missionService.getAllMissions();
    res.status(200).json(missions);
  } catch (error) {
    console.error("Error fetching all missions:", error);
    res.status(500).json({ message: error.message });
  }
};

const getMissionById = async (req, res) => {
  try {
    const mission = await missionService.getMissionById(req.body._id);
    if (!mission) {
      return res.status(404).json({ message: 'mission not found' });
    }
    res.status(200).json(mission);
  } catch (error) {
    console.error("Error fetching mission by ID:", error);
    res.status(500).json({ message: error.message });
  }
};



const deleteMission = async (req, res) => {
  try {
    const deletedMission = await missionService.deleteMission(req.body._id);
    if (!deletedMission) {
      return res.status(404).json({ message: 'mission not found' });
    }
    res.status(200).json({ message: 'mission deleted successfully' });
  } catch (error) {
    console.error("Error deleting mission", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMission,
  getAllMissions,
  getMissionById,
  deleteMission
};
