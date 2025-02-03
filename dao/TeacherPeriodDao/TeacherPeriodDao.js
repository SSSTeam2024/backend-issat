const teacherPeriodModel = require("../../model/TeacherPeriodModel/TeacherPeriodModel");

const createTeacherPeriod = async (params) => {
  return await teacherPeriodModel.create(params);
};

const getTeacherPeriod = async (id, semestre) => {
  const query = {
    id_teacher: id,
    semestre: semestre,
  };
  return await teacherPeriodModel
    .find(query)
    .populate("id_classe_period")
    .populate("id_teacher");
};

const getTeacherPeriodByIdClassPeriod = async (
  emploiPeriodique_id,
  id_teacher
) => {
  const query = {
    id_classe_period: emploiPeriodique_id,
    id_teacher: id_teacher,
  };
  return await teacherPeriodModel
    .find(query)
    .populate("id_classe_period")
    .populate("id_teacher");
};

const updateTeacherPeriod = async (id, nbr_heure) => {
  return await teacherPeriodModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        nbr_heure: nbr_heure,
      },
    },
    { new: true }
  );
};

const fetchPeriodsBySemesterAndTeacherId = async (semester, teacherId) => {
  try {
    return await teacherPeriodModel
      .find({
        semestre: semester,
        id_teacher: teacherId,
      })
      .populate("id_teacher")
      .populate("id_classe_period");
  } catch (error) {
    throw new Error("Error fetching periods: " + error.message);
  }
};

module.exports = {
  createTeacherPeriod,
  getTeacherPeriod,
  updateTeacherPeriod,
  getTeacherPeriodByIdClassPeriod,
  fetchPeriodsBySemesterAndTeacherId,
};