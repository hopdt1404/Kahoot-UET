import React, {Component} from 'react';
import Header from './Header';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./Setting/Setting.css"
import DefaultUserPic from "../../images/icon_kahoot.png";
import { post } from 'jquery';

const formValid = ( formErrors ) => {
    let valid = true;
  
    Object.values(formErrors).forEach( val => {
        val.length > 0 && (valid = false);
    });
    return valid;
  }
class Settings extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            username:'',
            email: '',
            profileImage:'',
            msg:'',
            uploadedFile:'',
            oldPass:'',
            newPass:'',
            repeatPass:'',
            messPass:'',
            messName:'',
            nameChanged: false,

            formErrors: {
                oldPass: "",
                newPass: "",
                repeatPass: ""
            }
        };
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.handelNameChange = this.handelNameChange.bind(this);
        this.handelImgChange = this.handelImgChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handlePassSubmit = this.handlePassSubmit.bind(this);
    }
    componentDidMount(){
        const access_token = localStorage.getItem('token');
        let config = {
                headers: {
                    'Authorization': "Bearer " + access_token,
                    "Accept": "application/json"
                },
            }
        axios.get('http://127.0.0.1:8000/api/auth/user', config)
        .then(res => {
            console.log(res);
             this.setState({
                 email: res.data.email,
                 username: res.data.name,
                 profileImage: res.data.avatar_url
             })
        })
        .catch(error => console.log(error));
    }
    handelNameChange(e){
        e.preventDefault();
        var username = e.target.value;
        this.setState({
            username: username,
            nameChanged: true
        })
    }
    handelImgChange(e){
        e.preventDefault();
        this.setState({
            uploadedFile: e.target.files[0]
        })
    }
    handleUserSubmit(e){
        e.preventDefault();
        
        const access_token = localStorage.getItem('token');
        if( this.state.username && this.state.nameChanged ){
            let config = {
                headers: {
                    'Authorization': "Bearer " + access_token,
                    "Accept": "application/json"
                }
            }
            var data = { 
                name: this.state.username
            }
            console.log(config);
            axios.put('http://127.0.0.1:8000/api/auth/rename', data, config)
            .then(res =>{
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }

        if(this.state.uploadedFile){
            let config = {
                headers: {
                    'Authorization': "Bearer " + access_token,
                    "Accept": "application/json"
                }
            }
            const formData=new FormData();
            formData.append("image",this.state.uploadedFile)
            axios.post('http://127.0.0.1:8000/api/auth/upload-image', formData, config)
            .then(res =>{
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    handlePassChange(e){
        e.preventDefault();
        const { name , value } = e.target;
        let formErrors = this.state.formErrors;

        switch( name ){
            case 'oldPass':
                formErrors.oldPass = value.length < 6 ? "minimum 6 characaters required" : "";  
                break; 
            case 'newPass':
                formErrors.newPass = value.length < 6 ? "minimum 6 characaters required" : ""; 
                break;
            case 'repeatPass':
                formErrors.repeatPass = value.length < 6 ? "minimum 6 characaters required" : ""; 
            default:
                break;
        }
        this.setState({formErrors, [name]: value })
    }
    handlePassSubmit(e){
        e.preventDefault();
        const access_token = localStorage.getItem('token');
        if(this.state.oldPass && this.state.newPass && this.state.repeatPass){
            if(formValid(this.state.formErrors)){
                if(this.state.newPass === this.state.repeatPass){
                    let config = {
                        headers: {
                            'Authorization': "Bearer " + access_token,
                            "Accept": "application/json"
                        },
                        
                    }
                    var data ={
                        old_password: this.state.oldPass,
                        new_password: this.state.newPass,
                        confirm_new_password: this.state.repeatPass
                    }
                    axios.put('http://127.0.0.1:8000/api/auth/change-password',data, config)
                    .then(res=>{
                        console.log(res);
                    })
                    .catch(err=>{ 
                        console.log(err);
                    })
                }
                else{
                    this.setState({
                        messPass: "These passwords do not match. Please retype."
                    })
                }
            }
        }

    }

 
    render() {
        if(this.state.profileImage){
            var profilePic = this.state.profileImage;
        }else{
            profilePic = DefaultUserPic;
        }
        const formErrors = this.state.formErrors;
        const messPass = this.state.messPass;
        return (
        <div style={{background:'rgb(242, 242, 242)',minHeight:'100vh'}}>
            <Header />
            <div class= "setting-main">
                <span class="setting-text">Settings</span>
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                    <a class="nav-link setting-tab-font active" data-toggle="tab" href="#profile">Profile</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link setting-tab-font " data-toggle="tab" href="#change-password">Change Password</a>
                    </li>
                </ul>

                <div class="tab-content">
                    <div id="profile" class="container tab-pane active">
                        <div class="d-flex flex-column setting-profile">
                            <Form className="user-form" onSubmit={this.handleUserSubmit} noValidate>
                            <div class="setting-user-infomation">
                                <span class="setting-user-infomation-text">User infomation</span>
                                <Button type = "submit" class="btn btn-success save-disable">Save</Button>
                            </div>
                            <div class="setting-user-infomation-detail" style={{ display:'flex', margin:'25px' }}>
                                <img class="setting-profile-img" src={profilePic} alt="your image"></img>
                                <div style={{ marginLeft:"250px"}}>
                                <div className="email">
                                   <label> {"Email: " + this.state.email}  </label>
                                </div>
                                <div className="fullname" >
                                   <label> Full Name </label>
                                   <input style={{ marginLeft:'10px'}} type="text" name="fullname" value={this.state.username}  onChange={this.handelNameChange}></input>
                                </div>
                                <div className="img-change"> 
                                   <Input type="file" name="change img" className="profileImg" onChange={this.handelImgChange} ></Input>
                                </div>
                                </div>

                            </div>
                            </Form>
                        </div>
                    </div>
                    <div id="change-password" class="container tab-pane fade">
                    <Form className="Pass-form" onSubmit={this.handlePassSubmit} noValidate > 
                <div className="setting-user-infomation-text"> Change password </div>
                <div className="changePassword-main">
                <div className="oldPassword">
                        <Label>Old password</Label>
                        <Input type="password" className="oldpassword" name="oldPass"  noValidate onChange={this.handlePassChange} />
                        {formErrors.oldPass.length > 0 && (
                            <span className="errorMessage">{formErrors.oldPass}</span>
                        )}
                </div>

                <div className="new">
                        <Label>New password</Label>
                        <Input type="password" className="new" name="newPass"  noValidate onChange={this.handlePassChange} />
                        {formErrors.newPass.length > 0 && (
                            <span className="errorMessage">{formErrors.newPass}</span>
                        )}
                </div> 

                <div className="oldPassword">
                        <Label>Repeat new password</Label>
                        <Input type="password" className="repeat" name="repeatPass"  noValidate onChange={this.handlePassChange} />
                        {formErrors.repeatPass.length > 0 && (
                            <span className="errorMessage">{formErrors.repeatPass}</span>
                        )}
                </div>
                <div className="submit" style={{ marginTop:'15px' }} >
                        <Button type="submit" className="btn-lg btn-dark btn-block"> Save </Button>
                        {messPass && ( <span className="errorMessage">{messPass}</span>)}
                    </div>      
                </div>
                </Form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Settings;