const salleDao = require("../../dao/SalleDao/SalleDao");
const DepartementModel = require("../../model/departementModel/DepartementModel");
const SalleDisponibiliteService = require("../../services/SalleDisponibiliteServices/SalleDisponibiliteServices");
const seanceDao = require("../../dao/SeanceDao/SeanceDao");
const classEmploiPeriodiqueDao = require("../../dao/ClassEmploiPeriodiqueDao/ClassEmploiPeriodiqueDao");
const rattrapageService = require("../RattrapageServices/RattrapageServices");

const createSalle = async (userData) => {
  try {
    const salle = await salleDao.createSalle(userData);
    await DepartementModel.findByIdAndUpdate(userData.departement, {
      $push: { salles: salle._id },
    });
    // await SalleDisponibiliteService.createSalleDisponibilite(salle._id);
    return await salle.populate("departement");
  } catch (error) {
    console.error("Error in salle service:", error);
    throw error;
  }
};

const updateSalle = async (id, updateData) => {
  return await salleDao.updateSalle(id, updateData);
};

const getSalleById = async (id) => {
  return await salleDao.getSalleById(id);
};

const getSallesByDayAndTime = async (
  day,
  start_time,
  end_time,
  session_type,
  date_fin_emploi_period,
  date_debut_emploi_period,
  semestre
) => {
  //let sessions = await seanceDao.getSeanceByDayAndTime(day);

  let emploiClassPeriodique =
    await classEmploiPeriodiqueDao.getAllClassEmploiPeriodiqueBySemestre(
      semestre
    );

  console.log("emploiClassPeriodique", emploiClassPeriodique);

  const givenStart = parseDate(date_debut_emploi_period);
  const givenEnd = parseDate(date_fin_emploi_period);

  const intersectingIntervals = emploiClassPeriodique.filter((period) => {
    const intervalStart = parseDate(period.date_debut);
    const intervalEnd = parseDate(period.date_fin);
    return intervalStart <= givenEnd && intervalEnd >= givenStart;
  });

  // console.log("intersectingIntervals", intersectingIntervals);

  let sessions = [];

  for (const interval of intersectingIntervals) {
    // console.log("interval", interval);
    let day_sessions = await seanceDao.getSeanceByDayAndTime(interval._id, day);
    // console.log("day_sessions", day_sessions);
    sessions = sessions.concat(day_sessions);
  }
  // console.log("sessions", sessions);

  let filteredSessions = sessions.filter(
    (s) =>
      (s.heure_debut < start_time &&
        s.heure_fin > start_time &&
        s.heure_fin < end_time) ||
      (s.heure_debut === start_time && s.heure_fin === end_time) ||
      (s.heure_debut > start_time &&
        s.heure_debut < end_time &&
        s.heure_fin > end_time) ||
      (s.heure_debut === start_time && s.heure_fin < end_time) ||
      (s.heure_debut > start_time && s.heure_fin === end_time) ||
      (s.heure_debut > start_time && s.heure_fin < end_time) ||
      (s.heure_debut < start_time && s.heure_fin > end_time) ||
      (s.heure_debut === start_time && s.heure_fin > end_time) ||
      (s.heure_debut < start_time && s.heure_fin === end_time)
  );

  //console.log("filteredSessions", filteredSessions);
  let allSalles = await salleDao.getSalles();
  let occupiedRooms = [];
  for (const filteredSession of filteredSessions) {
    occupiedRooms.push({
      room: filteredSession.salle,
      session_type: filteredSession.type_seance,
    });
  }
  //console.log("occupiedRooms", occupiedRooms);

  const availableRooms = [];

  for (const room of allSalles) {
    let found = false;
    for (const occupiedRoom of occupiedRooms) {
      if (room.salle === occupiedRoom.room.salle) {
        found = true;
        break;
      }
    }

    if (!found) {
      availableRooms.push(room);
    }
  }

  //console.log("availableRooms1", availableRooms);

  if (session_type === "1/15") {
    console.log("session_type", session_type);
    for (const occupiedRoom of occupiedRooms) {
      if (occupiedRoom.session_type === "1/15") {
        console.log("force push", occupiedRoom.room);
        availableRooms.push(occupiedRoom.room);
      }
    }
  }

  //console.log("availableRooms2", availableRooms);

  const uniqueAvailableRooms = removeDuplicates(availableRooms, "salle");

  return uniqueAvailableRooms;
};

const getSallesDispoRattrapage = async (
  day,
  date_rattrapage,
  start_time,
  end_time,
  date_fin_emploi_period,
  date_debut_emploi_period,
  semestre
) => {
  let emploiClassPeriodique =
    await classEmploiPeriodiqueDao.getAllClassEmploiPeriodiqueBySemestre(
      semestre
    );

  //console.log("emploiClassPeriodique", emploiClassPeriodique);

  const givenStart = parseDate(date_debut_emploi_period);
  const givenEnd = parseDate(date_fin_emploi_period);

  const intersectingIntervals = emploiClassPeriodique.filter((period) => {
    const intervalStart = parseDate(period.date_debut);
    const intervalEnd = parseDate(period.date_fin);
    return intervalStart <= givenEnd && intervalEnd >= givenStart;
  });

  //console.log("intersectingIntervals", intersectingIntervals);

  let normalAndRecoverSessions = [];

  for (const interval of intersectingIntervals) {
    //console.log("interval", interval);
    let day_sessions = await seanceDao.getSeanceByDayAndTime(interval._id, day);
    //console.log("day_sessions", day_sessions);
    normalAndRecoverSessions = normalAndRecoverSessions.concat(day_sessions);
  }
  //console.log("normalAndRecoverSessions", normalAndRecoverSessions);

  let rattrapages = await rattrapageService.getRattrapages();

  //console.log(rattrapages);
  console.log(date_rattrapage);
  let implicatedRecoverSessions = rattrapages.filter((r) => {
    const date1 = parseDateV2(r.date);
    console.log(date1);
    const date2 = parseDateV2(date_rattrapage);
    console.log(date2);
    console.log(date1.getTime() === date2.getTime());
    return date1.getTime() === date2.getTime();
  });

  console.log(implicatedRecoverSessions);

  normalAndRecoverSessions = normalAndRecoverSessions.concat(
    implicatedRecoverSessions
  );

  let filteredNormalAndRecoverSessions = normalAndRecoverSessions.filter(
    (s) =>
      (s.heure_debut < start_time &&
        s.heure_fin > start_time &&
        s.heure_fin < end_time) ||
      (s.heure_debut === start_time && s.heure_fin === end_time) ||
      (s.heure_debut > start_time &&
        s.heure_debut < end_time &&
        s.heure_fin > end_time) ||
      (s.heure_debut === start_time && s.heure_fin < end_time) ||
      (s.heure_debut > start_time && s.heure_fin === end_time) ||
      (s.heure_debut > start_time && s.heure_fin < end_time) ||
      (s.heure_debut < start_time && s.heure_fin > end_time) ||
      (s.heure_debut === start_time && s.heure_fin > end_time) ||
      (s.heure_debut < start_time && s.heure_fin === end_time)
  );

  //console.log("filteredSessions", filteredSessions);
  let allSalles = await salleDao.getSalles();
  let occupiedRooms = [];
  for (const filteredSession of filteredNormalAndRecoverSessions) {
    occupiedRooms.push({
      room: filteredSession.salle,
      session_type: filteredSession.type_seance,
    });
  }
  //console.log("occupiedRooms", occupiedRooms);

  const availableRooms = [];

  for (const room of allSalles) {
    let found = false;
    for (const occupiedRoom of occupiedRooms) {
      if (room.salle === occupiedRoom.room.salle) {
        found = true;
        break;
      }
    }

    if (!found) {
      availableRooms.push(room);
    }
  }

  //console.log("availableRooms1", availableRooms);

  const uniqueAvailableRooms = removeDuplicates(availableRooms, "salle");

  return uniqueAvailableRooms;
};

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const parseDateV2 = (dateStr) => {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
};

const removeDuplicates = (array, key) => {
  const seen = new Set();
  return array.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    } else {
      seen.add(keyValue);
      return true;
    }
  });
};

const getSalles = async () => {
  const result = await salleDao.getSalles();
  return result;
};

const deleteSalleById = async (id) => {
  return await salleDao.deleteSalle(id);
};

module.exports = {
  deleteSalleById,
  getSalles,
  getSalleById,
  updateSalle,
  createSalle,
  getSallesByDayAndTime,
  getSallesDispoRattrapage,
};