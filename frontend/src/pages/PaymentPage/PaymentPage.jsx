import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import StepLine from '../../components/StepLine';
import { paymentCart } from '../../redux/actions/cartAction';
import { Radio } from 'antd';

function PaymentPage(props) {
  const [paymentMethod, setPaymentMethod] = useState('Оплата картой курьеру');
  const dispatch = useDispatch();

  const handleClickMethod = e => {
    setPaymentMethod(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(paymentCart({ paymentMethod }));
    props.history.push('placeorder');
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <div>
      <StepLine step1 step2 step3 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <div className="form-container">
            <h2>Оплата</h2>
            <Radio.Group onChange={handleClickMethod} value={paymentMethod}>
              <Radio style={radioStyle} value='Оплата картой курьеру'>Оплата картой курьеру</Radio>
              <Radio style={radioStyle} value='Оплата наличными курьеру'>Оплата наличными курьеру</Radio>
              <Radio style={radioStyle} value='Яндекс.Деньги'>Яндекс.Деньги</Radio>
              <Radio style={radioStyle} value='PayPal'>PayPal</Radio>
            </Radio.Group>
            <button type="submit" className="button primary">
              Продолжить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default PaymentPage;
