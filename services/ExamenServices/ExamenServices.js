const examenDao = require("../../dao/ExamenDao/ExamenDao");

const createExamen = async (examen) => {
  console.log("examen", examen);
  return await examenDao.createExamen(examen);
};

const updateExamen = async (id, updateData) => {
  return await examenDao.updateExamen(id, updateData);
};

const getExamenById = async (id) => {
  return await examenDao.getExamenById(id);
};

const getAllExamens = async () => {
  const result = await examenDao.getExamens();
  return result;
};

const deleteExamen = async (id) => {
  return await examenDao.deleteExamen(id);
};

const getExamensBySemesterAndRegime = async (semester, regime) => {
  return await examenDao.getExamensBySemesterAndRegime(semester, regime);
};

const editCalendrierExamens = async (editData) => {
  let id_Calendrier = editData.id_Calendrier;
  let epreuveId = editData.epreuveId;
  let epreuve_status = editData.epreuve_status;
  let nbre_present = editData.nbre_present;
  let nbre_absent = editData.nbre_absent;
  let nbre_exclus = editData.nbre_exclus;
  let notes = editData.notes;
  await examenDao.editCalendrierExamens(
    id_Calendrier,
    epreuveId,
    epreuve_status,
    nbre_present,
    nbre_absent,
    nbre_exclus,
    notes
  );
  return "Success Edit Calendar!!";
};

module.exports = {
  deleteExamen,
  getAllExamens,
  getExamenById,
  createExamen,
  updateExamen,
  getExamensBySemesterAndRegime,
  editCalendrierExamens,
};
