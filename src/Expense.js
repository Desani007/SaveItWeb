import React, { Component } from 'react';
import AppNav from './AppNav';

class Expense extends Component {
    state = {  
        isLoading: true,
        Categories : []
    }

    async componentDidMount(){
        const response =await fetch('/category')
        const body = await response.json();
        this.setState({Categories : body, isLoading :false})
    }
    render() { 
       
        return ( 
         
        <div>
               <AppNav/>
            <h2>Expense</h2>
       </div> );
    }
}
 
export default Expense;