import s from "./WaterProgressBar.module.css"

const WaterProgressBar = () => {
    const dailyNorm = 1500;
    const consumed = 800;
    const percentage = dailyNorm ? (consumed / dailyNorm) * 100 : 0;
    const normalizedPercentage = percentage > 100 ? 100 : percentage;

    return (
    <div className={s.waterScaleContainer}>
        <h3>Today</h3>
        <span
            className={s.currentMarker}
            style={{ left: `${normalizedPercentage}%` }}
            >
            {Math.round(normalizedPercentage)}%
            </span>
        <div className={s.waterScale}>
        {/* Заповнення шкали */}
            <div
            className={s.waterScaleFill}
            style={{ width: `${normalizedPercentage}%` }}
            />
        {/* Шарик всередині шкали */}
            <div
            className={s.currentBall}
            style={{ left: `${normalizedPercentage}%` }}
            />
        {/* Динамічний маркер з відсотками, розташований над шкалою */}
        </div>

      {/* Статичні маркери під шкалою */}
        <div className={s.waterScaleMarkers}>
            <span className={s.marker}>0%</span>
            <span className={s.marker}>50%</span>
            <span className={s.marker}>100%</span>
        </div>
    </div>
    );
};

export default WaterProgressBar