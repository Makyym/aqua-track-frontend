import { useSelector } from "react-redux";
import s from "./WaterProgressBar.module.css"
import { selectAllWaterForDay } from "../../redux/water/selectors.js";
import { selectDailyNorm } from "../../redux/auth/selectors.js";

const WaterProgressBar = () => {
    const consumed = useSelector(selectAllWaterForDay);
    const dailyNorm = useSelector(selectDailyNorm);
    const percentage = dailyNorm ? (consumed / dailyNorm) * 100 : 0;
    const normalizedPercentage = percentage > 100 ? 100 : percentage;

    return (
    <div className={s.waterScaleContainer}>
        <h3>Today</h3>
        <div className={s.waterScale}>
            {normalizedPercentage && normalizedPercentage !== 100 ? (<span
                className={s.currentMarker}
                style={{ left: `${normalizedPercentage}%` }}
                >
                {Math.round(normalizedPercentage)}%
            </span>) : <></>}
            <div
            className={s.waterScaleFill}
            style={{ width: `${normalizedPercentage}%` }}
            />
            <div
            className={s.currentBall}
            style={{ left: `${normalizedPercentage}%` }}
            />
        </div>
        <div className={s.waterScaleMarkers}>
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
        </div>
    </div>
    );
};

export default WaterProgressBar