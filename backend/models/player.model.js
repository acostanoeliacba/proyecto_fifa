const connection = require('../config/db.config'); 

const getAllPlayers = (callback) => {
  const query = 'SELECT * FROM players';
  connection.query(query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getPlayerById = (id, callback) => {
  const query = 'SELECT * FROM players WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

const createPlayer = (player, callback) => {
  const { long_name, player_positions, club_name, nationality_name, age } = player;
  const query = 'INSERT INTO players ( long_name, player_positions, club_name, nationality_name, age) VALUES (?, ?, ?, ?)';
  connection.query(query, [ long_name, player_positions, club_name, nationality_name, age], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.insertId);  
    }
  });
};

const updatePlayer = (id, player, callback) => {
  const { id, long_name, player_positions, club_name, nationality_name, age } = player;
  const query = 'UPDATE players SET long_name = ?, player_positions = ?, club_name = ?, nationality_name = ?, age = ? WHERE id = ?';
  connection.query(query, [ id, long_name, player_positions, club_name, nationality_name, age], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const deletePlayer = (id, callback) => {
  const query = 'DELETE FROM players WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
};
