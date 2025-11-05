import { Routes, Route } from "react-router-dom";
import CC from './Components/CC'
import {BrowserRouter} from 'react-router-dom';

export default function App(){

  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CC />} />
      </Routes>
    </BrowserRouter>

  );
}