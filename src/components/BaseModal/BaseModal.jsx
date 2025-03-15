import { useEffect } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

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
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const BaseModal = ({ isOpen, onRequestClose, children, settingsStyle }) => {
  const modalStyles = settingsStyle ?? customStyles;
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
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyles}>
      {children}
    </Modal>
  );
};

export default BaseModal;
