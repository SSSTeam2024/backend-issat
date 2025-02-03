const DemandeEnseignant = require('../../model/DemandeEnseignantModel/DemandeEnseignantModel');


const createDemandeEnseignant = async (DemandeEnseignantData) => {
  const demandeEnseignant = new DemandeEnseignant(DemandeEnseignantData);
  return demandeEnseignant.save();
};

const getAllDemandeEnseignants = async () => {
  return DemandeEnseignant.find()
    .populate({
      path: "enseignantId",
      populate: [{
        path: "poste",
      },{
        path: "etat_compte",
      },{
        path: "specilaite"
      },{
        path: "departements"
      },{
        path: "grade"
      }],
      options: { strictPopulate: false },
    })
    .populate('piece_demande');
};

const getDemandeEnseignantById = async (id) => {
  return DemandeEnseignant.findById(id).populate('enseignantId').populate('piece_demande');
};

const updateDemandeEnseignant = async (id, updateData) => {
  return DemandeEnseignant.findByIdAndUpdate(id, updateData, { new: true }).populate('enseignantId').populate('piece_demande');
};

const deleteDemandeEnseignant = async (id) => {
  return DemandeEnseignant.findByIdAndDelete(id).populate('enseignantId');
};

module.exports = {
  createDemandeEnseignant,
  getAllDemandeEnseignants,
  getDemandeEnseignantById,
  updateDemandeEnseignant,
  deleteDemandeEnseignant
};