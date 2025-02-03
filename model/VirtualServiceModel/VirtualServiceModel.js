const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VirtualServiceSchema = new Schema({
  title: { type: String, required: true },
}, 
{ timestamps: true });

module.exports = mongoose.model('VirtualService', VirtualServiceSchema);