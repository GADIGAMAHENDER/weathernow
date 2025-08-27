import React from "react";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "50px" }}>
      
      <img 
        src="/android.png" 
        alt="Weather App Logo" 
        style={{ width: "80px", height: "80px", marginBottom: "10px" }}
      />
      <h1>Weather Now</h1>
      
      <WeatherCard />
    </div>
  );
}

export default App;
