const mongoose = require('mongoose');

const gradePersonnelSchema = new mongoose.Schema({
// value_grade_personnel: { type: String, unique: true},
  grade_ar: String,
  grade_fr: String,
 
},
{ timestamps: true });

module.exports = mongoose.model('GradePersonnel', gradePersonnelSchema);