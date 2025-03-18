import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SharedLayout from './SharedLayout.jsx';
import './App.css';
import { lazy, useEffect } from 'react';
import RestrictedRoute from './RestrictedRoute.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { allUsersCount, refreshUser } from './redux/auth/operations.js';
import { selectIsRefreshing } from './redux/auth/selectors.js';
import LoaderComponent from './components/LoaderComponent/LoaderComponent.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.jsx'));
const GoogleAuthPage = lazy(() => import('./pages/GoogleAuthPage/GoogleAuthPage.jsx'));

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
      dispatch(refreshUser());
      dispatch(allUsersCount());
  }, [dispatch]);

  return isRefreshing ? (
    <LoaderComponent />
  ) : (
    <AnimatePresence mode="wait">
      <SharedLayout key={location.pathname}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <RestrictedRoute 
                component={<HomePage />} 
                redirectTo="/tracker" 
              />
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute 
                component={<SignUpPage />} 
                redirectTo="/tracker" 
              />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute 
                component={<SignInPage />} 
                redirectTo="/tracker" 
              />
            }
          />
          <Route
            path="/auth/success"
            element={
              <RestrictedRoute 
                component={<GoogleAuthPage />} 
                redirectTo="/tracker" 
              />
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
    </AnimatePresence>
  );
}

export default App;