const express = require("express");
const classEmploiPeriodiqueController = require("../../controllers/ClassEmploiPeriodiqueControllers/ClassEmploiPeriodiqueControllers");

const router = express.Router();

router.post(
  "/create-class-emploi-period",
  classEmploiPeriodiqueController.createClassEmploiPeriodique
);
router.put(
  "/update-class-emploi-period",
  classEmploiPeriodiqueController.updateClassEmploiPeriodique
);
router.get(
  "/get-class-emploi-period/:id",
  classEmploiPeriodiqueController.getClassEmploiPeriodique
);

router.post(
  "/get-emploi-period-classe",
  classEmploiPeriodiqueController.getEmploiPeriodiqueByClass
);
module.exports = router;