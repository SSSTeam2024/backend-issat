const etatEtudiant= require("../../model/etatCompteEtudiantModel/EtatCompteEtudiantModel");

const createEtatEtudiant = async (etat_enseignant) => {
  return await etatEtudiant.create(etat_enseignant);
};

const getEtatsEtudiant = async () => {
  const result = await etatEtudiant.find();
  return result;
};


const updateEtatEtudiant = async (id, updateData) => {
  return await etatEtudiant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEtatEtudiant = async (id) => {
  return await etatEtudiant.findByIdAndDelete(id);
};

const getEtatEtudiantById = async (id) => {
  return await etatEtudiant.findById(id);
};


module.exports = {
    createEtatEtudiant,
    getEtatsEtudiant,
    updateEtatEtudiant,
    deleteEtatEtudiant,
    getEtatEtudiantById,

};