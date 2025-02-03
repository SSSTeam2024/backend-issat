const leaveBalanceService = require('../../services/CongéServices/leaveBalanceService');
const mongoose = require('mongoose');

const createLeaveBalance = async (req, res) => {
  try {
    const {
      personnelId,
      leaveType,
      subcategory,
      daysUsed,
      remainingDays,
      year,
      lastUpdated
    } = req.body;

    const leaveBalance = await leaveBalanceService.createLeaveBalance({
      personnelId,
      leaveType,
      subcategory,
      daysUsed,
      remainingDays,
      year,
      lastUpdated
    });

    res.json(leaveBalance);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// const createLeaveBalance = async (req, res) => {
//   try {
  
//     const { personnelId, leaveType, subcategory, daysUsed, year } = req.body;

//     // // Example validation
//     // if (!personnelId || !leaveType || !daysUsed || typeof remainingDays !== 'number' || !year) {
//     //   return res.status(400).json({ message: 'All fields are required and must be valid.' });
//     // }

//     const leaveBalance = await leaveBalanceService.createLeaveBalance(req.body);
//     res.status(201).json(leaveBalance);
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Error creating leave balance:', error);
//     res.status(500).json({ message: error.message });
//   }
// };


const createOrUpdateLeaveBalance = async (req, res) => {
  try {
    const {   personnelId,
      leaveType,
      subcategory,
      daysUsed,
      remainingDays,
      year,
      lastUpdated } = req.body;
console.log("req", req.body)
    // Basic validation
    if (
      !personnelId || !leaveType || !year ||
      typeof requestedDays !== 'number' || requestedDays <= 0
    ) {
      return res.status(400).json({ message: 'Required fields are missing or invalid.' });
    }

    // Check if personnelId and leaveType are valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(personnelId) || !mongoose.Types.ObjectId.isValid(leaveType)) {
      return res.status(400).json({ message: 'Invalid personnelId or leaveType.' });
    }

    // Prepare leave balance data to pass to the service
    const leaveBalanceData = { personnelId, leaveType, subcategory, year, requestedDays };

    // Call the service to create or update the leave balance
    const leaveBalance = await leaveBalanceService.createOrUpdateLeaveBalance(leaveBalanceData);

    res.status(201).json(leaveBalance);
  } catch (error) {
    console.error('Error creating or updating leave balance:', error);
    
    // Specific error message for CastError
    if (error.name === 'CastError') {
      return res.status(400).json({ message: `Invalid ${error.path} provided.` });
    }
    
    res.status(500).json({ message: error.message });
  }
};



const getAllLeaveBalance = async (req, res) => {
  try {
    const LeaveBalances = await leaveBalanceService.getAllLeaveBalance();
    res.status(200).json(LeaveBalances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeaveBalanceById = async (req, res) => {
  try {
    const LeaveBalance = await leaveBalanceService.getLeaveBalanceById(req.params.id);
    if (!LeaveBalance) {
      return res.status(404).json({ message: 'LeaveBalance not found' });
    }
    res.status(200).json(LeaveBalance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLeaveBalance = async (req, res) => {
  try {
    const updatedLeaveBalance = await leaveBalanceService.updateLeaveBalance(req.params.id, req.body);
    if (!updatedLeaveBalance) {
      return res.status(404).json({ message: 'LeaveBalance not found' });
    }
    res.status(200).json(updatedLeaveBalance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLeaveBalance = async (req, res) => {
  try {
    const deletedLeaveBalance = await leaveBalanceService.deleteLeaveBalance(req.params.id);
    if (!deletedLeaveBalance) {
      return res.status(404).json({ message: 'LeaveBalance not found' });
    }
    res.status(200).json({ message: 'LeaveBalance deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLeaveBalance,
  createOrUpdateLeaveBalance,
  getAllLeaveBalance,
  getLeaveBalanceById,
  updateLeaveBalance,
  deleteLeaveBalance
};