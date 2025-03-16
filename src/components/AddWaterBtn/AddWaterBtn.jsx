import { useState } from 'react';
import sprite from '../../assets/newSprite.svg';
import s from './AddWaterBtn.module.css';
import BaseModal from '../BaseModal/BaseModal.jsx';
import WaterModal from '../WaterModal/WaterModal.jsx';

const AddWaterBtn = ({ daily }) => {
  const [waterOpen, SetWaterOpen] = useState(false);
  const handleModalClose = () => {
    SetWaterOpen(false);
  };
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
        <WaterModal onClose={handleModalClose} />
      </BaseModal>
    </>
  );
};

export default AddWaterBtn;
