import React from 'react'
function StepLine(props) {
    return <div className="checkout-steps">
        <div className={props.step1 ? 'active' : ''}>Личный кабинет</div>
        <div className={props.step2 ? 'active' : ''}>Адрес доставки</div>
        <div className={props.step3 ? 'active' : ''}>Оплата</div>
        <div className={props.step4 ? 'active' : ''}>Потверждение заказа</div>
    </div>
}

export default StepLine;