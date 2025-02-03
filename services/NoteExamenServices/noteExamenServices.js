const noteExamenDao = require("../../dao/NoteExamenDao/noteExamenDao");

const createNote = async (noteExamenData) => {
  try {
    const Note = await noteExamenDao.createNote(noteExamenData);

    return Note;
  } catch (error) {
    console.error("Error in Note service:", error);
    throw error;
  }
};

const updateNote = async (id, updateData) => {
  return await noteExamenDao.updateNote(id, updateData);
};

const getNoteById = async (id) => {
  return await noteExamenDao.getNoteById(id);
};

const getNotes = async () => {
  const result = await noteExamenDao.getNotes();
  return result;
};

const deleteNoteById = async (id) => {
  return await noteExamenDao.deleteNote(id);
};

module.exports = {
  deleteNoteById,
  getNotes,
  getNoteById,
  updateNote,
  createNote,
};
