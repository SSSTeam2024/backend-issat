const VirtualServiceDao = require('../../dao/VirtualServiceDao/VirtualServiceDao');


const createVirtualService = async (VirtualServiceData) => {
  try {
  
    return await VirtualServiceDao.createVirtualService(VirtualServiceData);
  } catch (error) {
    console.error("Error creating VirtualService:", error);
    throw error;
  }
};

const getAllVirtualServices = async () => {
  return await VirtualServiceDao.getAllVirtualServices();
};

const getVirtualServiceById = async (id) => {
  return VirtualServiceDao.getVirtualServiceById(id);
};

const updateVirtualService = async (id, updateData) => {
  try {
  
    return await VirtualServiceDao.updateVirtualService(id, updateData);
  } catch (error) {
    console.error("Error updating VirtualService:", error);
    throw error;
  }
};

const deleteVirtualService = async (id) => {
  return VirtualServiceDao.deleteVirtualService(id);
};

module.exports = {
  createVirtualService,
  getAllVirtualServices,
  getVirtualServiceById,
  updateVirtualService,
  deleteVirtualService
};