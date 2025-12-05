import { useProjectStore } from "../hooks/useProjectStore";
import useTalentStore from "../hooks/useTalentStore";
import InvitationCard from "../components/InvitationCard";
import { Link } from "react-router-dom";

export default function Invitations() {
  const { getMyProfile } = useTalentStore();
  const { getInvitationsForTalent } = useProjectStore();

  const myProfile = getMyProfile();

  if (!myProfile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">Profile Required</h2>
        <p className="text-zinc-500 mt-2 max-w-md">
          You need to create a talent profile to receive invitations to collaborate on projects.
        </p>
        <Link to="/profile" className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
          Create My Profile
        </Link>
      </div>
    );
  }

  const invitations = getInvitationsForTalent(myProfile.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Invitations</h1>
          <p className="text-zinc-500 mt-1">Manage your collaboration requests</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-full border border-zinc-100 shadow-sm text-sm font-medium text-zinc-600">
          {invitations.length} Total
        </div>
      </div>

      {invitations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-zinc-100 shadow-sm">
          <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-zinc-900">No invitations yet</h3>
          <p className="text-zinc-500 mt-2 max-w-md mx-auto">
            When project owners find your profile interesting, they'll send you an invitation to collaborate. Make sure your profile is up to date!
          </p>
          <Link to="/profile" className="mt-6 inline-block text-indigo-600 font-medium hover:underline">
            Update Profile
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {invitations.map((inv) => (
            <InvitationCard key={inv.id} invitation={inv} />
          ))}
        </div>
      )}
    </div>
  );
}
