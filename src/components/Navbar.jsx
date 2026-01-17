import {
  LayoutDashboard,
  Home,
  Trophy,
  FileText,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Navbar = () => {
  const path = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setTeamName(data.user.user_metadata?.team_name || "Team");
      }
    };
    getUser();
  }, []);

  const initials = teamName
    ? teamName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "TM";

  return (
    <header className="w-full bg-black border-b border-yellow-500/30">
      <div className="h-16 flex items-center px-6">
        <div className="flex items-center gap-2">
          <ShieldCheck size={28} className="text-yellow-400" />
          <span className="text-xl font-extrabold tracking-wider text-yellow-400">
            IEEE <span className="font-mono text-yellow-300">CTF</span>
          </span>
        </div>

        <nav className="hidden md:flex flex-1 justify-center gap-10">
          <NavItem path="/" icon={<Home size={18} />} label="Home" active={path === "/"} />
          <NavItem path="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" active={path === "/dashboard"} />
          <NavItem path="/leaderboard" icon={<Trophy size={18} />} label="Leaderboard" active={path === "/leaderboard"} />
          <NavItem path="/logs" icon={<FileText size={18} />} label="Logs" active={path === "/logs"} />
        </nav>

        <div className="hidden md:flex items-center gap-3 bg-zinc-900 border border-yellow-500/30 rounded-lg px-3 py-1.5">
          <div className="w-8 h-8 bg-yellow-400 text-black rounded-md flex items-center justify-center font-bold">
            {initials}
          </div>
          <div>
            <p className="text-yellow-400 text-xs font-semibold uppercase">{teamName}</p>
            <p className="text-gray-400 text-[11px]">Logged In</p>
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="ml-auto md:hidden text-yellow-400">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};

const NavItem = ({ icon, label, active, path }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className={`flex items-center gap-2 text-sm transition
        ${active ? "text-yellow-400 border-b-2 border-yellow-400 pb-1" : "text-gray-400 hover:text-yellow-400"}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default Navbar;
