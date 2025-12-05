export default function TalentCard({ talent }) {
  const {
    fullName,
    name: legacyName,
    skills = [],
    passions = "",
    projects = []
  } = talent || {};

  const displayName = fullName || legacyName || "Talent inconnu";

  // Avatar généré automatiquement (style GitHub)
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    displayName
  )}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  return (
    <div className="group relative rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 p-5 hover:-translate-y-1 cursor-pointer">

      {/* AVATAR */}
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl}
          alt={displayName}
          className="h-12 w-12 rounded-full border border-gray-300 shadow-sm"
        />

        <div>
          <h2 className="text-lg font-semibold text-gray-900">{displayName}</h2>

          {passions && (
            <p className="text-xs text-pink-600 font-medium mt-1">
              ❤️ {passions}
            </p>
          )}
        </div>
      </div>

      {/* SKILLS */}
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <span className="text-xs text-gray-400 italic">
            Aucune compétence
          </span>
        ) : (
          skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium shadow-sm border border-indigo-100"
            >
              {skill}
            </span>
          ))
        )}
      </div>

      {/* PROJECTS */}
      {projects.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            📌 Projets réalisés
          </h3>
          <div className="grid gap-2">
            {projects.map((p, i) => (
              <div
                key={p.id || i}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs flex justify-between items-center shadow-sm group-hover:bg-gray-100 transition"
              >
                <span className="font-medium text-gray-700">{p.title}</span>
                <span className="text-gray-500">{p.year || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HIGHLIGHT EFFECT */}
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-indigo-300 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}
