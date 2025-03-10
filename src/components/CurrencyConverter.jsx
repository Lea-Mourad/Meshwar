// CurrencyConverterWidget.jsx
import React, { useState } from "react";
import { FaDollarSign, FaMoneyBillWave } from "react-icons/fa";

const CurrencyConverterWidget = () => {
    const [llAmount, setLlAmount] = useState("");
    const [usdAmount, setUsdAmount] = useState("");

    const exchangeRate = 89000;

    const handleConvert = () => {
        const convertedAmount = parseFloat(llAmount) / exchangeRate;
        setUsdAmount(convertedAmount.toFixed(2));
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-[#984949] mb-4">Currency Converter</h2>
            
            <div className="flex items-center mb-4">
                <FaMoneyBillWave className="text-[#984949] mr-2" />
                <input
                    type="number"
                    placeholder="LL Amount"
                    value={llAmount}
                    onChange={(e) => setLlAmount(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <button
                onClick={handleConvert}
                className="w-full bg-[#984949] text-white py-2 rounded hover:bg-[#7c3b3b] transition mb-4"
            >
                Convert to USD
            </button>

            {usdAmount && (
                <div className="flex items-center text-lg">
                    <FaDollarSign className="text-green-500 mr-2" />
                    <span className="font-semibold">${usdAmount} USD</span>
                </div>
            )}
        </div>
    );
};

export default CurrencyConverterWidget;
