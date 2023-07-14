const express = require("express");
const app = express();
app.use(express.json());

const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatbot",
  connectionLimit: 20,
});

con.connect((err) => {
  if (err) {
    console.log("connection not proper");
  } else {
    console.log("connected");
  }
});

module.exports = con;
