const GradePersonnelDao = require("../../dao/GradePersonnelDao/GradePersonnelDao");

const registerGradePersonnel = async (userData) => {
 
  return await GradePersonnelDao.createGradePersonnel(userData);
};

const updateGradePersonnelDao = async (id, updateData) => {
  return await GradePersonnelDao.updateGradePersonnel(id, updateData);
};

const getGradePersonnelDaoById = async (id) => {
  return await GradePersonnelDao.getGradePersonnelById(id)
};

const getGradesPersonnelDao = async () => {
  return await GradePersonnelDao.getGradesPersonnel()
};

const deleteGradePersonnelDao = async (id) => {
  return await GradePersonnelDao.deleteGradePersonnel(id)
};



module.exports = {
    registerGradePersonnel,
    deleteGradePersonnelDao,
    getGradesPersonnelDao,
    getGradePersonnelDaoById,
    updateGradePersonnelDao,

};