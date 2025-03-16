import React from 'react';
import sprite from '../../assets/newSprite.svg';
import s from './AddWaterBtn.module.css';

const AddWaterBtn = ({ daily, onOpen }) => {
  return (
    <button className={daily ? s.button : s.buttonDaily} onClick={onOpen}>
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
  );
};

export default AddWaterBtn;
