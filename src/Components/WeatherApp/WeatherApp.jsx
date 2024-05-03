import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assests/search.png.jpg'
import clear_icon from '../Assests/clear.png.png'
import cloud_icon from '../Assests/cloud.png.png'
import drizzle_icon from '../Assests/drizzle.png.jpg'
import rain_icon from '../Assests/rain.png.jpg'
import snow_icon from '../Assests/snow.png.png'
import wind_icon from '../Assests/wind.png.jpg'
import humidity_icon from '../Assests/humidity.png.jpg'


function WeatherApp() {

  let api_key ="85353ebd0e1281b3edb1f7593379a5f2"

  const [wicon,setWicon] = useState(clear_icon)

  const search = async()=>{
    const element =document.getElementsByClassName("cityInput")
    if(element[0].value===""){
      return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    let response = await fetch(url)


    if(response.status==404){
      document.querySelector(".error").style.display = "block"
      document.querySelector(".weather").style.display = "none"

    }
    else{
      let data = await response.json()
  
      const humidity = document.getElementsByClassName("humidity-percent")
      const wind = document.getElementsByClassName("wind-rate")
      const temperature = document.getElementsByClassName("weather-temp")
      const location = document.getElementsByClassName("weather-location")
  
      humidity[0].innerHTML = data.main.humidity + "%"
      wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h"
      temperature[0].innerHTML = Math.floor(data.main.temp) + "°C"
      location[0].innerHTML = data.name
  
      if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
        setWicon(clear_icon)
      }
      else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
        setWicon(cloud_icon)
      }
      else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
        setWicon(drizzle_icon)
      }
      else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
        setWicon(drizzle_icon)
      }
      else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
        setWicon(rain_icon)
      }
      else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
        setWicon(rain_icon)
      }
      else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
        setWicon(snow_icon)
      }
      else{
        setWicon(clear_icon)
      }
  
      document.querySelector(".weather").style.display="block"  
      document.querySelector(".error").style.display="none"  

      
    }
  }

  return (
    <div className='bg'>
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={()=>{search()}} >
                    <img width={'30px'} src={search_icon} alt="" />
                </div>

            </div>
            <div className="error">
                  <h2>Invalid City Name</h2>
                </div>

            <div className="weather">
            <div className="weather-image">
              <img width={'150px'} src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
              <div className="element">
                <img width={'50px'} src={humidity_icon} alt="" className='icon' />
                <div className="data">
                  <div className="humidity-percent">64%</div>
                  <div className="text">Humidity</div>
                </div>
              </div>
              
              <div className="element">
                <img width={'50px'} src={wind_icon} alt="" className='icon' />
                <div className="data">
                  <div className="wind-rate">18 km/h</div>
                  <div className="text">Wind Speed</div>
                </div>
              </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp