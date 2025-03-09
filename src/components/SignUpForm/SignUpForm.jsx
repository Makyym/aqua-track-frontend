import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import s from './SignUpForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/auth/operations.js';

const SignUpForm = () => {
  const validationSchema = Yup.object({
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
  const initialValues = {
    email: '',
    password: '',
    repeatPassword: '',
  };
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    try {
      const resultAction = await dispatch(signUp(data));

      if (signUp.fulfilled.match(resultAction)) {
        toast.success('You were successfully signed up!');
        resetForm();
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Unexpected error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className={s.wrapper}>
      <Logo />
      <div className={s.container_form}>
        <h2 className={s.title}>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={s.form}>
            <label className={s.label}>Email</label>
            <div className={s.container_input}>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className={s.input}
                required
              />
              <ErrorMessage
                name="email"
                component="span"
                className={s.errors}
              />
            </div>
            <label className={s.label}>Password</label>
            <div className={s.container_input}>
              <Field
                name="password"
                type="password"
                placeholder="Enter your password"
                className={s.input}
                required
              />
              <ErrorMessage
                name="password"
                component="span"
                className={s.errors}
              />
              <svg className={s.icon}>
                <use></use>
              </svg>
            </div>
            <label className={s.label}>Repeat password</label>
            <div className={s.container_input}>
              <Field
                name="repeatPassword"
                type="password"
                placeholder="Repeat password"
                className={s.input}
                required
              />
              <ErrorMessage
                name="repeatPassword"
                component="span"
                className={s.errors}
              />
              <svg className={s.icon}>
                <use></use>
              </svg>
            </div>
            <button type="submit" className={s.button}>
              Sign Up
            </button>
          </Form>
        </Formik>
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

// підключити схему валідації до форміка
