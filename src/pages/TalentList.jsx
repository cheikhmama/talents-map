import { useState, useMemo } from "react";
import useTalentStore from "../hooks/useTalentStore";
import TalentCard from "../components/TalentCard";

export default function TalentList() {
  const { talents = [] } = useTalentStore();
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return talents;

    return talents.filter((t) => {
      const name = t.name?.toLowerCase() || "";
      const skills = (t.skills || []).join(" ").toLowerCase();
      const passions = (t.passions || "").toLowerCase();
      const projects = (t.projects || [])
        .map((p) => p.title.toLowerCase())
        .join(" ");

      return (
        name.includes(q) ||
        skills.includes(q) ||
        passions.includes(q) ||
        projects.includes(q)
      );
    });
  }, [talents, q]);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-56px)]">
      <section className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Talents</h1>
            <p className="text-sm text-gray-500 mt-1">
              Recherchez un talent par nom, compétence, passion ou projet.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="w-full md:w-80 mt-4 md:mt-0">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="🔍 Rechercher un talent…"
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* RESULTS */}
        {filtered.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-gray-500">Aucun talent trouvé.</p>
            <p className="text-xs text-gray-400 mb-4">
              Ajoutez votre profil depuis « Créer mon profil ».
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <TalentCard key={t.id || i} talent={t} />
            ))}
          </div>
        )}

        {/* Always show reset button for demo purposes */}
        <div className="mt-12 text-center border-t border-gray-200 pt-8">
          <button
            onClick={() => {
              if (confirm("Attention : cela va effacer tous les talents actuels et recharger les données de démo. Continuer ?")) {
                useTalentStore.getState().resetData();
              }
            }}
            className="text-gray-400 text-xs hover:text-indigo-600 hover:underline transition-colors"
          >
            🔄 Réinitialiser avec les données de démo
          </button>
        </div>
      </section>
    </div>
  );
}
