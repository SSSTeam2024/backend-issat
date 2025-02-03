const noteExamenServices = require("../../services/NoteExamenServices/noteExamenServices");

const addNewNote = async (req, res) => {
  try {
    const { enseignant, semestre, groupe, matiere, type_examen, completed } =
      req.body;

    const newNote = await noteExamenServices.createNote({
      enseignant,
      semestre,
      groupe,
      matiere,
      type_examen,
      completed,
    });
    res.json(newNote);
  } catch (error) {
    console.error(error);
  }
};

const updateNoteExamen = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedNoteExamen = await noteExamenServices.updateNote(
      id,
      updateData
    );

    if (!updatedNoteExamen) {
      return res.status(404).send("Note not found!");
    }

    res.json(updatedNoteExamen);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getNoteExamens = async (req, res) => {
  try {
    const notes = await noteExamenServices.getNotes();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;

    const deletedNote = await noteExamenServices.deleteNoteById(noteId);

    if (!deletedNote) {
      return res.status(404).send("Note not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addNewNote,
  updateNoteExamen,
  getNoteExamens,
  deleteNoteById,
};
