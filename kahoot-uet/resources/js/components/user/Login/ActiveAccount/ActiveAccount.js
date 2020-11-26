import React, {Component} from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import axios from 'axios';
import {Link} from "react-router-dom";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

class ActiveAccount extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            verification_code: '',
            email:this.props.match.params.email,
            message:'',
        }
        

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submit(e){
        e.preventDefault();
        if(this.state.email && this.state.verification_code){   
            const data = {
                email: this.state.email,
                verification_code : this.state.verification_code
            }
            console.log(data);
                axios.post('http://127.0.0.1:8000/api/auth/signup/activate', data)
                .then( (res) =>{
                    console.log(res)
                    this.setState({
                        message : res.data.message
                    })
    
                })
                .catch( (err) => {
                    this.setState({
                      message: err.response.data.message
                    })
                    console.log(err);
                  })
        }
    }

    handleChange(e){
        e.preventDefault();
        let value = e.target.value;
        this.setState({
            verification_code : value
        })
    }
     
    render(){
        const mess = this.state.message;
        return(
            <div className="forgot-form">
                <h1 className="title"> Active Account </h1>
                <Form className="Form" onSubmit={this.submit}>
                <div className="verifyCode">
                        <Label> Enter your verifyCode </Label>
                        <Input type="text" value={this.state.verification_code} name="verifyCode" noValidate  noValidate onChange={this.handleChange} />
                </div> 

                <div className = "submit-code" style={{ marginTop: '5px' }}>
                        <Button type="submit" className="btn-lg btn-dark btn-block" > Accept </Button>
                        </div>
                {mess && <span style={{ color: 'red'}} className="errorMessage">{mess}</span>}        
                </Form>

            <div style={{ textAlign: 'center', marginTop: '2rem'}}>
            <Link to = {"/auth/login"}> Back to login </Link>
            </div>
            
            </div>
        )
    }
}

export default ActiveAccount;