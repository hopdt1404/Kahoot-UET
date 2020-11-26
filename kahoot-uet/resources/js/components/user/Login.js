import React, {Component} from 'react';
import './Login/Login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FacebookLoginButton, MicrosoftLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import {Link} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

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

import '../Login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FacebookLoginButton, MicrosoftLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state=
    {
<<<<<<< HEAD
        email: null,
        password: null,

      formErrors: {
        email: "",
        password: ""
    },
      message:"",
      loggedIn: false,
      un_verify: false,
    };
    this.handelChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name , value } = e.target;
    let formErrors = this.state.formErrors;

    switch( name ){
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

  submit(event){
    event.preventDefault();
    if(this.state.email && this.state.password){
      if (formValid(this.state)){
        const data = {
          email: this.state.email,
          password: this.state.password
        }
      axios.post('http://127.0.0.1:8000/api/auth/login', data)
      .then( (res) => {
        if(res.data.message){
          this.setState({
            message: res.data.message
          })
        }
  
        else if(res.data.access_token){
          localStorage.setItem('token', res.data.access_token);
          this.setState({
            loggedIn: true
          })
        }
       
      })
      .catch( (err) => {
        this.setState({
          message: err.response.data.message
        })
        if(err.response.data.message == 'email has not been verified'){
          this.setState({
            un_verify: true
          })
        }
        console.log(err);
      })
     }
    }
  }
  

  render(){
    const { formErrors } = this.state; 
    const message = this.state.message;
    const un_verify = this.state.un_verify;
    if(this.state.loggedIn){
      return <Redirect to="/" />
    }
    return(
      <div className="auth-form">
=======
      account: {
        email: null,
        password: null,
      }, 
      message: "Tài khoản hoặc mật khẩu không đúng",
      loggedIn: false,
    };
    this.handelChange = this.handelChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handelChange(event){
    let name = event.target.name;
    let value = event.target.value;
    let data = {};
    data[name] = value;
    this.setState({
      account: data
    })
    console.log(this.state.account)
  }

  submit(event){
    event.prevendefault();
    // axios.post('/login', this.state.account)
    // .then(function (res) {
    //   if(res.data.message){
    //     this.setState({
    //       message: "Tài khoản hoặc mật khẩu không đúng"
    //     })
    //   }

    //   else if(res.data.access_token){
    //     localStorage.setItem('token', res.data.access_token);
    //     this.setState({
    //       loggedIn: true
    //     })
    //   }
     
    // })
    // .catch(function (err){
    //   console.log(err)
    // })
    console.log("hello");
    this.setState({
      loggedIn: true
    })
  }
  render(){
    if(this.state.loggedIn){
      return <Redirect to="/" />
    }
    const mes = this.state.message;
    return(
      <div style={{backgroundColor: 'rgb(242 242 242)',   width: '100%' , height: '100%'}} className="auth-form">
>>>>>>> 8020fab2446824323fabb79ce2ccca1c8f18c705
        <h1 className="title">
            Log in
        </h1>
        <Form className="login-Form" onSubmit={this.submit} >

          <FormGroup>
            <Label>Username or email </Label>
<<<<<<< HEAD
            <Input name="email" value={this.state.email} placeholder="Email..." onChange={this.handelChange} />
            {formErrors.email.length > 0 && (
                            <span className="errorMessage">{formErrors.email}</span>
                        )}
            <br/>
            <Label>Password</Label>
            <Input type="password" name="password" value={this.state.password} placeholder="Password..." onChange={this.handelChange} />
            {formErrors.password.length > 0 && (
                            <span className="errorMessage">{formErrors.password}</span>
                        )}        
          </FormGroup>

          <Button type="submit" value="Submit" className="btn-lg btn-dark btn-block" > Log in </Button>
          {message && <span className="errorMessage">{message}</span>}   
          {un_verify && <Link to={"/auth/signup/active-account/" + this.state.email}> Click here to active </Link>} 
=======
            <Input name="email" value={this.state.account.email} placeholder="Email..." onChange={this.handelChange} />
            <br/>
            <Label>Password</Label>
            <Input type="password" name="password" value={this.state.account.password} placeholder="Password..." onChange={this.handelChange} />
          </FormGroup>
          <span value="hello" style={{ color: 'red', margin: '0.5rem' }} > {mes} </span>

          <Button type="submit" value="submit" className="btn-lg btn-dark btn-block" > Log in </Button>
>>>>>>> 8020fab2446824323fabb79ce2ccca1c8f18c705
          <div id="or" className="text-center pt-3">
            Or continue with your social accout
          </div>
          <FacebookLoginButton/>
          <GoogleLoginButton />
          <MicrosoftLoginButton />
          <div className="text-center pt-3">
            <p> Don't have an account? 
<<<<<<< HEAD
            <Link to={"/Register"}> Sign up </Link>
=======
            <a href="/sign-up"> Sign up </a>
>>>>>>> 8020fab2446824323fabb79ce2ccca1c8f18c705
            </p>
          </div>
        </Form>
        <div className="forgot-password">
<<<<<<< HEAD
        <Link to={"/auth/forgot-password"}> Forgot your password </Link>
=======
        <a id="aa" href="/auth/forgot-password"> Forgot your password </a>
>>>>>>> 8020fab2446824323fabb79ce2ccca1c8f18c705
        </div>
        
      </div>
    );
  }
}

export default Login;
