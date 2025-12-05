// src/components/ProfileForm.jsx
import { useState, useEffect } from "react";

export default function ProfileForm({ initialTalent = {}, onSave }) {
  const [name, setName] = useState(initialTalent.name ?? "");

  // on garde "passions" mais on lit aussi "bio" si ancien format
  const [passions, setPassions] = useState(
    initialTalent.passions ?? initialTalent.bio ?? ""
  );

  // Compétences libres
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(initialTalent.skills ?? []);

  // Projets (titre + année)
  const [projects, setProjects] = useState(
    Array.isArray(initialTalent.projects) ? initialTalent.projects : []
  );

  useEffect(() => {
    setName(initialTalent.name ?? "");
    setPassions(initialTalent.passions ?? initialTalent.bio ?? "");
    setSkills(initialTalent.skills ?? []);
    setProjects(initialTalent.projects ?? []);
  }, [initialTalent]);

  // --- COMPÉTENCES ---
  function addSkill(e) {
    e.preventDefault();
    const s = skillInput.trim();
    if (!s || skills.includes(s)) return;
    setSkills((prev) => [...prev, s]);
    setSkillInput("");
  }

  function removeSkill(skill) {
    setSkills((prev) => prev.filter((s) => s !== skill));
  }

  // --- PROJETS ---
  function addProject() {
    setProjects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        year: ""
      }
    ]);
  }

  function updateProject(id, patch) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  }

  function removeProject(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  // --- SUBMIT ---
  function submit(e) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPassions = passions.trim();

    onSave?.({
      name: trimmedName,
      passions: trimmedPassions,
      bio: trimmedPassions, // compatibilité
      skills,
      projects: projects.filter((p) => p.title.trim() !== "")
    });
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-8 max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow"
    >
      {/* NOM */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Nom complet
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          placeholder="Ex : Ahmed El Hadi"
        />
      </div>

      {/* PASSIONS (créatif) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Passions & ce qui te fait vibrer
        </label>
        <textarea
          value={passions}
          onChange={(e) => setPassions(e.target.value)}
          rows={3}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          placeholder="Ex : Transmettre, coder des applis utiles, apprendre de nouvelles langues, animer des ateliers..."
        />
        <p className="mt-1 text-xs text-gray-400">
          Quelques phrases simples suffisent : ce que tu aimes faire, les thèmes
          qui te motivent, ton style.
        </p>
      </div>

      {/* COMPÉTENCES */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Compétences (saisie libre)
        </label>

        <div className="flex gap-2 mt-2">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Ex : React, Docker, Python, Arabe, Pédagogie..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700"
          >
            Ajouter
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {skills.length === 0 && (
            <p className="text-sm text-gray-400">
              Aucune compétence ajoutée pour l’instant.
            </p>
          )}

          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs flex items-center gap-2 border border-indigo-100"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* PROJETS : titre + année */}
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-700">
            Projets réalisés
          </label>

          <button
            type="button"
            onClick={addProject}
            className="px-4 py-1.5 bg-indigo-600 text-white rounded-md text-xs font-semibold hover:bg-indigo-700"
          >
            + Ajouter un projet
          </button>
        </div>

        <div className="space-y-4 mt-3">
          {projects.length === 0 && (
            <p className="text-sm text-gray-400">
              Ajoute quelques projets marquants (scolaires, perso, associatifs…)
            </p>
          )}

          {projects.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl p-4 bg-gray-50 space-y-3"
            >
              <input
                value={p.title}
                onChange={(e) =>
                  updateProject(p.id, { title: e.target.value })
                }
                placeholder="Titre du projet (Ex : Application de gestion de club)"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />

              <input
                value={p.year}
                onChange={(e) => updateProject(p.id, { year: e.target.value })}
                placeholder="Année (Ex : 2024)"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />

              <button
                type="button"
                onClick={() => removeProject(p.id)}
                className="text-red-600 text-xs hover:underline"
              >
                Supprimer ce projet
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BOUTON ENREGISTRER */}
      <div className="pt-3 flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold shadow hover:bg-indigo-700"
        >
          Enregistrer ce talent
        </button>
      </div>
    </form>
  );
}
