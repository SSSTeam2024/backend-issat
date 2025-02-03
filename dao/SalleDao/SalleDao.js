const DepartementModel = require("../../model/departementModel/DepartementModel");
const salleModel = require("../../model/SallesModel/SallesModel")

const createSalle = async (salle) => {
  return await salleModel.create(salle);
};

const getSalles = async () => {
  return await salleModel.find().populate('departement');
};

const updateSalle = async (id, updateData) => {
  return await salleModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteSalle = async (id) => {
  const deletedSalle = await salleModel.findByIdAndDelete(id);
  if (deletedSalle) {
    await DepartementModel.updateMany(
      { salles: id },
      { $pull: { salles: id } }
    );
  }
  return deletedSalle;
};
const getSalleById = async (id) => {
  return await salleModel.findById(id).populate('departement');
};


module.exports = {
    getSalles,
    createSalle,
    updateSalle,
    deleteSalle,
    getSalleById,

};