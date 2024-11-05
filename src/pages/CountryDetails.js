import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryByName } from '../api/api';
import WeatherWidget from '../components/WeatherWidget';
import ExchangeRateCalculator from '../components/ExchangeWidget';
import Spinner from 'react-bootstrap/Spinner';

const CountryDetails = () => {
    //Get the country name 
    const { name } = useParams();
    const [country, setCountry] = useState(null);

    //Load country data when the name is recieved
    useEffect(() => {
        const loadCountry = async () => {
            const data = await getCountryByName(name);
            setCountry(data);
        };
        loadCountry();
    }, [name]);

    //if no country has been recieved return a loading screen
    if (!country) return <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
    </Spinner>

    // Get the main currency code (assuming only one currency per country)
    const baseCurrency = Object.keys(country.currencies)[0];

    return (
        <div className="container my-5">
        <button className="btn btn-secondary mb-3" onClick={() => window.history.back()}>Back</button>
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <img 
                            src={country.flags.svg} 
                            alt={`Flag of ${country.name.common}`} 
                            className="img-fluid rounded" 
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                        <div className="col-8">
                        <h2 className="card-title">{country.name.common}</h2>
                        <p className="card-text"><strong>Population:</strong> {country.population.toLocaleString()}</p>
                        <p className="card-text"><strong>Region:</strong> {country.region}</p>
                        <p className="card-text"><strong>Capital:</strong> {country.capital}</p>
                        <p className="card-text"><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
                        <p className="card-text"><strong>Currency:</strong> {Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
                        <p className="card-text"><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
                        {country.borders && <p className="card-text"><strong>Neighboring Countries:</strong> {country.borders.join(', ')}</p>}
                        <ExchangeRateCalculator baseCurrency={baseCurrency} />
                        </div>
                        <div className="col-4">
                                <WeatherWidget capital={country.capital[0]} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </div>
        
    )
}

export default CountryDetails;