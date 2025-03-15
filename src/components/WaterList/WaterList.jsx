import { useDispatch, useSelector } from "react-redux"
import WaterItem from "../WaterItem/WaterItem.jsx"
import { selectActiveDate, selectCurrentDate, selectCurrentWaterDayArray, selectWaterDayArray } from "../../redux/water/selectors.js"
import s from "./WaterList.module.css"
import { useEffect } from "react"
import { fetchWaterDay } from "../../redux/water/operations.js"

const WaterList = () => {
    const arrayCurrent = useSelector(selectCurrentWaterDayArray);
    const arrayActive = useSelector(selectWaterDayArray);
    const activeDate = useSelector(selectActiveDate);
    const currentDate = useSelector(selectCurrentDate);
    const dispatch = useDispatch();
    const array = arrayActive.length ? arrayActive : arrayCurrent;
    useEffect(() => {
        if (activeDate) {
            dispatch(fetchWaterDay(activeDate));
            return;
        }
        dispatch(fetchWaterDay(currentDate));
    }, [activeDate]);
    return (
        <div className={s.div}>
            {array.length ?
            (<ul className={s.ul}>
                {array.map(item => {
                    return (
                        <li key={item._id}>
                            <WaterItem data={item}/>
                        </li>
                    )
                })}
            </ul>) :
            (<h3>You have no records of water intake yet.</h3>)}
        </div>
    )
}

export default WaterList