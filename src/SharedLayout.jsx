import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "./redux/auth/operations.js";
import { selectUser } from "./redux/auth/selectors.js";

const SharedLayout = ({children}) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleSignIn = () => {
        const values = {
            email: "test2@mail.com",
            password: "123456"
        }
        dispatch(signIn(values));
    }
    return (
        <div className="container">
            SharedLayout
            <Suspense fallback={null}>{children}</Suspense>
            <button type="button" onClick={handleSignIn}>click</button>
            <p>{user.email}</p>
        </div>
    )
}

export default SharedLayout;