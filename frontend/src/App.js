import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import userImage from './assets/img/user.png';
import arrow from './assets/img/drop-down-arrow_white.png';

import {
  OrdersPage, ProfilePage, HomePage, ProductPage,
  CartPage, RegisterPage, SigninPage, ProductsPage,
  ShippingPage,
  PlaceOrderPage,
  PaymentPage,
  OrderPage
} from './pages'

let trigger = false;

function App() {
  const headerRef = React.useRef();
  const adminOptionRef = React.useRef();
  const arrowOptionRef = React.useRef();

  const { userInfo } = useSelector(state => state.userSignin);

  React.useEffect(() => {
    window.addEventListener('scroll', updateHeaderBg);
    return () => {
      window.removeEventListener('scroll', updateHeaderBg);
    }
  }, [])

  const updateHeaderBg = () => {
    if (window.pageYOffset > 200) {
      headerRef.current.style.position = 'fixed';
      headerRef.current.style.height = '65px';
    }
    if (window.pageYOffset <= 120) {
      headerRef.current.style.position = 'static';
      headerRef.current.style.height = '75px';
    }
  }

  const handleAdminOption = () => {
    if (trigger === false) {
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
            <img
              className="brand__img"
              src="/images/logo.png"
              alt="logo"
            />
            <Link to="/">Аптека 27</Link>
          </div>

          <div className="header-links">
            <img width="30" src="/images/cart.png" alt="cart" />
            <Link className="header-links-cart" to="/cart">Корзина</Link>

            {userInfo ? (
              <div className="user-info">
                <span>Вы вошли как: </span>
                <div className="user-info__block">
                  <img src={userImage} alt="user" width="24" height="26" />
                  <Link to="/profile">{userInfo.name}</Link>
                </div>
              </div>

            ) : (
                <Link to="/signin">Войти</Link>
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
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/orders" component={OrdersPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/signin" component={SigninPage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/placeorder" component={PlaceOrderPage} />
            <Route path="/order/:id" component={OrderPage} />
          </div>
        </main>

        {/* <footer className="footer">
          <div className="footer-adress">Адрес: г.Хабаровск, Вороженская 49</div>
          <iframe title="Drugstore 27" src="https://yandex.ru/map-widget/v1/?um=constructor%3A8baa613d7f5dbf9a6bf06ba19caf93738a5ffd05efc009c0c52d09d8b2d6379c&amp;source=constructor" width="70%" height="400" frameborder="0"></iframe>
          <div className="copyright">Все права защищены</div>
        </footer> */}

      </div>
    </BrowserRouter>
  );
}

export default App;
