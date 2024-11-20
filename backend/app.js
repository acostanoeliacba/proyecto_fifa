const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();
const app = express();

const playerRoutes = require('./routes/player.routes');
const authRoutes = require('./routes/auth.routes');

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true 
}));

app.use(bodyParser.json());
app.use(express.json());

app.use(express.static('public'));

app.use('/api/players', playerRoutes);
app.use('/api/auth', authRoutes); 



module.exports = app;

const db = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DB,
});

db.connect(err => {
    if (err) throw err;
    console.log('Conexión a la base de datos exitosa');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
