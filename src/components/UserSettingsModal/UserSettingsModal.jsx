import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';
import css from './UserSettingsModal.module.css';
import { useState } from 'react';

const UserSettingsModal = ({ close }) => {
  const calculateWaterNorm = () => {
    const W = parseFloat(weight) || 0;
    const T = parseFloat(activeTime) || 0;
    const V = gender === 'woman' ? W * 0.03 + T * 0.4 : W * 0.04 + T * 0.6;
    setWaterIntake(V.toFixed(1));
  };

  return (
    <div className={css.modalSettings}>
      <div className={css.upload}>
        <h2 className={css.modalTitle}>Setting</h2>
        <button className={css.closeButton} onClick={close}>
          {' '}
          ✖
        </button>
      </div>

      <div className={css.avatarUploadDiv}>
        <img
          className={css.avatar}
          src="https://i.pravatar.cc/80"
          alt="avatar"
        />
        <button className={css.uploadPhoto}>Upload a photo</button>
      </div>
      <UserSettingsForm />
    </div>
  );
};

export default UserSettingsModal;
