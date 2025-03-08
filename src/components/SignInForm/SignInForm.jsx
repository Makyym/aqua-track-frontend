import css from './SignInForm.module.css';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';

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

const SignInForm = ({ onSubmit, title }) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Formik
      initialValues={signInInitialValues}
      validationSchema={signInValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.form}>
          <h2 className={css.title}>{title}</h2>

          <label className={css.label}>
            <span>Email</span>
            <Field
              type="email"
              name="email"
              autoFocus
              className={`${css.input} ${
                errors.email && touched.email ? css.inputError : ''
              }`}
              placeholder="Enter your email"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="span"
            />
          </label>

          <label className={css.label}>
            <span>Password</span>
            <div className={css.passwordField}>
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
                className={`${css.input} ${
                  errors.password && touched.password ? css.inputError : ''
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className={css.showPasswordButton}
                onClick={passwordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <ErrorMessage
              className={css.errorMessage}
              name="password"
              component="span"
            />
          </label>

          <button
            type="submit"
            className={css.buttonStyle}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>

          <div>
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className={css.link}>
                Sign up
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
