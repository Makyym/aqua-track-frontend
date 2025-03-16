import React, { useState } from "react";
import WaterForm from "../WaterForm/WaterForm";
import sprite from '../../assets/newSprite.svg';
import s from './AddWaterBtn.module.css';

const AddWaterBtn = ({ daily, onOpen }) => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);  
    onOpen && onOpen(); 
  };

  return (
    <div className={s.container}>
      <button className={daily ? s.button : s.buttonDaily} onClick={handleClick}>
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
      
      {showForm && <WaterForm />} 
    </div>
  );
};

export default AddWaterBtn;
