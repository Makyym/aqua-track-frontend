import { useSelector } from "react-redux";
import { selectActiveDate, selectCurrentDate } from "../../redux/water/selectors.js";
import s from "./ChooseDate.module.css"

const ChooseDate = () => {
    const currentDate = useSelector(selectCurrentDate);
    const activeDate = useSelector(selectActiveDate);
    function formatDate(date) {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleDateString('en-US', { month: 'long' });
        return `${day}, ${month}`;
    }
    let date = "Today";
    if (activeDate) {
        date = formatDate(activeDate);
    }
    if (currentDate === activeDate) date = "Today";
    return (
        <h3 className={s.title}>{date}</h3>
    )
}

export default ChooseDate