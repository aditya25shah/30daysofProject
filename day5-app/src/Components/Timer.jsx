import { useState } from "react";
import {React, useEffect} from 'react';
import './Timer.css'
export default function Timer(){
    const[time,setTime] = useState(25*60);
    const[isrunning,setisrunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isrunning && time > 0) {
            timer = setInterval(() => setTime((t) => t - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isrunning, time]);


    const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const reset = () => {
        setisrunning(false);
        setTime(25 * 60);
    };


    return(<>
        <div>
            <h2>Pomodoro Timer</h2>
            <h1>{formatTime(time)}</h1>
            <button onClick={() => setisrunning(!isrunning)}>
                {isrunning ? "Pause" : "Start"}
            </button>
            <button onClick={reset}>Reset</button>
        </div>
    </>)
}