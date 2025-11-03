import Login from './Components/Login.jsx'
import Weather from './Components/WeatherDetails.jsx';
import { Routes, Route } from "react-router-dom";
import {BrowserRouter} from 'react-router-dom'
export default function App(){

  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>

  );
}