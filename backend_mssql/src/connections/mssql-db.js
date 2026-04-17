//4 - backend\src\connections\mssql-db.js

import sql from 'mssql';
import dbConfig from "../config/db.config.js"

const config = {
    user: dbConfig.MSSQL.user,
    password: dbConfig.MSSQL.password,
    database: dbConfig.MSSQL.database,
    server: dbConfig.MSSQL.server,
    port: dbConfig.MSSQL.port,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed:', err);
        throw err;
    });

export { poolPromise };