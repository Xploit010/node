const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

connection.connect(function (error) {
  if (error) {
    console.log("Connection error to databases")
  } else {
    console.log("Connected to database")
  }
})

module.exports = connection
