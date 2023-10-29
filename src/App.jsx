import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import CardWeather from './components/CardWeather'
import CardLoading from './components/CardLoading'

function App() {

  const [coords, setCoords] = useState()
  const [city, setCity] = useState()
  const [Weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isloading, setIsloading] = useState(true)
  const [isDenied, setIsDenied] = useState(false)
  const [isFound, setIsFound] = useState(true)

  
  const succes = position => {
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setCoords(obj)
    setIsDenied(false)
  }
  const error = err => {
    setIsDenied(true)
  }
  useEffect(() =>{
    setIsloading(true)
    navigator.geolocation.getCurrentPosition(succes,error)
  },[])
  
  
  useEffect(()=>{
    if(coords || city){
      const APIKEY ='9a8142823ac33a757fa22d11e1fbee84'
      let url= ''
      if(city){
        url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
      }else{
        url=`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      }
      axios.get(url)
      .then( res => {
        const celsius = (res.data.main.temp -273.15).toFixed(1)
        const fahrenheit = (celsius*9/5 +32).toFixed(1)
        setIsFound(true)
        setTemp({celsius,fahrenheit})
        setWeather(res.data)
      })
      .catch(err => setIsFound(false))
      .finally(()=>setIsloading(false))
    }
  },[coords,city])

  const inputCity = useRef()
  

  const handleSubmit = e =>{
    e.preventDefault()
    const citySearch=inputCity.current.value.toLowerCase().trim()
    if(citySearch){
      setCity(citySearch)
    }
  }

  return (
    <div className='app'>
      {
        isloading 
        ? (
          <CardLoading 
            denied = {isDenied}
          />
        ) 
        :(
          <CardWeather
            weather = {Weather}
            temp = {temp}
          />
        )
      }
      <form className='search' onSubmit={handleSubmit}>
        <input 
          className='search__input' 
          type="text" ref={inputCity}
        />
        <button className='search__btn'>Search</button>
      </form>
      {
        isFound?<></>:
        (
          <span className='search__label'> "{inputCity.current.value}", No disponible</span>
        )
      }
    </div>
  )
}

export default App
