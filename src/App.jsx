import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import TalentList from "./pages/TalentList";
import TalentMap from "./pages/Map";
import CreateProject from "./pages/CreateProject";
import Matching from "./pages/Matching";
import Invitations from "./pages/Invitations";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/talents" element={<TalentList />} />
            <Route path="/map" element={<TalentMap />} />

            {/* Collaboration Routes */}
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects/matching/:id" element={<Matching />} />
            <Route path="/invitations" element={<Invitations />} />

            {/* Redirect legacy route if needed, or just remove */}
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/matching" element={<Matching />} /> {/* Fallback/Redirect might be needed if ID missing, but mostly for nav */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
