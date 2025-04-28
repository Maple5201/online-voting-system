const CandidateCard = ({ candidate, votedCandidateId, onVote, onClick, isAdmin }) => {
  const alreadyVoted = votedCandidateId !== null;
  const votedThisOne = votedCandidateId === candidate.id;

  console.log("image", candidate.avatarUrl);

  return (
    <div
      className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center gap-4 w-72 cursor-pointer 
                 hover:scale-105 transition-transform duration-300 border-2 border-indigo-100"
      onClick={onClick}
    >
      {candidate.avatarUrl ? (
        <img
          src={`http://localhost:8080${candidate.avatarUrl}`}
          alt={`${candidate.name}'s avatar`}
          className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow-md"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
          No Image
        </div>
      )}

      <p className="text-2xl font-bold text-indigo-700">{candidate.name}</p>

      {candidate.description && (
        <p className="text-sm text-center text-gray-600 px-2">{candidate.description}</p>
      )}

      {!isAdmin && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (alreadyVoted) {
              alert('You have already voted.');
            } else {
              onVote();
            }
          }}
          disabled={alreadyVoted}
          className={`px-5 py-2 mt-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md ${
            votedThisOne
              ? 'bg-green-500 text-white'
              : alreadyVoted
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-indigo-500 text-white hover:bg-indigo-600'
          }`}
        >
          {votedThisOne ? 'Voted' : alreadyVoted ? 'Voted' : 'Vote'}
        </button>
      )}
    </div>
  );
};

export default CandidateCard;
