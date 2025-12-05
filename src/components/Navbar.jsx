import { NavLink, useLocation } from "react-router-dom";
import useTalentStore from "../hooks/useTalentStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { getMyProfile } = useTalentStore();
  const [hasProfile, setHasProfile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setHasProfile(!!getMyProfile());
  }, [getMyProfile, location]);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
      : "text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
            T
          </div>
          <span className="text-xl font-bold text-zinc-900 tracking-tight">
            Talents<span className="text-indigo-600">Map</span>
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Accueil
          </NavLink>
          <NavLink to="/talents" className={navLinkClass}>
            Talents
          </NavLink>
          <NavLink to="/map" className={navLinkClass}>
            Carte
          </NavLink>
          <NavLink to="/projects/create" className={navLinkClass}>
            Collaborer
          </NavLink>

          {hasProfile && (
            <>
              <div className="w-px h-6 bg-zinc-200 mx-2"></div>
              <NavLink to="/profile" className={navLinkClass}>
                Mon Profil
              </NavLink>
              <NavLink to="/invitations" className={navLinkClass}>
                Invitations
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
