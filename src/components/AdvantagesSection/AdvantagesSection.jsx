import css from "./AdvantagesSection.module.css"

const AdvantagesSection = () => {
    return (
        <div className={css.container}> 
       <picture>
        <source 
        media="(min-width: 1440px)"
        srcSet="
        /img/womanDesk.jpg 1x
        /img/womanDesk@2x.jpg 2x" 
        type="image/jpeg"/>

<source 
        media="(min-width: 768px)"
        srcSet="/img/womanTabl.jpg 1x,
        /img/womanTabl@2x.jpg 2x" 
        type="image/jpeg"/>

<source 
        media="(max-width: 767px)"
        srcSet="/img/womanMobl.jpg 1x,
         /img/womanMobl@2x.jpg 2x" 
        type="image/jpeg"/>

        <img src="/img/womanDesk.jpg" alt="Woman drink"  className={css.img}/>

       </picture>

    <div className={css.benefits}>
    <div className={css.customers}>
        <div className={css.avatars}>
            <img src="/img/user-1 desk.jpg" alt="User1" className={css.avatar}/>
            <img src="/img/user-2 desk.jpg" alt="User2" className={css.avatar}/>
            <img src="/img/user-3 desk.jpg" alt="User3" className={css.avatar} />
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