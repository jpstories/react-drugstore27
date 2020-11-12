import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerAction } from '../../redux/actions/userAction';

function RegisterScreen(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const { loading, userInfo, error } = useSelector(state => state.userRegister);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerAction(name, email, password))
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push('/signin')
    }
  }, [userInfo])

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
          <input type="name" name="name" id="name" require="true" onChange={(e) => setName(e.target.value)} />
        </li>
        <li>
          <label htmlFor="email">
            Электронная почта
          </label>
          <input type="email" name="email" id="email" require="true" onChange={(e) => setEmail(e.target.value)} />
        </li>
        <li>
          <label htmlFor="password">Пароль</label>
          <input type="password" id="password" name="password" require="true" onChange={(e) => setPassword(e.target.value)} />
        </li>
        <li>
          <label htmlFor="rePassword">Повторите пароль</label>
          <input type="password" id="rePassword" name="rePassword" require="true" onChange={(e) => setRePassword(e.target.value)} />
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