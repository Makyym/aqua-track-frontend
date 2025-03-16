import { useDispatch, useSelector } from "react-redux"
import WaterItem from "../WaterItem/WaterItem.jsx"
import { selectActiveDate, selectCurrentDate, selectCurrentWaterDayArray, selectIsLoading, selectWaterDayArray } from "../../redux/water/selectors.js"
import s from "./WaterList.module.css"
import { useEffect } from "react"
import { fetchWaterDay } from "../../redux/water/operations.js"
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx"

const WaterList = () => {
    const arrayCurrent = useSelector(selectCurrentWaterDayArray);
    const arrayActive = useSelector(selectWaterDayArray);
    const activeDate = useSelector(selectActiveDate);
    const currentDate = useSelector(selectCurrentDate);
    const dispatch = useDispatch();
    const loading = useSelector(selectIsLoading);
    // let array = [];
    // if (activeDate) {
    //     array = arrayActive;
    // }
    // array = arrayCurrent;
    const array = activeDate ? arrayActive : arrayCurrent;
    useEffect(() => {
        if (activeDate) {
            dispatch(fetchWaterDay(activeDate));
            return;
        }
        dispatch(fetchWaterDay(currentDate));
    }, [dispatch, activeDate, currentDate]);
    return (
        <div className={s.div}>
            {loading ? <LoaderComponent />
            : (<div>
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
            </div>)}
        </div>
    )
}

export default WaterList