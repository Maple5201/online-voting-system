import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import CandidateCard from '../components/CandidateCard';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../utils/auth';
import { SparklesIcon } from '@heroicons/react/24/solid'; 

export default function HomePage() {
  const [candidates, setCandidates] = useState([]);
  const [votedCandidateId, setVotedCandidateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/candidates');
        setCandidates(res.data);
      } catch (err) {
        console.error('Failed to load candidates:', err);
      }

      if (!isAdmin()) {
        try {
          const voteRes = await axios.get('/votes/me');
          if (voteRes.data && voteRes.data.candidateId) {
            setVotedCandidateId(voteRes.data.candidateId);
          }
        } catch (err) {
          console.log('No existing vote record found');
        }
      }
    };

    fetchData();
  }, []);

  const handleVote = async (candidateId) => {
    if (votedCandidateId !== null) {
      alert('You have already cast your vote');
      return;
    }

    try {
      const response = await axios.post('/votes', { candidateId });
      if (response.status === 200 || response.status === 201) {
        alert('Vote submitted successfully!');
        setVotedCandidateId(candidateId);
      } else {
        alert('Vote failed.');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('You have already voted.');
        setVotedCandidateId(candidateId);
      } else {
        alert('Error submitting vote.');
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-800 flex justify-center items-center gap-3">
        <SparklesIcon className="w-8 h-8 text-pink-500" />
        All Candidates
      </h2>

      {candidates.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic">No candidates available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
          {candidates.map((c) => (
            <CandidateCard
              key={c.id}
              candidate={c}
              votedCandidateId={votedCandidateId}
              onVote={() => handleVote(c.id)}
              onClick={() => navigate(`/candidates/${c.id}`)}
              isAdmin={isAdmin()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
