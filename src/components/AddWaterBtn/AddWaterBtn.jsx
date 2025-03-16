import { useState } from 'react';
import sprite from '../../assets/newSprite.svg';
import s from './AddWaterBtn.module.css';
import BaseModal from '../BaseModal/BaseModal.jsx';
import WaterModal from '../WaterModal/WaterModal.jsx';
import { useSelector } from 'react-redux';
import {
  selectActiveDate,
  selectCurrentDate,
} from '../../redux/water/selectors.js';

const AddWaterBtn = ({ daily }) => {
  const [waterOpen, SetWaterOpen] = useState(false);
  const handleModalClose = () => {
    SetWaterOpen(false);
  };
  const activeDate = useSelector(selectActiveDate);
  const currentDate = useSelector(selectCurrentDate);
  const date = activeDate ? activeDate : currentDate;

  return (
    <>
      <button
        className={daily ? s.button : s.buttonDaily}
        onClick={() => SetWaterOpen(true)}
      >
        {daily ? (
          <svg className={s.icon}>
            <use href={`${sprite}#icon-plus-green`} />
          </svg>
        ) : (
          <svg className={s.iconDaily}>
            <use href={`${sprite}#icon-plus-white`} />
          </svg>
        )}
        Add water
      </button>
      <BaseModal isOpen={waterOpen} onRequestClose={handleModalClose}>
        <WaterModal
          addWaterEntry={true}
          onClose={handleModalClose}
          date={date}
        />
      </BaseModal>
    </>
  );
};

export default AddWaterBtn;
