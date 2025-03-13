import mysql from "mysql2"


// Establish connection to database
const pool =  mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123",
    database: "todolist",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});

const promisePool = pool.promise();

export const connection = {
    query: async(query, params) => {
        return promisePool.query(query, params);
    },
};

export default connection;