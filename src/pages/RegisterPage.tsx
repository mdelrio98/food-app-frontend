// src/pages/RegisterPage.tsx
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AppDispatch, RootState } from '../store';
import { registerUser } from '../store/slices/authSlice';
import { RegisterPayload } from '../types/auth';
import styles from './RegisterPage.module.css';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegisterPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterPayload>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterPayload) => {
    console.log('Register form submitted with data:', data);
    try {
      const result = await dispatch(registerUser(data));
      if (registerUser.fulfilled.match(result)) {
        navigate('/login');
      }
      // No explicit error handling here is needed if the slice/API service handles notifications
    } catch (error) {
      // This catch block is for unexpected errors during the dispatch itself,
      // or if the async thunk re-throws an error not handled by rejectWithValue.
      // Error notifications are typically handled by the slice or API service.
      console.error('Failed to register user on component level:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <h1 className={styles.title}>Sign Up</h1>

        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            {...register('name')}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          />
          {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
        </div>

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
            autoComplete="new-password"
            {...register('password')}
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
          />
          {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
        </div>

        {error && error.length > 0 && <p className={styles.errorText}>{error}</p>}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <Link to="/login" className={styles.link}>
          Already have an account? Sign In
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;

