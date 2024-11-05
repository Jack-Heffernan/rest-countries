import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExchangeRateCalculator = ({ baseCurrency }) => {
    // State to hold the current exchange 
    const [exchangeRate, setExchangeRate] = useState(null);
    // State to store target currency, defaulting to USD
    const [targetCurrency, setTargetCurrency] = useState('USD'); 
    // State to store the amount the user wants to convert, defaulting to 1
    const [amount, setAmount] = useState(1); 
    // State to store the calculated converted amount
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState(null);

    // Get the exchange rate whenever baseCurrency or targetCurrency changes
    useEffect(() => {
        if (baseCurrency && targetCurrency) {
            // Retrieve exchange rate from API
            const getExchangeRate = async () => {
                try {
                    const apiKey = '1a9258c3a0cde863066ededa'; 
                    const response = await axios.get(
                        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}`
                    );
                    // set the exchangeRate to the conversion rate from the response
                    setExchangeRate(response.data.conversion_rate);
                } catch (err) {
                    setError('Could not get exchange rate.');
                    console.error(err);
                }
            };
            getExchangeRate();
        }
    }, [baseCurrency, targetCurrency]); 

    // Handle changes in the amount input 
    const handleAmountChange = (e) => {
        const inputAmount = e.target.value;
        setAmount(inputAmount);
        // Calculate converted amount if exchange rate has been set
        if (exchangeRate) {
            setConvertedAmount((inputAmount * exchangeRate).toFixed(2));
        }
    };

    // Handle changes in the target currency selection
    const handleTargetCurrencyChange = (e) => {
        setTargetCurrency(e.target.value);
    };

    return (
        <div className="exchange-rate-calculator card my-3 p-3">
            <h5>Exchange Rate Calculator</h5>
            <p>Convert from <strong>{baseCurrency}</strong> to a target currency.</p>
            <div className="mb-2">
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    className="form-control mb-2"
                    placeholder="Enter amount"
                />
                <select
                    value={targetCurrency}
                    onChange={handleTargetCurrencyChange}
                    className="form-select"
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                </select>
            </div>
            <p>
                {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
            </p>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default ExchangeRateCalculator;
