import React, {Component} from 'react';
import Header from './Header';
import "./Setting/Setting.css"
class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:1,
            username:"username",
            truename:"truename",
            email:"email@google.com",
            image:null,
        }
    }
    componentDidMount(){
        axios.get('/user')
        .then(res => {
            const data = res.data;
            if (data.id){
                this.setState({
                    id:1,
                    username:data.username,
                    truename:data.truename,
                    email:data.email,
                    image:ndata.image
                });
            }
        }
        )
        .catch(error => console.log(error));
    }
    render() {
        return (
        <div style={{background:' rgb(242, 242, 242)',minHeight:'100vh'}}>
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
                            <div class="setting-user-infomation">
                                <span class="setting-user-infomation-text">User infomation</span>
                                <button class="btn btn-success save-disable">Save</button>
                            </div>
                            <div class="setting-user-infomation-detail">
                                <img class="setting-profile-img" src={this.state.img} alt="your image"></img>
                            </div>
                        </div>
                    </div>
                    <div id="change-password" class="container tab-pane fade">
                        change password
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Settings;