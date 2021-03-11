import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    constructor(props) {
        super(props);
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of queryParams.entries()){
            if(param[0] === 'price')
                price = param[1]
            else
                ingredients[param[0]] = +param[1];
        }
        // console.log(ingredients);
        this.state = {ingredients: ingredients, price: price};
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummery ingredients={this.state.ingredients}
                        cancelCheckout={this.cancelCheckoutHandler}
                        continueCheckout={this.continueCheckoutHandler} />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (
                            <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} /> )} />
            </div>
        );
    }
}

export default Checkout;