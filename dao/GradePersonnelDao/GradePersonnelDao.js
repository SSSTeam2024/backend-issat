const gradePersonnel = require("../../model/GradePersonnelModel/GradePersonnelModel");

const createGradePersonnel = async (grade_perso) => {
  return await gradePersonnel.create(grade_perso);
};


const getGradesPersonnel = async () => {
  return await gradePersonnel.find();
};

const updateGradePersonnel = async (id, updateData) => {
  return await gradePersonnel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteGradePersonnel = async (id) => {
  return await gradePersonnel.findByIdAndDelete(id);
};

const getGradePersonnelById = async (id) => {
  return await gradePersonnel.findById(id);
};


module.exports = {
    createGradePersonnel,
    getGradesPersonnel,
    updateGradePersonnel,
    deleteGradePersonnel,
    getGradePersonnelById,

};