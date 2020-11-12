import React from 'react';
import { Link } from 'react-router-dom';

function SigninScreen(props) {

  const submitHandler = () => { }

  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Войти</h2>
        </li>
        <li>
          <label htmlFor="email">
            Электронная почта
          </label>
          <input type="email" name="email" id="email" require="true" />
        </li>
        <li>
          <label htmlFor="password">Пароль</label>
          <input type="password" id="password" name="password" require="true" />
        </li>
        <li>
          <button type="submit" className="button primary">Войти</button>
        </li>
        <li>
          Впервые на сайте?
        </li>
        <li>
          <Link to="/" className="button secondary text-center">Создать аккаунт</Link>
        </li>
      </ul>
    </form>
  </div>
}
export default SigninScreen;