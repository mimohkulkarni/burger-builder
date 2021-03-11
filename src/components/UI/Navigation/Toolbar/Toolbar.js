import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle click={props.sideDrawerToggle} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DeskTopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;