const userRoleService = require('../../services/userServices/userRoleServices');

exports.getAllUserRoles = async (req, res) => {

  try {
    const userRoles = await userRoleService.getAllUserRoles();
    res.json(userRoles);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createUserRole = async (req, res) => {
  try {
    const {role_name } = req.body;
    
    let userRole = await userRoleService.createUserRole({ role_name});
    res.json(userRole);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteUserRole = async (req, res) => {
    try {
      const id = req.body;
      const success = await userRoleService.deleteUserRole(id);
      if (success) {
        res.json({ message: 'User role deleted successfully' });
      } else {
        res.status(404).json({ error: 'User role not found' });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  exports.updateUserRole = async (req, res) => {
    try {
      //const roleId = req.body.id; // Assuming the ID is passed as "id" in the request body
      const {id, role_name} = req.body;
      const success = await userRoleService.updateUserRole(id, role_name);
      if (success) {
        res.json({ message: 'User role updated successfully' });
      } else {
        res.status(404).json({ error: 'User role not found' });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

