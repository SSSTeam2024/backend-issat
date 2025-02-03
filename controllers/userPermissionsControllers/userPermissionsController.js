const userPermissionsService = require('../../services/userPermissionsServices/userPermissionsServices');


const createPermission = async (req, res) => {
  const { name, path, section, sub_section } = req.body;

  try {
    const newPermission = await userPermissionsService.createPermission(name, path, section, sub_section );
    res.status(201).json(newPermission);
  } catch (err) {
    console.error('Error creating permission:', err);
    res.status(500).json({ error: 'Failed to create permission' });
  }
};
const createPermissions = async (req, res) => {
  const { permissions } = req.body;

  try {
    const result = await userPermissionsService.createPermissions(permissions);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating permission:', err);
    res.status(500).json({ error: 'Failed to create permission' });
  }
};

const getAllPermissions = async (req, res) => {
  try {
      const permissions = await userPermissionsService.getAllPermissions();
      res.status(200).json(permissions);
  } catch (err) {
      console.error('Error fetching permissions:', err);
      res.status(500).json({ error: 'Failed to fetch permissions' });
  }
};

const getAllPermissionsByUserId = async (req, res) => {
  try {
    const {id} = req.body;
    const userPermissions = await userPermissionsService.getAllPermissionsByUserId(id);
    res.json(userPermissions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const assignPermissionsToUser = async (req, res) => {
  const { userId, permissionIds } = req.body;

  try {
    const updatedUser = await userPermissionsService.assignPermissionsToUser(userId, permissionIds);
    res.status(200).json({ message: 'Permissions assigned successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePermissions = async (req, res) => {
  const { userId, permissionIds } = req.body;
  try {
      const updatedUser = await userPermissionsService.deletePermissionsFromUser(userId, permissionIds);
      res.status(200).json({ message: 'Permissions deleted successfully', user: updatedUser });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


const getPermissionsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userPermissionsService.getPermissionsByUserId(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user.permissions);
  } catch (err) {
    console.error('Error getting permissions for user:', err);
    res.status(500).json({ error: 'Failed to get permissions for user' });
  }
};

const updatePermissionsForUser= async (req, res) => {
  const { userId, permissionIds } = req.body;

  try {
    const updatedUser = await userPermissionsService.updatePermissionsForUser(userId, permissionIds);
    res.status(200).json({ message: 'Permissions updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const updatePermissionsForUserHistory = async (req, res) => {
  const { userId, permissionIds } = req.body;

  try {
    await userPermissionsService.updatePermissionsForUserHistory(userId, permissionIds);
    res.status(200).json({ message: 'Permissions updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller function to fetch user permission history
const getUserPermissionHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const history = await userPermissionsService.getUserPermissionHistory(userId);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createPermission,
  getAllPermissions,
  getAllPermissionsByUserId,
  assignPermissionsToUser,
  getPermissionsByUserId,
  deletePermissions,
  updatePermissionsForUser,
  updatePermissionsForUserHistory,
getUserPermissionHistory,
createPermissions
};