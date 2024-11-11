const connection = require('../config/db.config');
const jwt = require('jsonwebtoken');


exports.getAllPlayers = (req, res) => {
  const query = 'SELECT * FROM players';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener jugadores' });
    }
    res.json(results);
  });
};

exports.getPlayerById = (req, res) => {
  const Id = req.params.id;
  const query = 'SELECT * FROM players WHERE id = ?';

  connection.query(query, [Id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el jugador' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json(results[0]);
  });
};

exports.createPlayer = (req, res) => {
  const { long_name, player_positions, club_name, nationality_name, age } = req.body;

  if (!long_name || !player_positions || !club_name || !nationality_name || !age) {
    return res.status(400).json({ message: 'Faltan datos del jugador' });
  }

  const query = 'INSERT INTO players (long_name, player_position, club_name, nationality_name, age) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [long_name, player_positions, club_name, nationality_name, age], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear jugador' });
    }
    res.status(201).json({ message: 'Jugador creado exitosamente', Id: results.insertId });
  });
};

exports.updatePlayer = (req, res) => {
  const Id = req.params.id;
  const { long_name, player_position, club_name, nationality_name, age } = req.body;

  if (!long_name || !player_position || !club_name || !nationality_name || !age) {
    return res.status(400).json({ message: 'Faltan datos del jugador' });
  }

  const query = 'UPDATE players SET long_name = ?, player_position = ?, club_name = ?, nationality_name = ?, age = ? WHERE id = ?';

  connection.query(query, [long_name, player_position, club_name, nationality_name, age, Id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar jugador' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json({ message: 'Jugador actualizado exitosamente' });
  });
};

exports.deletePlayer = (req, res) => {
  const Id = req.params.id;

  const query = 'DELETE FROM players WHERE id = ?';

  connection.query(query, [Id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar jugador' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json({ message: 'Jugador eliminado exitosamente' });
  });
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    req.user = decoded;
    next();
  });
};
