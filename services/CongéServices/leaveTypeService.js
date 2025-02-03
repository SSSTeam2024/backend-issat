
const leaveTypeDao = require('../../dao/CongeDao/LeaveTypesDao');


const createLeaveType = async (LeaveTypeData) => {
  return leaveTypeDao.createLeaveType(LeaveTypeData);
};

const getAllLeaveType = async () => {
  return leaveTypeDao.getAllLeaveType();
};

const getLeaveTypeById = async (id) => {
  return leaveTypeDao.getLeaveTypeById(id);
};

const updateLeaveType = async (id, updateData) => {
  return leaveTypeDao.updateLeaveType(id, updateData);
};

const deleteLeaveType = async (id) => {
  return leaveTypeDao.deleteLeaveType(id);
};


const getSubcategoryById= async (subcategoryId) => {
  try {
    return leaveTypeDao.findSubcategoryById(subcategoryId);
  } catch (error) {
    throw new Error(`Service error: ${error.message}`);
  }
}

module.exports = {
    createLeaveType,
    getAllLeaveType,
    getLeaveTypeById,
    updateLeaveType,
    deleteLeaveType,
    getSubcategoryById
};