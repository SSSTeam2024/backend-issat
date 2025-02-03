const userRoleDao = require('../../dao/userDao/userRoleDao');

class userRoleService {
  async getAllUserRoles() {
    return await userRoleDao.findAllUserRoles();
  }

  async createUserRole(userRole) {
    
    return await userRoleDao.createUserRole(userRole);
  }
  async deleteUserRole(id) {
    return await userRoleDao.deleteUserRoleById(id);
  }

  async updateUserRole(id, role_name) {
    return await userRoleDao.updateUserRoleById(id, role_name);
  }
}

module.exports = new userRoleService();