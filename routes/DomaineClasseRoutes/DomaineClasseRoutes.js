const express = require("express");
const domaineClasseController = require("../../controllers/DomaineClasseControllers/DomaineClasseControllers");

const router = express.Router();

router.post(
  "/create-domaine-classe",
  domaineClasseController.createDomaineClasse
);
router.put(
  "/update-domaine-classe/:id",
  domaineClasseController.updateDoamineClasseById
);
router.get(
  "/get-all-domaine-classe",
  domaineClasseController.getAllDomaineClasse
);
router.delete(
  "/delete-domaine-classe/:id",
  domaineClasseController.deleteDomaineClasseById
);

module.exports = router;
