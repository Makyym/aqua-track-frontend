import s from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
    const normalizedPercentage = 50; 

    return (
        <div className={s.waterScaleContainer}>
            <h3>Today</h3>
            <div className={s.waterScale}>
                <span className={s.currentMarker} style={{ left: `${normalizedPercentage}%` }}>
                    {normalizedPercentage}%
                </span>
                <div className={s.waterScaleFill} style={{ width: `${normalizedPercentage}%` }} />
                <div className={s.currentBall} style={{ left: `${normalizedPercentage}%` }} />
            </div>
            <div className={s.waterScaleMarkers}>
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
            </div>
        </div>
    );
};

export default WaterProgressBar;

