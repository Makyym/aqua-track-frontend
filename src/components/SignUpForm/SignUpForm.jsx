import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import s from './SignUpForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { signUp } from '../../redux/auth/operations.js';
import toast from 'react-hot-toast';
import { selectIsError } from '../../redux/auth/selectors.js';
import newSprite from "/assets/newSprite.svg"

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const errorMessage = useSelector(selectIsError);

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
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Repeat password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const onSubmit = async data => {
    try {
      await dispatch(
        signUp({ email: data.email, password: data.password }),
      ).unwrap();
      toast.success('You were successfully signed up!');
      reset();
    } catch (error) {
      errorMessage && toast.error(errorMessage);
    }
  };

  return (
    <div className={s.wrapper}>
      <Logo />
      <div className={s.container_form}>
        <h2 className={s.title}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <label htmlFor="email" className={s.label}>
            Email
            <svg className={s.icon}>
              <use
                href={`${newSprite}f#icon-plus-green`}
              />
            </svg>
          </label>
          <div className={s.container_input}>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className={`${s.input} ${errors.email ? s.inputError : ''}`}
            />
            {errors.email || touchedFields.email ? (
              <span className={s.errors}>{errors.email?.message}</span>
            ) : null}
          </div>

          <label htmlFor="password" className={s.label}>
            Password
          </label>
          <div className={s.container_input}>
            <input
              id="password"
              type={showPassword.password ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className={`${s.input} ${errors.password ? s.inputError : ''}`}
            />
            {errors.password || touchedFields.password ? (
              <span className={s.errors}>{errors.password?.message}</span>
            ) : null}
            <svg className={s.icon} onClick={() => togglePassword('password')}>
              <use
                href={`/src/images/newSprite.svg#icon-${
                  showPassword.password ? 'eye-off' : 'eye'
                }`}
              />
            </svg>
          </div>

          <label htmlFor="repeatPassword" className={s.label}>
            Repeat password
          </label>
          <div className={s.container_input}>
            <input
              id="repeatPassword"
              type={showPassword.repeatPassword ? 'text' : 'password'}
              placeholder="Repeat password"
              {...register('repeatPassword')}
              className={`${s.input} ${
                errors.repeatPassword ? s.inputError : ''
              }`}
            />
            {errors.repeatPassword || touchedFields.repeatPassword ? (
              <span className={s.errors}>{errors.repeatPassword?.message}</span>
            ) : null}
            <svg
              className={s.icon}
              onClick={() => togglePassword('repeatPassword')}
            >
              <use href="/src/images/newSprite.svg#icon-eye-off"></use>
            </svg>
          </div>

          <button type="submit" className={s.button}>
            Sign Up
          </button>
        </form>
        <p className={s.description}>
          Already have an account?&nbsp;
          <Link to="/signin" className={s.link}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
