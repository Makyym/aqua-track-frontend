import { useSelector } from 'react-redux';
import BtnLogout from '../BtnLogout/BtnLogout.jsx';
import css from './LogOutModal.module.css';
import { selectIsLoading } from '../../redux/auth/selectors.js';
import LoaderComponent from '../LoaderComponent/LoaderComponent.jsx';
import sprite from '../../assets/newSprite.svg';

const LogOutModal = ({ onClose }) => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={css.modal}>
      <button type="button" onClick={onClose} className={css.closeBtn}>
        <svg className={css.svg}>
          <use href={`${sprite}#icon-close-cross`} />
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
            <BtnLogout handleClose={onClose} />
            <button type="button" onClick={onClose} className={css.btnCancel}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LogOutModal;
