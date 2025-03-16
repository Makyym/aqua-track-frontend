import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx"
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx"
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx"
import Logo from "../Logo/Logo"
import s from "./WaterMainInfo.module.css"


const WaterMainInfo = () => {
    return (
        <div className={s.div}>
            <Logo />
            <WaterDailyNorma />
            <WaterProgressBar />
            <AddWaterBtn />
        </div>
    )
}

export default WaterMainInfo