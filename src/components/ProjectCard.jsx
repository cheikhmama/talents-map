export default function ProjectCard({ project }) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-medium">
            {project.duration}
          </p>
        </div>
        <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.skillsNeeded.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-zinc-50 text-zinc-600 text-xs font-medium rounded-full border border-zinc-100"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
        <span className="text-xs text-zinc-400">
          Posted {new Date(project.createdAt || Date.now()).toLocaleDateString()}
        </span>
        <span className="text-sm font-medium text-indigo-600 group-hover:underline cursor-pointer">
          View Details
        </span>
      </div>
    </div>
  );
}
