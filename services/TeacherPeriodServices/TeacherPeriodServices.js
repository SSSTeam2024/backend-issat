const teacherPeriodDao = require("../../dao/TeacherPeriodDao/TeacherPeriodDao");
// const parseDateV2 = require("../../utils/globalFunctions");

const createTeacherPeriod = async (params) => {
  try {
    return await teacherPeriodDao.createTeacherPeriod(params);
  } catch (error) {
    console.error("Error when creating teacher period", error);
    throw error;
  }
};

const updateTeacherPeriod = async (id, nbr_heure) => {
  return await teacherPeriodDao.updateTeacherPeriod(id, nbr_heure);
};

const getTeacherPeriod = async (ids_array, semestre) => {
  let teachersPeriods = [];
  for (const id of ids_array) {
    const result = await teacherPeriodDao.getTeacherPeriod(id, semestre);
    teachersPeriods.push({ id_teacher: id, periods: result });
  }

  return teachersPeriods;
};

const getTeacherPeriodsByTeacherId = async (id, semestre) => {
  const result = await teacherPeriodDao.getTeacherPeriod(id, semestre);

  return result;
};

const getTeacherPeriodByIdClassPeriod = async (
  emploiPeriodique_id,
  id_teacher
) => {
  return teacherPeriodDao.getTeacherPeriodByIdClassPeriod(
    emploiPeriodique_id,
    id_teacher
  );
};

const getPeriodsBySemesterAndTeacher = async (semester, teacherId) => {
  try {
    const result = await teacherPeriodDao.fetchPeriodsBySemesterAndTeacherId(
      semester,
      teacherId
    );
    const newPeriods = mergeIntervals(result);
    return newPeriods;
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const mergeIntervals = (intervals) => {
  const sortedIntervals = [...intervals];

  // Sort intervals by start date
  sortedIntervals.sort(
    (a, b) =>
      parseDateV2(a.id_classe_period.date_debut).getTime() -
      parseDateV2(b.id_classe_period.date_debut).getTime()
  );

  const splitIntervals = [];
  for (let interval of sortedIntervals) {
    const startDate = parseDateV2(interval.id_classe_period.date_debut);
    const endDate = parseDateV2(interval.id_classe_period.date_fin);
    const hours = Number(interval.nbr_heure);

    splitIntervals.push({
      date: startDate,
      hours,
      id: interval.id_classe_period._id,
    });
    splitIntervals.push({
      date: new Date(endDate.getTime() + 86400000), // Add one day to include the end date
      hours: -hours,
      id: interval.id_classe_period._id,
    });
  }

  // Sort by date
  splitIntervals.sort((a, b) => a.date.getTime() - b.date.getTime());

  const result = [];
  let currentStartDate = splitIntervals[0].date;
  let currentHours = 0;
  let currentIds = new Set();

  for (let i = 0; i < splitIntervals.length - 1; i++) {
    const { date, hours, id } = splitIntervals[i];
    currentHours += hours;

    // Add or remove ids based on hours being added or subtracted
    if (hours > 0) {
      currentIds.add(id);
    } else {
      currentIds.delete(id);
    }

    const nextDate = splitIntervals[i + 1].date;
    if (date.getTime() !== nextDate.getTime()) {
      result.push({
        ids: Array.from(currentIds),
        start_date: formatDate(currentStartDate),
        end_date: formatDate(new Date(nextDate.getTime() - 86400000)), // Subtract one day
        nbr_heure: currentHours,
      });
      currentStartDate = nextDate;
    }
  }

  let refinedResult = [];

  // Filter out intervals where start_date equals end_date
  for (const element of result) {
    if (element.start_date !== element.end_date) {
      refinedResult.push(element);
    }
  }

  return refinedResult;
};

const parseDateV2 = (dateStr) => {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const formatDate = (date) => {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
};
module.exports = {
  createTeacherPeriod,
  updateTeacherPeriod,
  getTeacherPeriod,
  getTeacherPeriodByIdClassPeriod,
  getTeacherPeriodsByTeacherId,
  getPeriodsBySemesterAndTeacher,
};