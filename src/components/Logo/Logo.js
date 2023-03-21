import React from 'react';
import classes from './Logo.module.css';
import burgerlogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerlogo} alt="My Buger Logo"/>
    </div>
);

export default logo;