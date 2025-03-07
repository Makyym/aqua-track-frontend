import { useState } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover.jsx';
import css from './UserBar.module.css';
const UserBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.relativeHeader}>
      <h1 className={css.hello}>Hello<span className={css.userName}>, UserName</span></h1>
      <button type="button" onClick={toggleMenu} className={css.btnHeader}>
        Nadia
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className={css.avatar}
        />
        <span className={css.btnIcon}>▼</span>
      </button>

      {isOpen && <UserBarPopover />}
    </div>
  );
};

export default UserBar;
