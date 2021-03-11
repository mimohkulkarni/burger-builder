import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label:'Cheese', type:'cheese' },
    { label:'Meat', type:'meat' },
    { label:'Bacon', type:'bacon' },
    { label:'Salad', type:'salad' }
]

const buildControls = props => {
    return(
        <div className={classes.BuildControls}>
            <p>Current Price <strong>₹{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl =>(
                <BuildControl 
                    key={ctrl.label}
                    label={ctrl.label} 
                    added={() => props.added(ctrl.type)}
                    removed={() => props.removed(ctrl.type)}
                    disable={props.disable[ctrl.type]} />
            ))}
            <button className={classes.OrderButton} onClick={props.purchasing} disabled={!props.purchasable}>Order Now</button>
        </div>
    );
}

export default buildControls;