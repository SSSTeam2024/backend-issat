const leaveBalanceDao = require('../../dao/CongeDao/LeaveBalanceDao');


const createLeaveBalance = async (leaveBalanceData) => {
  return leaveBalanceDao.createLeaveBalance(leaveBalanceData);
};
const createOrUpdateLeaveBalance = async (leaveBalanceData) => {
  return leaveBalanceDao.createOrUpdateLeaveBalance(leaveBalanceData);
};

const getAllLeaveBalance = async () => {
  return leaveBalanceDao.getAllLeaveBalance();
};

const getLeaveBalanceById = async (id) => {
  return leaveBalanceDao.getLeaveBalanceById(id);
};

const updateLeaveBalance = async (id, updateData) => {
  return leaveBalanceDao.updateLeaveBalance(id, updateData);
};

const deleteLeaveBalance = async (id) => {
  return leaveBalanceDao.deleteLeaveBalance(id);
};

module.exports = {
    createLeaveBalance,
    createOrUpdateLeaveBalance,
    getAllLeaveBalance,
    getLeaveBalanceById,
    updateLeaveBalance,
    deleteLeaveBalance
};