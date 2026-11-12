import {useState, useEffect} from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response =>{
        setCountries(response.data)
      })
  },[])

  console.log(countries)
  const handleValue = (event) =>{
    setSearch(event.target.value)
  }

  const filteredCountries = 
      countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
  
  const CountriesToShow = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length >= 2) {
        return (
          filteredCountries.map(country => <li key={country.cca3}>{country.name.common}</li>)
        )
    } else if (filteredCountries.length === 1) {
        const country = filteredCountries[0]
        return (
          <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h3>Languages:</h3>
            <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>

            <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
          </div>

        )
    } else if (filteredCountries.length === 0){
      return <div>No match</div>
    }
  }
  return(
    <div>
      <h1>Countries</h1>
      <input value = {search}
        onChange = {handleValue}
      />
      <CountriesToShow/>
    </div>
  )
}

export default App