import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
  const initialValues = {
    email: '',
    password: '',
    repeatPassword: '',
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <Formik initialValues={initialValues}>
        <Form>
          <label>Email</label>
          <div>
            <Field name="email" type="email" placeholder="Enter your email" />
            <ErrorMessage name="email" component="span" />
          </div>
          <label>Password</label>
          <div>
            <Field
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="span" />
            <svg>
              <use></use>
            </svg>
          </div>
          <label>Repeat password</label>
          <div>
            <Field
              name="repeatPassword"
              type="password"
              placeholder="Repeat password"
            />
            <ErrorMessage name="repeatPassword" component="span" />
            <svg>
              <use></use>
            </svg>
          </div>
          <button>Sign Up</button>
        </Form>
      </Formik>
      <p>
        Already have account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUpForm;

// підключити схему валідації до форміка