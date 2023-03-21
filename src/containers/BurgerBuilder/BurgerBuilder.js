import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const ingredients_prices={
    salad:20,
    bacon:20,
    cheese:30,
    meat:50
};

class BurgerBuilder extends Component{
    state = {
        ingredients:null,
        totalPrice: 100,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        console.log(this.props);
        axios.get('/ingredients.json')
        .then(response=>{
            this.setState({ingredients: response.data});
        })
        .catch(error =>{
            this.setState({error: true});
        });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey];
        })
        .reduce( (sum,el)=>{
            return sum + el;
        },0);

        this.setState({purchasable: sum>0})
    }

    addIngredientHandler= (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = ingredients_prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredienthandler= (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<= 0){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = ingredients_prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        // this.setState({loading:true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Muhammad Dawood',
        //         email:'dawood@gmail.com',
        //         phone:'+923000000000',
        //         address:{
        //             street: 'Lahore',
        //             zipcode: '53200',
        //             country: 'Pakistan'
        //         }
        //     },
        //     deliverymethod: 'Fastest'
        // }

        // axios.post('/orders.json', order)
        // .then(response=>{
        //     this.setState({loading: false, purchasing: false});
        // })
        // .catch(error=>{
        //     this.setState({loading: false, purchasing: false});
        // });
        const queryParam = [];
        for (let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParam.push('price='+this.state.totalPrice);
        const queryString = queryParam.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?'+ queryString
        });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let ordersummary = null;
        let burger = this.state.error ? <p>Ingredients can't be Loaded...</p> :<Spinner />;

        if(this.state.ingredients){
            burger=(
                <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngredients={this.addIngredientHandler}
                    removeIngredients={this.removeIngredienthandler}
                    disabled={disabledInfo} 
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler} />
                </Aux>
            );
            ordersummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                totalPrice={this.state.totalPrice} 
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} />;
        }
        if (this.state.loading){
            ordersummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);