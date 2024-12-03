const mysql = require('mysql2/promise');

const teacherDb = {
  config: {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'digi_lib', // Use the content_db database name
  },

  async execute(sql, values = []) {
    try {
      const connection = await mysql.createConnection(this.config);

      const [results] = await connection.execute(sql, values);

      connection.end();

      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = teacherDb;
