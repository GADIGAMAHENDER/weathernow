import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get("/api/weather", async (req, res) => {
  const { q, units = "metric" } = req.query;
  const city = q?.trim();

  if (!city) return res.status(400).json({ error: "City is required" });

  console.log("Fetching weather for:", city);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      const errData = await response.json();
      console.log("OpenWeather error:", errData);
      return res.status(response.status).json({ error: "City not found or API error" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
