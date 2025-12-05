import { useParams, Link } from "react-router-dom";
import { useProjectStore } from "../hooks/useProjectStore";
import useTalentStore from "../hooks/useTalentStore";
import ProjectCard from "../components/ProjectCard";
import { useState } from "react";

export default function Matching() {
  const { id } = useParams();
  const { getProject, inviteTalent, invitations } = useProjectStore();
  const { talents } = useTalentStore();

  const project = getProject(id);
  const [invitedTalents, setInvitedTalents] = useState([]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900">Project not found</h2>
          <Link to="/projects/create" className="text-indigo-600 hover:underline mt-2 block">Create a new project</Link>
        </div>
      </div>
    );
  }

  // Matching logic: intersection of skills
  const matchedTalents = talents.filter((talent) => {
    const talentSkills = (talent.skills || []).map(s => s.toLowerCase());
    const projectSkills = (project.skillsNeeded || []).map(s => s.toLowerCase());
    return projectSkills.some(req => talentSkills.includes(req));
  });

  const handleInvite = (talentId) => {
    inviteTalent(project.id, talentId);
    setInvitedTalents(prev => [...prev, talentId]);
  };

  const isInvited = (talentId) => {
    return invitedTalents.includes(talentId) || invitations.some(inv => inv.projectId === project.id && inv.talentId === talentId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Project Details */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Project Details</h2>
          <ProjectCard project={project} />

          <div className="mt-6 bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="text-indigo-900 font-bold mb-2">Why these matches?</h3>
            <p className="text-indigo-700 text-sm">
              We found talents that have at least one of the skills required for your project. Review their profiles and send invitations!
            </p>
          </div>
        </div>

        {/* Right Column: Matched Talents */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-zinc-900">Matched Talents ({matchedTalents.length})</h2>
            <div className="text-sm text-zinc-500">
              Based on skills compatibility
            </div>
          </div>

          {matchedTalents.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-zinc-100 shadow-sm">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-zinc-900">No matches found yet</h3>
              <p className="text-zinc-500 mt-2">Try adding more common skills to your project or wait for new talents to join.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedTalents.map((talent) => (
                <div key={talent.id} className="bg-white rounded-xl p-5 border border-zinc-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-zinc-900 flex items-center gap-2">
                        {talent.fullName || talent.name || "Unknown Talent"}
                        {talent.verified && (
                          <span className="text-blue-500" title="Verified Talent">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-zinc-500 mt-0.5 line-clamp-1">{talent.passions || talent.bio || ""}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-bold text-sm">
                      {(talent.fullName || talent.name || "?").charAt(0)}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(talent.skills || []).slice(0, 4).map((skill, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded-md font-medium ${(project.skillsNeeded || []).some(s => s.toLowerCase() === skill.toLowerCase())
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-zinc-50 text-zinc-600 border border-zinc-100"
                        }`}>
                        {skill}
                      </span>
                    ))}
                    {(talent.skills || []).length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-md bg-zinc-50 text-zinc-400 border border-zinc-100">
                        +{(talent.skills || []).length - 4}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleInvite(talent.id)}
                    disabled={isInvited(talent.id)}
                    className={`mt-4 w-full py-2 rounded-lg text-sm font-semibold transition-all ${isInvited(talent.id)
                      ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm hover:shadow"
                      }`}
                  >
                    {isInvited(talent.id) ? "Invited" : "Invite to Project"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}