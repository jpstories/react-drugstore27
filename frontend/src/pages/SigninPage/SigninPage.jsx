import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signinAction } from '../../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux';

function SigninScreen(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, userInfo, error } = useSelector(state => state.userSignin);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signinAction(email, password));
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push('/')
    }
    return {

    }
  }, [userInfo])

  return <div className="form">
    <form onSubmit={submitHandler}>
      <ul className="form-container-signin">
        <li>
          <h2>Войти</h2>
        </li>
        {loading && <li>Загрузка...</li>}
        {error && <li>{error}</li>}
        <li>
          <label htmlFor="email">
            Электронная почта
          </label>
          <input
            value={email}
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="password">Пароль</label>
          <input
            value={password}
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </li>
        <li>
          <button type="submit" className="button primary">Войти</button>
        </li>
        <li>
          Впервые на сайте?
        </li>
        <li>
          <Link to="/register" className="button secondary text-center">Создать аккаунт</Link>
        </li>
      </ul>
    </form>
  </div>
}
export default SigninScreen;