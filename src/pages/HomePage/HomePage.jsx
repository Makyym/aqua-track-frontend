import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx"
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection.jsx"
import css from "./HomePage.module.css"

const HomePage = () => {
    return (
        <div className={css.homePage}>
            <WelcomeSection />
            <AdvantagesSection />
        </div>
    )
}

export default HomePage