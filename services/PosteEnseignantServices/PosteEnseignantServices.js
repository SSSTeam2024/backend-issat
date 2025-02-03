const posteEnseignantDao = require("../../dao/PosteEnseignantDao/PosteEnseignantDao");

const createPosteEnseignant = async (userData) => {
 
  return await posteEnseignantDao.createPosteEnseignant(userData);
};

const updatePosteEnseignantDao = async (id, updateData) => {
  return await posteEnseignantDao.updatePosteEnseignant(id, updateData);
};

const getPosteEnseignantDaoById = async (id) => {
  return await posteEnseignantDao.getPosteEnseignantById(id)
};

const getPostesEnseignantDao = async () => {
  return await posteEnseignantDao.getPostesEnseignant()
};

const deletePosteEnseignantDao = async (id) => {
  return await posteEnseignantDao.deletePosteEnseignant(id)
};



module.exports = {
    deletePosteEnseignantDao,
    getPostesEnseignantDao,
    getPosteEnseignantDaoById,
    updatePosteEnseignantDao,
    createPosteEnseignant,

};