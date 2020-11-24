import React, {Component} from 'react';

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
    axios.post('http://localhost:8000/api/auth/login', this.state.account)
    .then(function (res) {
      if(res.data.message){
        this.setState({
          message: "Tài khoản hoặc mật khẩu không đúng"
        })
      }

      else if(res.data.access_token){
        localStorage.setItem('token', res.data.access_token);
        this.setState({
          loggedIn: true
        })
      }
     
    })
    .catch(function (err){
      console.log(err)
    })
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
        <h1 className="title">
            Log in
        </h1>
        <Form className="login-Form" onSubmit={this.submit} >

          <FormGroup>
            <Label>Username or email </Label>
            <Input name="email" value={this.state.account.email} placeholder="Email..." onChange={this.handelChange} />
            <br/>
            <Label>Password</Label>
            <Input type="password" name="password" value={this.state.account.password} placeholder="Password..." onChange={this.handelChange} />
          </FormGroup>
          <span value="hello" style={{ color: 'red', margin: '0.5rem' }} > {mes} </span>

          <Button type="submit" value="submit" className="btn-lg btn-dark btn-block" > Log in </Button>
          <div id="or" className="text-center pt-3">
            Or continue with your social accout
          </div>
          <FacebookLoginButton/>
          <GoogleLoginButton />
          <MicrosoftLoginButton />
          <div className="text-center pt-3">
            <p> Don't have an account? 
            <a href="/sign-up"> Sign up </a>
            </p>
          </div>
        </Form>
        <div className="forgot-password">
        <a id="aa" href="/auth/forgot-password"> Forgot your password </a>
        </div>
        
      </div>
    );
  }
}

export default Login