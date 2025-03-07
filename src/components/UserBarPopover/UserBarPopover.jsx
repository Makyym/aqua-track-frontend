import { useState } from 'react';
import css from './UserBarPopover.module.css';

const UserBarPopover = () => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLogoutOpen, setLogoutOpen] = useState(false);

  return (
    <div className={css.vidget}>
      <button className={css.btnSettings} onClick={() => setSettingsOpen(true)}>
        Settings
      </button>
      <button className={css.btnLogOut} onClick={() => setLogoutOpen(true)}>
        Log out
      </button>
      {isSettingsOpen && (
        <UserSettingsModal close={() => setSettingsOpen(false)} />
      )}
      {isLogoutOpen && <LogOutModal close={() => setLogoutOpen(false)} />}
    </div>
  );
};

export default UserBarPopover;
