import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';
import css from './UserSettingsModal.module.css';
import { useState } from 'react';

const UserSettingsModal = ({ close }) => {
  const [gender, setGender] = useState('woman');
  const [name, setName] = useState('Nadia');
  const [email, setEmail] = useState('nadialo@gmail.com');
  const [weight, setWeight] = useState('');
  const [activeTime, setActiveTime] = useState('');
  const [waterIntake, setWaterIntake] = useState(1.8);

  const calculateWaterNorm = () => {
    const W = parseFloat(weight) || 0;
    const T = parseFloat(activeTime) || 0;
    const V = gender === 'woman' ? W * 0.03 + T * 0.4 : W * 0.04 + T * 0.6;
    setWaterIntake(V.toFixed(1));
  };

  return (
    <div>
      <h2>Setting</h2>
      <button type="button" onClick={close}>svg</button>
      <UserSettingsForm />
    </div>
    // <div className={css.modalOverlay} onClick={close}>
    //   <div className={css.modal} onClick={e => e.stopPropagation()}>
    //     <h2>Setting</h2>
    //     <button className={css.closeButton} onClick={close}>
    //       ✖
    //     </button>

    //     <div className={css.profile}>
    //       <img
    //         src="https://i.pravatar.cc/80"
    //         alt="User Avatar"
    //         className={css.avatar}
    //       />
    //       <button className={css.uploadButton}>📤 Upload a photo</button>
    //     </div>

    //     <div className={css.formGroup}>
    //       <label>Your gender identity</label>
    //       <div className={css.radioGroup}>
    //         <label>
    //           <input
    //             type="radio"
    //             name="gender"
    //             value="woman"
    //             checked={gender === 'woman'}
    //             onChange={() => setGender('woman')}
    //           />
    //           Woman
    //         </label>
    //         <label>
    //           <input
    //             type="radio"
    //             name="gender"
    //             value="man"
    //             checked={gender === 'man'}
    //             onChange={() => setGender('man')}
    //           />
    //           Man
    //         </label>
    //       </div>
    //     </div>

    //     <div className={css.formRow}>
    //       <div className={css.inputGroup}>
    //         <label>Your name</label>
    //         <input
    //           type="text"
    //           value={name}
    //           onChange={e => setName(e.target.value)}
    //         />
    //       </div>
    //       <div className={css.inputGroup}>
    //         <label>Email</label>
    //         <input
    //           type="email"
    //           value={email}
    //           onChange={e => setEmail(e.target.value)}
    //         />
    //       </div>
    //     </div>

    //     <div className={css.normaBox}>
    //       <p>
    //         <strong>My daily norma</strong>
    //       </p>
    //       <p>
    //         For woman: <code>V=(W*0.03) + (T*0.4)</code>
    //       </p>
    //       <p>
    //         For man: <code>V=(W*0.04) + (T*0.6)</code>
    //       </p>
    //     </div>

    //     <div className={css.formRow}>
    //       <div className={css.inputGroup}>
    //         <label>Your weight in kilograms:</label>
    //         <input
    //           type="number"
    //           value={weight}
    //           onChange={e => setWeight(e.target.value)}
    //         />
    //       </div>
    //       <div className={css.inputGroup}>
    //         <label>The time of active participation in sports:</label>
    //         <input
    //           type="number"
    //           value={activeTime}
    //           onChange={e => setActiveTime(e.target.value)}
    //         />
    //       </div>
    //     </div>

    //     <p>
    //       The required amount of water per day: <strong>{waterIntake} L</strong>
    //     </p>

    //     <div className={css.inputGroup}>
    //       <label>Write down how much water you will drink:</label>
    //       <input type="number" value={waterIntake} readOnly />
    //     </div>

    //     <button className={css.saveButton} onClick={calculateWaterNorm}>
    //       Save
    //     </button>
    //   </div>
    // </div>
  );
};

export default UserSettingsModal;
