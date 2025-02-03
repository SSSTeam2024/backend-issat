const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPermissionSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  permission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('UserPermission', userPermissionSchema);