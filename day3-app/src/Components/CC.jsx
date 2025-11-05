import { useEffect } from "react";
import {React,useState} from 'react';
import './CC.css'
export default function  CC(){

    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");

    async function getDetailsofCurrency(){
        try{
            const res = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
            const result = await res.json();
            const rate = result.rates[toCurrency];
            setConvertedAmount((amount * rate).toFixed(2));
        } 
        catch(error){
            console.log(error);
            alert(`THe error which you are Facing is = `,error);
        }
        
    }
    
    return(
        <>
        <div className="currency-container">
            <h1>Currency Converter</h1>
            <div>
                <label>Amount: </label>
                <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />

                <label>From: </label>
                <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                </select>

                <label>To: </label>
                <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                </select>

                <button onClick={getDetailsofCurrency}>Convert</button>
            </div>

            <h2>
                Converted Amount: {convertedAmount ? convertedAmount + " " + toCurrency : ""}
            </h2>
        </div>
        </>
    );
}