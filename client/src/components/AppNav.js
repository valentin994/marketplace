import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Monitoring from "./Monitoring";
import Services from "./Services";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./appNav.scss";
import appNavPrice from './Services';

console.log(appNavPrice);

export default function AppNav() {
  const [isActive, setIsActive] = useState('');
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link onClick={() => setIsActive('dashboard')} className={isActive === 'dashboard'? 'active' : 'nothing'} to="/">Dashboard</Link>
            </li>
            <li>
              <Link onClick={() => setIsActive('monitoring')} className={isActive === 'monitoring'? 'active' : 'nothing'} to="/monitoring">Monitoring</Link>
            </li>
            <li>
              <Link onClick={() => setIsActive('services')} className={isActive === 'services'? 'active' : 'nothing'} to="/services">Services</Link>
            </li>
          </ul>
        </nav>
        <div className="content">
        <Switch>
          <Route path="/monitoring">
            <Monitoring />
          </Route>
          <Route path="/services">
            <Services />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}
