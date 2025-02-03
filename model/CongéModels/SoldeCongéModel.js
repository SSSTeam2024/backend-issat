const mongoose = require('mongoose');

const LeaveBalanceSchema = new mongoose.Schema({
    personnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel', required: true },
    leaveType: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaveType', required: true },
    subcategory: {
        _id: String,
        name_fr: String,
        name_ar: String,
        maxDays: Number,
        sexe: { type: String, enum: ['Homme', 'Femme', 'Both'], default: 'Both' },
        Accumulable: { type: Boolean, default: false },
      }, 
    remainingDays: { type: Number, required: false },
    daysUsed: { type: Number, default: 0, required: false },
    year: { type: Number, required: true }, // Year of the leave balance
    lastUpdated: { type: Date, default: Date.now }
});

// Adding an index to ensure that each personnelId, leaveType, and year combination is unique
LeaveBalanceSchema.index({ personnelId: 1, leaveType: 1, subcategory: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('LeaveBalance', LeaveBalanceSchema);

// const mongoose = require('mongoose');

// const LeaveBalanceSchema = new mongoose.Schema({
//   personnelId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Personnel' }, // Reference to Personnel model
//   leaveType: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'LeaveType' }, // Reference to LeaveType
//   balance: { type: Number, required: true }, // Leave balance for this type
//   used: { type: Number, default: 0 }, // Total leave days used
//   remaining: { type: Number, required: true }, // Remaining leave days
//   lastUpdated: { type: Date, default: Date.now }, // Timestamp for the last update
// });

// module.exports ('LeaveBalance', LeaveBalanceSchema);
