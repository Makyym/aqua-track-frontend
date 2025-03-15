import { useSelector } from "react-redux"
import WaterItem from "../WaterItem/WaterItem.jsx"
import { selectWaterDayArray } from "../../redux/water/selectors.js"
import s from "./WaterList.module.css"

const WaterList = () => {
    const array = useSelector(selectWaterDayArray);
    return (
        <div className={s.div}>
            <ul className={s.ul}>
                {array.map(item => {
                    return (
                        <li key={item._id}>
                            <WaterItem data={item}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default WaterList