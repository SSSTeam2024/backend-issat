const classEmploiPeriodiqueModel = require("../../model/ClassEmploiPeriodiqueModel/ClassEmploiPeriodiqueModel");

const createClassEmploiPeriodique = async (params) => {
  return await classEmploiPeriodiqueModel.create(params);
};

const getClassEmploiPeriodique = async (id) => {
  const query = {
    id_classe: id,
  };
  return await classEmploiPeriodiqueModel.find(query).populate("id_classe");
};

const getClassEmploiPeriodiqueByState = async (id, semestre) => {
  const query = {
    etat: "En élaboration",
    id_classe: id,
    semestre: semestre,
  };
  return await classEmploiPeriodiqueModel.find(query).populate("id_classe");
};

const getAllClassEmploiPeriodiqueBySemestre = async (semestre) => {
  const query = {
    semestre: semestre,
  };
  return await classEmploiPeriodiqueModel.find(query).populate("id_classe");
};

const getEmploiPeriodiqueByClass = async (classId, semestre) => {
  const query = {
    semestre: semestre,
    id_classe: classId,
    etat: "En élaboration",
  };
  return await classEmploiPeriodiqueModel.find(query).populate("id_classe");
};

const updateClassEmploiPeriodique = async (id, updateData) => {
  return await classEmploiPeriodiqueModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

module.exports = {
  createClassEmploiPeriodique,
  getClassEmploiPeriodique,
  updateClassEmploiPeriodique,
  getAllClassEmploiPeriodiqueBySemestre,
  getEmploiPeriodiqueByClass,
  getClassEmploiPeriodiqueByState,
};