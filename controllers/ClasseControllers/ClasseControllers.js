const classeService = require("../../services/ClasseServices/ClasseServices");
const classeDao = require("../../dao/ClasseDao/ClasseDao");

const addClasse = async (req, res) => {
  try {
    const { niveau_classe, departement, nom_classe_ar, nom_classe_fr } =
      req.body;

    const classeJson = await classeService.createClasse({
      niveau_classe,
      departement,
      nom_classe_ar,
      nom_classe_fr,
    });
    res.json(classeJson);
  } catch (error) {
    console.error(error);
  }
};

const updateClasseById = async (req, res) => {
  try {
    const classeId = req.params.id;
    const { niveau_classe, departement, nom_classe_ar, nom_classe_fr } =
      req.body;

    const updatedClasse = await classeService.getClasseById(classeId, {
      niveau_classe,
      departement,
      nom_classe_ar,
      nom_classe_fr,
    });

    if (!updatedClasse) {
      return res.status(404).send("Classe not found!");
    }
    res.json(updatedClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getClasseById = async (req, res) => {
  try {
    const classeId = req.params.id;

    const getClasse = await classeService.getClasseById(classeId);

    if (!getClasse) {
      return res.status(404).send("Classe not found");
    }
    res.json(getClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await classeService.getClasses();
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteClasseById = async (req, res) => {
  try {
    const classeId = req.params.id;
    console.log(`Received request to delete classe with ID: ${classeId}`);

    const deletedClasse = await classeService.deleteClasseById(classeId);

    if (!deletedClasse) {
      return res.status(404).send("Classe not found");
    }

    res
      .status(200)
      .json({ message: "Classe deleted successfully", data: deletedClasse });
  } catch (error) {
    console.error("Error in deleteClasseById controller:", error);
    res.status(500).send(error.message);
  }
};

async function assignMatieresToClasseController(req, res, next) {
  const classeId = req.params.classeId;
  const matiereIds = req.body.matiereIds;

  try {
    const updatedClasse = await classeService.assignMatieresToClasse(
      classeId,
      matiereIds
    );
    res.status(200).json(updatedClasse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteAssignedMatiereFromClasse = async (req, res) => {
  const { classeId, matiereId } = req.params;

  try {
    const updatedClasse = await classeDao.deleteAssignedMatiereFromClasse(
      classeId,
      matiereId
    );
    res.json(updatedClasse);
  } catch (error) {
    console.error("Error deleting assigned matiere from classe:", error);
    res.status(500).json({ error: "Server error" });
  }
};

async function getAssignedMatieres(req, res) {
  const { classeId } = req.params;

  try {
    const matieres = await classeService.getAssignedMatieres(classeId);
    res.json(matieres);
  } catch (error) {
    console.error("Error fetching assigned matieres:", error);
    res.status(500).json({ error: "Server error" });
  }
}

const getAllClassesByTeacher = async (req, res) => {
  try {
    const { teacherId, semestre } = req.body;
    const classes = await classeService.getClassesByTeacherId(
      teacherId,
      semestre
    );
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addClasse,
  updateClasseById,
  getClasseById,
  getAllClasses,
  deleteClasseById,
  assignMatieresToClasseController,
  deleteAssignedMatiereFromClasse,
  getAssignedMatieres,
  getAllClassesByTeacher,
};