const typeSeanceDao = require("../../dao/TypeSeance/TypeSeance");
const createTypeSeance = async (data) => {
  let typeSeance = await typeSeanceDao.createTypeSeance(data);
  return typeSeance;
};

const updateTypeSeance = async (id, updateData) => {
  return await typeSeanceDao.updateTypeSeance(id, updateData);
};
const getTypeSeances = async () => {
  return await typeSeanceDao.getTypeSeances();
};

const deleteTypeSeance = async (id) => {
  return await typeSeanceDao.deleteTypeSeance(id);
};

module.exports = {
  createTypeSeance,
  updateTypeSeance,
  getTypeSeances,
  deleteTypeSeance,
};