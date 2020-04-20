import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from "react-datepicker";
import './App.css'
 import "react-datepicker/dist/react-datepicker.css";
import { Container, Form, FormGroup ,Button, Table} from 'reactstrap';
import {Link} from 'react-router-dom'
import Category from './Category';

class Expense extends Component {
    // {
    //     "category": {
    //       "categoryName": "Auto"
    //     },
    //     "datePurchased": "2020-04-20T06:41:38.931Z",
    //     "description": "string",
    //     "location": "string"
    //   }

            emptyItem = {
                description:'',
                 datePurchased:'',
                 location:'',
                 categories:'3,Bills'
            }

            constructor(props){
                super(props)
                this.state = { 
                    date: new Date(),
                    isLoading: true,
                    expenses :[],
                    categories: [],
                    Item: this.emptyItem
                 }
            }

   
    async componentDidMount (){
        const response= await fetch('/category');
        const body= await response.json();
        this.setState({categories : body, isLoading : false})
   
        const responseExp= await fetch('/expense');
        const bodyExp= await responseExp.json();
        this.setState({expenses : bodyExp, isLoading : false})
    }
    hangleChange
    render() { 
        const title=<h3>Expenses</h3>
        const {categories} = this.state;
        const {expenses,isLoading}= this.state;

        if(isLoading)
        return(<div>Loadinggggg....</div>)

        let  optionlist = categories.map(category =>
            <option id= {category.id}>
                   {category.categoryName}
                   
            </option>
            )

            let rows=
            expenses.map(expense=>
                <tr>
                    <td>{expense.description}</td>
                    <td>{expense.location}</td>
                    <td>{expense.category.categoryName}</td>
                    <td><Button size="sm" color= "danger" onClick={()=> this.remove(expense.id)}>Delete</Button></td>


                </tr>)
        return ( 
            <div>
                <AppNav/>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <label for="title">Title</label>
                            <input type="text" name="title" id="title" 
                            onChange={this.hangleChange}></input>
                        </FormGroup>

                        <FormGroup>
                            <label for="category">Category</label>
                            <select>
                            {optionlist}
                            </select>
                            
                        </FormGroup>


                        <FormGroup>
                            <label for="expenseDate">Expense Date</label>
                            <DatePicker selected={this.state.date} 
                            onChange={this.hangleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <label for="location"> Location</label>
                            <input type="text" name="location" id="location"
                             onChange={this.hangleChange}></input>
                        </FormGroup>
                        <FormGroup>                       
                             <Button color="primary" type="submit">Save</Button>{' '}
                             <Button color="secondary" tag={Link} to="/category">Cancel</Button>{' '}
                         </FormGroup> 
                     </Form>
                </Container>
                    <Container>
                        <h3>All Expenses</h3>
                        <Table className="mt-4">
                            <thead>
                                <tr>
                                    <th width="20%">Description</th>
                                     <th width="10%">Location</th>
                                     <th >Category </th>
                                     <th width="10%">Action</th>
                                 </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>

                        </Table>

                     </Container>
            </div>
         );
    }
}
 
export default Expense; 