import React, { Component } from 'react';

import classes from './Layout.css';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        sideDrawerShow : false
    }

    sideDrawerToggle = () =>{
        this.setState((prevState) => {
           return {sideDrawerShow: !prevState.sideDrawerShow};
        });
    }

    render() {
        return(
            <Auxillary>
                <SideDrawer show={this.state.sideDrawerShow} sideDrawerToggle={this.sideDrawerToggle} />
                <Toolbar sideDrawerToggle={this.sideDrawerToggle} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxillary>
        );
    }
}

export default Layout;