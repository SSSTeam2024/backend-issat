const Permission = require('../../model/permissionsModel/permissionModel');
const User = require ('../../model/userModel/userModel')
const UserPermissionHistory = require('../../model/userPermissionHistoryModel/userPermissionHistoryModel');
const mongoose = require('mongoose');

const createPermission = async (permissionData) => {
  if (typeof permissionData !== 'object' || !permissionData.name || !permissionData.path || !permissionData.section || !permissionData.sub_section ) {
    throw new Error('Invalid permission data');
  }
  return await Permission.create(permissionData);
};


const createPermissions = async (permissionsData) => {
  if (!Array.isArray(permissionsData) || permissionsData.length === 0) {
    throw new Error('Invalid permissions data. Must be a non-empty array.');
  }

  // Validate each permission object
  const invalidPermissions = permissionsData.filter(
    (permission) =>
      typeof permission !== 'object' ||
      !permission.name ||
      !permission.path ||
      !permission.section ||
      !permission.sub_section
  );

  if (invalidPermissions.length > 0) {
    throw new Error('Some permissions data are invalid.');
  }

  // Insert all permissions in one query
  return await Permission.insertMany(permissionsData);
};

const getAllPermissions = async () => {
  return await Permission.find({});
};
const deletePermission = async (id) => {
  return await Permission.findByIdAndDelete(id);
};
const getPermissionById = async (id) => {
  return await Permission.findById(id);
}
const updatePermission = async (id, updateData) => {
  return await Permission.findByIdAndUpdate(id, updateData, { new: true });
};

const assignPermissionsToUser = async (userId, permissionIds) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const permissions = await Permission.find({ _id: { $in: permissionIds } });
    if (permissions.length !== permissionIds.length) {
      throw new Error('One or more permissions not found');
    }

    // Filter out duplicate permission IDs
    const newPermissions = permissionIds.filter(permissionId => !user.permissions.includes(permissionId));
    user.permissions = [...user.permissions, ...newPermissions];

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
const deletePermissionsFromUser = async (userId, permissionIdsToDelete) => {
  try {
      const user = await User.findById(userId);
      if (!user) {
          throw new Error('User not found');
      }

      // Remove permissions from user
      user.permissions = user.permissions.filter(permission => !permissionIdsToDelete.includes(permission.toString()));

      await user.save();
      return user;
  } catch (error) {
      throw error;
  }
};

const getPermissionsByUserId = async (userId) => {
  return await User.findById(userId).populate('permissions').exec();
};

const updatePermissionsForUser = async (userId, permissionIds) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const permissions = await Permission.find({ _id: { $in: permissionIds } });
    if (permissions.length !== permissionIds.length) {
      throw new Error('One or more permissions not found');
    }

    // Update user's permissions with the new set
    user.permissions = permissionIds;

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}



// const updatePermissionsForUserHistory = async (userId, permissionIds) => {
//   try {
//     const user = await User.findById(userId).populate('permissions');

//     if (!user) {
//       throw new Error('User not found');
//     }

//     const currentPermissionIds = user.permissions.map(p => p._id.toString());

//     const removedPermissionIds = currentPermissionIds.filter(id => !permissionIds.includes(id));
//     const addedPermissionIds = permissionIds.filter(id => !currentPermissionIds.includes(id));

//     const oldDate = user.updatedAt;
//     const newDate = new Date();

//     // Update user permissions
//     user.permissions = permissionIds.map(permissionId => new mongoose.Types.ObjectId(permissionId));
//     await user.save();

//     // Record history for removed permissions
//     for (const permissionId of removedPermissionIds) {
//       await UserPermissionHistory.create({
//         user_id: userId,
//         permission_id: permissionId,
//         assigned_at: oldDate,
//         updated_at: newDate
//       });
//     }

//     // Record history for added permissions
//     for (const permissionId of addedPermissionIds) {
//       await UserPermissionHistory.create({
//         user_id: userId,
//         permission_id: permissionId,
//         assigned_at: oldDate,
//         updated_at: newDate
//       });
//     }
//   } catch (error) {
//     throw error;
//   }
// };


// Function to update user permissions and record history
const updatePermissionsForUserHistory = async (userId, permissionIds) => {
  try {
    // Find the current user and their permissions
    const user = await User.findById(userId).select('permissions updated_at');
    const currentPermissionIds = user.permissions.map(p => p.toString());

    const removedPermissionIds = currentPermissionIds.filter(id => !permissionIds.includes(id));
    const addedPermissionIds = permissionIds.filter(id => !currentPermissionIds.includes(id));

    const now = new Date();

    // Record history for the current permissions before any changes
    if (currentPermissionIds.length > 0) {
      await UserPermissionHistory.create({
        user_id: userId,
        permissions: currentPermissionIds,
        assigned_at: user.updated_at || now,  // Use the last updated time or current time if not available
        removed_at: now  // Current time as removal time for old permissions
      });
    }

    // Update user permissions
    user.permissions = permissionIds;
    user.updated_at = now;  // Update the timestamp
    await user.save();

    // Record history for the new permissions
    await UserPermissionHistory.create({
      user_id: userId,
      permissions: permissionIds,
      assigned_at: now  // The updated time of the user's permissions
    });

  } catch (error) {
    throw error;
  }
};


const fetchUserPermissionHistory = async (userId) => {
  try {
    return await UserPermissionHistory.find({ user_id: userId })
      .populate('permissions')  // Populate the 'permissions' field
      .sort({ assigned_at: -1 });
  } catch (error) {
    throw error;
  }
};




module.exports = {
  createPermission,
  getAllPermissions,
  deletePermission,
  getPermissionById,
  updatePermission, 
  assignPermissionsToUser,
  getPermissionsByUserId,
  deletePermissionsFromUser,
  updatePermissionsForUser,
  updatePermissionsForUserHistory, 
  fetchUserPermissionHistory,
  createPermissions

};