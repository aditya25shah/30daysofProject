import { Routes, Route } from "react-router-dom";
import Gemini from './Components/Gemini.jsx'
import {BrowserRouter} from 'react-router-dom';

export default function App(){

  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gemini />} />
      </Routes>
    </BrowserRouter>

  );
}