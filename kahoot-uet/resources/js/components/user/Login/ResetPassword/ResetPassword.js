import React, {Component} from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import axios from 'axios';
import './ResetPassword.css'
import 'react-toastify/dist/ReactToastify.css';


class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            password: '',
            confirmPassword: '',
            formErrors: {
                password:'',
                confirmPassword:''
            },
            message: ''
        }

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submit(e){
        e.preventDefault();
        const password = this.state.password;
        const confirm = this.state.confirmPassword;
        const token = this.props.match.params.token;

        var form = {
                password : password,
                confirm_password : confirm
        }
        
        if( password && confirm ){
            if (password === confirm){
                axios.post('http://127.0.0.1:8000/api/auth/reset-password/' + token, form)
                .then((res) =>{
                    const mess = res.data.message;
                    if(res.data.error){
                        this.setState({
                          message: res.data.error
                        })
                    }
                    else{
                        this.setState({
                            message: res.data.message
                          })
                      }
                })
                .catch( (err) =>{
                    this.setState({
                        message: err.response.data.message
                    })
                })
            }
            else(
                this.setState({ message: "These passwords don't match." })
            )
        }
    }

    handleChange(e){
        e.preventDefault();
        const { name , value } = e.target;
        let formErrors = this.state.formErrors;

        switch( name ){
            case 'password':
                formErrors.password = value.length < 6 ? "minimum 6 characaters required" : "";  
                break; 
            case 'confirmPassword':
                formErrors.confirmPassword = value.length < 6 ? "minimum 6 characaters required" : ""; 
                break;
            default:
                break;
        }
        this.setState({formErrors, [name]: value })
    }
     
    render(){
        const formErrors = this.state.formErrors;
        const mess = this.state.message;
        return(
            <div className="forgot-form">
                <h1 className="title"> Reset your password </h1>
                <Form className="Form" onSubmit={this.submit}>
                <div className="NewPassword">
                        <Label> Enter new password </Label>
                        <Input type="password" value={this.state.password} placeholder="Enter new password..." name="password"  noValidate onChange={this.handleChange} />
                        {formErrors.password.length > 0 && (
                            <span className="errorMessage">{formErrors.password}</span>
                        )}
                </div> 

                <div className="Repeat">
                        <Label>Repeat new password to comfirm</Label>
                        <Input type="password" value={this.state.comfirmPassword} placeholder="Confirm password..." name="confirmPassword"  noValidate onChange={this.handleChange} />
                        {formErrors.confirmPassword.length > 0 && (
                            <span className="errorMessage">{formErrors.confirmPassword}</span>
                        )}
                </div> 

                <div className = "submit" style={{ marginTop: '5px' }}>
                        <Button type="submit" className="btn-lg btn-dark btn-block" > Reset password </Button>
                        {mess && ( <span className="errorMessage">{mess}</span>)}
                        </div>
                </Form>
                <div style={{ textAlign: 'center', marginTop: '2rem' }} > 
                <Link to = {"/auth/login"}> Back to login </Link>
                </div>
            </div>
        )
    }
}

export default ResetPassword;