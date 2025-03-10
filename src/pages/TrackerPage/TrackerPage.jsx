import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx"
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx"
import s from "./TrackerPage.module.css"

const TrackerPage = () => {
    return (
        <div className={s.div}>
            <WaterMainInfo />
            <WaterDetailedInfo />
        </div>
    )
}

export default TrackerPage