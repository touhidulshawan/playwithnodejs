require("dotenv").config();
import axios from "axios";

interface WeatherProps {
  forecast: string;
  cityName: string;
  coordinate: { lon: number; lat: number };
  currentTemp: number;
}

export const getWeatherData = async (cityName: any) => {
  let getData: WeatherProps = {
    forecast: "",
    cityName: "",
    coordinate: { lon: 0, lat: 0 },
    currentTemp: 0,
  };
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    const data = await response.data;
    getData = {
      forecast: data.weather[0].description,
      cityName: data.name,
      coordinate: data.coord,
      currentTemp: data.main.temp,
    };
    return getData;
  } catch (err) {
    console.log("Something Wrong!! Try again later.");
  }
};
