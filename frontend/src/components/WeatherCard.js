import React, { useState } from "react";
import indianCities from "./indianCities";

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Format UNIX timestamp to HH:MM
  const formatTime = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toUTCString().slice(-12, -4);
  };

  const fetchWeather = async () => {
    let trimmedCity = city.trim();
    if (!trimmedCity) return;

    // Auto add India country code if missing
    if (!trimmedCity.includes(",")) {
      trimmedCity += ",IN";
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:4000/api/weather?q=${trimmedCity}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.error || "City not found");
        setWeather(null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather");
      setWeather(null);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "20px auto",
        backgroundColor: weather ? "#f0f8ff" : "#f0f0f0",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <input
        list="cities"
        type="text"
        placeholder="Enter city (e.g., Mumbai)" required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", width: "200px", borderRadius: "5px" }}
      />
      <datalist id="cities">
        {indianCities.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <button
        onClick={fetchWeather}
        style={{
          padding: "10px",
          marginLeft: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Get Weather
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt="weather icon"
          />
          <p style={{ fontSize: "20px", margin: "5px 0" }}>
            {weather.weather[0].description.toUpperCase()}
          </p>
          <p>
            Temperature: {weather.main.temp}°C (Feels like {weather.main.feels_like}°C)
          </p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>
            Sunrise: {formatTime(weather.sys.sunrise, weather.timezone)} | Sunset:{" "}
            {formatTime(weather.sys.sunset, weather.timezone)}
          </p>
        </div>
      )}
      
    </div>
    
  );
};

export default WeatherCard;
