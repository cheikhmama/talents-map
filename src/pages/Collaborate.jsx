import { useState } from "react";

export default function Collaborate() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <div className="bg-zinc-50 min-h-[calc(100vh-56px)]">
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">
          Proposer une collaboration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-5 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Titre du projet / besoin
            </label>
            <input
              type="text"
              required
              className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Ex : Atelier d’initiation au numérique"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Description
            </label>
            <textarea
              required
              rows={4}
              className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Expliquez l'objectif, le public visé, les compétences recherchées..."
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {sent && (
              <div className="text-xs text-green-600 font-medium">
                Proposition envoyée (simulation).
              </div>
            )}
            <button
              type="submit"
              className="ml-auto inline-flex items-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-semibold shadow-sm"
            >
              Envoyer
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
