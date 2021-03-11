import React from 'react';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummery = props => {

    const ingredientSummary = Object.keys(props.ingredients).map(igKey =>{
            return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span> {props.ingredients[igKey]}</li>
        });

    return(
    <Auxillary>
        <span style={{
            right: '0',
            top: '0',
            marginRight:'10px',
            width:'20px',
            position:'absolute',
            fontSize:'20px',
            cursor: 'pointer'
        }} onClick={props.closeModal}>&times;</span>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Price : ₹{props.price}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' click={props.closeModal} >Cancel</Button>
        <Button btnType='Success' click={props.purchase} >Continue</Button>
    </Auxillary>
    );
}

export default orderSummery;