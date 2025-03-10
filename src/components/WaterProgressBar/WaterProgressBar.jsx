import s from './WaterProgressBar.module.css';

const WaterProgressBar = () => {

return (
    <div className={s.container}>
      
      <p className={s.title}>Today</p>
      <div className={s.slider}><div className={s.rail}></div></div>
        <div className={s.percent_bar}>
            <p>0%</p>
            <p className={s.fifty}>50%</p>
            <p>100%</p>
        </div>
    </div>

  );
}
export default WaterProgressBar;