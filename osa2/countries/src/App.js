import axios from 'axios'
import React, { useState , useEffect } from 'react'


function App() {
  const [ newSearch, setNewSearch ] = useState('')
  console.log(newSearch)

  const [ countryShow, setCountry ] = useState('')
  const [ results, setResults ] = useState([])

  const handleSearch = (event) => (setNewSearch(event.target.value) || setCountry(''))
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setResults(response.data)
      })
  }, [])
  console.log('render', results.length, 'results')

  return (
    <div>
      <div>Search countries: <input value={newSearch} onChange={handleSearch} /></div>
      <br />
      <h3>Results:</h3>
      <ShowResults results={results} search={newSearch} onSetCountry={setCountry} countryShow={countryShow}/>
    </div>
  );
}


const ShowResults = (props) => {
  const results = props.results
  const newSearch = props.search
  const onSetCountry = props.onSetCountry
  const countryShow = props.countryShow

  const filteredResults = results.filter(
    country => {
      return (
        country.name.official.toLowerCase().includes(newSearch.toLowerCase())
      )
    })
  console.log(filteredResults)
  
  if (countryShow) {
    return(<div><ShowCountryDetails countryShow={countryShow}/></div>)
  }
  else if (filteredResults.length < 11) {
    return (<div><ShowFilteredResults filteredResults={filteredResults} onSetCountry={onSetCountry}/></div>)}
  else {
    return (<p>Too many matches, specify another filter...</p>)}
}


const ShowFilteredResults = (props) => {
  const onSetCountry = props.onSetCountry
  const handleShow = (country) => {
    console.log(country)
    onSetCountry(country)
    }
  
  const ToReturn = props.filteredResults.map((country) => {
    return (
      <div key={country.cca3}>{country.name.common}
      <button value={country} onClick={() => handleShow(country)}>Show</button>
      </div>
    )})

  return (<div>{ToReturn}</div>)
}


const ShowCountryDetails = (props) => {
  const countryShow = props.countryShow
  const languages = countryShow.languages
  console.log(languages)

  return (
    <div>
      <div>
        <img src={countryShow.flags.png}/>
      </div>
      <br />
      <div>
        <h1>{countryShow.name.common}</h1>
        <p>Capital: {countryShow.capital}</p>
        <p>Population: {countryShow.population}</p>
      </div>
      <div>
        <h3>Spoken languages</h3>
        <ul>{Object.entries(languages).map(([key, value]) => {
          return (<li key={value}>{value}</li>)})}
        </ul>
      </div>
      <div>
        <h3>Weather in {countryShow.capital}:</h3>
        <GetWeatherInCity city={countryShow.capital}/>
      </div>
    </div>
  )
}


const GetWeatherInCity = (props) => {
  const ACCESS_KEY = process.env.REACT_APP_API_KEY
  console.log(ACCESS_KEY)
  const city = props.city

  const [ weather, setWeather ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${city}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [])

  return (
    <>
    {Object.keys(weather).length > 0 &&
      <div>
        <img src={weather.weather_icons[0]} />
        <p>{weather.weather_descriptions[0]}</p>
        <p>Current temp: {weather.temperature} °C</p>
        <p>Humidity: {weather.humidity} %</p>
      </div>}
    </>
  )
}

export default App;