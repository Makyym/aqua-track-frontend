import { useSelector } from "react-redux";
import UserBar from "../UserBar/UserBar.jsx"
import s from "./UserPanel.module.css"
import { selectUser } from "../../redux/auth/selectors.js";

const UserPanel = () => {
    const user = useSelector(selectUser);
    const {name, email} = user;
    const shortEmail = email.split('@')[0];
    return (
        <div className={s.div}>
            <h1 className={s.hello}>
                Hello<span className={s.userName}>, {name ?? shortEmail}!</span>
            </h1>
            <div><UserBar /></div>
        </div>
    )
}

export default UserPanel