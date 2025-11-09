
import QrCode from './Components/QrCode.jsx';
import { Routes, Route } from "react-router-dom";
import {BrowserRouter} from 'react-router-dom';
export default function App(){

  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QrCode />} />
      </Routes>
    </BrowserRouter>

  );
}