
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import style from './style.css'

function Login() {

    let navigate = useNavigate();
    const [data, setdata] = useState({
        Email: '',
        username: '',
        
        Password: null,
        
    })
    function handle(event) {
        setdata({ ...data, [event.target.name]: event.target.value })
    }



    function godata() {
        axios.post('http://localhost:8001/login', data).then(x => {
            console.log("login data", x.data)
            localStorage.setItem("author", x.data.Usermail.username)

            navigate("/all")
            
        }).catch(e => {
            alert("USer is not registered")
        })
    }
    function changepage() {
        navigate("/Regis")
    }

    return (

        <div className="login">

            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name='Email' onChange={handle}></input>
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name='Password' onChange={handle}></input>
                <label for="floatingPassword">Password</label>
            </div>
            <div className='butt' > <button type="button" onClick={godata} class="btn btn-info">LOG IN</button>
            <div ><button type="button" onClick={changepage} class="btn btn-warning">SIGN UP</button></div>
          
            </div>
        </div>)
}

export default Login