export default function TalentMap() {
  return (
    <div className="bg-zinc-50 min-h-[calc(100vh-56px)] flex items-center">
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-center">
          
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-3">
            🗺️
          </div>

          <h1 className="text-xl font-bold text-zinc-900">Carte des talents (à venir)</h1>

          <p className="mt-2 text-sm text-zinc-600">
            Une carte interactive affichera les talents géolocalisés.
          </p>

        </div>
      </section>
    </div>
  );
}
