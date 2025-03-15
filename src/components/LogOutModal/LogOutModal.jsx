import { useSelector } from 'react-redux';
import BtnLogout from '../BtnLogout/BtnLogout.jsx';
import css from './LogOutModal.module.css';
import { selectIsLoading } from '../../redux/auth/selectors.js';
import LoaderComponent from '../LoaderComponent/LoaderComponent.jsx';

const LogOutModal = ({ onClose }) => {
  const isLoading = useSelector(selectIsLoading);
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={css.modal}>
      <button type="button" onClick={handleClose} className={css.closeBtn}>
        <svg
          className={css.svg}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="#2F2F2F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="#2F2F2F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{' '}
        </svg>
      </button>
      <div className={css.modalTextBox}>
        <h2 className={css.modalTitle}>Log out</h2>
        <p className={css.modalText}>Do you really want to leave?</p>
      </div>
      <div className={css.modalBtnBox}>
        {isLoading ? (
          <LoaderComponent height={80} width={80} />
        ) : (
          <>
            <BtnLogout handleClose={handleClose} />
            <button
              type="button"
              onClick={handleClose}
              className={css.btnCancel}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LogOutModal;
