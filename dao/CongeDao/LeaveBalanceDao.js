const LeaveBalance = require('../../model/CongéModels/SoldeCongéModel');
const {LeaveType}  = require('../../model/CongéModels/TypeCongéModel');
const mongoose = require('mongoose');

const createLeaveBalance = async (LeaveBalanceData) => {
  const leaveBalance = new LeaveBalance(LeaveBalanceData);
  return leaveBalance.save();
};

const createOrUpdateLeaveBalance = async (leaveBalanceData) => {
  const { personnelId, leaveType, subcategory, year, requestedDays } = leaveBalanceData;

  try {
    // Convert to ObjectId for MongoDB compatibility if necessary
    const filter = {
      personnelId,
      leaveType,
      year,
      ...(subcategory && { subcategory }),
    };

    const existingBalance = await LeaveBalance.findOne(filter);

    if (existingBalance) {
      // Check if enough remaining days for the request
      if (existingBalance.remainingDays < requestedDays) {
        throw new Error("Insufficient leave balance for this request.");
      }

      // Update existing balance
      existingBalance.daysUsed += requestedDays;
      existingBalance.remainingDays -= requestedDays;
      existingBalance.lastUpdated = new Date();

      return existingBalance.save();
    } else {
      let maxDays;

      if (subcategory) {
        // Retrieve maxDays from subcategory
        const subcategoryRecord = await LeaveType.findOne(
          { _id: leaveType, "subcategories._id": subcategory },
          { "subcategories.$": 1 } // Only return the matching subcategory
        );

        if (!subcategoryRecord || !subcategoryRecord.subcategories[0]?.maxDays) {
          throw new Error('Leave subcategory not found or maxDays is not defined in subcategory');
        }

        maxDays = subcategoryRecord.subcategories[0].maxDays;
      } else {
        // Retrieve maxDays from main leave type
        const leaveTypeRecord = await LeaveType.findById(leaveType).select('maxDays');
        if (!leaveTypeRecord || typeof leaveTypeRecord.maxDays !== 'number') {
          throw new Error('Leave type not found or maxDays is not defined in the leave type');
        }

        maxDays = leaveTypeRecord.maxDays;
      }

      // Ensure requestedDays is a valid number
      if (typeof requestedDays !== 'number') {
        throw new Error('Requested days must be a valid number');
      }

      const remainingDays = maxDays - requestedDays;

      // Ensure remainingDays is not negative
      if (remainingDays < 0) {
        throw new Error("Requested days exceed maximum allowed leave days.");
      }

      // Create new leave balance
      const newBalance = new LeaveBalance({
        personnelId,
        leaveType,
        subcategory,
        year,
        daysUsed: requestedDays,
        remainingDays,
        lastUpdated: new Date(),
      });

      return newBalance.save();
    }
  } catch (error) {
    console.error("Error in createOrUpdateLeaveBalance DAO:", error);
    throw error;
  }
};


const getAllLeaveBalance = async () => {
  return LeaveBalance.find().populate('personnelId').populate('leaveType')
};

const getLeaveBalanceById = async (id) => {
  return LeaveBalance.findById(id).populate('personnelId').populate('leaveType')
};

const updateLeaveBalance = async (id, updateData) => {
  updateData.updatedAt = Date.now(); 

  return LeaveBalance.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .populate('personnelId')
    .exec();
};

const deleteLeaveBalance = async (id) => {
  return LeaveBalance.findByIdAndDelete(id)
};
const findLeaveBalance = async (personnelId, leaveType,subcategory, year) => {
  return LeaveBalance.findOne({ personnelId, leaveType,subcategory, year });
};
const findLeaveBalances = async (personnelId, leaveType, subcategory) => {
  console.log("subcategory from dao", subcategory)
  console.log("personnelIdfrom dao", personnelId)
  console.log("leaveType from dao", leaveType)
  const result = await LeaveBalance.aggregate([
    {
      $match: {
        personnelId, // Match personnelId
        leaveType,   // Match leaveType
        'subcategory._id': subcategory,
        remainingDays: { $ne: 0 }, // remainingDays not equal to 0
      },
    },
    {
      $sort: { year: 1 }, // Sort by year in ascending order
    },
  ]);
  console.log("leave balances from dao", result)
  return result;
  
};
const editLeaveBalance = async (id, updateData) => {
  return LeaveBalance.findByIdAndUpdate(id, updateData, { new: true });
};
module.exports = {
    createLeaveBalance,
    createOrUpdateLeaveBalance,
    getAllLeaveBalance,
    getLeaveBalanceById,
    updateLeaveBalance,
    deleteLeaveBalance,
    findLeaveBalance,
    editLeaveBalance,
    findLeaveBalances,
   
};