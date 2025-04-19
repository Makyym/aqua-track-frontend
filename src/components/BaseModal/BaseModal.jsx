import { useEffect } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import s from "./BaseModal.module.css";

const BaseModal = ({ isOpen, onRequestClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={s.modal}
    closeTimeoutMS={300}
    overlayClassName={s.overlay}>
      {children}
    </Modal>
  );
};

export default BaseModal;