const leaveTypeService = require('../../services/CongéServices/leaveTypeService');

const createLeaveType = async (req, res) => {
  try {
    const LeaveType = await leaveTypeService.createLeaveType(req.body);
    res.status(201).json(LeaveType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllLeaveType = async (req, res) => {
  try {
    const LeaveTypes = await leaveTypeService.getAllLeaveType();
    res.status(200).json(LeaveTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeaveTypeById = async (req, res) => {
  try {
    const LeaveType = await leaveTypeService.getLeaveTypeById(req.body._id);
    if (!LeaveType) {
      return res.status(404).json({ message: 'LeaveType not found' });
    }
    res.status(200).json(LeaveType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLeaveType = async (req, res) => {
  try {
    const updatedLeaveType = await leaveTypeService.updateLeaveType(req.body._id, req.body);
    if (!updatedLeaveType) {
      return res.status(404).json({ message: 'LeaveType not found' });
    }
    res.status(200).json(updatedLeaveType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLeaveType = async (req, res) => {
  try {
    const deletedLeaveType = await leaveTypeService.deleteLeaveType(req.params.id);
    if (!deletedLeaveType) {
      return res.status(404).json({ message: 'LeaveType not found' });
    }
    res.status(200).json({ message: 'LeaveType deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller function to get a subcategory by its ID
const getSubcategoryById = async(req, res)=>  {
  const { subcategoryId } = req.body;

  if (!subcategoryId) {
    return res.status(400).json({ message: "subcategoryId is required" });
  }
  try {
    const subcategory = await leaveTypeService.getSubcategoryById(subcategoryId);
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(404).json({ message: error.message });
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