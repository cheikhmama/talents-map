import React, { useState, useEffect, useCallback } from 'react'

function generateId() {
  return 's_' + Math.random().toString(36).slice(2, 9)
}

const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

export default function TalentForm({ initialTalent = {}, onSave }) {
  const [name, setName] = useState(initialTalent.name ?? '')
  const [role, setRole] = useState(initialTalent.role ?? '')
  const [languagesText, setLanguagesText] = useState(
    Array.isArray(initialTalent.languages) ? initialTalent.languages.join(', ') : (initialTalent.languages ?? '')
  )

  const [skills, setSkills] = useState(() => {
    const items = Array.isArray(initialTalent.skills) ? initialTalent.skills : []
    return items.map((s) => ({
      id: s.id ?? generateId(),
      name: s.name ?? '',
      level: s.level ?? LEVEL_OPTIONS[1]
    }))
  })

  const [verified, setVerified] = useState(Boolean(initialTalent.verified))

  useEffect(() => {
    setName(initialTalent.name ?? '')
    setRole(initialTalent.role ?? '')
    setLanguagesText(
      Array.isArray(initialTalent.languages) ? initialTalent.languages.join(', ') : (initialTalent.languages ?? '')
    )
    setSkills(
      (Array.isArray(initialTalent.skills) ? initialTalent.skills : []).map((s) => ({
        id: s.id ?? generateId(),
        name: s.name ?? '',
        level: s.level ?? LEVEL_OPTIONS[1]
      }))
    )
    setVerified(Boolean(initialTalent.verified))
  }, [initialTalent])

  const addSkill = useCallback(() => {
    setSkills((s) => [...s, { id: generateId(), name: '', level: LEVEL_OPTIONS[0] }])
  }, [])

  const updateSkill = useCallback((id, patch) => {
    setSkills((prev) => prev.map((sk) => (sk.id === id ? { ...sk, ...patch } : sk)))
  }, [])

  const removeSkill = useCallback((id) => {
    setSkills((prev) => prev.filter((sk) => sk.id !== id))
  }, [])

  function handleSave(e) {
    if (e && e.preventDefault) e.preventDefault()

    const langArr = languagesText
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean)

    const cleanedSkills = skills
      .map((s) => ({ name: (s.name || '').trim(), level: s.level }))
      .filter((s) => s.name)

    const payload = {
      ...initialTalent,
      name: (name || '').trim(),
      role: (role || '').trim(),
      languages: langArr,
      skills: cleanedSkills,
      verified: Boolean(verified),
    }

    onSave?.(payload)
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      
      {/* Nom + Rôle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-zinc-700">Nom</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm 
                       focus:ring-2 focus:ring-indigo-500"
            placeholder="Ex : Alice Dupont"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Rôle</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm 
                       focus:ring-2 focus:ring-indigo-500"
            placeholder="Ex : Développeur Frontend"
          />
        </div>

      </div>

      {/* Langues */}
      <div>
        <label className="block text-sm font-medium text-zinc-700">Langues (séparées par des virgules)</label>
        <input
          value={languagesText}
          onChange={(e) => setLanguagesText(e.target.value)}
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm 
                     focus:ring-2 focus:ring-indigo-500"
          placeholder="Français, Anglais, Espagnol"
        />
      </div>

      {/* Compétences */}
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-zinc-700">Compétences</label>

          <button
            type="button"
            onClick={addSkill}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 
                       text-white rounded-md text-sm transition-transform transform hover:-translate-y-0.5"
          >
            + Ajouter
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {skills.length === 0 && (
            <p className="text-sm text-zinc-500">Aucune compétence. Cliquez sur "Ajouter" pour en créer une.</p>
          )}

          {skills.map((sk) => (
            <div key={sk.id} className="flex gap-2 items-center">
              
              <input
                value={sk.name}
                onChange={(e) => updateSkill(sk.id, { name: e.target.value })}
                className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm 
                           focus:ring-2 focus:ring-indigo-500"
                placeholder="Nom de la compétence (ex: React)"
              />

              <select
                value={sk.level}
                onChange={(e) => updateSkill(sk.id, { level: e.target.value })}
                className="w-44 rounded-md border border-zinc-300 bg-white px-2 py-2 shadow-sm"
              >
                {LEVEL_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => removeSkill(sk.id)}
                className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* Vérification */}
      <div className="flex items-center gap-4 mt-3">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-zinc-300 rounded"
          />
          <span className="ml-2 text-sm text-zinc-700">Vérifié</span>
        </label>
      </div>

      {/* Save */}
      <div className="pt-4 border-t border-zinc-200 flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm 
                     transform transition-transform hover:-translate-y-0.5"
        >
          Enregistrer
        </button>
      </div>

    </form>
  )
}
