import { useSelector } from "react-redux"
import s from "./WaterDailyNorma.module.css"
import { selectUser } from "../../redux/auth/selectors.js"

const WaterDailyNorma = () => {
    const user = useSelector(selectUser);
    function convertMlToLiters(ml) {
        const liters = ml / 1000;
        return Math.round(liters * 100) / 100;
    };
    const waterNorm = convertMlToLiters(user.dailyNorm);
    return (
        <div className={s.div}>
            <span>{waterNorm} L</span>
            <p>My daily norma</p>
        </div>
    )
}

export default WaterDailyNorma