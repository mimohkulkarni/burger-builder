import React from 'react';

import classes from './Order.css';

const order = props => {
    // console.log(props);
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const outputIngredients = ingredients.map(ig =>{
        return <span key={ig.name} className={classes.OrderSpan}>{ig.name} ({ig.amount})</span>
    });

    // console.log(ingredients)

    return(
        <div className={classes.Order}>
            <p>Ingredients: {outputIngredients}</p>
            <p>Total Price <strong>₹ {props.price}</strong></p>
        </div>
    );
}

export default order;