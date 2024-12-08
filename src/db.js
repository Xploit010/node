const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "creditos"
})

connection.connect(function (error) {
   if (error) {
    console.log("Connection error to databases" , error)
   } else {
    console.log("Connected to database")
   } 
})


module.exports = connection;

