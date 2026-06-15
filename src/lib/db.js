import { Pool } from "pg";

// Construir connection string prefiriendo DATABASE_URL
const connectionString = process.env.DATABASE_URL || (() => {
  const user = process.env.DB_USER || "postgres";
  const password = process.env.DB_PASSWORD || "45275151";
  const host = process.env.DB_HOST || "172.16.90.168";
  const port = process.env.DB_PORT || "5432";
  const database = process.env.DB_NAME || "blogdb";
  return `postgres://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
})();

// Configuración dinámica del Pool de conexiones usando connectionString
const pool = new Pool({
  connectionString,
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
