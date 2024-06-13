import React, { useState, useEffect } from "react";


function WeatherAPI() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState(null);
    const [query, setQuery] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (query) {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=97d4afeea4677f98ab275a01fd24545c`)
                .then(response => response.json())
                .then(data => {
                    setWeather(data.main);
                    setDate(new Date().toLocaleString());
                })
                .catch(error => {
                    console.error("Error fetching the weather data: ", error);
                });
        }
    }, [query]);
   
    

    const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

    const handleSearchButton = () => {
        setQuery(search);
    };

    return (
        <div className="WeatherApp">
            <header className="HeaderApp">
                <h1>Weather App</h1>
                <input
                    type="text"
                    placeholder="Enter City Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearchButton}>Search</button>
                {weather && (
                    <div className="weather-card">
                        <p>Temperature: {kelvinToCelsius(weather.temp)}°C</p>
                        <p>Feels Like: {kelvinToCelsius(weather.feels_like)}°C</p>
                        <p>Humidity: {weather.humidity}%</p>
                        <p>Date: {date}</p>
                        
                    </div>
                )}
            </header>
        </div>
    );
}

export default WeatherAPI;
