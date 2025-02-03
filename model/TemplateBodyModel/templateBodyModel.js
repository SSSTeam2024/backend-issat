const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateBodySchema = new Schema({
  title: String,
  body: String,
  langue: String,
  intended_for: String,
  isArray: String,
  arraysNumber: String
});


module.exports = mongoose.model('TemplateBody', templateBodySchema);
