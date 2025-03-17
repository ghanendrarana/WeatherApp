import { useState, useEffect } from 'react'
import './App.css'
import { House, Cloudy, CloudSun, CloudRain, CloudSunRain, Wind, CloudMoon, Sun, CloudRainWind } from 'lucide-react';


const App = () => {

  const [city, setCity] = useState("Kathmandu")
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [temperature, setTemperature] = useState(null)

  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  // function to fetch weather data

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=5`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  // fetch weather data for the default city on component mount

  useEffect(() => {
    fetchWeather();
  }, []);

  // handel form submission

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };


  return (
    <div className="main-container">
      <div className="body-container">
        <div className="home-container">

          {/*First compartment HEADER part*/}

          <div className="header">
            <div className="home-header">
              <House size={20} className="icon" />
              <span className="home">Home</span>
            </div>
            <div className="weather-header">
              <Cloudy size={20} className="icon" />
              <span className="forecast">Forecast</span>
            </div>
          </div>

          {/*Second compartment BODY part*/}

          <div className="body">
            <div className="weather-icon">
              <CloudSun className="icon" size={70} />
            </div>

            {/* Weather Summary */}

            <div className="weather-summary">sunny </div>

            {/* Display temperature */}

            <div className="temperature">24</div>

            <input placeholder='Enter City Name' />

            <div className="date-box">
              <div>Day</div>
              <div>Date</div>
            </div>

            <div className="city"> City Name</div>
          </div>
        </div>
        <div className="forecast-container">
          <div className="forecast-header">
            <Cloudy size={30} strokeWidth={1} />
            <span>Forecast</span>
          </div>
          <div className="forecast-body">
            <div className="forecast-day">
              <CloudRain size={20} className="cloud-rain" />
              <div>temperature</div>
              <div>date</div>
            </div>
            <div className="forecast-day">
              <CloudSunRain size={20} className="cloud-sun-rain" />
              <div>temperature</div>
              <div>date</div>
            </div>
            <div className="forecast-day">
              <Wind size={20} className="wind" />
              <div>temperature</div>
              <div>date</div>
            </div>
            <div className="forecast-day">
              <CloudMoon size={20} className="cloud-moon" />
              <div>temperature</div>
              <div>date</div>
            </div>
            <div className="forecast-day">
              <Sun size={20} className="sun" />
              <div>temperature</div>
              <div>date</div>
            </div>
            <div className="forecast-day">
              <CloudRainWind size={20} className="cloud-rain-wind" />
              <div>temperature</div>
              <div>date</div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )

}

export default App
