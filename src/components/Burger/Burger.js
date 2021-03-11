import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {

    let transformIngredients = Object.keys(props.ingredients).map(igKey =>{
                        return [...Array(props.ingredients[igKey])].map((_,index) => {
                            return <BurgerIngredient type={igKey} key={igKey + index} />
                        });
                    }).reduce((arr,cArr) => {
                        return arr.concat(cArr);
                    } ,[]);
    // console.log(transformIngredients);

    transformIngredients = transformIngredients.length === 0 ? <p>Please start adding ingredients!</p> : transformIngredients;

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )

}

export default burger;