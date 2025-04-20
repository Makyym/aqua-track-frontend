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
  function extractTime(dateTimeString) {
    if (/^\d{2}:\d{2}$/.test(dateTimeString)) {
      const [hours, minutes] = dateTimeString.split(':');
      const modHours = hours.replace(/^0/, '');
      return `${modHours}:${minutes}`;
    }
    const dateTime = new Date(dateTimeString);
    if (isNaN(dateTime)) {
      throw new Error("Invalid date format");
    }
    const hours = dateTime.getHours().toString();
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
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
          date={date}
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
