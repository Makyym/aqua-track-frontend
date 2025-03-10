import { useDispatch } from 'react-redux';
import css from './BtnLogout.module.css';
import { logout } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';

const BtnLogout = ({ handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then(({ error }) => {
      if (!error) {
        navigate('/');
        handleClose();
      }
    });
  };

  return (
    <>
      <button type="button" onClick={handleLogout} className={css.btnLogout}>
        Log out
      </button>
    </>
  );
};

export default BtnLogout;
