import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

export default function ResultsPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('/votes/results').then((res) => setResults(res.data));
  }, []);

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Voting Results</h2>
      {results.length === 0 ? (
        <p className="text-center text-gray-600">No votes yet.</p>
      ) : (
        <ul className="space-y-2">
          {results.map((r, i) => (
            <li key={i} className="bg-white shadow rounded p-4">
              <span className="font-semibold">{r.candidateName}</span>: {r.voteCount} votes
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
