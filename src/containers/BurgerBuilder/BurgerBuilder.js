import React, {Component} from 'react'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-order';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICES = {
    salad : 20,
    meat : 30,
    bacon : 50,
    cheese : 20
}


class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        price : 20,
        purchasable : false,
        purchasing : false,
        loading : false,
        error : false
    }

    componentDidMount = () => {
        // console.log(this.props);
        axios.get('/ingredients.json').then(response => this.setState({ingredients: response.data}))
                .catch(() => this.setState({ingredients: null,error: true}));
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
                        return ingredients[igKey];
                    }).reduce((sum, el) => {
                        return sum + el;
                    },0);
        this.setState({purchasable : sum > 0})
    }

    addIngredientHandler = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedIngredientCount;
        const updatedPrice = this.state.price + INGREDIENTS_PRICES[type];
        this.setState({
            ingredients : updatedIngredients,
            price : updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = type => {
        const updatedIngredientCount = this.state.ingredients[type] - 1;
        if(updatedIngredientCount <= -1) return;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedIngredientCount;
        const updatedPrice = this.state.price - INGREDIENTS_PRICES[type];
        this.setState({
            ingredients : updatedIngredients,
            price : updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchasingState = () => {
        this.setState({purchasing : true});
    }

    cancelPurchase =() => {
        this.setState({purchasing:false});
    }

    continuePurchase =() => {
        
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price="+this.state.price);
        this.props.history.push({
            pathname: '/checkout',
            search : '?' + queryParams.join("&")
        });
    }

    render(){

        const disableInfo = {...this.state.ingredients};
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        // console.log(disableInfo);

        let burger = <Loader />;
        let modalContent = <Loader />;

        if(this.state.ingredients){
            burger = <Auxillary>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls 
                            price={this.state.price}
                            added={this.addIngredientHandler}
                            removed={this.removeIngredientHandler}
                            disable={disableInfo}
                            purchasing={this.updatePurchasingState}
                            purchasable={this.state.purchasable} />
                    </Auxillary>;

            modalContent = this.state.loading ? <Loader />
                    : <OrderSummery
                     ingredients={this.state.ingredients}
                     price = {this.state.price}
                     closeModal={this.cancelPurchase}
                     purchase = {this.continuePurchase} />
        }
        

        return(
            <Auxillary>
                <Modal show={this.state.purchasing}
                        closeModal={this.cancelPurchase} >
                    {modalContent}
                </Modal>
                {burger}                
            </Auxillary>
        );
    }

}

export default withErrorHandler(BurgerBuilder,axios);