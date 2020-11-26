import React, {Component} from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import { MicrosoftLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import './Register.css';
import {Link} from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach( val => {
        val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
        val === null && (valid = false);
      });

    return valid;
}

class Register extends Component{
    constructor(props){
        super(props);
        this.state = 
        {
            fullName: "",
            email: "",
            password: "",
            organization: this.props.match.params.organization,
            message: "",
            verify: false,

            formErrors: {
                fullName: "",
                email: "",
                password: ""
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        const { name , value } = e.target;
        let formErrors = this.state.formErrors;
    
        switch( name ){
            case 'fullName':
                formErrors.fullName = value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case 'email':
                formErrors.email = emailRegex.test(value) ? "" : "invalid email address";   
                break; 
            case 'password':
                formErrors.password = value.length < 6 ? "minimum 6 characaters required" : "";  
                break;
            default:
                break;
        }
    
        this.setState({formErrors, [name]: value })
    }
        
    
    handleSubmit(e) {
        e.preventDefault();
        if (formValid(this.state)) {
            if(this.state.email && this.state.fullName && this.state.password){
                const data = {
                    name: this.state.fullName,
                    email : this.state.email,
                    password : this.state.password,
                    organization : this.state.organization
                }
                console.log(data);
                
                axios.post('http://127.0.0.1:8000/api/auth/signup', data)
                .then( res=>{
                    if(res.data.message == "Registration failed")
                    this.setState({
                        message: "Email has been used"
                    })
                    else{
                        this.setState({
                            message: res.data.message,
                            verify: true
                        })
                    }
                })
                .catch( err=>{
                    this.setState({
                        message: err.response.data.error
                    })
                    console.log(err.response.data.error)
                })

          } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
          }
      }
   }

    render(){
        const { formErrors } = this.state; 
        const verify = this.state.verify;
        const mess = this.state.message;

        return(
        
            <div className="register-form" style={{backgroundColor: 'rgb(242 242 242)',   width: '100%' , height: '1156px'}} >
                <h1 className="title"> Create an account </h1>
                <Form className="form" onSubmit={this.handleSubmit} noValidate>
                    <div className="fullName">
                        <Label>Full Name</Label>
                        <Input type="text" className={formErrors.fullName.length > 0 ? "error" : null} placeholder="Full Name..." name="fullName"  noValidate onChange={this.handleChange} />
                        {formErrors.fullName.length > 0 && (
                            <span className="errorMessage">{formErrors.fullName}</span>
                        )}
                    </div>
                    <br/>
                    <div className="Email">
                        <Label>Email</Label>
                        <Input type="email" className={formErrors.email.length > 0 ? "error" : null} placeholder="Email..." name="email"  noValidate onChange={this.handleChange} />
                        {formErrors.email.length > 0 && (
                            <span className="errorMessage">{formErrors.email}</span>
                        )}
                    </div>
                    <br/>
                    <div className="password">
                        <Label>Password</Label>
                        <Input type="password" className={formErrors.password.length > 0 ? "error" : null} placeholder="Password..." name="password"  noValidate onChange={this.handleChange} />
                        {formErrors.password.length > 0 && (
                            <span className="errorMessage">{formErrors.password}</span>
                        )}
                    </div>
                    <br/>
                    <div className="submit">
                        <Button type="submit" className="btn-lg btn-dark btn-block"> Sign up </Button>
                        {mess && ( <span className="errorMessage">{mess}</span> )}
                        {verify && <Link to={"/auth/signup/active-account/" + this.state.email}> Click here to active </Link>}
                        <p> Already have an Account?
                        <Link to ="/auth/login"> Login </Link>
                        </p>
                    </div>
                    <GoogleLoginButton />
                    <MicrosoftLoginButton />
                </Form>
            </div>
        )
    }
        
}

export default Register;