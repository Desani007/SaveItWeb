import React, { Component } from 'react';
import Category from './Category'
import Expense from './Expense'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom'
import { Route ,Switch} from 'react-router';

class App extends Component {
    state = {  }
    render() { 
        return (  
            <BrowserRouter>
        <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/category" exact={true} component={Category}/>
        <Route path="/expense" exact={true} component={Expense}/>

        </Switch>
        </BrowserRouter>
        );
    }
}
 
export default App;