const noteProDao = require("../../dao/NoteProDao/NoteProDao");

const createNotePro = async (noteProData) => {
  try {
    console.log(noteProData);
    let results = [];
    for (const notes of noteProData.notes) {
     let result = await noteProDao.createNotePro(notes);
     results.push(result);
    }
    return results;
  } catch (error) {
    console.error("Error creating NotePro:", error);
    throw error;
  }
};

const getAllNotesPro = async () => {
  return noteProDao.getAllNotesPro();
};

const getNoteProById = async (id) => {
  return noteProDao.getNoteProById(id);
};

const getNoteProByYear = async (annee) => {
  return noteProDao.getNoteProByYear(annee);
};

const updateNotePro = async (id, updateData, documents) => {
  try {
    return await noteProDao.updateNotePro(id, updateData);
  } catch (error) {
    console.error("Error updating NotePro ", error);
    throw error;
  }
};

const deleteNotePro = async (id) => {
  return noteProDao.deleteNotePro(id);
};

module.exports = {
  createNotePro,
  getAllNotesPro,
  getNoteProById,
  updateNotePro,
  deleteNotePro,
  getNoteProByYear
};
