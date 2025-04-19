import { useState } from 'react';
import css from './UserBarPopover.module.css';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal.jsx';
import LogOutModal from '../LogOutModal/LogOutModal.jsx';
import BaseModal from '../BaseModal/BaseModal.jsx';
import newSprite from '../../assets/newSprite.svg';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: -10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const UserBarPopover = ({isVisible, closePopover}) => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const handleModalClose = () => {
    setSettingsOpen(false);
    closePopover();
  };
  const handleCloseLogout = () => {
    setLogoutOpen(false);
    closePopover();
  };
  return (
    <AnimatePresence>
      {isVisible && (<motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ willChange: "transform, opacity" }}
      className={css.vidget}>
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
      </motion.div>)}
    </AnimatePresence>
  );
};

export default UserBarPopover;
