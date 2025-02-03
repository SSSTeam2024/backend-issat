const pool = require('../../config/database');

class UserRoleDAO {
    async findAllUserRoles() {
      const [rows] = await pool.query('SELECT * FROM role_user');
      return rows;
    }
    
  async createUserRole(userRole) {
    const { role_name } = userRole;
    const [result] = await pool.query(
      'INSERT INTO role_user (role_name) VALUES (?)',
      [role_name]
    );
    return { id: result.insertId, ...userRole };
  }
  async deleteUserRoleById(id) {
    const [result] = await pool.query('DELETE FROM role_user WHERE id = ?', [id]);
    return result.affectedRows > 0; // Returns true if a row was deleted, false otherwise
  }
  async updateUserRoleById(id, role_name) {
    await pool.query('UPDATE role_user SET role_name = ? WHERE id = ?', [role_name, id])
    const [rows] = await pool.query('SELECT * FROM role_user  WHERE id = ?', [id])
    return rows[0]; // Returns true if a row was updated, false otherwise
  }
  
}

module.exports = new UserRoleDAO();