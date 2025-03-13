import { FaGoogle } from "react-icons/fa";
import s from "./GoogleLogo.module.css";

const GoogleLogo = () => {
    return (
        <button className={s.btn}>
            <FaGoogle />
        </button>
    )
}

export default GoogleLogo;