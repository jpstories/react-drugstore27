import React from 'react';
import { Link } from 'react-router-dom';

function RegisterScreen(props) {

  const submitHandler = () => { }

  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Создать аккаунт</h2>
        </li>
        <li>
          <label htmlFor="name">
            Имя
          </label>
          <input type="name" name="name" id="name" require="true" />
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
          <label htmlFor="rePassword">Повторите пароль</label>
          <input type="password" id="rePassword" name="rePassword" require="true" />
        </li>
        <li>
          <button type="submit" className="button primary">Зарегистрироваться</button>
        </li>
        <li>
          Уже есть аккаунт?
          <Link to="/" className="button secondary text-center">Войти</Link>
        </li>
      </ul>
    </form>
  </div>
}

export default RegisterScreen;