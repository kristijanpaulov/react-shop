const express = require('express');
const app = express.Router();
const { createPool } = require('mysql');


const pool = createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'shopreact'
});


app.get('/popular', function (req, res, next) {
  pool.query(`SELECT * FROM products`, (error, data) => {
    res.send(data)
  })
});
app.get('/lowToHigh', function (req, res, next) {
  pool.query(`SELECT * FROM products ORDER by productPrice ASC`, (error, data) => {
    res.send(data)
  })
});
app.get('/lucky', function (req, res, next) {
  pool.query(`SELECT * FROM products ORDER BY RAND()`, (error, data) => {
    res.send(data)
  })
});

module.exports = app;
