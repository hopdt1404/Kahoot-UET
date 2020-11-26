import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import './AccountType.css'
import 'react-toastify/dist/ReactToastify.css';


class AccountType extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            organization: '',
        }
        
        this.chooseType = this.chooseType.bind(this);
    }

    chooseType(e){
        e.preventDefault();
         const type = e.target.value;
         this.setState({
             organization: type
         })
     }

    render(){
        if(this.state.organization !== ''){
            return <Redirect to={"/Register/signup-options/" + this.state.organization} />
          }
        return(
            <div className="page-layout" style={{ height: '642px', backgroundColor: 'rgb(242 242 242)'  }}>
            <h1 style={{ textAlign: 'center', paddingTop: '5rem', fontWeight: 'bold' }} > Choose your account type </h1>
            <div className="usage-selector" style={{ textAlign: 'center', marginTop:'10rem', width:'864', height:'284', padding: 'auto' }}>
                
                <button className='teacher' style={{ height:'268px', width:'200px', margin: '0.5rem'}} name="teacher" value="teacher" onClick={this.chooseType} > 
                <span style={{ fontSize:"1rem", fontWeight:"bold", color:'black' }} >
                         Teacher
                </span>
                </button>
                <button className='student' style={{ height:'268px', width:'200px', margin: '0.5rem' }} name="student" value ="student" onClick={this.chooseType} >
                <span style={{ fontSize:"1rem", fontWeight:"bold", color:'black' }} >
                         Student
                     </span>
                 </button>
                <button className='personal' style={{ height:'268px', width:'200px', margin: '0.5rem' }} name ="personal" value="personal" onClick={this.chooseType} >
                <span style={{ fontSize:"1rem", fontWeight:"bold", color:'black' }} >
                         Personal 
                     </span>
                </button>
                <button className='professional' style={{ height:'268px', width:'200px', margin: '0.5rem' }} name="professional" value="professional" onClick={this.chooseType} > 
                <span style={{ fontSize:"1rem", fontWeight:"bold", color:'black' }} >
                Professional
                     </span>
                 </button>
            </div>
            <p className="redirect-text" style={{ textAlign:'center', marginTop: "5rem" }}> 
               Already have an account?
               <Link to ="/auth/login"> Login </Link>
            </p>
        </div>
        )
    }
}
export default AccountType;