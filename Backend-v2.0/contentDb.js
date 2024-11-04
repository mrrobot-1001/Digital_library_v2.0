const mysql = require('mysql2/promise');

const contentDb = {
  config: {
    host: 'localhost',
    user: 'root',
    password: 'Sql@1234',
    database: 'digi_lib', // Your content database name
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

module.exports = contentDb;
