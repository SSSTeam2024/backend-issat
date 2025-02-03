const VirtualService = require('../../model/VirtualServiceModel/VirtualServiceModel');

const createVirtualService = async (VirtualServiceData) => {
  const virtualService = new VirtualService(VirtualServiceData);
  return virtualService.save();
};

const getAllVirtualServices = async () => {
  return VirtualService.find()
};

const getVirtualServiceById = async (id) => {
  return VirtualService.findById(id);
};

const updateVirtualService = async (id, updateData) => {
  return VirtualService.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteVirtualService = async (id) => {
  return VirtualService.findByIdAndDelete(id);
};

module.exports = {
  createVirtualService,
  getAllVirtualServices,
  getVirtualServiceById,
  updateVirtualService,
  deleteVirtualService
};