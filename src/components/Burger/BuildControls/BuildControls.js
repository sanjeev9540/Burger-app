import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label : 'Salad', type : 'salad'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Cheese', type : 'cheese'},
    {label : 'Meat', type : 'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.type}
                added={() => props.ingredientsAdded(ctrl.type)}
                remove={() => props.ingredientsRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchaseable}
            onClick={props.purchasing}
            >Order Now
        </button>
    </div>
);

export default buildControls;