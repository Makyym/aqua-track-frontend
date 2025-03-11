import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { signIn } from '../../redux/auth/operations.js';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import SignInForm from '../../components/SignInForm/SignInForm.jsx';
import s from "./SignInPage.module.css"

const SignInPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async values => {
    try {
      await dispatch(signIn(values)).unwrap();
      toast.success('Login successful!');
    } catch (error) {
      toast.error(`Login failed: ${error.message || error}`);
    }
  };

  return (
    <>
      <div className={s.wrapper}>
        <SignInForm title="Sign In" onSubmit={handleSubmit} />
        <div className={s.AdvantagesSection}>        
          <AdvantagesSection />
        </div>
      </div>
    </>
  );
};

export default SignInPage;
