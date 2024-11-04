import axios from 'axios';

// Create new axios instance with the base url for restcountries api
const api = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
});

// Get request using instance above for all countries
export const getAllCountries = async () => {
    try {
        const response = await api.get('/all');
        return response.data;
    }
    catch (error) {
        console.error ('Error could not get all countries', error);
    }
}

// Get request using instance above for singular country by name parameter
export const getCountryByName = async (name) => {
    try {
        const response = await api.get(`/name/${name}`);
        return response.data[0];
    }
    catch (error) {
        console.error('Error could not get country', error);
    }
}