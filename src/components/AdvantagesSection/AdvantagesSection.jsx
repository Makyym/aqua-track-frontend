import css from "./AdvantagesSection.module.css"

const AdvantagesSection = () => {
    return (
        <div className={css.container}> 
        <img src="/public/img/woman@2x.jpg" alt="Woman drink" className={css.img} />

    <div className={css.benefits}>
    <div className={css.customers}>
        <div className={css.avatars}>
            <img src="/public/img/Male Memojis (3).jpg" alt="User1" className={css.avatar}/>
            <img src="/public/img/Male Memojis (2).jpg" alt="User2" className={css.avatar}/>
            <img src="/public/img/Male Memojis (1).jpg" alt="User3" className={css.avatar} />
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