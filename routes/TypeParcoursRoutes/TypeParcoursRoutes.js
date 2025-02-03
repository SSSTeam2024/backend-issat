const express = require("express");
const typeParcoursController = require("../../controllers/TypeParcoursControllers/TypeParcoursControllers");

const router = express.Router();

router.post("/create-type-parcours", typeParcoursController.createTypeParcours);
router.put(
  "/update-type-parcours/:id",
  typeParcoursController.updateTypeParcours
);
router.get("/get-all-type-parcours", typeParcoursController.getTypesParcours);
router.delete(
  "/delete-type-parcours/:id",
  typeParcoursController.deleteTypeParcours
);

module.exports = router;
