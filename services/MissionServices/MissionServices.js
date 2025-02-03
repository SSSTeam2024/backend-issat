const missionDao = require('../../dao/MissionDao/MissionDao');




const createMission = async (missionData) => {
  try {
    return await missionDao.createMission(missionData);
  } catch (error) {
    console.error("Error creating Mission:", error);
    throw error;
  }
};

const getAllMissions = async () => {
  return missionDao.getAllMissions();
};

const getMissionById = async (id) => {
  return missionDao.getMissionById(id);
};



const deleteMission = async (id) => {
  return missionDao.deleteMission(id);
};

module.exports = {
  createMission,
  getAllMissions,
  getMissionById,
  deleteMission
};