import Logo from '../../components/Logo/Logo.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import s from './SingUpPage.module.css';
const SignUpPage = () => {
  return (
    <div className={s.signUpPage_Container}>
      <SignUpForm />
      <div>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignUpPage;
