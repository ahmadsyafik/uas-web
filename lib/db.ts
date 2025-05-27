import mysql from "mysql2/promise"

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: "mysql.railway.internal",
  user: "root",
  password: "yOEJquRfLYECUMoKXvZQemLZAfiVmqNp",
  database: "railway",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port : 3306,
})

export default pool
