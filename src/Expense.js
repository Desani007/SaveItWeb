import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from "react-datepicker";
import './App.css'
 import "react-datepicker/dist/react-datepicker.css";
import { Container, Form, FormGroup ,Button, Table} from 'reactstrap';
import {Link} from 'react-router-dom'
import Category from './Category';
import Moment from 'react-moment';

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
                
                    "category": {
                      "categoryName": ""
                    },
                    "datePurchased": new Date(),
                    "description": "",
                    "id": 0,
                    "location": ""
                  
            }

            constructor(props){
                super(props)
                this.state = { 
                    date: new Date(),
                    isLoading: true,
                    expenses :[],
                    categories: [],
                    item: this.emptyItem

                 }
                 this.handleSubmit =this.handleSubmit.bind(this);
                 this.handleChange =this.handleChange.bind(this);
                 this.handleDateChange =this.handleDateChange.bind(this);


            }

    async handleSubmit(event){
        event.preventDefault();
        const {item}= this.state;
        await fetch(`/expense`, { 
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
 
            },
            body: JSON.stringify(item),
        });
        console.log(this.state)
        this.props.history.push('/expense');
    }

    handleChange(event){
        const target =  event.target;
        const value = target.value;
        const name = target.name;
        let item= {...this.state.item};
        item[name] =value;
        this.setState({item})
        console.log(this.state.item)
    }
    handleDateChange(date){
        let item= {...this.state.item};
        item.datePurchased=date;
        this.setState({item})
        console.log(this.state.item)




    }


   async remove(id){
       await fetch(`/expense/${id}`, {
           method: 'DELETE',
           headers: {
               'Accept' : 'application/json',
               'Content-Type' : 'application/json'

           }
       }).then(() =>{
           let updateExpenses =[...this.state.expenses].filter( i => i.id !== id);
           this.setState({expenses : updateExpenses})
       });
 
            
   }

   
    async componentDidMount (){
        const response= await fetch('/category');
        const body= await response.json();
        this.setState({categories : body, isLoading : false})
   
        const responseExp= await fetch('/expense');
        const bodyExp= await responseExp.json();
        this.setState({expenses : bodyExp, isLoading : false})
    }
    
    render() { 
        const title=<h3>Expenses</h3>
        const {categories} = this.state;
        const {expenses,isLoading}= this.state;

        if(isLoading)
        return(<div>Loadinggggg....</div>)

        let  optionlist = categories.map(category =>
            <option value= {category.id} key= {category.id}>
                   {category.categoryName}
                   
            </option>
            )

            let rows=
            expenses.map(expense=>
                <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.location}</td>
                    <td><Moment date={expense.datePurchased} format="YYYY/MM/DD"/></td>
                     <td>{expense.category.categoryName}</td>
                    <td> <Button size="sm" color="danger" onClick={()=> this.remove(expense.id)}>Delete</Button></td>


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
                            onChange={this.handleChange}></input>
                        </FormGroup>

                        <FormGroup>
                            <label for="category">Category</label>
                            <select onChange={this.handleChange}>
                            {optionlist}
                            </select>
                            
                        </FormGroup>


                        <FormGroup>
                            <label for="expenseDate">Expense Date</label>
                            <DatePicker selected={this.state.item.datePurchased} 
                            onChange={this.handleDateChange}/>
                        </FormGroup>

                        <FormGroup>
                            <label for="location"> Location</label>
                            <input type="text" name="location" id="location"
                             onChange={this.handleChange}></input>
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
                                     <th width="40%">Date</th>
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