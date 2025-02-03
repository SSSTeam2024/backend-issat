const servicePersonnelDao = require("../../dao/ServicePersonnelDao/ServicePersonnelDao");

const registerServicePersonnel = async (userData) => {
 
  return await servicePersonnelDao.createServicePersonnel(userData);
};

const updateServicePersonnelDao = async (id, updateData) => {
  return await servicePersonnelDao.updateServicePersonnel(id, updateData);
};

const getServicePersonnelDaoById = async (id) => {
  return await servicePersonnelDao.getServicePersonnelById(id)
};

const getServicesPersonnelDao = async () => {
  return await servicePersonnelDao.getServicesPersonnel()
};

const deleteServicePersonnelDao = async (id) => {
  return await servicePersonnelDao.deleteServicePersonnel(id)
};



module.exports = {
    registerServicePersonnel,
    updateServicePersonnelDao,
    getServicePersonnelDaoById,
    deleteServicePersonnelDao,
    getServicesPersonnelDao,

};