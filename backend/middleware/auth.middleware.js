const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secreto';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); 

  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.error('Error al verificar el token:', err); 
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};


