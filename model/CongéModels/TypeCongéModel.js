const mongoose = require('mongoose');

const LeaveSubcategorySchema = new mongoose.Schema({
  name_fr: { type: String, required: false }, 
  name_ar: { type: String, required: false }, 
  maxDays: { type: Number, required: false }, 
  sexe: { type: String, enum: ['Homme', 'Femme', 'Both'], default: 'Both' },
  Accumulable: { type: Boolean, default: false }, 
  GradePersonnel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GradePersonnel', required: false }],

});

const LeaveTypeSchema = new mongoose.Schema({
  category: { type: String, required: true }, 
  name_fr: { type: String, required: true}, 
  name_ar: { type: String, required: true }, 
  description: { type: String },
  maxDays: { type: Number, required: false }, 
  Accumulable: { type: Boolean, default: false }, 
  sexe: { type: String, enum: ['Homme', 'Femme', 'Both'], default: 'Both' },

  // Optional subcategories if the leave type has nested subcategories
  subcategories: {type: [LeaveSubcategorySchema], require: false},
});



// Create sparse unique indexes for name_fr and name_ar
// LeaveTypeSchema.index({ name_fr: 1 }, { unique: true, sparse: true });
// LeaveTypeSchema.index({ name_ar: 1 }, { unique: true, sparse: true });


// Export both LeaveType and LeaveSubcategory models
const LeaveType = mongoose.model('LeaveType', LeaveTypeSchema);
module.exports = { LeaveType };