import { useSelector } from 'react-redux';
import WaterForm from '../WaterForm/WaterForm.jsx';
import { selectIsLoading } from '../../redux/auth/selectors.js';
import newSprite from '../../assets/newSprite.svg';
import css from './WaterModal.module.css';
const WaterModal = ({ addWaterEntry, onClose, date, cardId }) => {
  const isLoading = useSelector(selectIsLoading);
  const handleClose = () => {
    onClose();
  };
  return (
    <div className={css.modal}>
      <button type="button" onClick={handleClose} className={css.closeBtn}>
        <svg className={css.svg} width={40} height={40}>
          <use href={`${newSprite}#icon-close-cross`} />
        </svg>
      </button>
      {addWaterEntry ? (
        <h2 className={css.title}>Add water</h2>
      ) : (
        <h2 className={css.title}>
          Edit the entered amount <br /> of water
        </h2>
      )}
      {addWaterEntry ? (
        <h3 className={css.subtitle}>Choose value:</h3>
      ) : (
        <h3 className={css.subtitle}>Correct entered data:</h3>
      )}
      <WaterForm onClose={handleClose} dateString={date} waterId={cardId} />
    </div>
  );
};

export default WaterModal;
