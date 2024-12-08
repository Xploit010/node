const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "password",
    database: "creditos",
})

connection.connect(function (error) {
   if (error) {
    console.log("Connection error to databases" , error)
   } else {
    console.log("Connected to database")
   } 
})


module.exports = connection;

