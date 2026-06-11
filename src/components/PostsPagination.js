"use client";

import { useState } from "react";

const categoryStyles = {
  Personal: "bg-violet-100 text-violet-700",
  Tecnología: "bg-sky-100 text-sky-700",
  Académico: "bg-emerald-100 text-emerald-700",
  Default: "bg-slate-100 text-slate-700",
};

function formatFecha(fecha) {
  return new Date(fecha).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PostsPagination({ publicaciones }) {
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 3;

  if (!publicaciones || publicaciones.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Aún no hay publicaciones registradas.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(publicaciones.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = publicaciones.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {paginatedPosts.map((publicacion) => {
          const badgeClass =
            categoryStyles[publicacion.categoria] || categoryStyles.Default;
          return (
            <article
              key={publicacion.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {publicacion.titulo}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass}`}
                >
                  {publicacion.categoria}
                </span>
              </div>
              <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                <span>📅</span>
                <span>{formatFecha(publicacion.fecha)}</span>
              </div>
              <p className="text-sm leading-7 text-slate-600">
                {publicacion.contenido}
              </p>
            </article>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Anterior
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-zinc-900 text-white"
                    : "border border-gray-200 bg-white text-slate-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
