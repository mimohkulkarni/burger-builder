import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Auxillary from '../../../../hoc/Auxillary/Auxillary';
import Backdrop from '../../Backdrop/Backdrop';

const sideDrawer = props => {

    let attachedClasses = [classes.SideDrawer, classes.Open];
    if(!props.show) attachedClasses = [classes.SideDrawer,classes.Close];

    return(
        <Auxillary>
            <Backdrop show={props.show} click={props.sideDrawerToggle} />
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxillary>
    );
}

export default sideDrawer;