import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import  {Nav,NavItem,NavLink,NavbarBrand,Navbar} from 'reactstrap';

class AppNav extends Component {
    state = {  }
    render() { 
        return (
          <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">SaveIt Application</NavbarBrand>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink  href="/expense">Expenses</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/category">Catorgories</NavLink>
                </NavItem>
                
              </Nav>
           
          </Navbar>
        </div>
          );
    }
}
 
export default AppNav;