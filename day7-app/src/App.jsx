
import BarCode from './Components/BarCode.jsx';
import { Routes, Route } from "react-router-dom";
import {BrowserRouter} from 'react-router-dom';
export default function App(){

  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BarCode />} />
      </Routes>
    </BrowserRouter>

  );
}