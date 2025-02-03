const seanceDao = require("../../dao/SeanceDao/SeanceDao");
const SalleDisponibiliteService = require("../../services/SalleDisponibiliteServices/SalleDisponibiliteServices");
const teacherPeriodService = require("../../services/TeacherPeriodServices/TeacherPeriodServices");

const createSeance = async (data) => {
  console.log("data", data);

  const hoursNumber = getHoursNumber(data.heure_debut, data.heure_fin);
  console.log("hoursNumber: ", hoursNumber);

  let result = await teacherPeriodService.getTeacherPeriodByIdClassPeriod(
    data.emploiPeriodique_id,
    data.enseignant
  );

  if (result.length > 0) {
    console.log(result[0].nbr_heure);
    let newHoursNumber = hoursNumber + Number(result[0].nbr_heure);
    console.log("newHoursNumber: ", String(newHoursNumber));
    await teacherPeriodService.updateTeacherPeriod(
      result[0]._id,
      String(newHoursNumber)
    );
  } else {
    const req_data = {
      id_teacher: data.enseignant,
      id_classe_period: data.emploiPeriodique_id,
      nbr_heure: String(hoursNumber),
      semestre: data.semestre,
    };
    await teacherPeriodService.createTeacherPeriod(req_data);
  }

  let session = await seanceDao.createSeance(data);
  return session;
};

const updateSeance = async (id, updateData) => {
  return await seanceDao.updateSeance(id, updateData);
};

const getSeanceById = async (id) => {
  return await seanceDao.getSeanceById(id);
};

const getSeancesByIdTeacher = async (
  teacherId,
  jour,
  emplois_periodiques_ids
) => {
  let seances = [];
  for (const id of emplois_periodiques_ids) {
    const result = await seanceDao.getSeancesByIdTeacher(teacherId, jour, id);
    seances.push(result);
  }
  return seances;
};

const getPeriodicSessionsByTeacher = async (
  teacherId,
  emplois_periodiques_ids
) => {
  let seances = [];
  for (const id of emplois_periodiques_ids) {
    const result = await seanceDao.getPeriodicSessionsByTeacher(teacherId, id);
    seances = seances.concat(result);
  }
  return seances;
};

// Séances des emplois periodiques (En Elaboration)
const getSeancesByTeacher = async (teacherId, semestre) => {
  let seances = await seanceDao.getSeancesByTeacher(teacherId, semestre);
  return seances;
};

const getSessionsByRoomId = async (roomId) => {
  return await seanceDao.getSessionsByRoomId(roomId);
};

const getAllSeances = async () => {
  const result = await seanceDao.getSeances();
  return result;
};

const getAllSeancesByIdEmploi = async (idEmploi) => {
  const result = await seanceDao.getSeancesByIdEmploiPeriodique(idEmploi);
  return result;
};

const deleteSeance = async (seance) => {
  try {
    const hoursNumber = getHoursNumber(seance.heure_debut, seance.heure_fin);
    console.log("hoursNumber: ", hoursNumber);

    let result = await teacherPeriodService.getTeacherPeriodByIdClassPeriod(
      seance.emploiPeriodique_id._id,
      seance.enseignant._id
    );

    console.log(result);

    let newHoursNumber = Number(result[0].nbr_heure) - hoursNumber;
    console.log("newHoursNumber: ", String(newHoursNumber));

    const deletedSeance = await seanceDao.deleteSeance(seance._id);

    await teacherPeriodService.updateTeacherPeriod(
      result[0]._id,
      String(newHoursNumber)
    );

    if (!deletedSeance) {
      throw new Error("Seance not found");
    }
    return deletedSeance;
  } catch (error) {
    console.error("Error deleting seance:", error);
    throw error;
  }
};

const getHoursNumber = (start, end) => {
  // Parse hours and minutes from the start and end times
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  // Convert to total minutes
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  // Calculate the difference in minutes
  const durationMinutes = endTotalMinutes - startTotalMinutes;

  // Convert minutes to decimal hours
  return durationMinutes / 60;
};

const getSeancesByIdTeacherAndSemestre = async (enseignantId, semestre) => {
  return await seanceDao.fetchSeancesByIdTeacherAndSemestre(
    enseignantId,
    semestre
  );
};

module.exports = {
  deleteSeance,
  getAllSeances,
  getSeanceById,
  updateSeance,
  createSeance,
  getAllSeancesByIdEmploi,
  getSeancesByIdTeacher,
  getSessionsByRoomId,
  getSeancesByTeacher,
  getSeancesByIdTeacherAndSemestre,
  getPeriodicSessionsByTeacher,
};