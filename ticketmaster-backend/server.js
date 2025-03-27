const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a MySQL (reemplaza con tus credenciales reales)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',         // Reemplaza con tu usuario de MySQL
    password: '1234567891234', // Reemplaza con tu contraseña de MySQL
    database: 'ticketmaster_db_',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Endpoint para registrar nuevos usuarios
app.post('/api/register', async (req, res) => {
  const { usuario, contrasena } = req.body;
  
  if (!usuario || !contrasena) {
    return res.status(400).json({ error: 'Faltan datos requeridos.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    pool.query(
      'INSERT INTO Users (nombre, contraseña, historial_compras) VALUES (?, ?, ?)', 
      [usuario, hashedPassword, ''],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error al insertar en la base de datos.' });
        }
        return res.json({ message: 'Usuario registrado exitosamente', userId: results.insertId });
      }
    );
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Error en el servidor.' });
  }
});

// Endpoint para que un usuario inicie sesión
app.post('/api/login', async (req, res) => {
  const { usuario, contrasena } = req.body;
  
  if (!usuario || !contrasena) {
    return res.status(400).json({ error: 'Faltan datos requeridos.' });
  }

  pool.query(
    'SELECT * FROM Users WHERE nombre = ?',
    [usuario],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en la base de datos.' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
      }
      const user = results[0];
      const match = await bcrypt.compare(contrasena, user.contraseña);
      if (!match) {
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
      }
      return res.json({ message: 'Inicio de sesión exitoso', userId: user.id });
    }
  );
});

// Nuevo endpoint para guardar la compra (evento y transacción)
app.post('/api/guardarCompra', (req, res) => {
  const { event, transaction } = req.body;
  if (!event || !transaction) {
    return res.status(400).json({ error: 'Faltan datos de compra.' });
  }

  // Insertar datos del Evento
  pool.query(
    'INSERT INTO Eventos (tipoEvento, ubicacion, capacidad, horarios, precios, restricciones) VALUES (?, ?, ?, ?, ?, ?)',
    [ event.tipoEvento, event.ubicacion, event.capacidad, event.horarios, event.precios, event.restricciones ],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al insertar evento.' });
      }
      const eventId = results.insertId;
      // Insertar datos de la Transacción vinculando el evento insertado
      pool.query(
        'INSERT INTO Transacciones (usuario, evento, cantidadBoletos, metodoPago, totalPagado, estado) VALUES (?, ?, ?, ?, ?, ?)',
        [ transaction.usuario, eventId, transaction.cantidadBoletos, transaction.metodoPago, transaction.totalPagado, transaction.estado ],
        (error2, results2) => {
          if (error2) {
            console.error(error2);
            return res.status(500).json({ error: 'Error al insertar transacción.' });
          }
          return res.json({ message: 'Compra guardada exitosamente', eventId: eventId, transactionId: results2.insertId });
        }
      );
    }
  );
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
