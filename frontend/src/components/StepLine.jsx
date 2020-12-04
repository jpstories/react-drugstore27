import React from 'react';
import './StepLine.css';

function StepLine(props) {
    // return <div className="checkout-steps">
    //     <div className={props.step1 ? 'active' : ''}>Личный кабинет</div>
    //     <div className={props.step2 ? 'active' : ''}>Адрес доставки</div>
    //     <div className={props.step3 ? 'active' : ''}>Оплата</div>
    //     <div className={props.step4 ? 'active' : ''}>Потверждение заказа</div>
    // </div>
    return <div class="checkout-steps">
        <ul class="progressbar">
            <li className={props.step1 ? 'active' : ''}>Личный кабинет</li>
            <li className={props.step2 ? 'active' : ''}>Адрес доставки</li>
            <li className={props.step3 ? 'active' : ''}>Способ оплаты</li>
            <li className={props.step4 ? 'active' : ''}>Потверждение заказа</li>
        </ul>
    </div>
}

export default StepLine;