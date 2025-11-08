
import Timer from './Components/Timer.jsx';
import { Routes, Route } from "react-router-dom";
import {BrowserRouter} from 'react-router-dom';
export default function App(){

  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Timer />} />
      </Routes>
    </BrowserRouter>

  );
}