import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx"
import ChooseDate from "../ChooseDate/ChooseDate.jsx"
import WaterList from "../WaterList/WaterList.jsx"
import s from "./DailyInfo.module.css"

const DailyInfo = () => {
    const daily = true;
    return (
        <div>
            <div className={s.div}>
                <ChooseDate />
                <AddWaterBtn daily={daily}/>
            </div>
            <WaterList />
        </div>
    )
}

export default DailyInfo