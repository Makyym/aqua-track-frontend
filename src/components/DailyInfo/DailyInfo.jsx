import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import BaseModal from '../BaseModal/BaseModal.jsx';
import ChooseDate from '../ChooseDate/ChooseDate.jsx';
import WaterList from '../WaterList/WaterList.jsx';
import s from './DailyInfo.module.css';
import WaterModal from '../WaterModal/WaterModal.jsx';
import { useState } from 'react';

const DailyInfo = () => {
  const daily = true;
  const [isWaterModalOpen, setWaterModalOpen] = useState(false);
  return (
    <div>
      <div className={s.div}>
        <ChooseDate />
        <AddWaterBtn daily={daily} onOpen={() => setWaterModalOpen(true)} />
      </div>
      <WaterList />
      <BaseModal
        isOpen={isWaterModalOpen}
        onRequestClose={() => setWaterModalOpen(false)}
      >
        <WaterModal onClose={() => setWaterModalOpen(false)} />
      </BaseModal>
    </div>
  );
};

export default DailyInfo;
