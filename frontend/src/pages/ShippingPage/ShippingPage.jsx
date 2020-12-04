import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StepLine from '../../components/StepLine';
import { shippingCart } from '../../redux/actions/cartAction';

function ShippingPage(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(shippingCart({ address, city, postalCode, country }));
    props.history.push('payment');
  }

  return <div className="shipping-page">
    <StepLine step1 />
    <div className="form shipping-content-h">
      <form onSubmit={submitHandler} className="form-shipping">
        <ul className="form-container">
          <li>
            <h2>Доставка</h2>
          </li>

          <li>
            <label htmlFor="address">
              Адрес
          </label>
            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              Город
          </label>
            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Индекс
          </label>
            <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Страна
          </label>
            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
            </input>
          </li>

          <li>
            <button type="submit" className="button primary">Продолжить</button>
          </li>

        </ul>
      </form>
    </div>
  </div>
}
export default ShippingPage;