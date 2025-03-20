import { useState, useEffect } from 'react'
import './App.css'
import { House, Cloudy, CloudSun, CloudRain, CloudSunRain, Wind, CloudMoon, Sun, CloudRainWind } from 'lucide-react';


const App = () => {
  const [city, setCity] = useState("Kathmandu")
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

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



  // handel form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  // Function to format the Date and day
  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  }

  // fetch the weather data on initial render
  useEffect(() => {
    fetchWeather();
  }, []);

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

            <div className="weather-summary">
              {weatherData?.list?.[0]?.weather?.[0]?.description || "Loading..."}
            </div>

            {/* Display temperature */}

            <div className="temperature">
              {weatherData ? Math.round(weatherData.list[0].main.temp) + "°C" : "Loading..."}
            </div>

            {/* City Input Form */}
            <form id='form' onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Enter City Name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button type="Submit">Search</button>
            </form>

            <div className="date-box">
              <div>{days[new Date(weatherData?.list[0]?.dt_txt).getDay()]}, </div>
              <div>{(weatherData?.list[0]?.dt_txt)?.split(" ")[0]}</div>
            </div>

            <div className="city">{weatherData?.city?.name || ""}, {weatherData?.city?.country || ""}</div>
          </div>
        </div>

        {/* forecase */}  
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
