const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortCodeSchema = new Schema({
  titre: String,
  body: String,
  langue: String,
  intended_for: String
});


module.exports = mongoose.model('ShortCode', shortCodeSchema);
