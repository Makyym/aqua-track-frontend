import { useEffect, useRef, useState } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover.jsx';
import css from './UserBar.module.css';
const UserBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [userName, setUserName] = useState('');
  const userBarRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (userBarRef.current && !userBarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={css.relativeHeader}>
      <button type="button" onClick={toggleMenu} className={css.btnHeader}>
        Nadia
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className={css.avatar}
        />
        <span className={css.btnIcon}>▼</span>
      </button>
      {isOpen && <UserBarPopover closePopover={() => setIsOpen(false)} />}
    </div>
  );
};

export default UserBar;
