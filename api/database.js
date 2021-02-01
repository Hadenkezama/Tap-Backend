const dotenv = require('dotenv')
const mysql = require('mysql');

dotenv.config();


const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


module.exports = connection