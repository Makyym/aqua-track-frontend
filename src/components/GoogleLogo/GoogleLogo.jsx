import { FaGoogle } from "react-icons/fa";
import s from "./GoogleLogo.module.css";
import { useDispatch } from "react-redux";
import { googleAuthUser } from "../../redux/auth/operations.js";

const GoogleLogo = () => {
    const dispatch = useDispatch();
    const submit = () => {
        dispatch(googleAuthUser())
    };
    return (
        <button className={s.btn} type="button" onClick={submit}>
            <FaGoogle />
        </button>
    )
}

export default GoogleLogo;