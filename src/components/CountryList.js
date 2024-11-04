import React, { useEffect, useState } from 'react';
import { getAllCountries } from '../api/api';
import CountryCard from './CountryCard';

const CountryList = ({ searchTerm}) => {
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

        // Filter countries based on searchTerm
        const filteredCountries = countries.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
    // Create a country card for each country
    return (
        <div className="country-list">
            <div className="row">
            {filteredCountries.map((country) => (
                <div className="col-md-4 col-sm-6 mb-4">
                <CountryCard key={country.cca3} country={country} />
                </div>
            ))}
            </div>
        </div>
    );
}

export default CountryList;