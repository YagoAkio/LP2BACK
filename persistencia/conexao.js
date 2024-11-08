import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            "host":"132.226.245.178",
            "port":"3306",
            "database": "LP2_102214522",
            "user": "102214522",
            "password": "102214522",
            "connectTimeout":60000,
            "waitForConnections":true,
            "queueLimit":20
          });

          global.poolConexoes = pool;
          return await pool.getConnection();
    }
}