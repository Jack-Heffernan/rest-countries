import React, { useEffect, useState } from 'react';
import { getAllCountries } from '../api/api';
import CountryCard from './CountryCard';

const CountryList = ({ searchTerm, region}) => {
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

        // Filter countries based on searchTerm and Region
        const filteredCountries = countries.filter(country => {
            const matchesSearchTerm = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRegion = region === 'All' || country.region === region; // Check if region matches or is "All"
            return matchesSearchTerm && matchesRegion;
        });
    
    // Create a country card for each country
    return (
        <div className="container my-5">
            <div className="row">
                {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                        <div className="col-md-4 col-sm-6 mb-4" key={country.cca3}>
                            <CountryCard country={country} />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p className="text-muted">No countries found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CountryList;