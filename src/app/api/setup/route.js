import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    await query(
      `CREATE TABLE IF NOT EXISTS publicaciones (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        contenido TEXT NOT NULL,
        categoria VARCHAR(50) NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );

    return NextResponse.json({
      success: true,
      message: "Tabla 'publicaciones' asegurada correctamente.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "No se pudo inicializar la tabla publicaciones.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
