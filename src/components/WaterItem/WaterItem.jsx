import s from './WaterItem.module.css';
import sprite from '../../assets/newSprite.svg';
import { useState } from 'react';
import BaseModal from '../BaseModal/BaseModal.jsx';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal.jsx';

const WaterItem = ({ data }) => {
  const { value, date } = data;
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  function extractTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    let hours = dateTime.getUTCHours();
    let minutes = dateTime.getUTCMinutes();
    hours = hours.toString().padStart(1, '0');
    minutes = minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  const time = extractTime(date);
  return (
    <div className={s.item}>
      <svg className={s.iconGlass}>
        <use href={`${sprite}#icon-water-glass`} />
      </svg>
      <div className={s.wrapper}>
        <span className={s.water}>{value} ml</span>
        <span className={s.time}>{time}</span>
      </div>

      <div className={s.iconsDiv}>
        <svg className={s.iconsEntry}>
          <use href={`${sprite}#icon-edit`} />
        </svg>

        <svg className={s.iconsEntry} onClick={() => setDeleteModalOpen(true)}>
          <use href={`${sprite}#icon-trash`} />
        </svg>
      </div>

      <BaseModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
      >
        <DeleteWaterModal onClose={() => setDeleteModalOpen(false)} />
      </BaseModal>
    </div>
  );
};

export default WaterItem;
