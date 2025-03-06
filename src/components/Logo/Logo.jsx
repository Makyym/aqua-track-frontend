import { Link } from 'react-router-dom';
import s from './Logo.module.css';
const Logo = () => {
  return (
    <Link to="/" className={s.logo}>
      AQUATRACK
    </Link>
  );
};

export default Logo;
