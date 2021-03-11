import React,{ Component} from 'react';
import { Route, Switch } from "react-router-dom";

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auxillary from './hoc/Auxillary/Auxillary';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render(){
    return (
        <Auxillary>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/" Checkout component={BurgerBuilder} />
            </Switch>
          </Layout>
        </Auxillary>
    );
  }
}

export default App;
