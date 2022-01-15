const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username
      user: 'root',
      // Your MySql password
      password: '',
      database: 'keep_track'
    },
    console.log('Connected to the keep_track database')
  );

  module.exports = db;