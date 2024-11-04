const mysql = require('mysql');

const bookDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sql@1234',
  database: 'digi_lib', // Your database name
});

bookDb.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = bookDb;