import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { login } from '../store/authSlice';
import './LoginPage.css'; // We'll create this file for styling

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, user } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    // If login is successful, navigate to the home page
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <button type="submit" className="login-button">Login</button>
        )}
        {status === 'failed' && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
