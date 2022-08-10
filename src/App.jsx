import { useState } from "react";
import moment from "moment";
import "./App.css";
import dotenv from 'dotenv'

function App() {
  const api = {
    base: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "YOUR_API_KEY",
  };

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const getWeather = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${api.base}${city.trim()}&appid=${api.key}&units=metric`
    );
    const data = await response.json();
    if (response.status === 404) {
      setError({ status: true, message: "City not Found" });
    } else {
      setError({ status: false, message: "" });
    }
    setWeather(data);

    setCity("");
  };

  return (
    <div className="App">
      <section>
        <h1>Weather App</h1>
        <form className="search" onSubmit={getWeather}>
          <input
            type="text"
            className="search-bar"
            placeholder="Enter the name of city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
          />
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <div className="weather-info">
          <header>
            {error.status ? (
              <h2>{error.message}</h2>
            ) : (
              <h2>
                {weather?.name}, {weather?.sys?.country}
              </h2>
            )}
            <h5>
              {moment().format("dddd")}, {moment().format("LL")}
            </h5>
          </header>
          <div className="info-top">
            <h4>Temperature: {Math.round(weather?.main?.temp)} °C</h4>
            <h4 className="description">
              Description: {weather?.weather?.[0]?.description}
            </h4>
          </div>
          <div className="info-bottom">
            <h4>Humidity: {weather?.main?.humidity}%</h4>
            <h4>Wind Speed: {weather?.wind?.speed} km/h</h4>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
