const DemandePersonnel = require('../../model/DemandePersonnelModel/DemandePersonnelModel');


const createDemandePersonnel = async (demandePersonnelData) => {
  const demandePersonnel = new DemandePersonnel(demandePersonnelData);
  return demandePersonnel.save();
};

const getAllDemandePersonnels = async () => {
  return DemandePersonnel.find()
  .populate({
    path: "personnelId",
    populate:[
      {
        path: "poste"
      },
      {
        path: "etat_compte"

      },
      {
        path: "grade"
      },
      {
        path: "service"
      },
      {
        path: "categorie"
      }
    ] ,
    options: { strictPopulate: false },
  })
  .populate("piece_demande");
};

const getDemandePersonnelById = async (id) => {
  return DemandePersonnel.findById(id).populate('personnelId').populate("piece_demande");
};

const updateDemandePersonnel = async (id, updateData) => {
  return DemandePersonnel.findByIdAndUpdate(id, updateData, { new: true }).populate('personnelId');
};

const deleteDemandePersonnel = async (id) => {
  return DemandePersonnel.findByIdAndDelete(id).populate('personnelId');
};

module.exports = {
  createDemandePersonnel,
  getAllDemandePersonnels,
  getDemandePersonnelById,
  updateDemandePersonnel,
  deleteDemandePersonnel
};