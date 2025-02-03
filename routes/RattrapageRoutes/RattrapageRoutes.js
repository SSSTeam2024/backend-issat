const express = require("express");
const rattarapageController = require("../../controllers/RattrapageControllers/RattrapageControllers");

const router = express.Router();

router.post("/create-rattrapage", rattarapageController.createRattrapage);
router.get("/get-all-rattrapage", rattarapageController.getRattrapages);
// router.delete("/delete-type-seance/:id", typeSeanceController.deleteTypeSeance);
// router.put("/update-type-seance", typeSeanceController.updateTypeSeance);
router.put(
  "/updateRattrapage/:id",
  rattarapageController.updateRattrapageEtatStatus
);

module.exports = router;