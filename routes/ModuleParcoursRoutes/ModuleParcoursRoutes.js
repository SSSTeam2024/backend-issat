const express = require("express");
const moduleParcoursController = require("../../controllers/ModulesParcoursControllers/ModulesParcoursControllers");

const router = express.Router();

router.post(
  "/create-module-parcours",
  moduleParcoursController.createModuleParcours
);
router.put(
  "/update-module-parcours/:id",
  moduleParcoursController.updateModuleParcours
);
router.get(
  "/get-all-module-parcours",
  moduleParcoursController.getAllModulesParcours
);
router.delete(
  "/delete-module-parcours/:id",
  moduleParcoursController.deleteModuleParcours
);

module.exports = router;
