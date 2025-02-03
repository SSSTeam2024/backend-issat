const express = require("express");
const enseignantController = require("../../controllers/EnseignantControllers/EnseignantControllers");

const router = express.Router();

router.post("/create-enseignant", enseignantController.addEnseignant);
router.get("/get-all-enseignant", enseignantController.getEnseignants);
router.put("/update-enseignant", enseignantController.updateEnseignantById);
router.post("/get-enseignant", enseignantController.getEnseignantById);
router.delete(
  "/delete-enseignant/:id",
  enseignantController.deleteEnseignantById
);
router.post(
  "/:enseignantId/papier/:papierId",
  enseignantController.assignPapierToTeacher
);

router.get("/charges-periodic", enseignantController.fetchAllTeachersPeriods);
router.get("/get-enseignants-grouped-by-grade",enseignantController.getTeachersGroupedByGrade);
module.exports = router;