import React, { useEffect, useState } from 'react';
import { getAllCountries } from '../api/api';
import CountryCard from './CountryCard';

const CountryList = () => {
    // initialise state to hold list of all countries
    const [ countries, setCountries ] = useState([]);

    useEffect(() => {
    
        const loadCountries = async () => {
            //store api call data and update the state with the data
            const data = await getAllCountries();
            setCountries(data);
        };
        loadCountries();
    }, []);
    
    // Create a country card for each country
    return (
        <div className="country-list">
            {countries.map((country) => (
                <CountryCard key={country.cca3} country={country} /> // Use country code as a key for each card
            ))}
        </div>
    );
}

export default CountryList;