import React from 'react';

import './App.css';

import userImage from './assets/img/user.png';
import dropDownArrowWhite from './assets/img/drop-down-arrow_white.png';

function App() {

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  const userInfo = {
    name: 'Сергей',
    image: userImage,
    isAdmin: true
  }

  return (
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>&#9776;</button>
          <a href="/">Аптека 27</a>
        </div>
        <div className="header-links">
          <a href="cart.html">Корзина</a>
          {userInfo ? (
            <div className="user-info">
              <span>Вы вошли как: </span>
              <div className="user-info__block">
                <img src={userInfo.image} alt="user" width="24" height="26" />
                <a href="/profile">{userInfo.name}</a>
              </div>
            </div>
          ) : (
              <a href="/signin">Войти</a>
            )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <div className="dropdown-admin">
                <mark><a className="admin-link" href="#">Администратор</a></mark>
                <img src={dropDownArrowWhite} alt="arrow" width="24" height="24" />
                <ul className="dropdown-content">
                  <li className="dropdown-content_a">
                    <a href="/orders">Заказы</a>
                    <a href="/products">Товары</a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
      <aside className="sidebar">
        <h3>Категории</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>
          x
          </button>
        <ul className="categories">
          <li>
            <a href="/category/Pants">От головы</a>
          </li>

          <li>
            <a href="/category/Shirts">От живота</a>
          </li>
        </ul>
      </aside>
      <main className="main">
      </main>
      <footer className="footer">
        <div className="footer-adress">Адрес: г.Хабаровск, Вороженская 49</div>
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A8baa613d7f5dbf9a6bf06ba19caf93738a5ffd05efc009c0c52d09d8b2d6379c&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
        <div className="copyright">Все права защищены</div>
      </footer>
    </div>
  );
}

export default App;
