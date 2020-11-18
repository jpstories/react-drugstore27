import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import StepLine from '../../components/StepLine';
import { paymentCart } from '../../redux/actions/cartAction';

function PaymentPage(props) {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(paymentCart({ paymentMethod }));
    props.history.push('placeorder');
  };

  return (
    <div>
      <StepLine step1 step2 step3 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Оплата</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paypal"
                  value="Оплата картой курьеру"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label>Оплата картой курьеру</label>
              </div>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="yandexmoney"
                  value="Яндекс.Деньги"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label>Яндекс.Деньги</label>
              </div>
            </li>

            <li>
              <button type="submit" className="button primary">
                Продолжить
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default PaymentPage;
