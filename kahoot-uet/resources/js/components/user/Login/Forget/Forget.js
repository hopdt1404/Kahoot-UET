import React, {Component} from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import axios from 'axios';
import {Link} from "react-router-dom";
import './Forget.css'


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Forget extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            email: '',
            formError: '',
            messError: '',
        }
        

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submit(e){
        e.preventDefault();
        if(this.state.email && this.state.formError == ''){
            console.log('hello');
        const data = {
                email: this.state.email
            }
            axios.post('http://127.0.0.1:8000/api/auth/reset-link', data )
            .then( (res)=>{
                this.setState({
                    messError: res.data.message
                })
            })
            .catch( (err)=>{
                this.setState({
                    messError: err.response.data.message
                })
                console.log(err.response.data.error)
            })
        }
    }

    handleChange(e){
        e.preventDefault();
        let value = e.target.value;
        let error = this.state.formError;
         
        error = emailRegex.test(value) ? '' : "invalid email address"; 

        this.setState({
            email: value,
            formError: error
        })
    }
     
    render(){
        const mess = this.state.messError;
        const error = this.state.formError;
        return(
            <div className="forget-form">
                <h1 className="forget-title"> Reset your password </h1>
                <Form className="Form" onSubmit={this.submit} >
                <div className="email">
                        <Label forget-label>Email</Label>
                        <Input type="text" value={this.state.email} placeholder="Enter email address..." name="email"  noValidate onChange={this.handleChange} />
                        {error && <span style={{ color: 'red'}} className="errorMessage">{error}</span>} 
                </div> 

                <div className = "submit-email" style={{ marginTop: '5px' }}>
                        <Button type="submit" className="btn-lg btn-dark btn-block" > Send reset link </Button>
                        </div>
                {mess && <span style={{ color: 'red'}} className="errorMessage">{mess}</span>}        
                
                </Form>
            <div style={{ textAlign: 'center' , marginTop: '2rem' }}>
            <Link to = {"/auth/login"}> Back to login </Link>
            <br/>
            <Link to = {"/auth/reset-password/dmkien"}> reset </Link>
            </div>
            
 
            </div>
        )
    }
}

export default Forget;