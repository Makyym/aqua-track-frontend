import { Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout.jsx';
import './App.css';
import { lazy, useEffect } from 'react';
import RestrictedRoute from './RestrictedRoute.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import { useDispatch } from 'react-redux';
import { refreshUser, signIn, signUp } from './redux/auth/operations.js';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.jsx'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch]);
  return (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />s
        <Route
          path="/signup"
          element={
            <RestrictedRoute component={<SignUpPage />} redirectTo="/tracker" />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute component={<SignInPage />} redirectTo="/tracker" />
          }
        />
        <Route
          path="/tracker"
          element={
            <PrivateRoute>
              <TrackerPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
