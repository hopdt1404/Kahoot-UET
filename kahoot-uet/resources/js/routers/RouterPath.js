import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/user/Home";
import Reports from "../components/user/Reports";
import Kahoots from "../components/user/Kahoots";
import Creator from "../components/user/Creator";
import Login from "../components/user/Login";

function RouterPath() {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/kahoots" component={Kahoots} />
                <Route exact path="/user-reports" component={Reports} />
                <Route exact path="/creator" component={Creator} />
                <Route exact path="/auth/login" component={Login} />
            </Switch>
        </main>
    );
}

export default RouterPath;

// export default class Test extends Component {
//     render() {
//         return (
//             <HashRouter>
//                 <div>
//                     <ul>
//                         <li>
//                             <Link to={'/'}>Home</Link>
//                         </li>
//                         <li>
//                             <Link to={'/topic'}>Topic</Link>
//                         </li>
//                         <li>
//                             <Link to={'/about'}>About</Link>
//                         </li>
//                     </ul>
//                     <RouterPath/>
//                 </div>
//             </HashRouter >
//         )
//     }
// }