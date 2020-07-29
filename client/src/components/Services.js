import React, { useState, useEffect } from "react";
import "./services.scss";

export default function Services(props) {
  const [services, setServices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [pricing, setPricing] = useState([
    { time: 0, active: false, debt: 0 },
    { time: 0, active: false, debt: 0 },
    { time: 0, active: false, debt: 0 },
  ]);
  const [fullDebt, setFullDebt] = useState(0);
  const appNavPrice = pricing.debt;

  const updatePricing = (index) => (e) => {
    let newPrice = [...pricing];
    let newDebt = newPrice[index].debt;
    if (newPrice[index].active) {
      newDebt +=
        ((new Date().getTime() - newPrice[index].time) / 1000) *
        services[index].price;
    }
    newPrice[index] = {
      time: new Date().getTime(),
      active: !newPrice[index].active,
      debt: newDebt,
    };
    setPricing(newPrice);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      let currentDebt = pricing.reduce((a, b) => ({ debt: a.debt + b.debt }));
      currentDebt = currentDebt.debt;
      pricing.map((price, index) => {
        if (price.time && price.active) {
          currentDebt +=
            ((new Date().getTime() - price.time) / 1000) *
            services[index].price;
        }
      });
      setFullDebt(currentDebt);
    }, 5000);
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    fetch("/api/service")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setServices(result);
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
        <h1>Services {fullDebt}</h1>
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
                  <button onClick={updatePricing(index)}>
                    {pricing[index].active ? "Disable" : "Activate"}
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
