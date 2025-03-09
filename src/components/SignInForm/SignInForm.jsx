import css from './SignInForm.module.css';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo.jsx';
import Icon from '../Icon/Icon.jsx';

const SignInForm = ({ onSubmit, title }) => {
  const [showPassword, setShowPassword] = useState(false);

  const signInValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const signInInitialValues = {
    email: '',
    password: '',
  };

  const passwordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className={css.wrapper}>
      <Logo />
      <div className={css.container_form}>
        <Formik
          initialValues={signInInitialValues}
          validationSchema={signInValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={css.form}>
              <h2 className={css.title}>{title}</h2>
              <label className={css.label}>Email</label>
              <div className={css.container_input}>
                <Field
                  type="email"
                  name="email"
                  autoFocus
                  required
                  className={`${css.input} ${
                    errors.email && touched.email ? css.inputError : ''
                  }`}
                  placeholder="Enter your email"
                />

                <ErrorMessage
                  className={css.errors}
                  name="email"
                  component="span"
                />
              </div>

              <label className={css.label}>Password</label>
              <div className={css.container_input}>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  className={`${css.input} ${
                    errors.password && touched.password ? css.inputError : ''
                  }`}
                  required
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={passwordVisibility}
                >
                  <Icon
                    name={showPassword ? 'icon-eye' : 'icon-eye-slash'}
                    width={16}
                    height={16}
                  />
                </button>
              </div>
              <ErrorMessage
                className={css.errors}
                name="password"
                component="span"
              />

              <button
                type="submit"
                className={css.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
              <div>
                <p className={css.description}>
                  Don't have an account?&nbsp;{' '}
                  <Link to="/signup" className={css.link}>
                    Sign up
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInForm;
