import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Link } from "react-router-dom";
import RouterPath from "./routers/RouterPath";
// import "../user.css";
import { Provider } from "react-redux";
import store from "./store";

function Index() {
    return (
        <HashRouter>
            <RouterPath />
        </HashRouter>
    );
}

export default Index;

if (document.getElementById("index")) {
    ReactDOM.render(<Provider store={store}>
        <Index />
      </Provider>, document.getElementById("index"));
}
