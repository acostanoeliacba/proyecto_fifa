
const connection = require('../config/db.config');

const findUserByUsername = (usuario, callback) => {
  const query = 'SELECT * FROM users WHERE usuario = ?'; 
  connection.query(query, [usuario], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);  
    }
  });
};

const createUser = (usuario, password, callback) => {
  const query = 'INSERT INTO users (usuario, password) VALUES (?, ?)';
  connection.query(query, [usuario, password], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.insertId); 
    }
  });
};

module.exports = {
  findUserByUsername,
  createUser
};

