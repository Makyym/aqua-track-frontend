import { useState } from 'react';
import css from './UserBarPopover.module.css';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal.jsx';
import LogOutModal from '../LogOutModal/LogOutModal.jsx';
import BaseModal from '../BaseModal/BaseModal.jsx';

const UserBarPopover = () => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const handleModalClose = () => {
    setSettingsOpen(false);
  };
  const handleCloseLogout = () => setLogoutOpen(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      borderRadius: '15px',
      border: 'none',
      outline: 'none',
      maxHeight: '90vh',
      'overflow-y': 'scroll',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };
  return (
    <div className={css.vidget}>
      <button className={css.btnSettings} onClick={() => setSettingsOpen(true)}>
        {/* <svg class="icon">
          <use href="../../images/sprite.svg#icon-chevron-down"></use>
        </svg> */}
        Settings
      </button>

      <button className={css.btnLogOut} onClick={() => setLogoutOpen(true)}>
        Log out
      </button>

      {/* {isLogoutOpen && <LogOutModal close={() => setLogoutOpen(false)} />} */}

      <BaseModal
        isOpen={isSettingsOpen}
        onRequestClose={handleModalClose}
        settingsStyle={customStyles}
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
