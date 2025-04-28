import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => email.includes('@');
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      alert('Please enter the correct email address');
      return;
    }

    if (!validatePhone(phone)) {
      alert('Please enter the correct phone number');
      return;
    }

    try {
      const response = await axios.post('/auth/register', {
        username,
        password,
        email,
        phone,
        role: 'USER',
      });

      if (response.status === 200 || response.status === 201) {
        alert('registered successfully');
        navigate('/login');
      } else {
        alert(`Registration failed: ${response.statusText}`);
        console.warn('Unexpected response:', response);
      }
    } catch (error) {
      if (error.response) {
        alert(`Registration failed: ${error.response.status} ${error.response.data?.message || ''}`);
        console.error('Response error:', error.response);
      } else if (error.request) {
        alert('No response received from the server, please check the backend or network.');
        console.error('No response:', error.request);
      } else {
        alert('Error:' + error.message);
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[420px]">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Register a new account</h1>

        
        <div className="relative mb-4">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="user name"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        
        <div className="relative mb-4">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="password"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="email"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        
        <div className="relative mb-6">
          <FaPhone className="absolute left-3 top-3 text-gray-400" />
          <input
            type="tel"
            placeholder="Mobile phone number "
            className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        
        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition duration-300 font-semibold mb-3"
        >
          Register
        </button>

        
        <button
          onClick={() => navigate('/login')}
          className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-100 py-2 px-4 rounded transition duration-300"
        >
          Return to login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
