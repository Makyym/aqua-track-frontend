import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import s from "./GoogleLogo.module.css";

const GoogleLogo = () => {
    return (
        <div className={s.div}>
            <FaGoogle />
        </div>
        // <div className={s.wrapper}>
        //     <FcGoogle />
        // </div>
    )
}

export default GoogleLogo;