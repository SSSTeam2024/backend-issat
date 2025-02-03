const DemandeCongeDao = require("../../dao/CongeDao/DemandeCongeDao");
const LeaveBalanceDao = require("../../dao/CongeDao/LeaveBalanceDao");
const LeaveBalance = require("../../model/CongéModels/SoldeCongéModel");

const fs = require("fs").promises;
const mongoose = require("mongoose");

async function saveDocumentsToServer(documents) {
  console.log("docs", documents);
  let counter = 0;
  for (const file of documents) {
    await saveFile(file.base64String, file.name, file.path);
    counter++;
    console.log("File number " + counter + " saved");
  }
  if (counter == documents.length) return true;
}

async function saveFile(base64String, fileName, file_path) {
  const binaryData = Buffer.from(base64String, "base64");
  const filePath = file_path + fileName;

  fs.writeFile(filePath, binaryData, "binary", (err) => {
    if (err) {
      console.error("Error saving the file:", err);
    } else {
      console.log("File saved successfully!");
    }
  });
}
const createDemandeConge = async (demandeCongeData, documents) => {
  try {
    const saveResult = await saveDocumentsToServer(documents);

    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await DemandeCongeDao.createDemandeConge(demandeCongeData);
  } catch (error) {
    console.error("Error creating demande Conge:", error);
    throw error;
  }
};

const getAllDemandeConges = async () => {
  try {
    const demandes = await DemandeCongeDao.getAllDemandeConges();

    const demandesWithSubcategoryDetails = demandes.map((demande) => {
      const { subcategory, leaveType } = demande;

      if (
        leaveType &&
        leaveType.subcategories &&
        subcategory &&
        subcategory.name
      ) {
        const matchingSubcategory = leaveType.subcategories.find(
          (sub) => sub.name === subcategory.name
        );

        if (matchingSubcategory) {
          demande.subcategory = matchingSubcategory;
        }
      }

      return demande;
    });

    return demandesWithSubcategoryDetails;
  } catch (error) {
    console.error("Error fetching demandes with subcategory details:", error);
    throw error;
  }
};

const getDemandeCongeById = async (id) => {
  return DemandeCongeDao.getDemandeCongeById(id);
};

const updateDemandeConge = async (id, updateData, documents) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (documents && documents.length > 0) {
      const saveResult = await saveDocumentsToServer(documents);
      if (!saveResult) {
        throw new Error("Not all files were saved successfully.");
      }
      updateData.file = documents.find((doc) =>
        doc.path.includes("demandeCongeFiles")
      )?.name;
      updateData.fileInterruption = documents.find((doc) =>
        doc.path.includes("demandeCongeInterruptionFiles")
      )?.name;
      updateData.fileReponse = documents.find((doc) =>
        doc.path.includes("demandeCongeReponseFiles")
      )?.name;
    }

    const demande = await DemandeCongeDao.updateDemandeConge(id, updateData);

    if (!demande) {
      throw new Error("Demande Conge not found.");
    }

    if (updateData.status === "acceptée") {
      const { personnelId, leaveType, subcategory, requestedDays, year } =
        updateData;

      //! Check if Leave Balance exists for this combination
      let leaveBalances = await LeaveBalanceDao.findLeaveBalances(
        personnelId,
        leaveType,
        subcategory._id
      );

      //! If no leave balances exist for the current year, create one
      const currentYear = new Date().getFullYear();
      let currentYearBalance = leaveBalances.find(
        (lb) => lb.year === currentYear
      );

      if (!currentYearBalance) {
        const newLeaveBalance = {
          personnelId,
          leaveType,
          subcategory,
          remainingDays: subcategory.maxDays || 0,
          daysUsed: 0,
          year: currentYear,
        };

        try {
          currentYearBalance = await LeaveBalanceDao.createLeaveBalance(
            newLeaveBalance
          );
          leaveBalances.push(currentYearBalance);
        } catch (error) {
          if (error.code === 11000) {
            console.warn(
              "Duplicate leave balance detected. Fetching existing record."
            );
            currentYearBalance = await LeaveBalance.findOne({
              personnelId,
              leaveType,
              year: currentYear,
            });
            if (!currentYearBalance) {
              throw new Error(
                "Failed to resolve duplicate leave balance issue."
              );
            }
            leaveBalances.push(currentYearBalance);
          } else {
            throw error; // Re-throw other errors
          }
        }
      }

      //! Deduct requestedDays from leave balances starting with older years
      let remainingRequestedDays = requestedDays;

      for (const leaveBalance of leaveBalances.sort(
        (a, b) => a.year - b.year
      )) {
        if (remainingRequestedDays <= 0) break;

        if (leaveBalance.remainingDays >= remainingRequestedDays) {
          leaveBalance.remainingDays -= remainingRequestedDays;
          leaveBalance.daysUsed += remainingRequestedDays;
          remainingRequestedDays = 0;
        } else {
          remainingRequestedDays -= leaveBalance.remainingDays;
          leaveBalance.daysUsed += leaveBalance.remainingDays;
          leaveBalance.remainingDays = 0;
        }

        await LeaveBalance.findByIdAndUpdate(leaveBalance._id, leaveBalance, {
          new: true,
        });
      }

      if (remainingRequestedDays > 0) {
        throw new Error("Insufficient leave balance across years.");
      }
    }

    if (updateData.status === "suspendue") {
      const { personnelId, leaveType, subcategory, suspensionDate } =
        updateData;

      if (!suspensionDate) {
        throw new Error("Suspension date is required to process suspension.");
      }

      // Parse the original start and end dates
      const startDate = new Date(demande.startDay);
      const endDate = new Date(demande.endDay);
      const suspensionDateObj = new Date(suspensionDate);

      if (suspensionDateObj <= startDate || suspensionDateObj > endDate) {
        throw new Error("Suspension date must fall within the leave period.");
      }

      // Calculate the days actually used (from startDate to suspensionDate)
      const daysUsed = Math.ceil(
        (suspensionDateObj - startDate) / (1000 * 60 * 60 * 24)
      );

      // Original requested days
      const requestedDays =
        Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

      // Update leave balances
      const unusedDays = requestedDays - daysUsed;

      // Fetch the leave balance for this year
      const currentYear = startDate.getFullYear();
      const leaveBalance = await LeaveBalance.findLeaveBalanceByYear(
        personnelId,
        leaveType,
        subcategory._id,
        currentYear
      );

      if (!leaveBalance) {
        throw new Error("Leave balance not found for this year.");
      }

      // Safely update the leave balance
      const updatedLeaveBalance = await LeaveBalance.findOneAndUpdate(
        { _id: leaveBalance._id },
        {
          $inc: {
            remainingDays: unusedDays, // Add unused days back
            daysUsed: -unusedDays, // Deduct unused days from used
          },
        },
        { new: true }
      );

      if (!updatedLeaveBalance) {
        throw new Error("Failed to update leave balance.");
      }
    }

    await session.commitTransaction();
    session.endSession();
    return demande;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error updating DemandeConge:", error);
    throw error;
  }
};

const deleteDemandeConge = async (id) => {
  return DemandeCongeDao.deleteDemandeConge(id);
};

module.exports = {
  createDemandeConge,
  getAllDemandeConges,
  getDemandeCongeById,
  updateDemandeConge,
  deleteDemandeConge,
};