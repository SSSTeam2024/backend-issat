const DemandeConge = require('../../model/CongéModels/demandeConge');

const createDemandeConge = async (demandeCongeData) => {
  console.log("dao",demandeCongeData)
  const demandeConge = new DemandeConge(demandeCongeData);
  return demandeConge.save();
};

const getAllDemandeConges = async () => {
  return DemandeConge.find()
    .populate({
      path: 'personnelId',
      populate: [
        {
          path: 'categorie',
          model: 'CategoriePersonnel',
        },
        {
          path: 'grade',
          model: 'GradePersonnel',
        },
        {
          path: 'poste',
          model: 'PostePersonnel',
        },
        {
          path: 'service',
          model: 'ServicePersonnel',
        },
      ],
    })
    .populate('leaveType')
    .lean();
};

const getDemandeCongeById = async (id) => {
  return DemandeConge.findById(id);
};

const updateDemandeConge = async (id, updateData) => {
  return DemandeConge.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteDemandeConge = async (id) => {
  return DemandeConge.findByIdAndDelete(id);
};

module.exports = {
  createDemandeConge,
  getAllDemandeConges,
  getDemandeCongeById,
  updateDemandeConge,
  deleteDemandeConge
};