import { useState } from 'react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import './App.css'; 

function App() {
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from);

    const options = Object.keys(currencyInfo);
    
    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    const convert = () => {
        if (currencyInfo[to]) {
            setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
        }
    };

    return (
        <div className="app-container">
            <div className="converter-wrapper">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    convert();
                }}>
                    <div className="input-container">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            onAmountChange={(amount) => setAmount(amount)}
                            selectedCurrency={from}
                        />
                    </div>
                    <div className="swap-button-container">
                        <button
                            type="button"
                            className="swap-button"
                            onClick={swap}
                        >
                            Swap
                        </button>
                    </div>
                    <div className="input-container">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectedCurrency={to}
                            amountDisabled 
                        />
                    </div>
                    <button type="submit" className="convert-button">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;