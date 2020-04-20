import React, { Component } from 'react';
import AppNav from './AppNav';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
        <AppNav/>
        <h2 style={{color: "orange", textAlign:'center'}}>Welcome To SaveIt! </h2> 
        </div>


      );
    }
}
 
export default Home;