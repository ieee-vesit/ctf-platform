import { useState } from "react";
import { Shield } from "lucide-react";
import StatCard from "../components/StatCard";
import ChallengeCard from "../components/ChallengeCard";
import { challenges } from "../assets/db";
import ChallengeModal from "../components/ChallengeModal";

const ParticipantDashboard = () => {
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [open, setOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const handleOpenModal = (challenge) => {
    setSelectedChallenge(challenge);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-6 relative overflow-hidden">
      {/* HEADER */}
      <div className="relative z-10 mb-6">
        <h1 className="text-4xl font-bold italic text-amber-300  tracking-wide">
          PARTICIPANT <span className="text-white">DASHBOARD</span>
        </h1>
      </div>

      {/* STATS */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <StatCard title="TOTAL SCORE" value="3,650" />
        <StatCard title="CHALLENGES" value="18 / 42" />
      </div>

      {/* AVAILABLE TASKS */}
      <div className="relative z-10 mb-4 flex items-center gap-2 text-yellow-400 font-semibold">
        <Shield size={18} />
        AVAILABLE TASKS
      </div>

      {/* CHALLENGE CARDS */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            {...challenge}
            onClick={() => handleOpenModal(challenge)}
          />
        ))}
      </div>

      {/* MODAL */}
      <ChallengeModal
        isOpen={open}
        onClose={() => setOpen(false)}
        challenge={selectedChallenge}
      />
    </div>
  );
};

export default ParticipantDashboard;
