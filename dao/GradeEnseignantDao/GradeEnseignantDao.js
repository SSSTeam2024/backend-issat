const gradeEnseignant = require("../../model/GradeEnseignantModel/GradeEnseignantModel");

const createGradeEnseignant = async (grade_enseignant) => {
  return await gradeEnseignant.create(grade_enseignant);
};

const getGradesEnseignant = async () => {
  const result = await gradeEnseignant.find();
  return result;
};


const updateGradeEnseignant = async (id, updateData) => {
  return await gradeEnseignant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteGradeEnseignant = async (id) => {
  return await gradeEnseignant.findByIdAndDelete(id);
};

const getGradeEnseignantById = async (id) => {
  return await gradeEnseignant.findById(id);
};


module.exports = {
    createGradeEnseignant,
    getGradesEnseignant,
    updateGradeEnseignant,
    deleteGradeEnseignant,
    getGradeEnseignantById,

};