import { useSelector } from "react-redux";
import s from "./WaterDailyNorma.module.css";
import { selectUser } from "../../redux/auth/selectors.js";

const WaterDailyNorma = () => {
    function convertMlToLiters(ml) {
        return (ml / 1000).toFixed(1);
    }

    return (
        <div className={s.div}>
            <span>1.5 L</span>
            <p>My daily norma</p>
        </div>
    );
};

export default WaterDailyNorma;