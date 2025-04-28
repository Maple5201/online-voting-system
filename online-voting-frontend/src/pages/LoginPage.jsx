import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (isAdmin = false) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const token = await response.text();

      if (response.ok && token) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        if (isAdmin) localStorage.setItem('isAdmin', 'true');
        navigate('/');
      } else {
        alert('Login failed.');
      }
    } catch (error) {
      alert('Error during login.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>Please enter your credentials</p>

        <div className="input-wrapper">
          <UserIcon className="input-icon" />
          <input
            className="login-input"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <LockClosedIcon className="input-icon" />
          <input
            className="login-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button user" onClick={() => handleLogin(false)}>User Login</button>
        <button className="login-button admin" onClick={() => handleLogin(true)}>Admin Login</button>
        <button className="login-button register" onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
