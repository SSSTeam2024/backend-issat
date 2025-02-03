const express = require("express");
const typeSeanceController = require("../../controllers/TypeSeanceControllers/TypeSeanceControllers");

const router = express.Router();

router.post("/create-type-seance", typeSeanceController.createTypeSeance);
router.delete("/delete-type-seance/:id", typeSeanceController.deleteTypeSeance);
router.get("/get-all-type-seance", typeSeanceController.getTypeSeances);
router.put("/update-type-seance", typeSeanceController.updateTypeSeance);

module.exports = router;