import DailyInfo from "../DailyInfo/DailyInfo.jsx"
import MonthInfo from "../MonthInfo/MonthInfo.jsx"
import UserPanel from "../UserPanel/UserPanel.jsx"
import s from "./WaterDetailedInfo.module.css"

const WaterDetailedInfo = () => {
    return (
        <div className={s.container}>
            <UserPanel />
            <DailyInfo />
            <MonthInfo />
        </div>
    )
}

export default WaterDetailedInfo