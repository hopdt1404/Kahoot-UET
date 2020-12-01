import React, {Component} from 'react';
import Header from "../Header";
import SideBar from "../SideBar";
import Editor from "../Edittor";
import "./user.css";
class Creator extends Component {

    render() {
      if (!localStorage.getItem("token")){
        // window.alert("Ban chưa dăng nhập");
        return(
            <Redirect to="/auth/login" />
        )
      }
      return (
          <div className="crKahoot">
            <header className="crHeader">
              <Header />
            </header>
            <main className="crMain">
              <div className="sidebar">
                <SideBar />
              </div>
              <div className="editor">
                <Editor />
              </div>
            </main>
          </div>
        );
    }
}

export default Creator