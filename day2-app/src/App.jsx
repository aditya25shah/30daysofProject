import Login from './Components/Login.jsx'
import EnhancedWeather from './Components/EnhancedWeather.jsx';
import { Routes, Route } from "react-router-dom";
import {BrowserRouter} from 'react-router-dom';
export default function App(){

  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/EnhancedWeather" element={<EnhancedWeather />} />
      </Routes>
    </BrowserRouter>

  );
}