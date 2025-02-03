const express = require("express");
const noteExamenControllers = require("../../controllers/NoteExamenControllers/noteExamenControllers");

const router = express.Router();

router.post("/create-note-examen", noteExamenControllers.addNewNote);
router.get("/get-all-notes", noteExamenControllers.getNoteExamens);
router.patch("/update-note-examen/:id", noteExamenControllers.updateNoteExamen);
router.delete("/delete-note-examen/:id", noteExamenControllers.deleteNoteById);

module.exports = router;
