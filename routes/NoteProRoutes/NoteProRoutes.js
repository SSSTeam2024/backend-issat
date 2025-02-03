const express = require('express');
const router = express.Router();
const noteProController = require('../../controllers/NoteProController/NoteProController');


router.post('/add-note-pro', noteProController.createNotePro);

router.get('/get-all-notes-pro', noteProController.getAllNotesPro);

router.post('/get-note-pro', noteProController.getNoteProById);

router.post('/get-note-pro-by-year', noteProController.getNoteProByYear);

router.put('/edit-note-pro', noteProController.updateNotePro);

router.delete('/delete-note-pro', noteProController.deleteNotePro);

module.exports = router;