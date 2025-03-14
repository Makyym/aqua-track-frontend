import Logo from "../Logo/Logo.jsx"
import { Link } from "react-router-dom"
import css from "./WelcomeSection.module.css"
import GoogleLogo from "../GoogleLogo/GoogleLogo.jsx"

const WelcomeSection = () => {
    return (
        <div className={css.container}>
            <Logo />
            <section className={css.section}> 

            <p className={css.text}>Record daily water intake and track</p>
            <h1 className={css.title}>Water consumption tracker</h1>
            <div className={css.link}>
                <Link className={css.signup} to='/signup'>Try tracker</Link>
                <Link className={css.signin} to='/signin'>Sign In</Link>
                <GoogleLogo />
            </div>
            </section>
        </div>

    )
}

export default WelcomeSection