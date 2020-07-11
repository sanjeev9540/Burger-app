import React, {Component} from 'react';
import Aux from '../../hoc/Auxi/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENTS_PRICES = {
    salad : 0.5,
    cheese : 0.8,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients : null,
        totalPrice : 4,
        purchaseable  : false,
        purchasing : false,
        loading : false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-95b67.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response);
                this.setState({ingredients : response.data})
            })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchaseable : sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        const priceAddtion = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddtion;
        this.setState({totalPrice : newPrice, ingredients : updateIngredients})
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        const priceAddtion = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddtion;
        this.setState({totalPrice : newPrice, ingredients : updateIngredients})
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () => {
        // alert('You Continue');
        // 
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('Price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search : '?' + queryString
        });
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        
        let orderSummary = null;
        let burger = <Spinner />
        if(this.state.ingredients){
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    purchasing={this.purchaseHandler}
                />
            </Aux>
            )
            orderSummary = (<OrderSummary 
                ingredients={this.state.ingredients} 
                purchaseCancelled={this.purchaseCancelHandler} 
                PurchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}/>);

        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default BurgerBuilder;