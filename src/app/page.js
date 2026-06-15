import { revalidatePath } from "next/cache";
import { query } from "@/lib/db";
import CrearPostForm from "@/components/CrearPostForm";
import PostsPagination from "@/components/PostsPagination";

export const dynamic = "force-dynamic";

async function getPublicaciones() {
  try {
    const result = await query(
      "SELECT id, title AS titulo, content AS contenido, created_at AS fecha FROM posts ORDER BY created_at DESC"
    );
    return result.rows;
  } catch (error) {
    throw new Error(
      `Error al cargar publicaciones :( : ${error?.message || String(error)}`
    );
  }
}

async function agregarDato(formData) {
  "use server";
  const titulo = String(formData.get("titulo") || "").trim();
  const contenido = String(formData.get("contenido") || "").trim();

  if (!titulo || !contenido) {
    throw new Error("Los campos título y contenido son obligatorios.");
  }

  try {
    await query(
      "INSERT INTO posts (title, content) VALUES ($1, $2)",
      [titulo, contenido]
    );
    revalidatePath("/");
  } catch (error) {
    console.error("Error al guardar publicación:", error);
    throw error;
  }
}

function formatFecha(fecha) {
  return new Date(fecha).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Home() {
  const publicaciones = await getPublicaciones();
  const totalPosts = publicaciones?.length ?? 0;

  return (
    <div className="min-h-screen bg-zinc-50 text-slate-900">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-900">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg">
              ✏️
            </span>
            <div>
              <p className="text-base"> Blog Personal</p>
            </div>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#posts" className="transition hover:text-slate-900">
              Posts
            </a>
            <a href="#informe" className="transition hover:text-slate-900">
              Informe TPF
            </a>
            <button
              aria-label="Perfil"
              title="Perfil"
              className="inline-flex items-center justify-center rounded-full p-2 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-zinc-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-700" aria-hidden="true">
                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                <path fill="currentColor" d="M12 14c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6z" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto mt-24 max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <aside className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden self-start">
            <div className="h-36 w-36 overflow-hidden bg-slate-100 rounded-full mx-auto mt-5">
              <img
                src="/mi-foto.png"
                alt="Melisa"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-2xl font-semibold text-slate-900">Melisa Albornoz</p>
                <p className="text-sm text-slate-500">Ingeniería en Sistemas de Información</p>
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    🎓
                  </span>
                  <span>Universidad Tecnológica Nacional</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    📍
                  </span>
                  <span>Tucumán, Argentina</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    ✉️
                  </span>
                  <span>Silvia.Albornoz@frt.utn.edu.ar</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    📞
                  </span>
                  <span>+54 381 5113893</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    🔗
                  </span>
                  <a
                    href="https://github.com/AlbMelisa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-zinc-900"
                  >
                    github.com/AlbMelisa
                  </a>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-sm font-semibold text-slate-900">DNI: 45275151</p>
              </div>
            </div>
          </aside>

          <section className="md:col-span-3 space-y-6">
            <div id="informe" className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-slate-900">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    📄
                  </span>
                  <div>
                    <p className="text-base font-semibold">Informe del TPF</p>
                    <p className="text-sm text-slate-500">Descargá la documentación del trabajo práctico.</p>
                  </div>
                </div>
                <a
                  href="/informe-tpf.pdf"
                  download
                  className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  Descargar PDF
                </a>
              </div>
            </div>

            <div id="posts" className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 text-slate-900">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                  📖
                </span>
                <div>
                  <p className="text-lg font-semibold">Mis Posts</p>
                  <p className="text-sm text-slate-500">Publicaciones recientes del blog.</p>
                </div>
              </div>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                {totalPosts} entradas
              </span>
            </div>

            <CrearPostForm action={agregarDato} />

            {publicaciones === null ? (
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 text-amber-900 shadow-sm">
                <p className="font-semibold">No se pudo conectar con la base de datos.</p>
                <p className="mt-2 text-sm text-amber-800">
                  Verificá tu configuración de <code>.env.local</code> y la IP del contenedor.
                </p>
              </div>
            ) : (
              <PostsPagination publicaciones={publicaciones} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
