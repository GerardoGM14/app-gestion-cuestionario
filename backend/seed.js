const { getConnection, sql } = require('./db');
require('dotenv').config();

async function seed() {
    try {
        console.log('Conectando a la base de datos...');
        const pool = await getConnection();
        
        console.log('Verificando tabla Usuarios...');
        // Crear tabla Usuarios si no existe
        const createTableQuery = `
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Usuarios' and xtype='U')
            BEGIN
                CREATE TABLE Usuarios (
                    Id INT IDENTITY(1,1) PRIMARY KEY,
                    Nombre NVARCHAR(100) NOT NULL,
                    Email NVARCHAR(100) NOT NULL UNIQUE,
                    Password NVARCHAR(255) NOT NULL,
                    Rol NVARCHAR(50) DEFAULT 'user',
                    FechaCreacion DATETIME DEFAULT GETDATE()
                )
                PRINT 'Tabla Usuarios creada exitosamente.'
            END
            ELSE
            BEGIN
                PRINT 'La tabla Usuarios ya existe.'
            END
        `;
        
        await pool.request().query(createTableQuery);

        // Verificar si existe el usuario admin
        const checkUserQuery = "SELECT * FROM Usuarios WHERE Email = 'admin@fastcloud.com'";
        const result = await pool.request().query(checkUserQuery);

        if (result.recordset.length === 0) {
            console.log('Creando usuario administrador...');
            const insertUserQuery = `
                INSERT INTO Usuarios (Nombre, Email, Password, Rol)
                VALUES ('Administrador', 'admin@fastcloud.com', 'admin123', 'admin')
            `;
            await pool.request().query(insertUserQuery);
            console.log('Usuario administrador creado: admin@fastcloud.com / admin123');
        } else {
            console.log('El usuario administrador ya existe.');
        }

        console.log('Inicialización de base de datos completada.');
        process.exit(0);
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        process.exit(1);
    }
}

seed();
