import { useState } from "react";
import { useProjectStore } from "../hooks/useProjectStore";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const addProject = useProjectStore((state) => state.addProject);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [skillsNeeded, setSkillsNeeded] = useState([]);
  const [skillText, setSkillText] = useState("");
  const [duration, setDuration] = useState("");

  const [error, setError] = useState("");

  function addSkill(e) {
    if (e) e.preventDefault();
    const s = skillText.trim();
    if (!s) return;
    if (skillsNeeded.includes(s)) {
      setSkillText("");
      return;
    }
    setSkillsNeeded((prev) => [...prev, s]);
    setSkillText("");
    setError("");
  }

  function removeSkill(skill) {
    setSkillsNeeded((prev) => prev.filter((s) => s !== skill));
  }

  function submit(e) {
    e.preventDefault();
    setError("");

    let finalSkills = [...skillsNeeded];

    // Auto-add pending skill if user forgot to click Add
    if (skillText.trim()) {
      const s = skillText.trim();
      if (!finalSkills.includes(s)) {
        finalSkills.push(s);
      }
    }

    if (!title || !duration || finalSkills.length === 0) {
      setError("Please fill in all fields and add at least one skill.");
      return;
    }

    const newProject = { title, skillsNeeded: finalSkills, duration };
    addProject(newProject);

    setTimeout(() => {
      const projects = useProjectStore.getState().projects;
      if (projects.length > 0) {
        navigate(`/projects/matching/${projects[0].id}`);
      } else {
        navigate('/');
      }
    }, 100);
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-zinc-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-zinc-900 tracking-tight">
            Create a New Project
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Find the perfect talents for your next big idea.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={submit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-zinc-700 mb-1">
                Project Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-zinc-300 placeholder-zinc-400 text-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                placeholder="e.g. AI-Powered Analytics Dashboard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-zinc-700 mb-1">
                Estimated Duration
              </label>
              <input
                id="duration"
                name="duration"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-zinc-300 placeholder-zinc-400 text-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                placeholder="e.g. 3 months, 2 weeks"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Required Skills
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 appearance-none relative block w-full px-4 py-3 border border-zinc-300 placeholder-zinc-400 text-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                  placeholder="Add a skill (e.g. React, Python)"
                  value={skillText}
                  onChange={(e) => setSkillText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill(e)}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="inline-flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md hover:shadow-lg"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 min-h-[40px]">
                {skillsNeeded.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none transition-colors"
                    >
                      <span className="sr-only">Remove skill</span>
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
                {skillsNeeded.length === 0 && (
                  <span className="text-zinc-400 text-sm italic py-1">No skills added yet.</span>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm font-medium">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Create Project & Find Talents
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
