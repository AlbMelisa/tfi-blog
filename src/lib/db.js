import { Pool } from "pg";

// Configuración dinámica del Pool de conexiones con variables de entorno
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "45275151",
  host: process.env.DB_HOST || "172.16.90.168",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  database: process.env.DB_NAME || "blogdb",
});

// Reutilizar la conexión global en desarrollo
if (process.env.NODE_ENV !== "production") {
  global.__pgPool = global.__pgPool || pool;
}

// Manejo de errores del pool
pool.on("error", (err) => {
  console.error("Error inesperado en el pool de conexiones:", err);
  process.exit(-1);
});

export async function query(text, params) {
  try {
    return await pool.query(text, params);
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
}
