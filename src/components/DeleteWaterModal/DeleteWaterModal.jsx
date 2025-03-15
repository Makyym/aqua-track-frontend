import css from './DeleteWaterModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWaterEntry } from '../../redux/water/operations.js';
import sprite from '../../assets/newSprite.svg';
import BtnDelete from '../BtnDelete/BtnDelete.jsx';
import LoaderComponent from '../LoaderComponent/LoaderComponent.jsx';
import { selectIsLoading } from '../../redux/water/selectors.js';

const DeleteWaterModal = ({ waterId, onClose }) => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteWaterEntry(waterId))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Delete failed", error);
      });
  };  

  return (
    <div className={css.modal}>
      <button type="button" onClick={onClose} className={css.closeBtn}>
        <svg className={css.svg}>
          <use href={`${sprite}#icon-close-cross`} />
        </svg>
      </button>
      <div className={css.modalTextBox}>
        <h2 className={css.modalTitle}>Delete entry</h2>
        <p className={css.modalText}>
          Are you sure you want to delete the entry?
        </p>
      </div>
      <div className={css.modalBtnBox}>
        {isLoading ? (
          <LoaderComponent height={80} width={80} />
        ) : (
          <>
            <BtnDelete handleDelete={handleDelete} waterId={waterId} />
            <button type="button" onClick={onClose} className={css.btnCancel}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteWaterModal;
