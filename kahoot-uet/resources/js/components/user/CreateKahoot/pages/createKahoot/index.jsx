import React from "react";
import "./create.css";
import Header from "../../Header";
import SideBar from "../../SideBar";
import Editor from "../../Edittor";

// import PropTypes from 'prop-types';

// CreateKahoot.propTypes = {

// };

function CreateKahoot() {
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
