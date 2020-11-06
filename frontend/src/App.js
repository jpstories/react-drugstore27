import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// import './App.css';

import userImage from './assets/img/user.png';
import arrow from './assets/img/drop-down-arrow_white.png';
import { OrdersPage, ProfilePage, HomePage, ProductPage } from './pages'

const userInfo = {
  name: 'Сергей',
  image: userImage,
  isAdmin: true
}

let trigger = false;

function App() {
  const headerRef = React.useRef();
  const adminOptionRef = React.useRef();
  const arrowOptionRef = React.useRef();

  React.useEffect(() => {
    window.addEventListener('scroll', updateHeaderBg);
    return () => {
      window.removeEventListener('scroll', updateHeaderBg);
    }
  }, [])

  const updateHeaderBg = () => {
    console.log(headerRef.current)
    if(window.pageYOffset > 200) {
      headerRef.current.style.position = 'fixed';
    }
    if(window.pageYOffset <= 100) {
      headerRef.current.style.position = 'static';
    }
  }

  const handleAdminOption = () => {
    if ( trigger === false) {
      adminOptionRef.current.style.display = 'flex';
      arrowOptionRef.current.style.transform = 'rotateZ(180deg)';
      trigger = true;
    } else {
      adminOptionRef.current.style.display = 'none';
      arrowOptionRef.current.style.transform = '';
      trigger = false;
    }
  }

  return (
    <BrowserRouter>
      <div className="grid-container">

        <header className="header" ref={headerRef}>

          <div className="brand">
            <Link to="/">Аптека 27</Link>
          </div>

          <div className="header-links">
            <Link to="/">Корзина</Link>
            {userInfo ? (
              <div className="user-info">
                <span>Вы вошли как: </span>
                <div className="user-info__block">
                  <img src={userInfo.image} alt="user" width="24" height="26" />
                  <Link to="/profile">{userInfo.name}</Link>
                </div>
              </div>
            ) : (
                <Link to="/">Войти</Link>
              )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">

                <div className="dropdown-admin">
                  <div className="admin-link" onClick={handleAdminOption}>
                    <span>Администратор</span>
                    <img src={arrow} alt="arrow" width="24" height="24" ref={arrowOptionRef} />
                  </div>

                  <ul className="dropdown-content" ref={adminOptionRef}>
                    <li className="dropdown-content_a">
                      <Link to="/orders">Заказы</Link>
                      <Link to="/products">Товары</Link>
                    </li>
                  </ul>
                </div>

              </div>
            )}
          </div>
        </header>

        <main className="main">
          <div className="content">
              <Route path="/" exact={true} component={() => (
                  <HomePage />)}> 
              </Route>
              <Route path="/profile" component={ProfilePage} />
              <Route path="/orders" component={OrdersPage} />
              <Route path="/product/:id" component={ProductPage} />
          </div>
        </main>

        {/* <footer className="footer">
          <div className="footer-adress">Адрес: г.Хабаровск, Вороженская 49</div>
          <iframe title="Drugstore 27" src="https://yandex.ru/map-widget/v1/?um=constructor%3A8baa613d7f5dbf9a6bf06ba19caf93738a5ffd05efc009c0c52d09d8b2d6379c&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
          <div className="copyright">Все права защищены</div>
        </footer> */}

      </div>
    </BrowserRouter>
  );
}

export default App;
