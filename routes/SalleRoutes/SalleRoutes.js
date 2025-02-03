const express = require("express");
const salleController = require("../../controllers/SalleControllers/SalleControllers");

const router = express.Router();

router.post("/create-salle", salleController.addSalle);
router.post("/get-salle-by-day-time", salleController.getSallesByDayAndTime);
router.post(
  "/get-salles-disponibles-rattrapage",
  salleController.getSallesDispoRattrapage
);
router.put("/update-salle/:id", salleController.updateSalleById);
router.get("/get-salle/:id", salleController.getSalleById);
router.get("/get-all-salle", salleController.getAllSalles);
router.delete("/delete-salle/:id", salleController.deleteSalleById);
module.exports = router;