import React, { useState, useEffect } from "react";
import "./services.scss";
import axios from "axios";
import { set } from "mongoose";

export default function Services() {
  const [services, setServices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonState, setButtonState] = useState([]);

  const updatePricing = (service, index) => (e) => {
    setButtonLoading(true);
    let newDebt = service.debt;
    let time = new Date().getTime();
    let updateService = {};
    fetch(`/api/service/${service._id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          switch (result) {
            case true:
              newDebt +=
                ((time - service.timeActivated) / 1000) * service.price;
              updateService = {
                active: !result,
                debt: newDebt,
                timeDeactivated: time,
              };
              break;
            default: {
              updateService = {
                active: !result,
                timeActivated: time,
              };
            }
          }
          axios
            .put(`/api/service/${service._id}`, updateService)
            .then((res) => res.json)
            .then(
              (result) => {
                setButtonLoading(false);
              },
              (error) => {
                buttonLoading(false);
                setError(error);
              }
            );
        },
        (error) => {
          setError(error);
        }
      );
      let arr = [...buttonState];
      arr[index] = !arr[index];
      setButtonState(arr);
  };

  //useEffect(() => {
  //  const intervalId = setInterval(() => {
  //    let currentDebt = pricing.reduce((a, b) => ({ debt: a.debt + b.debt }));
  //    currentDebt = currentDebt.debt;
  //    pricing.map((price, index) => {
  //      if (price.time && price.active) {
  //        currentDebt +=
  //          ((new Date().getTime() - price.time) / 1000) *
  //          services[index].price;
  //      }
  //    });
  //    setFullDebt(Math.round((currentDebt + Number.EPSILON) * 100) / 100);
  //  }, 5000);
  //  return () => clearInterval(intervalId);
  //});
  useEffect(() => {
    fetch("/api/service")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setServices(result);
          let arr = [...buttonState];
          result.map((service) => {
            arr.push(service.active)
          })          
          setButtonState(arr);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <h1>Services</h1>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Services</h1>
        <ul>
          {services.map((service, index) => (
            <li key={service.name}>
              <h3>{service.name}</h3>
              <div className="content">
                <p>
                  {service.description}
                  <br />
                  {service.metrics}
                  <br />
                  <br />
                  {service.price} $ per hour{" "}
                  <button onClick={updatePricing(service, index)}>
                    {buttonLoading
                      ? "..."
                      : [buttonState[index] ? "Disable" : "Activate"]}
                  </button>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
