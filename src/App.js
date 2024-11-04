import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CountryDetails from './pages/CountryDetails';

const App = () => {
  const [DarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!DarkMode);
    document.body.classList.toggle('dark-mode', !DarkMode);
  };



  return (
    <Router>
      <button onClick={toggleDarkMode} className="toggle-button mt-3">
                    {DarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:name" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
