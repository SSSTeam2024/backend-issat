const classEmploiPeriodiqueDao = require("../../dao/ClassEmploiPeriodiqueDao/ClassEmploiPeriodiqueDao");
const sessionService = require("../../services/SeanceServices/SeanceServices");
const sessionDao = require("../../dao/SeanceDao/SeanceDao");
const teacherPeriodService = require("../../services/TeacherPeriodServices/TeacherPeriodServices");

const createClassEmploiPeriodique = async (params) => {
  try {
    const lastActiveSchedule =
      await classEmploiPeriodiqueDao.getClassEmploiPeriodiqueByState(
        params.id_classe,
        params.semestre
      );
    let creationResult =
      await classEmploiPeriodiqueDao.createClassEmploiPeriodique(params);
    if (lastActiveSchedule.length > 0) {
      console.log("not first one");
      let lastActiveScheduleSessions =
        await sessionService.getAllSeancesByIdEmploi(lastActiveSchedule[0]._id);
      await cloneSessions(lastActiveScheduleSessions, creationResult._id);
    }

    return creationResult;
  } catch (error) {
    console.error("Error when creating time table params", error);
    throw error;
  }
};

const cloneSessions = async (sessions, periodicScheduleId) => {
  if (sessions.length > 0) {
    for (const element of sessions) {
      let session = {
        matiere: element.matiere,
        enseignant: element.enseignant,
        classe: element.classe,
        salle: element.salle,
        jour: element.jour,
        heure_debut: element.heure_debut,
        heure_fin: element.heure_fin,
        type_seance: element.type_seance,
        semestre: element.semestre,
        emploiPeriodique_id: periodicScheduleId,
      };

      const hoursNumber = getHoursNumber(
        session.heure_debut,
        session.heure_fin
      );
      console.log("hoursNumber: ", hoursNumber);

      let result = await teacherPeriodService.getTeacherPeriodByIdClassPeriod(
        periodicScheduleId,
        session.enseignant._id
      );

      console.log("result", result);

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
          id_teacher: session.enseignant._id,
          id_classe_period: periodicScheduleId,
          nbr_heure: String(hoursNumber),
          semestre: session.semestre,
        };
        await teacherPeriodService.createTeacherPeriod(req_data);
      }
      await sessionDao.createSeance(session);
    }
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

const updateClassEmploiPeriodique = async (id, updateData) => {
  return await classEmploiPeriodiqueDao.updateClassEmploiPeriodique(
    id,
    updateData
  );
};

const getClassEmploiPeriodique = async (id) => {
  const result = await classEmploiPeriodiqueDao.getClassEmploiPeriodique(id);
  return result;
};

const getEmploiPeriodiqueByClasse = async (classId, semestre) => {
  const result = await classEmploiPeriodiqueDao.getEmploiPeriodiqueByClass(
    classId,
    semestre
  );
  return result;
};

module.exports = {
  createClassEmploiPeriodique,
  updateClassEmploiPeriodique,
  getClassEmploiPeriodique,
  getEmploiPeriodiqueByClasse,
};