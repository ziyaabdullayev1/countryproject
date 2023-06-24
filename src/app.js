import React, { useEffect, useState } from 'react';
import fetchCountries from './api';
import './styles.css';
import { ThemeProvider } from './ThemeProvider';
import Header from './Header';
import VisibilitySensor from 'react-visibility-sensor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CountryDetails from './CountryDetails';


function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      const filteredData = data.filter(country => country.name.common !== 'Armenia');
      setCountries(filteredData);
    }
    
    getCountries();
  }, []);

 
  

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filterRegion = (event) => {
    setRegion(event.target.value);
  };

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(search.toLowerCase()) && (region === 'All' || country.region === region)
  );

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          //...
          <div className="container">
            {filteredCountries.map((country, index) => (
              <VisibilitySensor key={index}>
                {({isVisible}) =>
                  <div className={`countryBox fade-in-section ${isVisible ? 'is-visible' : ''}`}>
                    <img src={country.flags.svg} alt={`${country.name.common}'s flag`} />
                    <h2>{country.name.common}</h2>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.population}</p>
                    <p>Region: {country.region}</p>
                    <Link to={`/country/${country.name.common}`}>Details</Link>
                  </div>
                }
              </VisibilitySensor>
            ))}
          </div>
          <Route path="/country/:name" component={CountryDetails} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
