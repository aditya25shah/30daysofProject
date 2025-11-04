import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
function Login(){
    const navigate = useNavigate();

    const[user,Setuser] = useState(null);

    function loaduser(){
        const id = document.getElementById("id").value;
        const pass = document.getElementById("pass").value;
        if(id && pass){
            navigate("/EnhancedWeather");
        }else{
            alert(`Enter Your Details Correctly`);
        }
    }

    return(<>
    <div className='login-container'>
        <h1> Enter Your Credentials</h1>
        <input id="id" placeholder="Enter your email" />
        <input id="pass" placeholder='Enter your Password'/>
        <button onClick={loaduser}>Submit Your Credentials</button>
    </div>
    </>);
}

export default Login;