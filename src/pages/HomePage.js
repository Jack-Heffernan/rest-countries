import React, { useState } from 'react';
import CountryList from '../components/CountryList';
import SearchBar from '../components/SearchBar';
import { Dropdown } from 'react-bootstrap';

const HomePage = () => {
    //Set up state to hold search term
    const [searchTerm, setSearchTerm] = useState('');
    const [region, setRegion] = useState('All');

    // Handle search input from the SearchBar component
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleRegionSelect = (region) => {
        setRegion(region);
    };

    return (
        <div>
            <div className="text-center mb-4">
            <h1>restCountries</h1>
            <SearchBar onSearch={handleSearch} />
            <Dropdown className="mt-3">
                    <Dropdown.Toggle>
                        {region} 
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleRegionSelect('All')}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRegionSelect('Africa')}>Africa</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRegionSelect('Americas')}>Americas</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRegionSelect('Asia')}>Asia</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRegionSelect('Europe')}>Europe</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRegionSelect('Oceania')}>Oceania</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <CountryList searchTerm={searchTerm} region={region} />
        </div>
    )
}

export default HomePage;

