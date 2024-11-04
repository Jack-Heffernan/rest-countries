import React from 'react';
import { Link } from 'react-router-dom';


const CountryCard = ({ country }) => {
    return (
        <div className="country-card">
            <h3>{country.name.common}</h3>
            <p>Population: {country.population}</p>
            <Link to={`/country/${country.name.common}`}>View</Link>
        </div>
    );
};

export default CountryCard;