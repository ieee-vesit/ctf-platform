import { Play, CheckCircle } from "lucide-react";

const ChallengeCard = ({ category, points, title, description, onClick, isSolved }) => {
  // Calculate a mock success rate based on points (you can make this dynamic later)
  const rate = Math.min(100, Math.max(10, 100 - (points / 10)));

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer bg-gradient-to-b from-zinc-900 to-black border rounded-xl p-6 shadow-lg transition-all duration-200 ${
        isSolved
          ? "border-green-500/30 hover:border-green-400 hover:shadow-green-400/10"
          : "border-yellow-500/20 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-400/20"
      } ${isSolved ? "opacity-75" : ""}`}
    >
      {isSolved && (
        <div className="absolute -top-3 -right-3 z-10 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <CheckCircle size={12} />
          SOLVED
        </div>
      )}

      <div className="flex justify-between items-center mb-3">
        <span className={`text-[11px] border px-2 py-1 rounded ${
          isSolved
            ? "text-green-400 border-green-400/30"
            : "text-yellow-400 border-yellow-400/30"
        }`}>
          {category}
        </span>
        <span className={`text-xs font-semibold ${
          isSolved ? "text-green-400" : "text-yellow-400"
        }`}>
          {points} pts
        </span>
      </div>

      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-6 line-clamp-2">
        {description || "No description available"}
      </p>

      <button
        disabled={isSolved}
        className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
          isSolved
            ? "bg-green-500/20 text-green-400 cursor-not-allowed"
            : "bg-white text-black hover:bg-yellow-400"
        }`}
      >
        {isSolved ? (
          <>
            <CheckCircle size={16} />
            SOLVED
          </>
        ) : (
          <>
            <Play size={16} />
            INITIALIZE SESSION
          </>
        )}
      </button>
    </div>
  );
};

export default ChallengeCard;
