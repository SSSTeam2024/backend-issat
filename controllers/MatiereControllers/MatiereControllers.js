const matiereService = require("../../services/MatiereServices/MatiereServices");

// const addMatiere = async (req, res) => {
//   try {
//     const {
//       code_matiere,
//       matiere,
//       type,
//       semestre,
//       volume,
//       nbr_elimination,
//       regime_matiere,
//       credit_matiere,
//       coefficient_matiere,
//       types,
//     } = req.body;

//     const matiereJson = await matiereService.registerMatiere({
//       code_matiere,
//       matiere,
//       type,
//       semestre,
//       volume,
//       nbr_elimination,
//       regime_matiere,
//       credit_matiere,
//       coefficient_matiere,
//       types,
//     });
//     res.json(matiereJson);
//   } catch (error) {
//     console.error(error);
//   }
// };
const addMatiere = async (req, res) => {
  try {
    const {
      code_matiere,
      matiere,
      semestre,
      regime_matiere,
      credit_matiere,
      coefficient_matiere,
      types,
    } = req.body;

    // Ensure types is an array
    if (!Array.isArray(types) || types.length === 0) {
      return res
        .status(400)
        .json({ message: "Types are required and must be an array." });
    }

    // Create an array of Matiere objects based on the types array
    const matieresToCreate = types.map((typeObj) => ({
      code_matiere,
      matiere,
      semestre,
      regime_matiere,
      credit_matiere,
      coefficient_matiere,
      types: [typeObj], // Each Matiere gets a single type
    }));

    // Insert all matieres into the database
    const createdMatieres = await Promise.all(
      matieresToCreate.map(async (matiere) =>
        matiereService.registerMatiere(matiere)
      )
    );

    // Respond with the created matieres
    res.json(createdMatieres);
  } catch (error) {
    console.error("Error adding matiere:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the matiere." });
  }
};

const updateMatiereById = async (req, res) => {
  try {
    const matiereId = req.params.id;
    const {
      code_matiere,
      matiere,
      type,
      semestre,
      volume,
      nbr_elimination,
      regime_matiere,
      credit_matiere,
      coefficient_matiere,
      types,
    } = req.body;

    const updatedMatiere = await matiereService.updateMatiereDao(matiereId, {
      code_matiere,
      matiere,
      type,
      semestre,
      volume,
      nbr_elimination,
      regime_matiere,
      credit_matiere,
      coefficient_matiere,
      types,
    });

    if (!updatedMatiere) {
      return res.status(404).send("Matiere not found!");
    }
    res.json(updatedMatiere);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getMatiereById = async (req, res) => {
  try {
    const matiereId = req.params.id;

    const getMatiere = await matiereService.getMatiereDaoById(matiereId);

    if (!getMatiere) {
      return res.status(404).send("Matiere not found");
    }
    res.json(getMatiere);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllMatieres = async (req, res) => {
  try {
    const matieres = await matiereService.getMatieresDao();
    res.json(matieres);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteMatiereById = async (req, res) => {
  try {
    const matiereId = req.params.id;

    const deletedMatiere = await matiereService.deleteMatiereDao(matiereId);

    if (!deletedMatiere) {
      return res.status(404).send("Matiere not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
//

module.exports = {
  deleteMatiereById,
  getAllMatieres,
  getMatiereById,
  updateMatiereById,
  addMatiere,
};
