const etatEnseignant = require("../../model/etatCompteEnseignantModel/etatCompteEnseignantModel");

const createEtatEnseignant = async (etat_enseignant) => {
  return await etatEnseignant.create(etat_enseignant);
};

const getEtatsEnseignant = async () => {
  const result = await etatEnseignant.find();
  return result;
};

const updateEtatEnseignant = async (id, updateData) => {
  return await etatEnseignant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEtatEnseignant = async (id) => {
  return await etatEnseignant.findByIdAndDelete(id);
};

const getEtatEnseignantById = async (id) => {
  return await etatEnseignant.findById(id);
};

module.exports = {
  createEtatEnseignant,
  getEtatsEnseignant,
  updateEtatEnseignant,
  deleteEtatEnseignant,
  getEtatEnseignantById,
};
