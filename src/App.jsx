import { Route, Routes } from "react-router-dom";
import SharedLayout from "./SharedLayout.jsx";
import "./App.css";
import { lazy, useEffect } from "react";
import RestrictedRoute from "./RestrictedRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations.js";
import { selectIsRefreshing } from "./redux/auth/selectors.js";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.jsx"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage.jsx"));

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <p>Loading...</p>;
  }

  return (
    <SharedLayout>
      <Routes>
        <Route
          path="/"
          element={<RestrictedRoute component={<HomePage />} redirectTo="/tracker" />}
        />
        <Route
          path="/signup"
          element={<RestrictedRoute component={<SignUpPage />} redirectTo="/tracker" />}
        />
        <Route
          path="/signin"
          element={<RestrictedRoute component={<SignInPage />} redirectTo="/tracker" />}
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
