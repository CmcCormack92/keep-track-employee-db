const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      database: 'keep_track'
    },
    console.log('Connected to the keep_track database')
  );

  module.exports = db;