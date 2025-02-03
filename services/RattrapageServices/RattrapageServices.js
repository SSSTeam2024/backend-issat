const rattrapageDao = require("../../dao/RattrapageDao/RattrapageDao");
const createRattrapage = async (data) => {
  let rattrapage = await rattrapageDao.createRattrapage(data);
  return rattrapage;
};

const getRattrapages = async () => {
  return await rattrapageDao.getRattrapages();
};

const updateRattrapageEtatStatusService = async (
  rattrapageId,
  etat,
  status
) => {
  if (!etat || !status) {
    throw new Error("Both 'etat' and 'status' must be provided.");
  }

  return await rattrapageDao.updateEtatAndStatusRattrapage(
    rattrapageId,
    etat,
    status
  );
};

// const deleteTypeSeance = async (id) => {
//   return await rattrapageDao.deleteTypeSeance(id);
// };
// const updateTypeSeance = async (id, updateData) => {
//     return await rattrapageDao.updateTypeSeance(id, updateData);
//   };

module.exports = {
  createRattrapage,
  getRattrapages,
  updateRattrapageEtatStatusService,
};