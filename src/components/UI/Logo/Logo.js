import React from 'react';

import classes from './Logo.css';
import burgerLogo from '../../../assets/Images/burger-logo.png';

const logo = props => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Logo" />
    </div>
);

export default logo;