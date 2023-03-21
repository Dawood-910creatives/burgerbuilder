import React, {Component} from 'react';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';


class Ordersummary extends Component{
    componentDidUpdate(){
        console.log('[OrderSummary.js] componentWillUpdate');
    }
    render(){

        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}</li>
        });

        return(
            <Aux>
                <h3>Your Order Summary</h3>
                <p>A Deligious Burger with Following Ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <h4>Total Burger Price : {this.props.totalPrice} </h4>
                <p>Continue to Checkout ? </p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
            </Aux>
        );
    }
}

export default Ordersummary;