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
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=7`
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
             <img src={`https://openweathermap.org/img/wn/${weatherData?.list?.[0]?.weather?.[0]?.icon}@2x.png`} alt="Weather Icon"/>
            </div>
            {/* Weather Summary */}

            <div className="weather-summary">
              {weatherData?.list?.[0]?.weather?.[0]?.description || "Loading..."}
            </div>

            {/* Display temperature */}

            <div className="temperature">
              {weatherData ? Math.round(weatherData.list[0].main.temp) + "°C" : " "}
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

        {/* forecast */}
        <div className="forecast-container">
          <div className="forecast-header">
            <Cloudy size={30} strokeWidth={1} />
            <span>Forecast</span>
          </div>
          <div className="forecast-body">
            {weatherData?.list
              .filter((_, index) => index !== 0)
              .map((data, index) => (
                <div key={data.dt_txt} className="forecast-data">
                  <div className="icon">
                   <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather Icon"/>
                  </div>
                  <div className="temperature">
                    {Math.round(data.main.temp) + "°C"}
                  </div>
                  <div className="date">
                    <div>{days[new Date(data.dt_txt).getDay()]}, </div>
                    <div>{(data.dt_txt)?.split(" ")[0]}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
