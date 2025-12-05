import { useNavigate } from "react-router-dom";
import useTalentStore from "../hooks/useTalentStore";

export default function Home() {
  const navigate = useNavigate();
  const { getMyProfile } = useTalentStore();
  const myProfile = getMyProfile();

  return (
    <div className="bg-white min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32 lg:pt-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 border border-indigo-100">
            Platform for Creative Collaboration
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 tracking-tight mb-8">
            Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Top Talents</span><br />
            Build Amazing Projects
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-xl text-zinc-500 mb-10">
            Join a thriving ecosystem of developers, designers, and innovators.
            Showcase your skills, find your dream team, and bring ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/talents")}
              className="px-8 py-4 bg-zinc-900 text-white rounded-full font-bold text-lg hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Explore Talents
            </button>

            {!myProfile ? (
              <button
                onClick={() => navigate("/projects/create")}
                className="px-8 py-4 bg-white text-indigo-600 border border-indigo-200 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md"
              >
                Start a Project
              </button>
            ) : (
              <button
                onClick={() => navigate("/create-project")}
                className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Start a Project
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Create Your Profile</h3>
              <p className="text-zinc-500">
                Showcase your passions, skills, and portfolio. Get verified and stand out in the community.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Find Projects</h3>
              <p className="text-zinc-500">
                Discover exciting projects that match your skills. Collaborate with like-minded creators.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 text-pink-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Get Matched</h3>
              <p className="text-zinc-500">
                Our smart matching system connects you with the right opportunities automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Preview Card (if profile exists) */}
      {myProfile && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8">Your Creative Profile</h2>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-zinc-100 inline-block text-left max-w-md w-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-zinc-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  {(myProfile.fullName || myProfile.name || "?").charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">{myProfile.fullName || myProfile.name || "Unknown Talent"}</h3>
                  <p className="text-sm text-zinc-500">{myProfile.passions || myProfile.bio || ""}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(myProfile.skills || []).map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-zinc-50 text-zinc-600 rounded-lg text-xs font-medium border border-zinc-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
