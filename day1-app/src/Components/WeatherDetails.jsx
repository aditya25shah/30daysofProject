import {React,useState} from 'react'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Weather.css'
function Weather(){
    const[data,setData] = useState(null);


    async function getdetails() {
        const lat = document.getElementById("longitude").value;
        const lon = document.getElementById("latitude").value;
        if(!lat || !lon ){
            window.alert(`Please enter Both Values Correctly`);
        }
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`);
        const json = await res.json();
        setData(json);
    }

    return(
        <div>
            <h1>WELCOME TO THE WEATHER APP </h1>
            <input placeholder='Enter latitude' id="latitude"/>
            <input placeholder='Enter longitude' id="longitude"/>
            <input placeholder='Enter Your City' />
            <button onClick={getdetails}>Submit</button>
            {data && (
                <div className='details'>
                <h2>🌦 Current Weather</h2>
                <p>
                    <strong>Latitude:</strong> {data.latitude}
                </p>
                <p>
                    <strong>Longitude:</strong> {data.longitude}
                </p>
                <p>
                    <strong>Temperature:</strong> {data.current.temperature_2m} °C
                </p>
                <p>
                    <strong>Wind Speed:</strong> {data.current.wind_speed_10m} km/h
                </p>
                <p>
                    <strong>Time:</strong> {data.current.time}
                </p>
                </div>
            )}
        </div>
    );


}

export default Weather;