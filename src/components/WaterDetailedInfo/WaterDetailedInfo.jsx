import DailyInfo from "../DailyInfo/DailyInfo.jsx"
import MonthInfo from "../MonthInfo/MonthInfo.jsx"
import UserPanel from "../UserPanel/UserPanel.jsx"

const WaterDetailedInfo = () => {
    return (
        <div>
            <UserPanel />
            <DailyInfo />
            <MonthInfo />
        </div>
    )
}

export default WaterDetailedInfo