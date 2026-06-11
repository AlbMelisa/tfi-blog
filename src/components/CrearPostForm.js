"use client";

import { useState } from "react";

export default function CrearPostForm({ action }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return isExpanded ? (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-slate-900">Nuevo Post</p>
          <p className="text-sm text-slate-500">Completá los datos para publicar en el blog.</p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={() => setIsExpanded(false)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">TÍTULO</span>
            <input
              name="titulo"
              type="text"
              placeholder="Título del post..."
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-100"
              required
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">CATEGORÍA</span>
            <select
              name="categoria"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-100"
              defaultValue="Personal"
            >
              <option>Personal</option>
              <option>Tecnología</option>
              <option>Académico</option>
            </select>
          </label>
        </div>

        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-medium">CONTENIDO</span>
          <textarea
            name="contenido"
            rows="5"
            placeholder="Escribí tu post aquí..."
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-100"
            required
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            formAction={action}
            className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div
      role="button"
      tabIndex={0}
      onClick={toggleExpanded}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleExpanded();
        }
      }}
      className="w-full cursor-pointer rounded-2xl border-dashed border-2 border-gray-200 bg-white p-4 text-left transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-zinc-200"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          +
        </span>
        <span className="text-sm text-gray-500">Escribir un nuevo post...</span>
      </div>
    </div>
  );
}
