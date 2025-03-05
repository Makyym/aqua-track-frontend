import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx"
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx"
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx"

const WaterMainInfo = () => {
    return (
        <div>
            <WaterDailyNorma />
            <WaterProgressBar />
            <AddWaterBtn />
        </div>
    )
}

export default WaterMainInfo