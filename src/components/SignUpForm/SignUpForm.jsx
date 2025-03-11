import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import s from './SignUpForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { signUp } from '../../redux/auth/operations.js';
import toast from 'react-hot-toast';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Repeat password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(signUp({ email: data.email, password: data.password })).unwrap();
      toast.success('You were successfully signed up!');
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={s.wrapper}>
      <Logo />
      <div className={s.container_form}>
        <h2 className={s.title}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <label className={s.label}>Email</label>
          <div className={s.container_input}>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className={`${s.input} ${errors.email ? s.inputError : ''}`}
              required
            />
            <span className={s.errors}>{errors.email?.message}</span>
          </div>
          <label className={s.label}>Password</label>
          <div className={s.container_input}>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className={`${s.input} ${errors.password ? s.inputError : ''}`}
              required
            />
            <span className={s.errors}>{errors.password?.message}</span>
            <svg className={s.icon} onClick={togglePassword}>
              <use href="/sprite.svg#icon-eye-off"> </use>
            </svg>
          </div>
          <label className={s.label}>Repeat password</label>
          <div className={s.container_input}>
            <input
              name="repeatPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat password"
              {...register('repeatPassword')}
              className={`${s.input} ${errors.repeatPassword ? s.inputError : ''}`}
              required
            />
            <span className={s.errors}>{errors.repeatPassword?.message}</span>
            <svg className={s.icon} onClick={togglePassword}>
              <use></use>
            </svg>
          </div>
          <button type="submit" className={s.button}>
            Sign Up
          </button>
        </form>
        <p className={s.description}>
          Already have account?&nbsp;
          <Link to="/signin" className={s.link}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;