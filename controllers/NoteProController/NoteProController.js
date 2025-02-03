const noteProService = require('../../services/NoteProServices/NoteProService');


const createNotePro = async (req, res) => {
  try {
    const {
      notes
    } = req.body;

   let NotePro = await noteProService.createNotePro({
    notes
      });
 

    res.status(201).json(NotePro);
  } catch (error) {
    console.error("Error creating NotePro:", error);
    res.status(500).send({ message: error.message });
  }
};

const getAllNotesPro = async (req, res) => {
  try {
    const notesPro = await noteProService.getAllNotesPro();
    res.status(200).json(notesPro);
  } catch (error) {
    console.error("Error fetching all notes Pro:", error);
    res.status(500).json({ message: error.message });
  }
};

const getNoteProById = async (req, res) => {
  try {
    const notePro = await noteProService.getNoteProById(req.body._id);
    if (!notePro) {
      return res.status(404).json({ message: 'notePro not found' });
    }
    res.status(200).json(notePro);
  } catch (error) {
    console.error("Error fetching notePro by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const getNoteProByYear = async (req, res) => {
  try {
    const { annee } = req.body;
    const notePro = await noteProService.getNoteProByYear(annee);
    if (!notePro) {
      return res.status(404).json({ message: 'notePro not found' });
    }
    res.status(200).json(notePro);
  } catch (error) {
    console.error("Error fetching notePro by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateNotePro = async (req, res) => {
  try {
      const {
          _id,
          personnel,
          note1,
          note2,
          note3,
          note4,
          note5,
          note_finale,
          annee,
          observation
      } = req.body;

      const updatedNotePro = await noteProService.updateNotePro(_id, {
        personnel,
        note1,
        note2,
        note3,
        note4,
        note5,
        note_finale,
        annee,
        observation
        
      });

      if (!updatedNotePro) {
          return res.status(404).json({ message: 'notePro not found' });
      }

      res.status(200).json(updatedNotePro);
  } catch (error) {
      console.error("Error updating notePro :", error);
      res.status(500).json({ message: error.message });
  }
};

const deleteNotePro = async (req, res) => {
  try {
    const deletedNotePro = await noteProService.deletenotePro(req.body._id);
    if (!deletedNotePro) {
      return res.status(404).json({ message: 'notePro not found' });
    }
    res.status(200).json({ message: 'notePro deleted successfully' });
  } catch (error) {
    console.error("Error deleting notePro", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNotePro,
  getAllNotesPro,
  getNoteProById,
  updateNotePro,
  deleteNotePro,
  getNoteProByYear
};
