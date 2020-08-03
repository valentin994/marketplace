import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Monitoring from "./Monitoring";
import Services from "./Services";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./appNav.scss";

export default function AppNav() {
  const [isActive, setIsActive] = useState("");
  const [price, setPrice] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("/api/service")
        .then((res) => res.json())
        .then((result) => {
          setServices(result);
        });
      let currentDebt = 0;
      services.map((service) => {
        currentDebt+=service.debt;
      });

      services.map((service, index) => {
        if (service.active) {
          currentDebt +=
            ((new Date().getTime() - service.timeActivated) / 1000) *
            services[index].price;
        }
      });
      setPrice(Math.round((currentDebt + Number.EPSILON) * 100) / 100);
    }, 5000);
    return () => clearInterval(intervalId);
  });

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link
                onClick={() => setIsActive("dashboard")}
                className={isActive === "dashboard" ? "active" : "nothing"}
                to="/"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsActive("monitoring")}
                className={isActive === "monitoring" ? "active" : "nothing"}
                to="/monitoring"
              >
                Monitoring
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsActive("services")}
                className={isActive === "services" ? "active" : "nothing"}
                to="/services"
              >
                Services
              </Link>
            </li>
            <li className="price">{price} $</li>
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
