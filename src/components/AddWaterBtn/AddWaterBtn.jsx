import React, { useState } from "react";
import WaterForm from "../WaterForm/WaterForm";
import sprite from '../../assets/newSprite.svg';
import s from './AddWaterBtn.module.css';

const AddWaterBtn = ({ daily, onOpen }) => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);  // Открываем/закрываем форму
    onOpen && onOpen();  // Вызываем onOpen если он передан
  };

  return (
    <div className={s.container}> {/* Контейнер для выравнивания */}
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
      
      {showForm && <WaterForm />}  {/* Показываем форму, если showForm true */}
    </div>
  );
};

export default AddWaterBtn;
