import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './SignInForm.module.css';
import Logo from '../Logo/Logo.jsx';
import newSprite from '../../assets/newSprite.svg';

const SignInForm = ({ onSubmit, title }) => {
  const [showPassword, setShowPassword] = React.useState({});

  const togglePassword = field => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  return (
    <div className={css.wrapper}>
      <Logo />
      <div className={css.container_form}>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <h2 className={css.title}>{title}</h2>

          <label className={css.label}>Email</label>
          <div className={css.container_input}>
            <input
              type="email"
              autoFocus
              required
              className={`${css.input} ${errors.email ? css.inputError : ''}`}
              placeholder="Enter your email"
              {...register('email')}
            />
            {errors.email && (
              <span className={css.errors}>{errors.email.message}</span>
            )}
          </div>

          <label className={css.label}>Password</label>
          <div className={css.container_input}>
            <input
              type={showPassword.password ? 'text' : 'password'}
              autoComplete="current-password"
              required
              className={`${css.input} ${
                errors.password ? css.inputError : ''
              }`}
              placeholder="Enter your password"
              {...register('password')}
            />
            <svg
              className={css.icon}
              onClick={() => togglePassword('password')}
            >
              <use
                href={`${newSprite}#icon-${
                  showPassword.password ? 'eye' : 'eye-off'
                }`}
              />
            </svg>
            {errors.password && (
              <span className={css.errors}>{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className={css.button} disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div>
          <p className={css.description}>
            Don't have an account?&nbsp;
            <Link to="/signup" className={css.link}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
