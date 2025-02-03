const GradePersonnelService = require("../../services/GradePersonnelServices/GradePersonnelServices");

const addGradePersonnel = async (req, res) => {
  try {
    const { grade_ar, grade_fr } = req.body;

    const gradePersonnel = await GradePersonnelService.registerGradePersonnel({
      grade_ar,
      grade_fr,
    });
    res.json(gradePersonnel);
  } catch (error) {
    console.error(error);
  }
};

const updateGradePersonnelById = async (req, res) => {
  try {
    const GradePersonnelId = req.params.id;
    const { grade_ar, grade_fr } = req.body;

    const updatedGradePersonnel =
      await GradePersonnelService.updateGradePersonnelDao(GradePersonnelId, {
        grade_ar,
        grade_fr,
      });

    if (!updatedGradePersonnel) {
      return res.status(404).send("Grade Personnel not found!");
    }
    res.json(updatedGradePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getGradePersonnelById = async (req, res) => {
  try {
    const GradePersonnelId = req.params.id;

    const getGradePersonnel =
      await GradePersonnelService.getGradePersonnelDaoById(GradePersonnelId);

    if (!getGradePersonnel) {
      return res.status(404).send("Grade Personnel not found");
    }
    res.json(getGradePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllGradePersonnel = async (req, res) => {
  try {
    const GradePersonnels = await GradePersonnelService.getGradesPersonnelDao();
    res.json(GradePersonnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteGradePersonnelById = async (req, res) => {
  try {
    const GradePersonnelId = req.params.id;

    const deletedGradePersonnel =
      await GradePersonnelService.deleteGradePersonnelDao(GradePersonnelId);

    if (!deletedGradePersonnel) {
      return res.status(404).send("Grade Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
//

module.exports = {
  deleteGradePersonnelById,
  getAllGradePersonnel,
  getGradePersonnelById,
  updateGradePersonnelById,
  addGradePersonnel,
};