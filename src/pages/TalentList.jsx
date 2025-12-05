import { useState, useMemo } from "react";
import useTalentStore from "../hooks/useTalentStore";
import TalentCard from "../components/TalentCard";
import ConfirmationModal from "../components/ConfirmationModal";

export default function TalentList() {
  const { talents = [] } = useTalentStore();
  const [query, setQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return talents;

    return talents.filter((t) => {
      const name = (t.fullName || t.name || "").toLowerCase();
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
    }).sort((a, b) => a.fullName.localeCompare(b.fullName));
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
        <div className="mt-12 text-center border-t border-gray-200 pt-8 flex flex-col gap-4 items-center">
          <button
            onClick={() => useTalentStore.getState().generateRandomTalents()}
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
          >
            🧪 Générer 1 talent de test
          </button>

          {talents.length > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-red-400 text-xs hover:text-red-600 hover:underline transition-colors"
            >
              🗑️ Tout effacer (Clear All)
            </button>
          )}
        </div>
      </section>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => useTalentStore.getState().resetData()}
        title="Delete All Talents?"
        message="Are you sure you want to remove all talents from the list? This action cannot be undone."
        confirmText="Yes, Delete All"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
