import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Link } from "react-router-dom";
import RouterPath from "./routers/RouterPath";

import store from './store';

function Index() {
    return (
        <Provider store={store} >
            <HashRouter>
                <RouterPath />
            </HashRouter>
        </Provider>
        
    );
}

export default Index;

if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}
