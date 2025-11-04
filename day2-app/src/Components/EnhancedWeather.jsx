import {React,useState,useEffect} from 'react'

export default function EnhancedWeather(){

    const[longitude,setlongitude] = useState(0.0);
    const[latitude,setlatitude] = useState(0.0);

    const[data,setData] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setlatitude(lat);
                setlongitude(lon);

                const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`
                );
                const json = await res.json();
                setData(json);
            },
            (error) => {
                alert("Getting Error while Fetching the Location!! " + error.message);
            }
            );
        } else {
            alert("Your Browser Doesn’t Support Geolocation!!!");
        }
    }, []);


    return(
        <>
        <div>
            <h1>WELCOME TO THE WEATHER APP </h1>
            
            {!data && <p>Fetching weather data...</p>}

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
        </>
    );
    
}