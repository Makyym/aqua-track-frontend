import css from "./AdvantagesSection.module.css"

const AdvantagesSection = () => {
    return (
        <div className={css.container}> 
        <picture>
        <source 
        media="(min-width: 1440px)"
        srcSet="/src/images/img/womanDesk.jpg 1x,
        /src/images/img/womanDesk@2x.jpg
        2x" 
        type="image/jpeg"/>

<source 
        media="(min-width: 768px)"
        srcSet="/src/images/img/womenTabl.jpg 1x, /src/images/img/womenTabl@2x.jpg 2x" 
        type="image/jpeg"/>

<source 
        media="(max-width: 767px)"
        srcSet="/src/images/img/womanMobl.jpg 1x, 
        /src/images/img/womanMobl@2x.jpg 2x" 
        type="image/jpeg"/>

        <img src="/src/images/img/womanDesk.jpg" alt="Woman drink"  className={css.img}/>

       </picture>

    <div className={css.benefits}>
    <div className={css.customers}>
        <div className={css.avatars}>
            <img src="/src/images/img/user-1 tabl.jpg" alt="User1" className={css.avatar1}/>
            <img src="/src/images/img/user-2 tabl.jpg" alt="User2" className={css.avatar2}/>
            <img src="/src/images/img/user-3 tabl.jpg" alt="User3" className={css.avatar3} />
        </div>
        <p ><span >Our <b className={css.span}>happy </b></span> customers</p>
    </div>
    <div className={css.buttons}>
        <button className={css.habit}>Habit drive</button>
        <button className={css.stats}>View statistics</button>
        <button className={css.personal}>Personal rate setting</button>
    </div>
    </div>
    </div>
    )
}

export default AdvantagesSection