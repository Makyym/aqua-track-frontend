import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';
import css from './UserSettingsModal.module.css';

import newSprite from '../../assets/newSprite.svg';
const UserSettingsModal = ({ close }) => {
  const calculateWaterNorm = () => {
    const W = parseFloat(weight) || 0;
    const T = parseFloat(activeTime) || 0;
    const V = gender === 'woman' ? W * 0.03 + T * 0.4 : W * 0.04 + T * 0.6;
    setWaterIntake(V.toFixed(1));
  };

  return (
    <div className={css.modalSettings}>
      <div className={css.upload}>
        <h2 className={css.modalTitle}>Setting</h2>
        <button onClick={close} className={css.closeButton}>
          <svg>
            <use
              href={`${newSprite}#icon-close-cross`}
              width={28}
              height={28}
            />
          </svg>
        </button>
      </div>

      <UserSettingsForm onSuccessSubmit={close} />
    </div>
  );
};

export default UserSettingsModal;
