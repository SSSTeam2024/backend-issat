const express = require("express");
const mentionClasseController = require("../../controllers/MentionClasseControllers/MentionClasseControllers");

const router = express.Router();

router.post(
  "/create-mention-classe",
  mentionClasseController.createMentionClasse
);
router.put(
  "/update-mention-classe/:id",
  mentionClasseController.updateMentionClasseById
);
router.get(
  "/get-all-mention-classe",
  mentionClasseController.getAllMentionClasse
);
router.delete(
  "/delete-mention-classe/:id",
  mentionClasseController.deleteMentionClasseById
);

module.exports = router;
