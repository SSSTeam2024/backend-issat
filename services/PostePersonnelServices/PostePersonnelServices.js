const postePersonnelDao = require("../../dao/PostePersonnelDao/PostePersonnelDao");

const createPostePersonnel = async (userData) => {
 
  return await postePersonnelDao.createPostePersonnel(userData);
};

const updatePostePersonnelDao = async (id, updateData) => {
  return await postePersonnelDao.updatePostePersonnel(id, updateData);
};

const getPostePersonnelDaoById = async (id) => {
  return await postePersonnelDao.getPostePersonnelById(id)
};

const getPostesPersonnelDao = async () => {
  return await postePersonnelDao.getPostesPersonnel()
};

const deletePostePersonnelDao = async (id) => {
  return await postePersonnelDao.deletePostePersonnel(id)
};



module.exports = {
    deletePostePersonnelDao,
    getPostesPersonnelDao,
    getPostePersonnelDaoById,
    updatePostePersonnelDao,
    createPostePersonnel,

};