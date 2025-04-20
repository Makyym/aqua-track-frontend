import { useDispatch, useSelector } from "react-redux"
import WaterItem from "../WaterItem/WaterItem.jsx"
import { selectActiveDate, selectCurrentDate, selectCurrentWaterDayArray, selectIsLoading, selectWaterDayArray } from "../../redux/water/selectors.js"
import s from "./WaterList.module.css"
import { useEffect } from "react"
import { fetchWaterDay } from "../../redux/water/operations.js"
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx"
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
    hidden: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

const WaterList = () => {
    const arrayCurrent = useSelector(selectCurrentWaterDayArray);
    const arrayActive = useSelector(selectWaterDayArray);
    const activeDate = useSelector(selectActiveDate);
    const currentDate = useSelector(selectCurrentDate);
    const dispatch = useDispatch();
    const loading = useSelector(selectIsLoading);
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
            <AnimatePresence>
            {loading ? <LoaderComponent /> : (<div>
                {array.length ?
                (<motion.ul
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ willChange: "transform, opacity" }}
                className={s.ul}>
                    {array.map(item => {
                        return (
                            <motion.li
                            initial="hidden"
                            animate="enter"
                            exit="exit"
                            variants={variants}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            style={{ willChange: "transform, opacity" }}
                            key={item._id}>
                                <WaterItem data={item}/>
                            </motion.li>
                        )
                    })}
                </motion.ul>) :
                (<motion.h3
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    variants={variants}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ willChange: "transform, opacity" }}
                >You have no records of water intake yet.</motion.h3>)}
            </div>)}
            </AnimatePresence>
        </div>
    )
}

export default WaterList