import { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import useTalentStore from "../hooks/useTalentStore";

export default function MyProfile() {
  const { addOrUpdateTalent, getMyProfile } = useTalentStore();
  const [saved, setSaved] = useState(false);

  const myProfile = getMyProfile();

  function handleSave(data) {
    addOrUpdateTalent(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="bg-zinc-50 min-h-[calc(100vh-80px)] py-12">
      <section className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-900">
            {myProfile ? "Edit Your Profile" : "Create Your Profile"}
          </h1>
          <p className="text-zinc-500 mt-2">
            Share your passions, skills, and projects with the community.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-8">
          <ProfileForm initialTalent={myProfile || {}} onSave={handleSave} />

          {saved && (
            <div className="mt-6 flex items-center justify-center gap-2 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 animate-fade-in">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Profile saved successfully!</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
