import { useDispatch, useSelector } from "react-redux"
import WaterItem from "../WaterItem/WaterItem.jsx"
import { selectActiveDate, selectCurrentDate, selectCurrentWaterDayArray } from "../../redux/water/selectors.js"
import s from "./WaterList.module.css"
import { useEffect } from "react"
import { fetchWaterDay } from "../../redux/water/operations.js"
import { refreshToken } from "../../redux/auth/operations.js"

const WaterList = () => {
    const array = useSelector(selectCurrentWaterDayArray);
    const activeDate = useSelector(selectActiveDate);
    const currentDate = useSelector(selectCurrentDate);
    const dispatch = useDispatch();
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