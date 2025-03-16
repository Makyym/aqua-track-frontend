import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import BaseModal from '../BaseModal/BaseModal.jsx';
import ChooseDate from '../ChooseDate/ChooseDate.jsx';
import WaterList from '../WaterList/WaterList.jsx';
import s from './DailyInfo.module.css';
import WaterModal from '../WaterModal/WaterModal.jsx';
import { useState } from 'react';

const DailyInfo = () => {
    const daily = true;
    return (
        <div className={s.wrapper}>
            <div className={s.div}>
                <ChooseDate />
                <AddWaterBtn daily={daily}/>
            </div>
            <WaterList />
        </div>
    )
}

export default DailyInfo;
