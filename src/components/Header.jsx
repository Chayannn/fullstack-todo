import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context, Server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Header() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${Server}/users/logout`, {
        withCredentials: true,
      });
      toast.success('Logged out successfully');
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to={'/'}>Home</Link>
        <Link to={'/profile'}>Profile</Link>
        {isAuthenticated ? (
          <button className="btn" onClick={logoutHandler} disabled={loading}>
            Logout
          </button>
        ) : (
          <Link to={'/login'}>Login</Link>
        )}
      </article>
    </nav>
  );
}

export default Header;
