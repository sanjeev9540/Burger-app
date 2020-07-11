import React, { Component } from 'react';
import Aux from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component{
    componentWillUpdate(){
         console.log('[OrderSummary] will update');
    }
    render () {
        const ingredientsSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
                <li key={igKey}>
                    <span>{igKey}</span> : {this.props.ingredients[igKey]}
                </li>
            )
        });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious Burger With the Following Ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p>Total Price : <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue To Checkout?</p>
                <Button btnType={'Danger'} clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType={'Success'} clicked={this.props.PurchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
};

export default OrderSummary;