import { useState } from 'react';
import axios from '../api/axiosInstance';

export default function CreateCandidatePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const create = async () => {
    if (!name.trim()) return alert('Name is required');
    if (!file) return alert('Please upload an image');
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('avatar', file); 
  
    try {
      await axios.post('/candidates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Candidate created!');
      setName('');
      setDescription('');
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };
  
  

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Candidate</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="w-24 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="w-24 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="w-24 font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="flex-1"
          />
        </div>
        <button
          onClick={create}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}