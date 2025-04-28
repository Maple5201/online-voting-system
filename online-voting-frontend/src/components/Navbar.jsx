import { useNavigate, useLocation } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hideOnLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';
  if (hideOnLoginOrRegister) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <nav style={{
      width: '100%',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
      color: 'white',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', gap: '24px' }}>
        <button onClick={() => navigate('/')} className="nav-button">Home</button>
        {isAdmin() && (
          <button onClick={() => navigate('/create-candidate')} className="nav-button">Create</button>
        )}
        <button onClick={() => navigate('/results')} className="nav-button">Results</button>
      </div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </nav>
  );
};

export default Navbar;
