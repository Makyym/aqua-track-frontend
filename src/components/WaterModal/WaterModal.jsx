import { useSelector } from 'react-redux';
import WaterForm from '../WaterForm/WaterForm.jsx';
import { selectIsLoading } from '../../redux/auth/selectors.js';

import css from './WaterModal.module.css';
const WaterModal = ({ addWaterEntry, editWaterEntry, onClose }) => {
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
      {addWaterEntry ? (
        <h2 className={css.title}>Add water</h2>
      ) : (
        <h2 className={css.title}>Edit the entered amount of water</h2>
      )}
      {addWaterEntry ? (
        <h3 className={css.subtitle}>Choose value:</h3>
      ) : (
        <h3 className={css.subtitle}>Correct entered data:</h3>
      )}
      <WaterForm />
    </div>
  );
};

export default WaterModal;
