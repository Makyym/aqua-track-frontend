import s from './WaterItem.module.css';
import sprite from '../../assets/newSprite.svg';
import { useState } from 'react';
import BaseModal from '../BaseModal/BaseModal.jsx';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal.jsx';
import WaterModal from '../WaterModal/WaterModal.jsx';

const WaterItem = ({ data }) => {
  const { value, date, _id } = data;
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const dateWaterForm = date.split("T")[0];
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
        <svg className={s.iconsEntry} onClick={() => setIsEditFormOpen(true)}>
          <use href={`${sprite}#icon-edit`} />
        </svg>

        <svg className={s.iconsEntry} onClick={() => setDeleteModalOpen(true)}>
          <use href={`${sprite}#icon-trash`} />
        </svg>
      </div>
      <BaseModal
        isOpen={isEditFormOpen}
        onRequestClose={() => setIsEditFormOpen(false)}
      >
        <WaterModal
          date={dateWaterForm}
          cardId={_id}
          onClose={() => setIsEditFormOpen(false)}
          value={value}
        />
      </BaseModal>
      <BaseModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
      >
        <DeleteWaterModal
          date={date}
          waterId={_id}
          onClose={() => setDeleteModalOpen(false)}
        />
      </BaseModal>
    </div>
  );
};

export default WaterItem;
