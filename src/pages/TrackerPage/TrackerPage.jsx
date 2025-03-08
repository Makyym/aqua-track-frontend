import { useDispatch } from "react-redux";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx"
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx"
import s from "./TrackerPage.module.css"
import { refreshUser } from "../../redux/auth/operations.js";
import { useEffect } from "react";

const TrackerPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshUser())
    }, [dispatch]);
    return (
        <div className={s.div}>
            <WaterMainInfo />
            <WaterDetailedInfo />
        </div>
    )
}

export default TrackerPage