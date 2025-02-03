const teacherPeriodService = require("../../services/TeacherPeriodServices/TeacherPeriodServices");

const createTeacherPeriod = async (req, res) => {
  try {
    const { nbr_heure, semestre, id_classe_period, id_teacher } = req.body;

    const TeacherPeriod = await teacherPeriodService.createTeacherPeriod({
      nbr_heure,
      semestre,
      id_classe_period,
      id_teacher,
    });
    res.json(TeacherPeriod);
  } catch (error) {
    console.error(error);
  }
};

const updateTeacherPeriod = async (req, res) => {
  try {
    const { id, nbr_heure } = req.body;

    const updatedTeacherPeriod = await teacherPeriodService.updateTeacherPeriod(
      id,
      nbr_heure
    );

    if (!updatedTeacherPeriod) {
      return res.status(404).send("Teacher Period not found!");
    }
    res.json(updatedTeacherPeriod);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTeacherPeriod = async (req, res) => {
  try {
    const { ids_array, semestre } = req.body;
    const periods = await teacherPeriodService.getTeacherPeriod(
      ids_array,
      semestre
    );
    res.json(periods);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTeacherPeriodsByTeacherId = async (req, res) => {
  try {
    const { id, semestre } = req.body;
    const periods = await teacherPeriodService.getTeacherPeriodsByTeacherId(
      id,
      semestre
    );
    res.json(periods);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const fetchPeriodsBySemesterAndTeacherId = async (req, res) => {
  const { semester, teacherId } = req.body;

  try {
    const periods = await teacherPeriodService.getPeriodsBySemesterAndTeacher(
      semester,
      teacherId
    );
    res.status(200).json(periods);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching periods: " + error.message });
  }
};

module.exports = {
  createTeacherPeriod,
  updateTeacherPeriod,
  getTeacherPeriod,
  getTeacherPeriodsByTeacherId,
  fetchPeriodsBySemesterAndTeacherId,
};