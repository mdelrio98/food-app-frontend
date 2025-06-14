// src/pages/LoginPage.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { loginUser } from '../store/slices/authSlice';
import { LoginPayload } from '../types/auth';
import styles from './LoginPage.module.css';
import { AppDispatch, RootState } from '../store';

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>({
    resolver: yupResolver(schema),
  });

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const onSubmit = (data: LoginPayload) => {
    dispatch(loginUser(data));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <h1 className={styles.title}>Sign In</h1>
        
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          />
          {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password')}
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
          />
          {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
        </div>

        {error && <p className={styles.errorText}>{String(error)}</p>}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        <Link to="/register" className={styles.link}>
          Don't have an account? Sign Up
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;

