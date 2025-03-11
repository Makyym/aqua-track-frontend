import css from "./AdvantagesSection.module.css";
import womenTabl from "../../images/img/womenTabl.jpg";
import womenTabl2x from "../../images/img/womenTabl@2x.jpg";
import womanDesk from "../../images/img/womanDesk.jpg";
import womanDesk2x from "../../images/img/womanDesk@2x.jpg";
import womanMobl from "../../images/img/womanMobl.jpg";
import womanMobl2x from "../../images/img/womanMobl@2x.jpg";
import user_1 from "../../images/img/user_1.png";
import user_2 from "../../images/img/user_2.png";
import user_3 from "../../images/img/user_3.png"

const AdvantagesSection = () => {
    return (
        <div className={css.container}>
            {/* <picture>
            <source 
            media="(min-width: 1440px)"
            srcSet={`${womanDesk} 1x, ${womanDesk2x} 2x`}
            type="image/jpeg"
            />
            <source
            media="(min-width: 768px)"
            srcSet={`${womenTabl} 1x, ${womenTabl2x} 2x`}
            type="image/jpeg"
            />
            <source 
            media="(max-width: 767px)"
            srcSet={`${womanMobl} 1x, ${womanMobl2x} 2x`}
            type="image/jpeg"
            />
            <img src={womanDesk} alt="Woman drink"  className={css.img}/>
        </picture> */}
    {/* <div className={css.benefits}> */}
    <div className={css.customers}>
        <div className={css.avatars}>
            <img className={css.avatar1} src={`${user_1}`} alt="user_1" />
            <img src={`${user_2}`} alt="User2" className={css.avatar2}/>
            <img src={`${user_3}`} alt="User3" className={css.avatar3} />
        </div>
        <p ><span >Our <b className={css.span}>happy </b></span> customers</p>
    </div>
    <div className={css.buttons}>
        <button className={css.habit}>Habit drive</button>
        <button className={css.stats}>View statistics</button>
        <button className={css.personal}>Personal rate setting</button>
    </div>
    {/* </div> */}
    </div>
    )
}

export default AdvantagesSection