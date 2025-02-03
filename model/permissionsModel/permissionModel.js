const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  section: { type: String, required: true },
  sub_section: { type: String, required: true },
  documentEdition: { type: String, required: true }
});

module.exports = mongoose.model('Permission', permissionSchema);