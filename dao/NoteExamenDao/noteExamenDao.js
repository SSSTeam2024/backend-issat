const NoteExamen = require("../../model/NoteExamenModel/noteExamenModel");

const createNote = async (Note) => {
  return await NoteExamen.create(Note);
};

const getNotes = async () => {
  return await NoteExamen.find()
    .populate("enseignant")
    .populate("groupe")
    .populate("matiere")
    .populate({
      path: "etudiants.etudiant",
      model: "Etudiant",
    });
};

const updateNote = async (id, updateData) => {
  return await NoteExamen.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteNote = async (id) => {
  return await NoteExamen.findByIdAndDelete(id);
};
const getNoteById = async (id) => {
  return await NoteExamen.findById(id);
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
};
