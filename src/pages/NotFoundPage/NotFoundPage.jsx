import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './NotFoundPage.module.css'
import page from "../../images/img/not-found-page-4x.png";

const watch = {
    visible: true,
    height: '36px',
    width: '36px',
    radius: '48',
    color: 'var(--main-white)',
    ariaLabel: 'watch-loading',
    wrapperStyle: {},
    wrapperClass: '',
};

const NotFoundPage = () => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(10);
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCount => prevCount - 1);
        }, 1000);
        if (counter === 0) {
            navigate('/');
        }
        return () => {
            clearInterval(interval);
        };
    }, [navigate, counter]);
    return (
        <div className={s.wrapper}>
            <div className={s.div}>
                <h2>Ooops...</h2>
                <h3>Page not found</h3>
                <p className={s.text}>
                    Sorry, but it looks like this page doesn't exist.<br />
                    You will be redirected to the homepage in...
                </p>
                <div className={s.counter}>
                    <p>{counter} seconds </p>
                </div>
            </div>
            <img src={page} alt="page in clouds" />
        </div>);
};

export default NotFoundPage