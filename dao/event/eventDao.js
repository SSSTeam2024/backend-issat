
const pool = require('../../config/database');

class EventDAO {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM events');
    return rows;
  }

  async create(event) {
    const { titre, description, adresse,link, date, rating, views, image } = event;
    const [result] = await pool.query(
      'INSERT INTO events (titre, description, adresse,link, date, rating, views, image) VALUES (?, ?,?, ?,?, ?,?,?)',
      [titre, description, adresse,link, date, rating, views, image]
    );
    return { id: result.insertId, ...event };
  }
}

module.exports = new EventDAO();
