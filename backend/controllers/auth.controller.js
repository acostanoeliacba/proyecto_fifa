const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const USERS = [
  { usuario: 'admin', password: 'admin123' },
  { usuario: 'user', password: 'user123' } 
];

exports.register = (req, res) => {
  const { usuario, password } = req.body;
  
  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  
  const existingUser = USERS.find(u => u.usuario === usuario);
  if (existingUser) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }

  const token = jwt.sign({ usuario: usuario }, JWT_SECRET, { expiresIn: '1h' });
 
  res.status(201).json({ message: 'Usuario registrado exitosamente', token });
};

exports.login = (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  const user = USERS.find(u => u.usuario === usuario);

  if (!user) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }
  
  if (user.password !== password) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }
  
  const token = jwt.sign({ usuario: user.usuario }, JWT_SECRET, { expiresIn: '1h' });
  
  res.json({ token });
};