import { useProjectStore } from "../hooks/useProjectStore";

export default function InvitationCard({ invitation }) {
  const { respondToInvitation } = useProjectStore();
  const { project, status } = invitation;

  if (!project) return null;

  const isPending = status === "pending";

  return (
    <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
              status === 'denied' ? 'bg-red-50 text-red-700 border-red-100' :
                'bg-amber-50 text-amber-700 border-amber-100'
            }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <span className="text-xs text-zinc-400">
            {new Date(invitation.timestamp).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-lg font-bold text-zinc-900">
          Invitation to collaborate on <span className="text-indigo-600">{project.title}</span>
        </h3>
        <p className="text-sm text-zinc-500 mt-1">
          Duration: {project.duration} • Skills: {project.skillsNeeded.join(", ")}
        </p>
      </div>

      {isPending && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => respondToInvitation(invitation.id, "denied")}
            className="px-4 py-2 rounded-full text-sm font-medium text-zinc-600 hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all"
          >
            Refuse
          </button>
          <button
            onClick={() => respondToInvitation(invitation.id, "accepted")}
            className="px-4 py-2 rounded-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow transition-all"
          >
            Accept Invitation
          </button>
        </div>
      )}

      {!isPending && (
        <div className="text-sm font-medium text-zinc-400 italic">
          You have {status} this invitation.
        </div>
      )}
    </div>
  );
}
