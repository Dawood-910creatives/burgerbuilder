import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad' , type:'salad'},
    {label:'Bacon' , type:'bacon'},
    {label:'Cheese' , type:'cheese'},
    {label:'Meat' , type:'meat'},
];

const buildsControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total Price :<strong>{props.price}.Rs</strong></p>
        {controls.map(ctrl =>(
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={()=> props.addIngredients(ctrl.type)}
                removed={()=> props.removeIngredients(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <br/>
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.ordered}>Order Now</button>
    </div>
);

export default buildsControls;