// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const GoogleAuthPage = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Отримуємо параметри з URL
//         const queryParams = new URLSearchParams(window.location.search);
//         const token = queryParams.get('token');

//         if (token) {
//         console.log('Отриманий token:', token);
//         // Зберігаємо токен (тут використовується localStorage, але можна використовувати й інше рішення)
//         localStorage.setItem('authToken', token);

//         // Якщо працюєте з глобальним станом, наприклад, за допомогою Redux,
//         // тут можна диспатчити action, що зберігає токен та оновлює стан авторизації.

//         // Після збереження токена редиректимо на захищену сторінку
//         navigate('/tracker');
//         } else {
//         console.error('Token не знайдено!');
//         // Якщо токен відсутній, можна відправити користувача на сторінку логіну
//         navigate('/login');
//         }
//     }, [navigate]);

//     return (
//         <div>
//         <h2>Обробка авторизації...</h2>
//         </div>
//     );
// };

// export default GoogleAuthPage;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      console.log('Отриманий token:', token);

      // Якщо бекенд не використовує httpOnly cookies, тоді зберігаємо токен локально
      document.cookie = `authToken=${token}; path=/; secure; samesite=strict`;

      // Після авторизації редиректимо на захищену сторінку
      navigate('/tracker');
    } else {
      console.error('Token не знайдено!');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Обробка авторизації...</h2>
    </div>
  );
};

export default GoogleAuthPage;
