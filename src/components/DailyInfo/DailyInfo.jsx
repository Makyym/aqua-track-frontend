import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx"
import ChooseDate from "../ChooseDate/ChooseDate.jsx"
import WaterList from "../WaterList/WaterList.jsx"

const DailyInfo = () => {
    return (
        <div>
            <ChooseDate />
            <AddWaterBtn />
            <WaterList />
        </div>
    )
}

export default DailyInfo