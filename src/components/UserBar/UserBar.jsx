import { useEffect, useRef, useState } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover.jsx';
import newSprite from '../../assets/newSprite.svg';
import css from './UserBar.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';
import clsx from 'clsx';

const UserBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectUser);
  const {name, email, avatarUrl} = user;
  let shortEmail = email.split('@')[0];
  if (shortEmail.length > 8) {
      shortEmail = `${shortEmail.slice(0, 6)}...`;
  }
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
        {name ?? shortEmail}
        <img
          src={avatarUrl}
          alt="avatar"
          className={css.avatar}
        />
        <svg className={isOpen ? clsx(css.btnIcon, css.iconActive) : css.btnIcon}>
          <use href={`${newSprite}#icon-chevron-down`} />
        </svg>
      </button>
      {isOpen && <UserBarPopover closePopover={() => setIsOpen(false)} />}
    </div>
  );
};

export default UserBar;
