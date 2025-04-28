import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from '../api/axiosInstance';

export default function CandidateDetailPage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');

  const vote = async () => {
    const res = await axios.post('/votes', { candidateId: id });
    setMessage(res.data);
  };

  return (
    <div className="p-4">
      <h2>Candidate ID: {id}</h2>
      <button onClick={vote}>Vote</button>
      <p>{message}</p>
    </div>
  );
}