import { useState } from 'react';
import css from './UserBarPopover.module.css';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal.jsx';
import LogOutModal from '../LogOutModal/LogOutModal.jsx';
import BaseModal from '../BaseModal/BaseModal.jsx';

const UserBarPopover = () => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const handleModalClose = () => {
    setSettingsOpen(false)
  };

  return (
    <div className={css.vidget}>
      <button className={css.btnSettings} onClick={() => setSettingsOpen(true)}>
        Settings
      </button>
      <button className={css.btnLogOut} onClick={() => setLogoutOpen(true)}>
        Log out
      </button>
      <BaseModal isOpen={isSettingsOpen} onRequestClose={handleModalClose}>
        <UserSettingsModal close={handleModalClose}/>
      </BaseModal>
    </div>
  );
};

export default UserBarPopover;
