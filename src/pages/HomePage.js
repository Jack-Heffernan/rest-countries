import React, { useState } from 'react';
import CountryList from '../components/CountryList';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    //Set up state to hold search term
    const [searchTerm, setSearchTerm] = useState('');

    // Handle search input from the SearchBar component
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div>
            <div className="text-center mb-4">
            <h1>restCountries</h1>
            <SearchBar onSearch={handleSearch} />
            </div>
            <CountryList searchTerm={searchTerm} />
        </div>
    )
}

export default HomePage;

