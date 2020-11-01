import React from "react";
import "./index.css";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Editor from "../../components/Edittor";

// import PropTypes from 'prop-types';

// CreateKahoot.propTypes = {

// };

function CreateKahoot(props) {
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

export default CreateKahoot;
