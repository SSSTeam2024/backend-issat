const PapierAdministratif = require('../../model/PapierAdministratif/PapierAdministratifModel');


const addPapierAdministratif = async (papier_administratif) => {
  try {
    const papier = await PapierAdministratif.create(papier_administratif);
    return papier;
  } catch (error) {
    throw new Error(`Error adding PapierAdministratif: ${error.message}`);
  }
};


const getPapierAdministratifs = async () => {
  const result = await PapierAdministratif.find();
  return result;
};


const  updatePapierAdministratif = async (id, updateData) => {
  return await PapierAdministratif.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePapierAdministratif = async (id) => {
  return await PapierAdministratif.findByIdAndDelete(id);
};

const getPapierAdministratifById = async (id) => {
  return await PapierAdministratif.findById(id);
};



module.exports = {
  addPapierAdministratif,
  getPapierAdministratifById,
  deletePapierAdministratif,
  updatePapierAdministratif,
  getPapierAdministratifs
};