const express = require("express");
const etudiantController = require("../../controllers/StudentController/StudentController");

const router = express.Router();

router.post("/create-etudiant", etudiantController.addStudent);
router.get("/get-all-etudiant", etudiantController.getAllStudents);
router.post("/get-etudiant", etudiantController.getStudentById);
router.delete("/delete-etudiant", etudiantController.deleteEtudiant);
router.put("/update-groupe-classe", etudiantController.updateGroupeClasse);
router.put("/update-etudiant", etudiantController.updateStudent);
router.get("/get-etudiant/:id", etudiantController.getEtudiantById);
router.get(
  "/get-etudiant-by-idclasse/:id",
  etudiantController.getEtudiantsByIdClasse
);
router.get("/get-etudiant-by-cin/:id", etudiantController.getEtudiantByCin);
router.post(
  "/get-etudiant-by-cin-and-code",
  etudiantController.getEtudiantByCinAndCode
);
router.post("/login-etudiant", etudiantController.login);
router.post("/get-etudiant-by-token", etudiantController.getEtudiantByToken);

module.exports = router;
