const express = require('express');
const cors = require('cors');
const { db, sql } = require('./config/db');
const clientsRoutes = require('./routes/clients');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/clients', clientsRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend funcionando correctamente', dbType: db.dbType });
});

// Endpoint de Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña requeridos' });
    }

    try {
        const pool = await db.connect();
        let usuario = null;

        if (db.dbType === 'mssql') {
            // Consulta segura con parámetros para SQL Server
            const result = await pool.request()
                .input('email', sql.NVarChar, email)
                .query('SELECT * FROM Usuarios WHERE Email = @email');
            
            if (result.recordset.length > 0) {
                usuario = result.recordset[0];
            }

        } else if (db.dbType === 'mysql') {
            // Consulta segura con parámetros para MySQL
            const [rows] = await pool.execute('SELECT * FROM Usuarios WHERE Email = ?', [email]);
            
            if (rows.length > 0) {
                usuario = rows[0];
            }
        }

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // NOTA: En producción, aquí deberías comparar hashes de contraseñas con bcrypt
        // if (!bcrypt.compareSync(password, usuario.Password)) ...
        
        // Simulación de validación simple por ahora
        if (usuario.Password !== password) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Respuesta exitosa (aquí podrías devolver un token JWT)
        res.json({
            message: 'Login exitoso',
            user: {
                id: usuario.Id,
                nombre: usuario.Nombre,
                email: usuario.Email,
                rol: usuario.Rol
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        // Si falla la BD, para desarrollo permitimos login mockeado si las credenciales son admin/admin
        if (email === 'admin@admin.com' && password === 'admin') {
            return res.json({
                message: 'Login exitoso (Modo Desarrollo)',
                user: { id: 1, nombre: 'Admin Mock', email: 'admin@admin.com', rol: 'admin' }
            });
        }
        
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
