import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryByName } from '../api/api';

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
    if (!country) return <p>Loading...</p>

    return (
        <div>
        <h2>{country.name.common}</h2>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital}</p>
        <p>Languages: {Object.values(country.languages).join(', ')}</p>
      </div>
    )
}

export default CountryDetails;