const personnelModel = require("../../model/PersonnelModel/PersonnelModel");

const createPersonnel = async (personnel) => {
  return await personnelModel.create(personnel);
};

const getPersonnels = async () => {
  return await personnelModel
    .find()
    .populate("etat_compte")
    .populate("categorie")
    .populate("grade")
    .populate("poste")
    .populate("service");
};

const updatePersonnel = async (id, updateData) => {
  return await personnelModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePersonnel = async (id) => {
  return await personnelModel.findByIdAndDelete(id);
};

const getPersonnelById = async (id) => {
  return await personnelModel
    .findById(id)
    .populate("etat_compte")
    .populate("categorie")
    .populate("grade")
    .populate("poste")
    .populate("service");
};


const assignPapierToPersonnel = async (personnelId, papierIds) => {
  try {
    const personnel = await personnelModel.findById(personnelId);
    if (!personnel) {
      throw new Error('Personnel not found');
    }
    for (const paperId of papierIds) {
      personnel.papers.push(paperId);
    }

    await personnel.save();
    return personnel;
  } catch (error) {
    console.error('Error in assignPapierToPersonnel:', error);
    throw new Error(`Service Error: DAO Error: ${error.message}`);
  }
};

module.exports = {
  createPersonnel,
  getPersonnels,
  updatePersonnel,
  getPersonnelById,
  deletePersonnel,
  assignPapierToPersonnel

};