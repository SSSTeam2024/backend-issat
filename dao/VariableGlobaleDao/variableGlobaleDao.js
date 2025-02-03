const VariableGlobale = require("../../model/VariableGlobaleModel/variableGlobaleModel")

const createVariableGlobale = async (shortCode) => {
  return await VariableGlobale.create(shortCode);
};

const getVariableGlobales = async () => {
  return await VariableGlobale.find()
};

const getVariableGlobaleById = async (id) => {
  return await VariableGlobale.findById(id);
};

module.exports = {
    createVariableGlobale,
    getVariableGlobales,
    getVariableGlobaleById
};