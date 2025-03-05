import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ component, redirectTo = '/' }) => {
    const isLoggedIn = true;
    return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute