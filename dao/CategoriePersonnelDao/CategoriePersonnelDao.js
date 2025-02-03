const categoriePersonnel = require("../../model/CategoriePersonnelModel/CategoriePersonnelModel")

const createCategoriePersonnel = async (categorie_personnel) => {
  return await categoriePersonnel.create(categorie_personnel);
};

const getCategoriesPersonnel = async () => {
  return await categoriePersonnel.find();
};

const updateCategoriePersonnel = async (id, updateData) => {
  return await categoriePersonnel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCategoriePersonnel = async (id) => {
  return await categoriePersonnel.findByIdAndDelete(id);
};

const getCategoriePersonnelById = async (id) => {
  return await categoriePersonnel.findById(id);
};


module.exports = {
    createCategoriePersonnel,
    getCategoriesPersonnel,
    updateCategoriePersonnel,
    deleteCategoriePersonnel,
    getCategoriePersonnelById,

};