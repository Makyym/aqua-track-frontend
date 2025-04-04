import { useState } from 'react';
import css from './UserBarPopover.module.css';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal.jsx';
import LogOutModal from '../LogOutModal/LogOutModal.jsx';
import BaseModal from '../BaseModal/BaseModal.jsx';
import newSprite from '../../assets/newSprite.svg';

const UserBarPopover = () => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const handleModalClose = () => {
    setSettingsOpen(false);
  };
  const handleCloseLogout = () => setLogoutOpen(false);
  return (
    <div className={css.vidget}>
      <button className={css.btnSettings} onClick={() => setSettingsOpen(true)}>
        <svg className={css.iconSettings}>
          <use href={`${newSprite}#icon-settings`} />
        </svg>
        Settings
      </button>
      <button className={css.btnSettings} onClick={() => setLogoutOpen(true)}>
      <svg className={css.iconSettings}>
          <use href={`${newSprite}#icon-log-out`} />
        </svg>
        Log out
      </button>
      <BaseModal
        isOpen={isSettingsOpen}
        onRequestClose={handleModalClose}
      >
        <UserSettingsModal close={handleModalClose} />
      </BaseModal>
      <BaseModal isOpen={isLogoutOpen} onRequestClose={handleCloseLogout}>
        <LogOutModal onClose={handleCloseLogout} />
      </BaseModal>
    </div>
  );
};

export default UserBarPopover;
