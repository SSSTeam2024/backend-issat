const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPermissionHistorySchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true }],
  assigned_at: { type: Date, required: true },
  removed_at: { type: Date }
});

module.exports = mongoose.model('UserPermissionHistory', userPermissionHistorySchema);
