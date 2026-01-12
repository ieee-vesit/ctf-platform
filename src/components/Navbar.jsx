import {
  LayoutDashboard,
  Trophy,
  FileText,
  Settings,
  Home,
  CloudCog,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const path = useLocation().pathname;
  console.log(path);
  return (
    <header className="w-full h-16 bg-black border-b border-yellow-500/30 flex items-center px-6">
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-2 text-yellow-400 font-bold text-2xl">
        {/* <span className="text-xl">🛡</span> */}
        <span className="tracking-wide">IEEE_{"CTF"}</span>
      </div>

      {/* CENTER - NAV LINKS */}
      <nav className="flex-1 flex justify-center items-center gap-10">
        <NavItem
          path="/"
          icon={<Home size={18} />}
          label="Home"
          active={path === "/"}
        />
        <NavItem
          path="/dashboard"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          active={path === "/dashboard"}
        />
        <NavItem
          path="/leaderboard"
          icon={<LayoutDashboard size={18} />}
          label="leaderboard"
          active={path === "/leaderboard"}
        />
        <NavItem
          path="/logs"
          icon={<LayoutDashboard size={18} />}
          label="Logs"
          active={path === "/logs"}
        />
      </nav>

      {/* RIGHT - USER */}
      <div className="flex items-center gap-4">
        <button className="text-yellow-400 hover:text-yellow-300 transition">
          <Settings size={20} />
        </button>

        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-3 border border-yellow-500/30 rounded-lg px-3 py-1"
        >
          <img
            src="/profile_icon.png"
            className="w-7 h-7 object-cover"
            alt=""
          />
          {showDropdown && (
            <>
              <div className="text-right">
                <p className="text-yellow-400 text-xs font-semibold">
                  ELITEHACKER
                </p>
                <p className="text-gray-400 text-[11px]">Your_Team_Name</p>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ icon, label, active, path }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className={`flex items-center gap-2 text-sm font-medium tracking-wide transition 
      ${
        active
          ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
          : "text-gray-400 hover:text-yellow-400"
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default Navbar;
