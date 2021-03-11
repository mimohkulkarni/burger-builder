import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Loader/Loader';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm:{
            name: this.stateObjectHandler('input','text','Your Name',{required: true,minLength: 1}),
            street: this.stateObjectHandler('input','text','Street',{required: true,minLength: 1}),
            zipCode: this.stateObjectHandler('input','text','Zipcode',{required: true,minLength: 6,maxLength: 6}),
            country: this.stateObjectHandler('input','text','Country',{required: true,minLength: 1}),
            email: this.stateObjectHandler('input','text','Your Mail ID',{required: true,minLength: 1}),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'fastest', displayValue: 'Fastest'},
                        {value:'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                valid: true,
                value: ''
            }
        },
        formIsValid: false,
        loading: false
    }

    stateObjectHandler(elType,type,placeholder,rules) {
        const tempArray = {
            elementType: elType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            validation: {},
            valid: false,
            touched: false,
            value: ''
        }

        if(rules){
            tempArray.validation = {...rules};
        }
        return tempArray;
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props);
        const customerData = {};
        for(let inputIdentifier in this.state.orderForm){
            customerData[inputIdentifier] = this.state.orderForm[inputIdentifier].value;
        }
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            customer: customerData
        }
        // console.log(order);  

        this.setState({loading: true});

        axios.post('/orders.json',order)
                .then(() => {
                    this.setState({loading: false})
                    this.props.history.push('/');
                })
                .catch(() => {
                    this.setState({loading: false})
                });
        // console.log(this.props);
    }

    checkValidity(value,rules) {
        let isValid = true;

        if(rules.required) isValid = value.trim() !== '' && isValid;
        if(rules.minLength) isValid = value.trim().length >= rules.minLength && isValid;
        if(rules.maxLength) isValid = value.trim().length <= rules.maxLength && isValid;

        return isValid;
    }

    inputChangeHandler = (event,identifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[identifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        // console.log(updatedFormElement);
        updatedOrderForm[identifier] = updatedFormElement;

        let formIsValid = true;
        for(let elementIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[elementIdentifier].valid && formIsValid;
        }
        // console.log(formIsValid);

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){

        // console.log(this.state.orderForm)
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = <Spinner />;
        if(!this.state.loading){
            form = (
                        <form>
                            {formElementsArray.map(formElement => {
                                return <Input 
                                        key={formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        invalid={!formElement.config.valid}
                                        touched={formElement.config.touched}
                                        changed={(event) => this.inputChangeHandler(event,formElement.id)} />
                            })}
                            <Button btnType='Success' disabled={!this.state.formIsValid} click={this.orderHandler} >Order</Button>
                        </form>
                    );
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact information</h4>
                {form}
            </div>
        );
    }
}

export default withErrorHandler(ContactData,axios);