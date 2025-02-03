const Mission = require('../../model/MissionModel/Mission');

const createMission = async (missionData) => {
  const mission = new Mission(missionData);
  return mission.save();
};

const getAllMissions = async () => {
  return Mission.find().populate('personnel').populate('enseignant');
};

const getMissionById = async (id) => {
  return Mission.findById(id);
};

const updateMission = async (id, updateData) => {
  return Mission.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteMission = async (id) => {
  return Mission.findByIdAndDelete(id);
};

module.exports = {
  createMission,
  getAllMissions,
  getMissionById,
  updateMission,
  deleteMission
};