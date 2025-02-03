const ficheVoeuxModel = require("../../model/FicheVoeuxModel/FicheVoeuxModel");

const createficheVoeux = async (data) => {
  return await ficheVoeuxModel.create(data);
};

// const getFichesVoeux = async () => {
//   return await ficheVoeuxModel.find().populate({
//     path: 'fiche_voeux_classes',
//     populate: {
//       path: 'matieres',
// }}).populate({
//   path: 'fiche_voeux_classes',
//   populate: {
//     path: 'classe',
// }}).populate('enseignant');
// };

const getFichesVoeux = async () => {
  return await ficheVoeuxModel
    .find()
    .populate({
      path: "fiche_voeux_classes",
      populate: [{ path: "matieres" }, { path: "classe" }],
    })
    .populate({
      path: "enseignant",
      populate: {
        path: "grade",
        populate: {
          path: "charge_horaire", // Adjust this if `charge_horaire` is a subdocument within `grade`
        },
      },
    });
};

const updateFicheVoeux = async (id, updateData) => {
  return await ficheVoeuxModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteFicheVoeuxById = async (id) => {
  const deletedFicheVoeux = await ficheVoeuxModel.findByIdAndDelete(id);

  return deletedFicheVoeux;
};
const getSalleById = async (id) => {
  return await salleModel.findById(id).populate("departement");
};

module.exports = {
  createficheVoeux,
  getFichesVoeux,
  deleteFicheVoeuxById,
  updateFicheVoeux,
};