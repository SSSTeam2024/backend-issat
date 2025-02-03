const {LeaveType} = require('../../model/CongéModels/TypeCongéModel');


const createLeaveType = async (leaveTypeData) => {
  const leaveType = new LeaveType(leaveTypeData);
  return leaveType.save();
};

const getAllLeaveType = async () => {
  return LeaveType.find()
};

const getLeaveTypeById = async (id) => {
  return LeaveType.findById(id)
};

const updateLeaveType = async (id, updateData) => {
  return LeaveType.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteLeaveType = async (id) => {
  return LeaveType.findByIdAndDelete(id)
};

// Function to find a subcategory by its ID within all LeaveType documents
async function findSubcategoryById(subcategoryId) {
  const leaveType = await LeaveType.findOne({ "subcategories._id": subcategoryId }, { "subcategories.$": 1 });

  if (!leaveType || !leaveType.subcategories || leaveType.subcategories.length === 0) {
    throw new Error('Subcategory not found');
  }

  // Return the specific subcategory document found
  return leaveType.subcategories[0];
}




module.exports = {
    createLeaveType,
    getAllLeaveType,
    getLeaveTypeById,
    updateLeaveType,
    deleteLeaveType,
    findSubcategoryById
};