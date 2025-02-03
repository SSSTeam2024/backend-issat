const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
  id_variable_globale: String,
  id_template_body: String,
  id_student: String,
  langue: String
});


module.exports = mongoose.model('Template', templateSchema);
