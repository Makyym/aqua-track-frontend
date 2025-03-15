import s from './WaterProgressBar.module.css';

const WaterProgressBar = ({ progress }) => {
  return (
    <div className={s.container}>
      <p className={s.title}>Today</p>
      <div className={s.progressBar}>
        <div className={s.progressFill} style={{ width: `${progress}%` }}>
          <div className={s.rail}></div>
        </div>
      </div>
      <div className={s.percentBar}>
        <p>0%</p>
        <p className={s.fifty}>50%</p>
        <p>100%</p>
      </div>
    </div>
  );
};

export default WaterProgressBar;
