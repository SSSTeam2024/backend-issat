const mongoose = require('mongoose');

const servicePersonnelSchema = new mongoose.Schema({
  // value: { type: String, unique: true },
  service_ar: String,
  service_fr: String,

 
},
{ timestamps: true });

module.exports = mongoose.model('ServicePersonnel', servicePersonnelSchema);