// WeatherWidget.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherWidget = ({ capital }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const apiKey = 'c9d78e516208541fb7c1de739a0dfc15';
                // get weather data from OpenWeather api based on the capital prop
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
                );
                setWeather(response.data);
                setLoading(false);
            } catch (error) {
                setError('Unable to get weather data');
                setLoading(false);
            }
        };
        getWeather();
    }, [capital]); // depends on the capital so it will refresh if it changes

    // loading message
    if (loading) return <p>Loading weather...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="weather-widget card">
            <div className="card-body">
                <h5 className="card-title">Weather in {capital}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {weather.weather[0].description}
                </h6>
                <p className="card-text">
                    <strong>Temperature:</strong> {weather.main.temp}°C <br />
                    <strong>Humidity:</strong> {weather.main.humidity}% <br />
                    <strong>Wind Speed:</strong> {weather.wind.speed} m/s
                </p>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather icon"
                    className="weather-icon"
                />
            </div>
        </div>
    );
};

export default WeatherWidget;
