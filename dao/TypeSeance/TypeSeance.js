const TypeSeanceModel = require("../../model/TypeSeanceModel/TypeSeanceModel");

const createTypeSeance = async (typeSeance) => {
  try {
    return await TypeSeanceModel.create(typeSeance);
  } catch (error) {
    console.error("Error creating type seance:", error);
    throw error;
  }
};
const getTypeSeances = async () => {
  const result = await TypeSeanceModel.find();
  return result;
};
const updateTypeSeance = async (id, updateData) => {
  return await TypeSeanceModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteTypeSeance = async (id) => {
  return await TypeSeanceModel.findByIdAndDelete(id);
};
module.exports = {
  createTypeSeance,
  getTypeSeances,
  updateTypeSeance,
  deleteTypeSeance,
};